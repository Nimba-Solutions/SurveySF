import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class SurveyJsEventDebugger extends LightningElement {
  @api creatorInstance;
  @track eventCategories = [];
  @track eventLogs = [];
  @track isExpanded = true;
  @track selectedEvents = [];
  @track isInitialized = false;
  @track maxLogs = 100;
  @track isOpen = false;
  @track showRawLogs = false;

  // Store original event handlers
  originalHandlers = {};

  // Event monitoring state
  monitoredEvents = new Map();

  // Track initialization attempts
  initAttempts = 0;
  maxInitAttempts = 10;

  // Helper method to escape HTML special characters
  escapeForHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`/g, "\\`");
  }

  connectedCallback() {
    // We'll initialize when the creator instance is provided
    this.checkForCreator();

    // Add keyboard shortcut for toggling drawer
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    // Remove keyboard shortcut listener
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    // Toggle drawer with Alt + D
    if (event.altKey && event.key.toLowerCase() === "d") {
      this.toggleDrawer();
    }
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  get drawerClasses() {
    return `event-debugger ${this.isOpen ? "is-open" : ""}`;
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
    if ((this.creatorInstance && !this.isInitialized) || force) {
      // Wait a bit to ensure creator is fully initialized
      setTimeout(() => {
        this.attemptInitialization();
      }, 500);
    }
  }

  attemptInitialization() {
    this.initAttempts++;

    if (this.isInitialized && !this.initAttempts > this.maxInitAttempts) {
      return;
    }

    if (!this.creatorInstance) {
      console.warn("SurveyJS Event Debugger: Creator instance not provided");

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
      console.warn("SurveyJS Event Debugger: Creator survey not available yet");

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
    // Discover available events
    this.discoverEvents(this.creatorInstance, "creator");

    if (this.creatorInstance.survey) {
      this.discoverEvents(this.creatorInstance.survey, "survey");
    }

    if (this.creatorInstance.dragDropSurveyElements) {
      this.discoverEvents(
        this.creatorInstance.dragDropSurveyElements,
        "dragDrop"
      );
    }

    // Group events by category
    this.organizeEventsByCategory();

    // Mark drag-drop events as selected by default
    this.selectDragDropEvents();

    this.isInitialized = true;
  }

  discoverEvents(obj, objName) {
    if (!obj) return;

    for (const key in obj) {
      try {
        // Check if it's an event object with 'add' method
        if (
          key.startsWith("on") &&
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          typeof obj[key].add === "function"
        ) {
          const eventPath = `${objName}.${key}`;
          const isDragDrop = this.isDragDropEvent(key);

          this.monitoredEvents.set(eventPath, {
            path: eventPath,
            name: key,
            category: objName,
            isDragDrop,
            isSelected: false,
            object: obj,
            eventKey: key,
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
    this.monitoredEvents.forEach((event) => {
      if (!categories[event.category]) {
        categories[event.category] = {
          name: event.category,
          events: [],
          isExpanded: true, // Always expanded by default
        };
      }

      categories[event.category].events.push(event);
    });

    // Convert to array and sort events within each category
    this.eventCategories = Object.values(categories).map((category) => {
      category.events.sort((a, b) => a.name.localeCompare(b.name));
      return category;
    });

    // Sort categories (put dragDrop first)
    this.eventCategories.sort((a, b) => {
      if (a.name === "dragDrop") return -1;
      if (b.name === "dragDrop") return 1;
      return a.name.localeCompare(b.name);
    });
  }

  selectDragDropEvents() {
    // Select all drag-drop events by default
    this.monitoredEvents.forEach((event) => {
      if (event.isDragDrop) {
        event.isSelected = true;
        this.selectedEvents.push(event.path);
        this.monitorEvent(event);
      }
    });
  }

  isDragDropEvent(eventName) {
    return (
      eventName.toLowerCase().includes("drag") ||
      eventName.toLowerCase().includes("drop") ||
      eventName.toLowerCase().includes("ghost")
    );
  }

  handleToggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  handleToggleCategory(event) {
    const categoryName = event.currentTarget.dataset.category;
    const category = this.eventCategories.find(
      (cat) => cat.name === categoryName
    );
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
        this.selectedEvents = this.selectedEvents.filter(
          (e) => e !== eventPath
        );
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

    object[eventKey].add = function (handler) {
      // Call the original add method
      const result = originalAdd.call(this, function (sender, options) {
        // Log the event
        self.logEvent(path, sender, options);

        // Call the original handler
        return handler(sender, options);
      });

      return result;
    };

    // Add our own handler to capture events even if no one else subscribes
    object[eventKey].add(function () {});
  }

  unmonitorEvent(eventInfo) {
    const { object, eventKey, path } = eventInfo;

    if (!object || !object[eventKey]) return;

    // Restore original handler if we have it
    if (this.originalHandlers[path]) {
      object[eventKey].add = this.originalHandlers[path];
      delete this.originalHandlers[path];
    }
  }

  logEvent(eventPath, sender, options) {
    // Only log if the event is selected
    if (!this.selectedEvents.includes(eventPath)) return;

    const eventInfo = this.monitoredEvents.get(eventPath);
    if (!eventInfo) return;

    try {
      let senderInfo, optionsInfo;

      if (eventPath === "dragDrop.onGhostPositionChanged") {
        senderInfo = this.extractGhostPositionInfo(sender);
        optionsInfo = this.extractGhostPositionInfo(options);
      } else {
        senderInfo = this.extractObjectInfo(sender);
        optionsInfo = this.extractObjectInfo(options);
      }

      const formattedSender = JSON.stringify(senderInfo, null, 2);
      const formattedOptions = JSON.stringify(optionsInfo, null, 2);

      const logEntry = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        event: eventPath,
        category: eventInfo.category,
        sender: formattedSender,
        options: formattedOptions,
        isDragDrop: eventInfo.isDragDrop,
        rawSender: senderInfo,
        rawOptions: optionsInfo,
      };

      this.eventLogs = [logEntry, ...this.eventLogs].slice(0, this.maxLogs);
    } catch (error) {
      console.error("Error logging event:", error);

      const logEntry = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        event: eventPath,
        category: eventInfo.category,
        sender: JSON.stringify({ error: "Error extracting sender info" }),
        options: JSON.stringify({ error: "Error extracting options info" }),
        isDragDrop: eventInfo.isDragDrop,
        error: error.message,
      };

      this.eventLogs = [logEntry, ...this.eventLogs].slice(0, this.maxLogs);
    }
  }

  extractObjectInfo(obj) {
    if (!obj) return null;
    if (typeof obj !== "object") return obj;

    try {
      // First attempt: Try to stringify the entire object to get around proxy limitations
      try {
        // Use a replacer function to handle circular references
        const seen = new WeakSet();
        const fullObj = JSON.parse(
          JSON.stringify(obj, (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (seen.has(value)) {
                return "[Circular Reference]";
              }
              seen.add(value);
            }
            return value;
          })
        );

        // If we successfully got the full object, return it
        if (fullObj && Object.keys(fullObj).length > 0) {
          return fullObj;
        }
      } catch (e) {
        console.log(
          "Full object extraction failed, falling back to property extraction",
          e
        );
      }

      // Second attempt: Extract specific properties
      const info = {};

      // Try to get common properties
      [
        "id",
        "name",
        "type",
        "title",
        "text",
        "value",
        "question",
        "page",
        "panel",
      ].forEach((prop) => {
        try {
          if (obj[prop] !== undefined) {
            // For nested objects, try to stringify them
            if (typeof obj[prop] === "object" && obj[prop] !== null) {
              try {
                info[prop] = JSON.parse(JSON.stringify(obj[prop]));
              } catch (e) {
                info[prop] = `[Object: ${
                  obj[prop].constructor ? obj[prop].constructor.name : "Unknown"
                }]`;
              }
            } else {
              info[prop] = obj[prop];
            }
          }
        } catch (e) {}
      });

      // Try to get position-related properties (especially for ghost position objects)
      [
        "x",
        "y",
        "left",
        "top",
        "right",
        "bottom",
        "width",
        "height",
        "position",
        "pageX",
        "pageY",
        "clientX",
        "clientY",
        "offsetX",
        "offsetY",
      ].forEach((prop) => {
        try {
          if (obj[prop] !== undefined) {
            info[prop] = obj[prop];
          }
        } catch (e) {}
      });

      // Try to get drag-drop specific properties
      [
        "draggedElement",
        "target",
        "source",
        "dropTarget",
        "dragTarget",
        "isBottom",
        "isEdge",
        "isInside",
        "destination",
        "fromElement",
        "toElement",
        "draggedElementType",
      ].forEach((prop) => {
        try {
          if (obj[prop] !== undefined) {
            if (typeof obj[prop] === "object" && obj[prop] !== null) {
              try {
                // For nested objects, try to extract name and type
                const nestedInfo = {};
                ["name", "type", "id", "title"].forEach((nestedProp) => {
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
                info[prop] = `[Object: ${
                  obj[prop].constructor ? obj[prop].constructor.name : "Unknown"
                }]`;
              }
            } else {
              info[prop] = obj[prop];
            }
          }
        } catch (e) {}
      });

      // Try to get all enumerable properties
      try {
        Object.keys(obj).forEach((key) => {
          if (!info[key]) {
            try {
              const value = obj[key];
              if (typeof value !== "function" && typeof value !== "object") {
                info[key] = value;
              } else if (typeof value === "object" && value !== null) {
                info[key] = `[Object: ${
                  value.constructor ? value.constructor.name : "Unknown"
                }]`;
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
      console.error("Error extracting object info:", error);
      return `[Error extracting info: ${error.message}]`;
    }
  }

  extractGhostPositionInfo(obj) {
    if (!obj) return null;

    const info = {
      objectType: obj.constructor ? obj.constructor.name : "Unknown",
    };

    // Try to extract all properties directly
    try {
      // First try to get all properties using Object.getOwnPropertyNames
      const props = Object.getOwnPropertyNames(obj);
      props.forEach((prop) => {
        try {
          if (typeof obj[prop] !== "function") {
            info[prop] = obj[prop];
          }
        } catch (e) {}
      });
    } catch (e) {
      console.log(
        "Failed to get properties using Object.getOwnPropertyNames",
        e
      );
    }

    // Try to extract common position properties
    [
      "x",
      "y",
      "left",
      "top",
      "right",
      "bottom",
      "width",
      "height",
      "pageX",
      "pageY",
      "clientX",
      "clientY",
      "screenX",
      "screenY",
      "offsetX",
      "offsetY",
      "movementX",
      "movementY",
      "element",
      "target",
      "currentTarget",
      "relatedTarget",
      "fromElement",
      "toElement",
      "path",
      "pointerType",
      "altKey",
      "ctrlKey",
      "shiftKey",
      "metaKey",
      "button",
      "buttons",
      "detail",
      "deltaX",
      "deltaY",
      "draggedElement",
      "dropTarget",
      "isBottom",
      "isEdge",
    ].forEach((prop) => {
      try {
        if (obj[prop] !== undefined) {
          if (typeof obj[prop] === "object" && obj[prop] !== null) {
            try {
              // For element objects, try to get id, className, tagName
              if (
                prop === "element" ||
                prop === "target" ||
                prop === "currentTarget" ||
                prop === "relatedTarget"
              ) {
                const elemInfo = {};
                ["id", "className", "tagName", "nodeName"].forEach(
                  (elemProp) => {
                    try {
                      if (obj[prop][elemProp] !== undefined) {
                        elemInfo[elemProp] = obj[prop][elemProp];
                      }
                    } catch (e) {}
                  }
                );

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
                      height: rect.height,
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
              info[prop] = `[Object: ${
                obj[prop].constructor ? obj[prop].constructor.name : "Unknown"
              }]`;
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
              exists: true,
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
                  visibility: style.visibility,
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
                height: rect.height,
              };
            } catch (e) {}
          }
        } catch (e) {}

        // Try to extract draggedElement info
        try {
          if (dragDrop.draggedElement) {
            info.draggedElementInfo = {};

            ["name", "type", "title", "id"].forEach((prop) => {
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

            ["name", "type", "title", "id"].forEach((prop) => {
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
      console.log(
        "Failed to get ghost position from dragDropSurveyElements",
        e
      );
    }

    // Try to get current mouse position from window
    try {
      // Store the current mouse position in a static variable
      if (!this.constructor._lastMousePosition) {
        this.constructor._lastMousePosition = { x: 0, y: 0 };

        // Add a global mouse move listener to track mouse position
        if (typeof window !== "undefined") {
          window.addEventListener("mousemove", (e) => {
            this.constructor._lastMousePosition = {
              x: e.clientX,
              y: e.clientY,
              pageX: e.pageX,
              pageY: e.pageY,
              screenX: e.screenX,
              screenY: e.screenY,
              timestamp: Date.now(),
            };
          });
        }
      }

      // Include the last known mouse position
      if (this.constructor._lastMousePosition) {
        info.mousePosition = this.constructor._lastMousePosition;
      }
    } catch (e) {
      console.log("Failed to get mouse position from window", e);
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
    return this.isExpanded ? "utility:chevrondown" : "utility:chevronright";
  }

  get expandLabel() {
    return this.isExpanded ? "Collapse" : "Expand";
  }

  handleCopyToClipboard(event) {
    const content = event.currentTarget.dataset.content;
    if (!content) return;

    try {
      // Create a temporary textarea element to copy from
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      // Execute copy command
      const successful = document.execCommand("copy");

      // Clean up
      document.body.removeChild(textarea);

      // Show success or error toast
      if (successful) {
        this.showToast("Success", "Content copied to clipboard", "success");
      } else {
        this.showToast("Error", "Failed to copy content", "error");
      }
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      this.showToast(
        "Error",
        "Failed to copy content: " + err.message,
        "error"
      );
    }
  }

  showToast(title, message, variant) {
    if (this.template.querySelector("lightning-button")) {
      const event = new ShowToastEvent({
        title,
        message,
        variant,
      });
      this.dispatchEvent(event);
    }
  }

  handleRawLogsToggle(event) {
    this.showRawLogs = event.target.checked;
  }

  get rawEventLogs() {
    return JSON.stringify(
      this.eventLogs.map((log) => ({
        event: log.event,
        timestamp: log.timestamp,
        sender: JSON.parse(log.sender),
        options: JSON.parse(log.options),
      })),
      null,
      2
    );
  }
}
