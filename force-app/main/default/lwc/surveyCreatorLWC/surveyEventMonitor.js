/**
 * SurveyJS Event Monitor
 * Subscribes to all SurveyJS events and logs them to the console
 */

// Track drag-drop related events for analysis
const dragDropEvents = {
    started: false,
    lastEvent: null,
    eventSequence: []
};

/**
 * Initialize the SurveyJS event monitor
 * @param {Object} creator - The SurveyCreator instance
 */
export function initSurveyEventMonitor(creator) {
    if (!creator) {
        console.error('SurveyJS Event Monitor: Creator instance not provided');
        return;
    }

    console.log('SurveyJS Event Monitor: Initializing');

    // Monitor creator events
    monitorEvents(creator, 'creator');

    // Monitor survey events
    if (creator.survey) {
        monitorEvents(creator.survey, 'creator.survey');
    }

    // Monitor toolbox events
    if (creator.toolbox) {
        monitorEvents(creator.toolbox, 'creator.toolbox');
    }

    // Monitor dragDropSurveyElements if it exists
    if (creator.dragDropSurveyElements) {
        monitorEvents(creator.dragDropSurveyElements, 'creator.dragDropSurveyElements');
        
        // Special handling for drag-drop events to extract more details
        monitorDragDropEvents(creator.dragDropSurveyElements);
    }

    // Monitor global SurveyJS objects
    if (window.Survey) {
        monitorStaticObjects(window.Survey, 'Survey');
    }

    if (window.SurveyCreator) {
        monitorStaticObjects(window.SurveyCreator, 'SurveyCreator');
    }

    // Add a global method to dump the drag-drop event sequence
    window.dumpDragDropEvents = () => {
        console.log('Drag-Drop Event Sequence:', dragDropEvents.eventSequence);
        return dragDropEvents.eventSequence;
    };

    console.log('SurveyJS Event Monitor: Initialized');
    console.log('Use window.dumpDragDropEvents() to see the sequence of drag-drop events');
}

/**
 * Monitor all events on an object
 * @param {Object} obj - The object to monitor
 * @param {string} objName - The name of the object (for logging)
 */
function monitorEvents(obj, objName) {
    if (!obj) return;

    // Look for event properties (typically start with 'on')
    for (const key in obj) {
        try {
            // Check if it's an event object with 'add' method
            if (key.startsWith('on') && 
                typeof obj[key] === 'object' && 
                obj[key] !== null && 
                typeof obj[key].add === 'function') {
                
                // Subscribe to the event
                obj[key].add((sender, options) => {
                    const eventInfo = {
                        event: `${objName}.${key}`,
                        timestamp: new Date().toISOString(),
                        sender: summarizeObject(sender),
                        options: summarizeObject(options)
                    };
                    
                    console.log(`SurveyJS Event: ${eventInfo.event}`, { sender, options });
                    
                    // Track drag-drop related events
                    if (isDragDropEvent(key)) {
                        trackDragDropEvent(eventInfo);
                    }
                });
                
                console.log(`SurveyJS Event Monitor: Subscribed to ${objName}.${key}`);
            }
        } catch (error) {
            console.warn(`SurveyJS Event Monitor: Error accessing ${objName}.${key}`, error);
        }
    }
}

/**
 * Special monitoring for drag-drop events to extract more details
 * @param {Object} dragDropObj - The drag-drop object to monitor
 */
function monitorDragDropEvents(dragDropObj) {
    if (!dragDropObj) return;
    
    // Try to monkey patch key methods to get more details
    const methodsToMonitor = [
        'startDrag',
        'dragOver',
        'doDrop',
        'dragInit',
        'doDragOver'
    ];
    
    methodsToMonitor.forEach(methodName => {
        if (typeof dragDropObj[methodName] === 'function') {
            const originalMethod = dragDropObj[methodName];
            dragDropObj[methodName] = function(...args) {
                console.log(`SurveyJS Method: dragDropSurveyElements.${methodName}`, {
                    args: args.map(arg => summarizeObject(arg))
                });
                
                // Track method calls in the event sequence
                dragDropEvents.eventSequence.push({
                    type: 'method',
                    method: `dragDropSurveyElements.${methodName}`,
                    timestamp: new Date().toISOString(),
                    args: args.map(arg => summarizeObject(arg))
                });
                
                return originalMethod.apply(this, args);
            };
            console.log(`SurveyJS Event Monitor: Monkey patched dragDropSurveyElements.${methodName}`);
        }
    });
}

/**
 * Monitor static objects and their prototypes for events
 * @param {Object} obj - The static object to monitor
 * @param {string} objName - The name of the object (for logging)
 */
function monitorStaticObjects(obj, objName) {
    if (!obj) return;

    // Check for event-related classes
    const eventRelatedClasses = [
        'DragDropSurveyElements',
        'DragDropCore',
        'SurveyCreator',
        'EventBase'
    ];

    for (const className of eventRelatedClasses) {
        if (obj[className]) {
            console.log(`SurveyJS Event Monitor: Found ${objName}.${className}`);
            
            // If it has a prototype with events, try to monitor those
            if (obj[className].prototype) {
                for (const key in obj[className].prototype) {
                    try {
                        if (key.startsWith('on') && 
                            typeof obj[className].prototype[key] === 'object' && 
                            obj[className].prototype[key] !== null) {
                            
                            console.log(`SurveyJS Event Monitor: Found event ${objName}.${className}.prototype.${key}`);
                        }
                    } catch (error) {
                        // Ignore errors when accessing prototype properties
                    }
                }
            }
        }
    }
}

/**
 * Check if an event is related to drag-drop
 * @param {string} eventName - The name of the event
 * @returns {boolean} - Whether the event is related to drag-drop
 */
function isDragDropEvent(eventName) {
    return eventName.toLowerCase().includes('drag') || 
           eventName.toLowerCase().includes('drop') ||
           eventName.toLowerCase().includes('ghost');
}

/**
 * Track a drag-drop related event
 * @param {Object} eventInfo - Information about the event
 */
function trackDragDropEvent(eventInfo) {
    // Start tracking when a drag starts
    if (eventInfo.event.includes('onDragStart')) {
        dragDropEvents.started = true;
        dragDropEvents.eventSequence = [];
    }
    
    // Stop tracking when a drag ends or is cleared
    if (eventInfo.event.includes('onDragEnd') || eventInfo.event.includes('onDragClear')) {
        dragDropEvents.started = false;
    }
    
    // Add the event to the sequence
    dragDropEvents.lastEvent = eventInfo;
    dragDropEvents.eventSequence.push({
        type: 'event',
        ...eventInfo
    });
    
    // If this is a drop event, log the full sequence
    if (eventInfo.event.includes('onDrop') || eventInfo.event.includes('onAfterDrop')) {
        console.log('Drag-Drop Event Sequence:', dragDropEvents.eventSequence);
    }
}

/**
 * Create a simplified summary of an object for logging
 * @param {Object} obj - The object to summarize
 * @returns {Object} - A simplified version of the object
 */
function summarizeObject(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }
    
    if (typeof obj !== 'object') {
        return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(item => summarizeObject(item));
    }
    
    // Create a simplified object with key properties
    const summary = {};
    
    // Extract common properties that might be useful
    const keysToExtract = [
        'id', 'name', 'type', 'title', 'text', 'value',
        'x', 'y', 'width', 'height', 'left', 'top',
        'dragType', 'dropTarget', 'source', 'target',
        'fromElement', 'toElement', 'fromIndex', 'toIndex',
        'isEdge', 'isBottom', 'isTop', 'isRight', 'isLeft'
    ];
    
    keysToExtract.forEach(key => {
        if (obj[key] !== undefined) {
            summary[key] = obj[key];
        }
    });
    
    // Add the constructor name if available
    if (obj.constructor && obj.constructor.name) {
        summary._type = obj.constructor.name;
    }
    
    // Add a count of properties
    summary._propertyCount = Object.keys(obj).length;
    
    return summary;
} 