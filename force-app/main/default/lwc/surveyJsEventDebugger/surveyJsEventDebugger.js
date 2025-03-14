import { LightningElement, api, track } from 'lwc';

export default class SurveyJsEventDebugger extends LightningElement {
    @api creatorInstance;
    @track eventCategories = [];
    @track eventLogs = [];
    @track isExpanded = true;
    @track selectedEvents = [];
    @track isInitialized = false;
    @track maxLogs = 100;
    
    // Store original event handlers
    originalHandlers = {};
    
    // Event monitoring state
    monitoredEvents = new Map();
    
    connectedCallback() {
        // We'll initialize when the creator instance is provided
        this.checkForCreator();
    }
    
    @api
    refresh() {
        this.checkForCreator();
    }
    
    checkForCreator() {
        if (this.creatorInstance && !this.isInitialized) {
            // Wait a bit to ensure creator is fully initialized
            setTimeout(() => {
                this.initializeEventDebugger();
            }, 1000);
        }
    }
    
    initializeEventDebugger() {
        if (!this.creatorInstance) {
            console.warn('SurveyJS Event Debugger: Creator instance not provided');
            return;
        }
        
        console.log('SurveyJS Event Debugger: Initializing');
        
        // Discover available events
        this.discoverEvents(this.creatorInstance, 'creator');
        
        if (this.creatorInstance.survey) {
            this.discoverEvents(this.creatorInstance.survey, 'survey');
        }
        
        if (this.creatorInstance.dragDropSurveyElements) {
            this.discoverEvents(this.creatorInstance.dragDropSurveyElements, 'dragDrop');
        }
        
        // Group events by category
        this.organizeEventsByCategory();
        
        // Mark drag-drop events as selected by default
        this.selectDragDropEvents();
        
        this.isInitialized = true;
        console.log('SurveyJS Event Debugger: Initialized with', this.eventCategories.length, 'categories');
    }
    
    discoverEvents(obj, objName) {
        if (!obj) return;
        
        for (const key in obj) {
            try {
                // Check if it's an event object with 'add' method
                if (key.startsWith('on') && 
                    typeof obj[key] === 'object' && 
                    obj[key] !== null &&
                    typeof obj[key].add === 'function') {
                    
                    const eventPath = `${objName}.${key}`;
                    const isDragDrop = this.isDragDropEvent(key);
                    
                    this.monitoredEvents.set(eventPath, {
                        path: eventPath,
                        name: key,
                        category: objName,
                        isDragDrop,
                        isSelected: false,
                        object: obj,
                        eventKey: key
                    });
                }
            } catch (error) {
                // Ignore errors when discovering events
            }
        }
    }
    
    organizeEventsByCategory() {
        const categories = {};
        
        // Group events by category
        this.monitoredEvents.forEach(event => {
            if (!categories[event.category]) {
                categories[event.category] = {
                    name: event.category,
                    events: [],
                    isExpanded: event.category === 'dragDrop' // Expand drag-drop by default
                };
            }
            
            categories[event.category].events.push(event);
        });
        
        // Convert to array and sort events within each category
        this.eventCategories = Object.values(categories).map(category => {
            category.events.sort((a, b) => a.name.localeCompare(b.name));
            return category;
        });
        
        // Sort categories (put dragDrop first)
        this.eventCategories.sort((a, b) => {
            if (a.name === 'dragDrop') return -1;
            if (b.name === 'dragDrop') return 1;
            return a.name.localeCompare(b.name);
        });
    }
    
    selectDragDropEvents() {
        // Select all drag-drop events by default
        this.monitoredEvents.forEach(event => {
            if (event.isDragDrop) {
                event.isSelected = true;
                this.selectedEvents.push(event.path);
                this.monitorEvent(event);
            }
        });
    }
    
    isDragDropEvent(eventName) {
        return eventName.toLowerCase().includes('drag') || 
               eventName.toLowerCase().includes('drop') ||
               eventName.toLowerCase().includes('ghost');
    }
    
    handleToggleExpand() {
        this.isExpanded = !this.isExpanded;
    }
    
    handleToggleCategory(event) {
        const categoryName = event.currentTarget.dataset.category;
        const category = this.eventCategories.find(cat => cat.name === categoryName);
        if (category) {
            category.isExpanded = !category.isExpanded;
            // Force refresh
            this.eventCategories = [...this.eventCategories];
        }
    }
    
    getCategoryIconName(category) {
        return category.isExpanded ? "utility:chevrondown" : "utility:chevronright";
    }
    
    handleEventToggle(event) {
        const eventPath = event.currentTarget.dataset.event;
        const isChecked = event.target.checked;
        
        const eventInfo = this.monitoredEvents.get(eventPath);
        if (eventInfo) {
            eventInfo.isSelected = isChecked;
            
            if (isChecked) {
                this.selectedEvents.push(eventPath);
                this.monitorEvent(eventInfo);
            } else {
                this.selectedEvents = this.selectedEvents.filter(e => e !== eventPath);
                this.unmonitorEvent(eventInfo);
            }
        }
    }
    
    monitorEvent(eventInfo) {
        const { object, eventKey, path } = eventInfo;
        
        if (!object || !object[eventKey]) return;
        
        // Store original handler if not already stored
        if (!this.originalHandlers[path]) {
            this.originalHandlers[path] = object[eventKey].add;
        }
        
        // Replace the add method to intercept event subscriptions
        const originalAdd = object[eventKey].add;
        const self = this;
        
        object[eventKey].add = function(handler) {
            // Call the original add method
            const result = originalAdd.call(this, function(sender, options) {
                // Log the event
                self.logEvent(path, sender, options);
                
                // Call the original handler
                return handler(sender, options);
            });
            
            return result;
        };
        
        // Add our own handler to capture events even if no one else subscribes
        object[eventKey].add(function() {});
        
        console.log(`SurveyJS Event Debugger: Monitoring ${path}`);
    }
    
    unmonitorEvent(eventInfo) {
        const { object, eventKey, path } = eventInfo;
        
        if (!object || !object[eventKey]) return;
        
        // Restore original handler if we have it
        if (this.originalHandlers[path]) {
            object[eventKey].add = this.originalHandlers[path];
            delete this.originalHandlers[path];
        }
        
        console.log(`SurveyJS Event Debugger: Stopped monitoring ${path}`);
    }
    
    logEvent(eventPath, sender, options) {
        // Only log if the event is selected
        if (!this.selectedEvents.includes(eventPath)) return;
        
        const eventInfo = this.monitoredEvents.get(eventPath);
        if (!eventInfo) return;
        
        // Extract basic info
        const senderInfo = this.extractObjectInfo(sender);
        const optionsInfo = this.extractObjectInfo(options);
        
        // Create log entry
        const logEntry = {
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toISOString(),
            event: eventPath,
            category: eventInfo.category,
            sender: JSON.stringify(senderInfo, null, 2),
            options: JSON.stringify(optionsInfo, null, 2),
            isDragDrop: eventInfo.isDragDrop
        };
        
        // Add to logs (keep most recent at top)
        this.eventLogs = [logEntry, ...this.eventLogs].slice(0, this.maxLogs);
        
        // Also log to console for debugging
        console.log(`SurveyJS Event: ${eventPath}`, logEntry);
    }
    
    extractObjectInfo(obj) {
        if (!obj) return null;
        if (typeof obj !== 'object') return obj;
        
        const info = {};
        
        try {
            // Try to get common properties
            ['id', 'name', 'type', 'title', 'text', 'value'].forEach(prop => {
                try {
                    if (obj[prop] !== undefined) {
                        info[prop] = obj[prop];
                    }
                } catch (e) {}
            });
            
            // Try to get constructor name
            try {
                if (obj.constructor && obj.constructor.name) {
                    info.type = obj.constructor.name;
                }
            } catch (e) {}
        } catch (error) {
            return `[Error extracting info]`;
        }
        
        return info;
    }
    
    handleClearLogs() {
        this.eventLogs = [];
    }
    
    get hasLogs() {
        return this.eventLogs.length > 0;
    }
    
    get expandIcon() {
        return this.isExpanded ? 'utility:chevrondown' : 'utility:chevronright';
    }
    
    get expandLabel() {
        return this.isExpanded ? 'Collapse' : 'Expand';
    }
} 