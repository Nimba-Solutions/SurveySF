import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
    
    // Track initialization attempts
    initAttempts = 0;
    maxInitAttempts = 10;
    
    // Helper method to escape HTML special characters
    escapeForHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/`/g, '\\`');
    }
    
    connectedCallback() {
        // We'll initialize when the creator instance is provided
        this.checkForCreator();
    }
    
    @api
    refresh() {
        this.checkForCreator(true);
    }
    
    @api
    set creator(value) {
        this.creatorInstance = value;
        if (value) {
            this.checkForCreator(true);
        }
    }
    
    get creator() {
        return this.creatorInstance;
    }
    
    checkForCreator(force = false) {
        console.log('SurveyJS Event Debugger: Checking for creator instance', this.creatorInstance);
        
        if ((this.creatorInstance && !this.isInitialized) || force) {
            // Wait a bit to ensure creator is fully initialized
            setTimeout(() => {
                this.attemptInitialization();
            }, 500);
        }
    }
    
    attemptInitialization() {
        this.initAttempts++;
        console.log(`SurveyJS Event Debugger: Initialization attempt ${this.initAttempts}`);
        
        if (this.isInitialized && !this.initAttempts > this.maxInitAttempts) {
            console.log('SurveyJS Event Debugger: Already initialized or max attempts reached');
            return;
        }
        
        if (!this.creatorInstance) {
            console.warn('SurveyJS Event Debugger: Creator instance not provided');
            
            // Try again in a moment if we haven't exceeded max attempts
            if (this.initAttempts < this.maxInitAttempts) {
                setTimeout(() => {
                    this.attemptInitialization();
                }, 1000);
            }
            return;
        }
        
        // Check if the creator is fully initialized
        if (!this.creatorInstance.survey) {
            console.warn('SurveyJS Event Debugger: Creator survey not available yet');
            
            // Try again in a moment if we haven't exceeded max attempts
            if (this.initAttempts < this.maxInitAttempts) {
                setTimeout(() => {
                    this.attemptInitialization();
                }, 1000);
            }
            return;
        }
        
        this.initializeEventDebugger();
    }
    
    initializeEventDebugger() {
        console.log('SurveyJS Event Debugger: Initializing with creator', this.creatorInstance);
        
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
        
        try {
            // Special handling for ghost position events
            let senderInfo, optionsInfo;
            
            if (eventPath === 'dragDrop.onGhostPositionChanged') {
                // For ghost position events, try to extract more specific information
                senderInfo = this.extractGhostPositionInfo(sender);
                optionsInfo = this.extractGhostPositionInfo(options);
            } else {
                // Standard extraction for other events
                senderInfo = this.extractObjectInfo(sender);
                optionsInfo = this.extractObjectInfo(options);
            }
            
            // Format the JSON with proper indentation for better readability
            const formattedSender = JSON.stringify(senderInfo, null, 2);
            const formattedOptions = JSON.stringify(optionsInfo, null, 2);
        
            // Create log entry
            const logEntry = {
                id: Date.now() + Math.random().toString(36).substr(2, 5),
                timestamp: new Date().toISOString(),
                event: eventPath,
                category: eventInfo.category,
                sender: formattedSender,
                options: formattedOptions,
                isDragDrop: eventInfo.isDragDrop,
                // Store raw data for potential future use
                rawSender: senderInfo,
                rawOptions: optionsInfo
            };
            
            // Add to logs (keep most recent at top)
            this.eventLogs = [logEntry, ...this.eventLogs].slice(0, this.maxLogs);
            
            // Also log to console for debugging - make sure to stringify
            console.log(`SurveyJS Event: ${eventPath}`, JSON.stringify({
                sender: senderInfo,
                options: optionsInfo
            }, null, 2));
        } catch (error) {
            console.error('Error logging event:', error);
            
            // Create a simplified log entry for errors
            const logEntry = {
                id: Date.now() + Math.random().toString(36).substr(2, 5),
                timestamp: new Date().toISOString(),
                event: eventPath,
                category: eventInfo.category,
                sender: JSON.stringify({ error: 'Error extracting sender info' }),
                options: JSON.stringify({ error: 'Error extracting options info' }),
                isDragDrop: eventInfo.isDragDrop,
                error: error.message
            };
            
            this.eventLogs = [logEntry, ...this.eventLogs].slice(0, this.maxLogs);
        }
        
        // Send to pop-out window if it exists
        if (this.popOutWindow && !this.popOutWindow.closed) {
            const logEntry = this.eventLogs[0]; // Get the most recent log (we add at the beginning)
            
            // Define SLDS URL
            const sldsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/design-system/2.19.0/styles/salesforce-lightning-design-system.min.css';
            
            // Create HTML for the log entry
            const logHtml = `
                <div class="slds-grid slds-grid_vertical-align-center">
                    <div class="slds-text-heading_small slds-truncate slds-grow">${logEntry.event}</div>
                    <div class="slds-text-body_small slds-text-color_weak">${logEntry.timestamp}</div>
                </div>
                <div class="slds-grid slds-grid_vertical-align-start slds-p-top_xx-small">
                    <div class="slds-col slds-size_1-of-2 slds-p-right_xx-small">
                        <div class="slds-grid slds-grid_vertical-align-center">
                            <div class="slds-text-title slds-grow">Sender</div>
                            <span class="slds-icon_container slds-icon-utility-copy_to_clipboard copy-btn" 
                                  onclick="copyToClipboard(\`${this.escapeForHtml(logEntry.sender)}\`)">
                                <svg class="slds-icon slds-icon-text-default slds-icon_xx-small" aria-hidden="true">
                                    <use xlink:href="${sldsUrl}#utility-copy_to_clipboard"></use>
                                </svg>
                                <span class="slds-assistive-text">Copy to clipboard</span>
                            </span>
                        </div>
                        <pre class="json-content">${this.escapeForHtml(logEntry.sender)}</pre>
                    </div>
                    <div class="slds-col slds-size_1-of-2 slds-p-left_xx-small">
                        <div class="slds-grid slds-grid_vertical-align-center">
                            <div class="slds-text-title slds-grow">Options</div>
                            <span class="slds-icon_container slds-icon-utility-copy_to_clipboard copy-btn"
                                  onclick="copyToClipboard(\`${this.escapeForHtml(logEntry.options)}\`)">
                                <svg class="slds-icon slds-icon-text-default slds-icon_xx-small" aria-hidden="true">
                                    <use xlink:href="${sldsUrl}#utility-copy_to_clipboard"></use>
                                </svg>
                                <span class="slds-assistive-text">Copy to clipboard</span>
                            </span>
                        </div>
                        <pre class="json-content">${this.escapeForHtml(logEntry.options)}</pre>
                    </div>
                </div>
            `;
            
            // Send message to pop-out window
            this.popOutWindow.postMessage({
                action: 'newLog',
                logHtml,
                isDragDrop: logEntry.isDragDrop
            }, '*');
        }
    }
    
    extractObjectInfo(obj) {
        if (!obj) return null;
        if (typeof obj !== 'object') return obj;
        
        try {
            // First attempt: Try to stringify the entire object to get around proxy limitations
            try {
                // Use a replacer function to handle circular references
                const seen = new WeakSet();
                const fullObj = JSON.parse(JSON.stringify(obj, (key, value) => {
                    if (typeof value === 'object' && value !== null) {
                        if (seen.has(value)) {
                            return '[Circular Reference]';
                        }
                        seen.add(value);
                    }
                    return value;
                }));
                
                // If we successfully got the full object, return it
                if (fullObj && Object.keys(fullObj).length > 0) {
                    return fullObj;
                }
            } catch (e) {
                console.log('Full object extraction failed, falling back to property extraction', e);
            }
            
            // Second attempt: Extract specific properties
            const info = {};
            
            // Try to get common properties
            ['id', 'name', 'type', 'title', 'text', 'value', 'question', 'page', 'panel'].forEach(prop => {
                try {
                    if (obj[prop] !== undefined) {
                        // For nested objects, try to stringify them
                        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                            try {
                                info[prop] = JSON.parse(JSON.stringify(obj[prop]));
                            } catch (e) {
                                info[prop] = `[Object: ${obj[prop].constructor ? obj[prop].constructor.name : 'Unknown'}]`;
                            }
                        } else {
                            info[prop] = obj[prop];
                        }
                    }
                } catch (e) {}
            });
            
            // Try to get position-related properties (especially for ghost position objects)
            ['x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height', 'position', 'pageX', 'pageY', 'clientX', 'clientY', 'offsetX', 'offsetY'].forEach(prop => {
                try {
                    if (obj[prop] !== undefined) {
                        info[prop] = obj[prop];
                    }
                } catch (e) {}
            });
            
            // Try to get drag-drop specific properties
            ['draggedElement', 'target', 'source', 'dropTarget', 'dragTarget', 'isBottom', 'isEdge', 'isInside', 'destination', 'fromElement', 'toElement', 'draggedElementType'].forEach(prop => {
                try {
                    if (obj[prop] !== undefined) {
                        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                            try {
                                // For nested objects, try to extract name and type
                                const nestedInfo = {};
                                ['name', 'type', 'id', 'title'].forEach(nestedProp => {
                                    try {
                                        if (obj[prop][nestedProp] !== undefined) {
                                            nestedInfo[nestedProp] = obj[prop][nestedProp];
                                        }
                                    } catch (e) {}
                                });
                                
                                if (Object.keys(nestedInfo).length > 0) {
                                    info[prop] = nestedInfo;
                                } else {
                                    info[prop] = JSON.parse(JSON.stringify(obj[prop]));
                                }
                            } catch (e) {
                                info[prop] = `[Object: ${obj[prop].constructor ? obj[prop].constructor.name : 'Unknown'}]`;
                            }
                        } else {
                            info[prop] = obj[prop];
                        }
                    }
                } catch (e) {}
            });
            
            // Try to get all enumerable properties
            try {
                Object.keys(obj).forEach(key => {
                    if (!info[key]) {
                        try {
                            const value = obj[key];
                            if (typeof value !== 'function' && typeof value !== 'object') {
                                info[key] = value;
                            } else if (typeof value === 'object' && value !== null) {
                                info[key] = `[Object: ${value.constructor ? value.constructor.name : 'Unknown'}]`;
                            }
                        } catch (e) {}
                    }
                });
            } catch (e) {}
            
            // Try to get constructor name
            try {
                if (obj.constructor && obj.constructor.name) {
                    info.objectType = obj.constructor.name;
                }
            } catch (e) {}
            
            return info;
        } catch (error) {
            console.error('Error extracting object info:', error);
            return `[Error extracting info: ${error.message}]`;
        }
    }
    
    extractGhostPositionInfo(obj) {
        if (!obj) return null;
        
        const info = {
            objectType: obj.constructor ? obj.constructor.name : 'Unknown'
        };
        
        // Try to extract all properties directly
        try {
            // First try to get all properties using Object.getOwnPropertyNames
            const props = Object.getOwnPropertyNames(obj);
            props.forEach(prop => {
                try {
                    if (typeof obj[prop] !== 'function') {
                        info[prop] = obj[prop];
                    }
                } catch (e) {}
            });
        } catch (e) {
            console.log('Failed to get properties using Object.getOwnPropertyNames', e);
        }
        
        // Try to extract common position properties
        [
            'x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height',
            'pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY',
            'offsetX', 'offsetY', 'movementX', 'movementY',
            'element', 'target', 'currentTarget', 'relatedTarget',
            'fromElement', 'toElement', 'path', 'pointerType',
            'altKey', 'ctrlKey', 'shiftKey', 'metaKey',
            'button', 'buttons', 'detail', 'deltaX', 'deltaY',
            'draggedElement', 'dropTarget', 'isBottom', 'isEdge'
        ].forEach(prop => {
            try {
                if (obj[prop] !== undefined) {
                    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                        try {
                            // For element objects, try to get id, className, tagName
                            if (prop === 'element' || prop === 'target' || prop === 'currentTarget' || prop === 'relatedTarget') {
                                const elemInfo = {};
                                ['id', 'className', 'tagName', 'nodeName'].forEach(elemProp => {
                                    try {
                                        if (obj[prop][elemProp] !== undefined) {
                                            elemInfo[elemProp] = obj[prop][elemProp];
                                        }
                                    } catch (e) {}
                                });
                                
                                // Try to get position info
                                try {
                                    if (obj[prop].getBoundingClientRect) {
                                        const rect = obj[prop].getBoundingClientRect();
                                        elemInfo.rect = {
                                            top: rect.top,
                                            left: rect.left,
                                            bottom: rect.bottom,
                                            right: rect.right,
                                            width: rect.width,
                                            height: rect.height
                                        };
                                    }
                                } catch (e) {}
                                
                                if (Object.keys(elemInfo).length > 0) {
                                    info[prop] = elemInfo;
                                } else {
                                    info[prop] = `[Element]`;
                                }
                            } else {
                                // For other objects, try to stringify
                                info[prop] = JSON.parse(JSON.stringify(obj[prop]));
                            }
                        } catch (e) {
                            info[prop] = `[Object: ${obj[prop].constructor ? obj[prop].constructor.name : 'Unknown'}]`;
                        }
                    } else {
                        info[prop] = obj[prop];
                    }
                }
            } catch (e) {}
        });
        
        // Try to get ghost position directly from dragDropSurveyElements
        try {
            if (this.creatorInstance && this.creatorInstance.dragDropSurveyElements) {
                const dragDrop = this.creatorInstance.dragDropSurveyElements;
                
                // Try to extract ghost element info
                try {
                    if (dragDrop.ghostElement) {
                        info.ghostElement = {
                            exists: true
                        };
                        
                        // Try to get style properties
                        try {
                            const style = dragDrop.ghostElement.style;
                            if (style) {
                                info.ghostElement.style = {
                                    left: style.left,
                                    top: style.top,
                                    width: style.width,
                                    height: style.height,
                                    position: style.position,
                                    display: style.display,
                                    visibility: style.visibility
                                };
                            }
                        } catch (e) {}
                        
                        // Try to get bounding rect
                        try {
                            const rect = dragDrop.ghostElement.getBoundingClientRect();
                            info.ghostElement.rect = {
                                top: rect.top,
                                left: rect.left,
                                bottom: rect.bottom,
                                right: rect.right,
                                width: rect.width,
                                height: rect.height
                            };
                        } catch (e) {}
                    }
                } catch (e) {}
                
                // Try to extract draggedElement info
                try {
                    if (dragDrop.draggedElement) {
                        info.draggedElementInfo = {};
                        
                        ['name', 'type', 'title', 'id'].forEach(prop => {
                            try {
                                if (dragDrop.draggedElement[prop] !== undefined) {
                                    info.draggedElementInfo[prop] = dragDrop.draggedElement[prop];
                                }
                            } catch (e) {}
                        });
                    }
                } catch (e) {}
                
                // Try to extract dropTarget info
                try {
                    if (dragDrop.dropTarget) {
                        info.dropTargetInfo = {};
                        
                        ['name', 'type', 'title', 'id'].forEach(prop => {
                            try {
                                if (dragDrop.dropTarget[prop] !== undefined) {
                                    info.dropTargetInfo[prop] = dragDrop.dropTarget[prop];
                                }
                            } catch (e) {}
                        });
                    }
                } catch (e) {}
                
                // Try to extract isBottom and isEdge
                try {
                    info.isBottom = dragDrop.isBottom;
                    info.isEdge = dragDrop.isEdge;
                } catch (e) {}
            }
        } catch (e) {
            console.log('Failed to get ghost position from dragDropSurveyElements', e);
        }
        
        // Try to get current mouse position from window
        try {
            // Store the current mouse position in a static variable
            if (!this.constructor._lastMousePosition) {
                this.constructor._lastMousePosition = { x: 0, y: 0 };
                
                // Add a global mouse move listener to track mouse position
                if (typeof window !== 'undefined') {
                    window.addEventListener('mousemove', (e) => {
                        this.constructor._lastMousePosition = {
                            x: e.clientX,
                            y: e.clientY,
                            pageX: e.pageX,
                            pageY: e.pageY,
                            screenX: e.screenX,
                            screenY: e.screenY,
                            timestamp: Date.now()
                        };
                    });
                }
            }
            
            // Include the last known mouse position
            if (this.constructor._lastMousePosition) {
                info.mousePosition = this.constructor._lastMousePosition;
            }
        } catch (e) {
            console.log('Failed to get mouse position from window', e);
        }
        
        return info;
    }
    
    handleClearLogs() {
        this.eventLogs = [];
        
        // Clear logs in pop-out window if it exists
        if (this.popOutWindow && !this.popOutWindow.closed) {
            this.popOutWindow.postMessage({ action: 'clearLogs' }, '*');
        }
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
    
    handleCopyToClipboard(event) {
        const content = event.currentTarget.dataset.content;
        if (!content) return;
        
        try {
            // Create a temporary textarea element to copy from
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';  // Prevent scrolling to bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            // Execute copy command
            const successful = document.execCommand('copy');
            
            // Clean up
            document.body.removeChild(textarea);
            
            // Show success or error toast
            if (successful) {
                this.showToast('Success', 'Content copied to clipboard', 'success');
            } else {
                this.showToast('Error', 'Failed to copy content', 'error');
            }
        } catch (err) {
            console.error('Error copying to clipboard:', err);
            this.showToast('Error', 'Failed to copy content: ' + err.message, 'error');
        }
    }
    
    handlePopOut() {
        try {
            // Create the content for the new window
            const debuggerContent = this.generatePopOutContent();
            
            // Create a blob URL instead of using document.write
            const blob = new Blob([debuggerContent], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            
            // Open a new window with the blob URL
            const popOutWindow = window.open(blobUrl, 'SurveyJSDebugger', 'width=800,height=600,resizable=yes,scrollbars=yes');
            
            if (!popOutWindow) {
                this.showToast('Error', 'Pop-out window was blocked. Please allow pop-ups for this site.', 'error');
                return;
            }
            
            // Focus the new window
            popOutWindow.focus();
            
            // Set up communication between windows
            this.setupPopOutCommunication(popOutWindow);
            
            // Clean up the blob URL when the window is closed
            const checkWindowClosed = setInterval(() => {
                if (popOutWindow.closed) {
                    clearInterval(checkWindowClosed);
                    URL.revokeObjectURL(blobUrl);
                    this.popOutWindow = null;
                }
            }, 1000);
            
        } catch (err) {
            console.error('Error creating pop-out window:', err);
            this.showToast('Error', 'Failed to create pop-out window: ' + err.message, 'error');
        }
    }
    
    generatePopOutContent() {
        // Get SLDS styles URL
        const sldsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/design-system/2.19.0/styles/salesforce-lightning-design-system.min.css';
        
        // Create HTML content for the pop-out window
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SurveyJS Event Debugger</title>
                <link rel="stylesheet" href="${sldsUrl}">
                <style>
                    body {
                        padding: 1rem;
                        font-family: 'Salesforce Sans', Arial, sans-serif;
                        background-color: #f3f3f3;
                    }
                    .event-debugger {
                        border: 1px solid #dddbda;
                        border-radius: 0.25rem;
                        background-color: #ffffff;
                    }
                    .event-logs {
                        max-height: 500px;
                        overflow-y: auto;
                    }
                    .log-entry {
                        border-left: 3px solid #0070d2;
                        margin-bottom: 0.5rem;
                    }
                    .log-entry[data-drag-drop="true"] {
                        border-left-color: #ffb75d;
                    }
                    .json-content-container {
                        position: relative;
                    }
                    .copy-button, .copy-btn {
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        z-index: 10;
                    }
                    .json-content {
                        white-space: pre-wrap;
                        word-break: break-word;
                        font-family: monospace;
                        font-size: 0.75rem;
                        background-color: #f8f8f8;
                        border: 1px solid #e8e8e8;
                        border-radius: 0.25rem;
                        padding: 0.5rem;
                        padding-right: 2rem; /* Make room for the copy button */
                        max-height: 200px;
                        overflow-y: auto;
                        margin: 0;
                    }
                    .copy-btn {
                        cursor: pointer;
                        color: #0070d2;
                    }
                    .copy-btn:hover {
                        color: #005fb2;
                    }
                    .toast {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                        padding: 0.5rem 1rem;
                        border-radius: 0.25rem;
                        color: white;
                        opacity: 0;
                        transition: opacity 0.3s;
                        z-index: 9000;
                    }
                    .toast.success {
                        background-color: #04844b;
                    }
                    .toast.error {
                        background-color: #c23934;
                    }
                    .toast.show {
                        opacity: 1;
                    }
                </style>
            </head>
            <body>
                <div class="slds-scope">
                    <div class="event-debugger slds-card">
                        <div class="slds-card__header slds-grid">
                            <header class="slds-media slds-media_center slds-has-flexi-truncate">
                                <div class="slds-media__figure">
                                    <span class="slds-icon_container slds-icon-utility-bug">
                                        <svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true">
                                            <use xlink:href="${sldsUrl}#utility-bug"></use>
                                        </svg>
                                    </span>
                                </div>
                                <div class="slds-media__body">
                                    <h2 class="slds-card__header-title">SurveyJS Event Debugger (Pop-out)</h2>
                                </div>
                                <div class="slds-no-flex">
                                    <button class="slds-button slds-button_neutral" onclick="clearLogs()">Clear</button>
                                </div>
                            </header>
                        </div>
                        <div class="slds-card__body slds-card__body_inner">
                            <div id="event-logs" class="event-logs">
                                ${this.generateLogsHtml()}
                            </div>
                        </div>
                    </div>
                    <div id="toast" class="toast"></div>
                </div>
                <script>
                    // Function to copy content to clipboard
                    function copyToClipboard(text) {
                        const textarea = document.createElement('textarea');
                        textarea.value = text;
                        textarea.style.position = 'fixed';
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();
                        
                        try {
                            const successful = document.execCommand('copy');
                            document.body.removeChild(textarea);
                            showToast(successful ? 'Success: Copied to clipboard' : 'Error: Copy failed', 
                                      successful ? 'success' : 'error');
                        } catch (err) {
                            document.body.removeChild(textarea);
                            showToast('Error: ' + err.message, 'error');
                        }
                    }
                    
                    // Function to show toast notification
                    function showToast(message, type) {
                        const toast = document.getElementById('toast');
                        toast.textContent = message;
                        toast.className = 'toast ' + type + ' show';
                        
                        setTimeout(() => {
                            toast.className = 'toast ' + type;
                        }, 3000);
                    }
                    
                    // Function to clear logs
                    function clearLogs() {
                        document.getElementById('event-logs').innerHTML = 
                            '<div class="slds-text-color_weak slds-p-around_medium slds-text-align_center">' +
                            'No events logged yet.</div>';
                            
                        // Notify parent window
                        window.opener.postMessage({ action: 'clearLogs' }, '*');
                    }
                    
                    // Listen for messages from parent window
                    window.addEventListener('message', function(event) {
                        if (event.data && event.data.action === 'newLog') {
                            const logsContainer = document.getElementById('event-logs');
                            
                            // Remove "no logs" message if present
                            if (logsContainer.querySelector('.slds-text-color_weak')) {
                                logsContainer.innerHTML = '';
                            }
                            
                            // Add new log entry
                            const logEntry = document.createElement('div');
                            logEntry.className = 'slds-box slds-box_xx-small log-entry';
                            logEntry.setAttribute('data-drag-drop', event.data.isDragDrop);
                            logEntry.innerHTML = event.data.logHtml;
                            
                            // Add to the top
                            if (logsContainer.firstChild) {
                                logsContainer.insertBefore(logEntry, logsContainer.firstChild);
                            } else {
                                logsContainer.appendChild(logEntry);
                            }
                        }
                    });
                    
                    // Notify parent window that we're ready
                    window.opener.postMessage({ action: 'popOutReady' }, '*');
                </script>
            </body>
            </html>
        `;
    }
    
    generateLogsHtml() {
        if (!this.eventLogs || this.eventLogs.length === 0) {
            return '<div class="slds-text-color_weak slds-p-around_medium slds-text-align_center">No events logged yet.</div>';
        }
        
        // Get SLDS styles URL for the SVG icons
        const sldsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/design-system/2.19.0/styles/salesforce-lightning-design-system.min.css';
        
        // Generate HTML for each log entry
        return this.eventLogs.map(log => {
            return `
                <div class="slds-box slds-box_xx-small log-entry" data-drag-drop="${log.isDragDrop}">
                    <div class="slds-grid slds-grid_vertical-align-center">
                        <div class="slds-text-heading_small slds-truncate slds-grow">${log.event}</div>
                        <div class="slds-text-body_small slds-text-color_weak">${log.timestamp}</div>
                    </div>
                    <div class="slds-grid slds-grid_vertical-align-start slds-p-top_xx-small">
                        <div class="slds-col slds-size_1-of-2 slds-p-right_xx-small">
                            <div class="slds-text-title">Sender</div>
                            <div class="json-content-container">
                                <span class="slds-icon_container slds-icon-utility-copy_to_clipboard copy-btn copy-button" 
                                      onclick="copyToClipboard(\`${this.escapeForHtml(log.sender)}\`)">
                                    <svg class="slds-icon slds-icon-text-default slds-icon_xx-small" aria-hidden="true">
                                        <use xlink:href="${sldsUrl}#utility-copy_to_clipboard"></use>
                                    </svg>
                                    <span class="slds-assistive-text">Copy to clipboard</span>
                                </span>
                                <pre class="json-content">${this.escapeForHtml(log.sender)}</pre>
                            </div>
                        </div>
                        <div class="slds-col slds-size_1-of-2 slds-p-left_xx-small">
                            <div class="slds-text-title">Options</div>
                            <div class="json-content-container">
                                <span class="slds-icon_container slds-icon-utility-copy_to_clipboard copy-btn copy-button"
                                      onclick="copyToClipboard(\`${this.escapeForHtml(log.options)}\`)">
                                    <svg class="slds-icon slds-icon-text-default slds-icon_xx-small" aria-hidden="true">
                                        <use xlink:href="${sldsUrl}#utility-copy_to_clipboard"></use>
                                    </svg>
                                    <span class="slds-assistive-text">Copy to clipboard</span>
                                </span>
                                <pre class="json-content">${this.escapeForHtml(log.options)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    setupPopOutCommunication(popOutWindow) {
        // Store reference to pop-out window
        this.popOutWindow = popOutWindow;
        
        // Listen for messages from pop-out window
        window.addEventListener('message', (event) => {
            if (event.source !== this.popOutWindow) return;
            
            if (event.data && event.data.action === 'clearLogs') {
                this.handleClearLogs();
            }
        });
        
        // Handle window close
        const checkWindowClosed = setInterval(() => {
            if (this.popOutWindow && this.popOutWindow.closed) {
                clearInterval(checkWindowClosed);
                this.popOutWindow = null;
            }
        }, 1000);
    }
    
    showToast(title, message, variant) {
        // Dispatch toast event
        const toastEvent = new CustomEvent('toast', {
            detail: {
                title,
                message,
                variant
            }
        });
        this.dispatchEvent(toastEvent);
        
        // If we're in a Lightning component, we can use the standard toast event
        if (this.template.querySelector('lightning-button')) {
            const event = new ShowToastEvent({
                title,
                message,
                variant
            });
            this.dispatchEvent(event);
        }
    }
} 

