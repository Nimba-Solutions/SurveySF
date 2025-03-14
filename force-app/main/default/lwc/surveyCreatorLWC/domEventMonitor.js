/**
 * DOM Event Monitor
 * Monitors DOM events related to drag-and-drop operations
 */

// Track DOM drag-drop events for analysis
const domDragEvents = {
    active: false,
    startElement: null,
    currentElement: null,
    eventSequence: []
};

/**
 * Initialize the DOM event monitor
 * @param {HTMLElement} container - The container element to monitor (optional)
 */
export function initDomEventMonitor(container) {
    console.log('DOM Event Monitor: Initializing');
    
    // Use the provided container or document.body as fallback
    const targetElement = container || document.body;
    
    // List of events to monitor
    const eventsToMonitor = [
        'dragstart',
        'dragend',
        'dragenter',
        'dragleave',
        'dragover',
        'drop',
        'mousedown',
        'mouseup',
        'touchstart',
        'touchend',
        'touchmove'
    ];
    
    // Add event listeners
    eventsToMonitor.forEach(eventName => {
        targetElement.addEventListener(eventName, event => {
            // Only log drag-related events or if it's a mousedown/touchstart on a draggable element
            const isDraggable = event.target.getAttribute('draggable') === 'true' || 
                               event.target.closest('[draggable="true"]');
            
            if (eventName.startsWith('drag') || eventName === 'drop' || 
                ((eventName === 'mousedown' || eventName === 'touchstart') && isDraggable)) {
                
                // Create event info object
                const eventInfo = {
                    type: eventName,
                    timestamp: new Date().toISOString(),
                    target: describeElement(event.target),
                    clientX: event.clientX,
                    clientY: event.clientY,
                    draggable: isDraggable
                };
                
                // Add dataTransfer info for drag events
                if (event.dataTransfer) {
                    eventInfo.dataTransfer = {
                        effectAllowed: event.dataTransfer.effectAllowed,
                        dropEffect: event.dataTransfer.dropEffect,
                        types: Array.from(event.dataTransfer.types || [])
                    };
                    
                    // Try to get data from dataTransfer
                    if (eventInfo.dataTransfer.types.length > 0) {
                        eventInfo.dataTransfer.data = {};
                        eventInfo.dataTransfer.types.forEach(type => {
                            try {
                                eventInfo.dataTransfer.data[type] = event.dataTransfer.getData(type);
                            } catch (error) {
                                // Ignore errors - some browsers restrict access to dataTransfer during certain events
                            }
                        });
                    }
                }
                
                console.log(`DOM Event: ${eventName}`, eventInfo);
                
                // Track drag-drop sequence
                trackDomDragEvent(eventName, eventInfo, event.target);
            }
        }, true); // Use capture phase to get events before they're handled
        
        console.log(`DOM Event Monitor: Listening for ${eventName} events`);
    });
    
    // Also monitor for any elements with draggable attribute changes
    try {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'draggable') {
                    const eventInfo = {
                        type: 'attributeChange',
                        timestamp: new Date().toISOString(),
                        element: describeElement(mutation.target),
                        draggable: mutation.target.getAttribute('draggable')
                    };
                    
                    console.log('DOM Event: draggable attribute changed', eventInfo);
                    
                    // Add to event sequence
                    domDragEvents.eventSequence.push(eventInfo);
                }
            });
        });
        
        observer.observe(targetElement, { 
            attributes: true, 
            attributeFilter: ['draggable'], 
            subtree: true 
        });
        
        console.log('DOM Event Monitor: Observing draggable attribute changes');
    } catch (error) {
        console.warn('DOM Event Monitor: Error setting up MutationObserver', error);
    }
    
    // Add a global method to dump the DOM drag event sequence
    window.dumpDomDragEvents = () => {
        console.log('DOM Drag Event Sequence:', domDragEvents.eventSequence);
        return domDragEvents.eventSequence;
    };
    
    console.log('DOM Event Monitor: Initialized');
    console.log('Use window.dumpDomDragEvents() to see the sequence of DOM drag events');
}

/**
 * Track a DOM drag event
 * @param {string} eventName - The name of the event
 * @param {Object} eventInfo - Information about the event
 * @param {HTMLElement} target - The target element
 */
function trackDomDragEvent(eventName, eventInfo, target) {
    // Start tracking on dragstart
    if (eventName === 'dragstart') {
        domDragEvents.active = true;
        domDragEvents.startElement = target;
        domDragEvents.eventSequence = [];
    }
    
    // Update current element
    domDragEvents.currentElement = target;
    
    // Add to event sequence
    domDragEvents.eventSequence.push(eventInfo);
    
    // End tracking on dragend or drop
    if (eventName === 'dragend' || eventName === 'drop') {
        domDragEvents.active = false;
        
        // Log the full sequence
        console.log('DOM Drag Event Sequence Complete:', domDragEvents.eventSequence);
    }
}

/**
 * Create a description of an HTML element
 * @param {HTMLElement} element - The element to describe
 * @returns {Object} - A description of the element
 */
function describeElement(element) {
    if (!element || !element.tagName) {
        return { type: 'unknown' };
    }
    
    const description = {
        tagName: element.tagName.toLowerCase(),
        id: element.id || undefined,
        classes: element.className ? element.className.split(/\s+/).filter(Boolean) : [],
        attributes: {}
    };
    
    // Add important attributes
    const importantAttrs = ['draggable', 'data-type', 'data-name', 'data-sv-drop-target', 'data-sv-drop-target-item'];
    importantAttrs.forEach(attr => {
        if (element.hasAttribute(attr)) {
            description.attributes[attr] = element.getAttribute(attr);
        }
    });
    
    // Add position info if available
    const rect = element.getBoundingClientRect();
    if (rect) {
        description.position = {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        };
    }
    
    // Add parent info
    if (element.parentElement) {
        description.parent = {
            tagName: element.parentElement.tagName.toLowerCase(),
            id: element.parentElement.id || undefined,
            classes: element.parentElement.className ? element.parentElement.className.split(/\s+/).filter(Boolean) : []
        };
    }
    
    // Add data attributes
    Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) {
            description.attributes[attr.name] = attr.value;
        }
    });
    
    return description;
} 