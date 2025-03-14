import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import SURVEY_CORE_CSS from '@salesforce/resourceUrl/surveycoremin'; //CSS (renamed from DEFAULTV2)
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //JS
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //JS

export default class SurveyCreatorLWC extends LightningElement {
    surveyInitialized = false;
    loaded = false;
    creatorInstance = null;

    renderedCallback() {
        if (this.surveyInitialized) {
            return;
        }
        this.surveyInitialized = true;
        loadStyle(this, SURVEY_CORE_CSS)
            .then(() => {
                console.log('SurveyJS CSS loaded.');
                loadScript(this, SURVEY_CORE)
                .then(() => {
                    loadScript(this, SURVEY_JS_UI)
                    .then(() => {
                        loadStyle(this, SURVEY_CREATOR_CORE_CSS)
                        .then(() => {
                            loadScript(this, SURVEY_CREATOR_CORE_JS)
                            .then(() => {
                                loadScript(this, SURVEY_CREATOR_JS)
                                .then(() => {
                                    this.patchSurveyJSForLightningLocker();
                                    this.initializeSurvey();
                                })
                                .catch(error => {
                                    console.error('Error loading SURVEY_CREATOR_JS resources:', error);
                                });
                            })
                            .catch(error => {
                                console.error('Error loading SURVEY_CREATOR_CORE_JS resources:', error);
                            });
                        })
                        .catch(error => {
                            console.error('Error loading SURVEY_CREATOR_CORE_CSS resources:', error);
                        });
                        console.log('SurveyJS JS UI loaded.');
                    })
                    .catch(error => {
                        console.error('Error loading SURVEY JS UI resources:', error);
                    });
                })
                .catch(error => {
                    console.error('Error loading SURVEY CORE resources:', error);
                })
                .finally(result => {
                    console.log('loadScript result:', result);
                });
            })
            .catch(error => {
                console.error('Error loading resources:', error);
            });
    }

    patchSurveyJSForLightningLocker() {
        if (!window.SurveyCreator) {
            console.error('SurveyCreator not available for patching');
            return;
        }

        console.log('Patching SurveyJS for Lightning Locker Service compatibility');

        try {
            // Store original SurveyJS components and services for reference
            this.originalSurveyComponents = {
                DragDropSurveyElements: window.SurveyCreator.DragDropSurveyElements,
                QuestionToolbox: window.SurveyCreator.QuestionToolbox,
                // Store other important components as needed
            };

            // Patch the DragDropSurveyElements class
            this.patchDragDropSurveyElements();
            
            // Patch the Toolbox class
            this.patchToolbox();
            
            // Patch SurveyJS event system
            this.patchSurveyJSEventSystem();
            
            // Patch SurveyJS DOM operations
            this.patchSurveyJSDOMOperations();
            
            console.log('Successfully patched SurveyJS for Lightning Locker Service compatibility');
        } catch (error) {
            console.error('Error patching SurveyJS:', error);
        }
    }
    
    patchToolbox() {
        if (!window.SurveyCreator || !SurveyCreator.QuestionToolbox) {
            console.error('SurveyCreator.QuestionToolbox not available for patching');
            return;
        }
        
        console.log('Patching SurveyJS Toolbox for Lightning Locker compatibility');
        
        try {
            // Store original Toolbox class
            const originalToolboxClass = SurveyCreator.QuestionToolbox;
            
            // Create a patched version of the class
            class PatchedToolbox extends originalToolboxClass {
                constructor(supportedQuestions, creator) {
                    super(supportedQuestions, creator);
                    console.log('Using patched Toolbox for Lightning Locker compatibility');
                    
                    // Override the original methods that might be affected by Lightning Locker
                    this.originalDoClick = this.doClick;
                    this.doClick = this.patchedDoClick.bind(this);
                    
                    this.originalDoDragStart = this.doDragStart;
                    this.doDragStart = this.patchedDoDragStart.bind(this);
                }
                
                // Patched method for click handling
                patchedDoClick(event, item) {
                    try {
                        return this.originalDoClick(event, item);
                    } catch (e) {
                        console.log('Error in Toolbox.doClick, using patched version', e);
                        
                        // Create a new element based on the toolbox item
                        if (this.creator && item) {
                            const json = item.json;
                            if (json) {
                                // Create the element
                                const element = this.creator.createNewElement(json);
                                
                                // Add it to the survey
                                if (element && this.creator.survey) {
                                    // Get the current page
                                    const page = this.creator.survey.currentPage || this.creator.survey.pages[0];
                                    if (page) {
                                        // Add the element to the page
                                        page.addElement(element);
                                        
                                        // Select the new element
                                        if (this.creator.selectElement) {
                                            this.creator.selectElement(element);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                // Patched method for drag start handling
                patchedDoDragStart(event, item) {
                    try {
                        return this.originalDoDragStart(event, item);
                    } catch (e) {
                        console.log('Error in Toolbox.doDragStart, using patched version', e);
                        
                        // Create a new element based on the toolbox item
                        if (this.creator && item && this.creator.dragDropSurveyElements) {
                            const json = item.json;
                            if (json) {
                                // Create the element
                                const element = this.creator.createNewElement(json);
                                
                                // Start dragging the element
                                if (element) {
                                    this.creator.dragDropSurveyElements.startDragToolboxItem(event, element);
                                }
                            }
                        }
                    }
                }
            }
            
            // Replace the original class with our patched version
            SurveyCreator.QuestionToolbox = PatchedToolbox;
            
            console.log('Successfully patched SurveyJS Toolbox');
        } catch (error) {
            console.error('Error patching SurveyJS Toolbox:', error);
        }
    }
    
    patchDragDropSurveyElements() {
        if (!window.SurveyCreator || !SurveyCreator.DragDropSurveyElements) {
            console.error('DragDropSurveyElements not found for patching');
            return;
        }
        
        console.log('Patching SurveyJS DragDropSurveyElements for Lightning Locker compatibility');
        
        // Store original DragDropSurveyElements class
        const originalDragDropClass = SurveyCreator.DragDropSurveyElements;
        
        // Create a patched version of the class
        class PatchedDragDropSurveyElements extends originalDragDropClass {
            constructor(survey, onModifiedCallback, onDragStart = null, onDragEnd = null) {
                super(survey, onModifiedCallback, onDragStart, onDragEnd);
                console.log('Using patched DragDropSurveyElements for Lightning Locker compatibility');
                
                // Store the survey
                this.survey = survey;
                
                // Store all original methods that might be affected by Lightning Locker
                // Core drag-drop methods
                if (this.moveElement) {
                    this.originalMoveElement = this.moveElement;
                    this.moveElement = this.patchedMoveElement.bind(this);
                }
                
                this.originalCreateDraggedElementShortcut = this.createDraggedElementShortcut;
                this.createDraggedElementShortcut = this.patchedCreateDraggedElementShortcut.bind(this);
                
                this.originalDoDragOver = this.doDragOver;
                this.doDragOver = this.patchedDoDragOver.bind(this);
                
                this.originalCreateGhostElement = this.createGhostElement;
                this.createGhostElement = this.patchedCreateGhostElement.bind(this);
                
                this.originalUpdateGhostPosition = this.updateGhostPosition;
                this.updateGhostPosition = this.patchedUpdateGhostPosition.bind(this);
                
                this.originalDoDrop = this.doDrop;
                this.doDrop = this.patchedDoDrop.bind(this);
                
                this.originalDoDragEnd = this.doDragEnd;
                this.doDragEnd = this.patchedDoDragEnd.bind(this);
                
                // Event handlers
                if (this.onGhostPositionChanged) {
                    this.originalOnGhostPositionChanged = this.onGhostPositionChanged;
                }
                
                if (this.onBeforeDrop) {
                    this.originalOnBeforeDrop = this.onBeforeDrop;
                }
                
                if (this.onAfterDrop) {
                    this.originalOnAfterDrop = this.onAfterDrop;
                }
                
                if (this.onDragStart) {
                    this.originalOnDragStart = this.onDragStart;
                }
                
                if (this.onDragEnd) {
                    this.originalOnDragEnd = this.onDragEnd;
                }
                
                if (this.onDragClear) {
                    this.originalOnDragClear = this.onDragClear;
                }
                
                // Add additional event listeners to handle cases where standard events fail
                this.setupAdditionalEventListeners();
                
                // Initialize custom properties
                this._customDataTransfer = null;
                this.isDragging = false;
                this.ghostElement = null;
                this.draggedElement = null;
                this.dropTarget = null;
                this.isBottom = false;
                this.isEdge = false;
            }
            
            // Setup additional event listeners to handle cases where standard events fail
            setupAdditionalEventListeners() {
                try {
                    // Add a global mouseup listener to catch cases where dragend doesn't fire
                    document.addEventListener('mouseup', (event) => {
                        if (this.isDragging && this.draggedElement) {
                            console.log('Mouseup detected while dragging, simulating drop');
                            this.patchedDoDrop(event);
                            this.patchedDoDragEnd(event);
                        }
                    });
                    
                    // Add a global mousemove listener to update ghost position
                    document.addEventListener('mousemove', (event) => {
                        if (this.isDragging && this.ghostElement) {
                            this.patchedUpdateGhostPosition(event);
                        }
                    });
                } catch (e) {
                    console.error('Error setting up additional event listeners', e);
                }
            }
            
            // Method to start dragging a toolbox item
            startDragToolboxItem(event, element) {
                if (!element) return;
                
                // Store the dragged element
                this.draggedElement = element;
                this.isDragging = true;
                
                // Create ghost element
                this.ghostElement = this.patchedCreateGhostElement();
                
                // Update ghost position
                this.patchedUpdateGhostPosition(event);
                
                // Fire dragStart event
                if (this.onDragStart) {
                    this.onDragStart.fire(this, { draggedElement: element });
                }
            }
            
            // Patched method to create dragged element shortcut
            patchedCreateDraggedElementShortcut(event, draggedElement) {
                try {
                    return this.originalCreateDraggedElementShortcut(event, draggedElement);
                } catch (e) {
                    console.log('Error in createDraggedElementShortcut, using patched version', e);
                    
                    // Create a simplified version that works with Lightning Locker
                    if (!draggedElement) return null;
                    
                    // Store the dragged element for later use
                    this.draggedElement = draggedElement;
                    this.isDragging = true;
                    
                    // Create a custom dataTransfer object if needed
                    if (!event.dataTransfer) {
                        event.dataTransfer = {
                            setData: (type, data) => {
                                this._customDataTransfer = { type, data };
                            },
                            getData: (type) => {
                                return this._customDataTransfer && this._customDataTransfer.type === type 
                                    ? this._customDataTransfer.data 
                                    : '';
                            },
                            effectAllowed: 'move'
                        };
                    }
                    
                    // Set data transfer
                    try {
                        event.dataTransfer.setData('text', draggedElement.name);
                        event.dataTransfer.effectAllowed = 'move';
                    } catch (e) {
                        console.log('Error setting dataTransfer', e);
                    }
                    
                    return draggedElement;
                }
            }
            
            // Patched method for drag over handling
            patchedDoDragOver(event) {
                try {
                    return this.originalDoDragOver(event);
                } catch (e) {
                    console.log('Error in doDragOver, using patched version', e);
                    
                    // Prevent default to allow drop
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // Update ghost position
                    this.updateGhostPosition(event);
                    
                    // Find drop target
                    const dropTarget = this.findDropTargetByEvent(event);
                    if (dropTarget) {
                        this.dropTarget = dropTarget.dropTarget;
                        this.isBottom = dropTarget.isBottom;
                        this.isEdge = dropTarget.isEdge || false;
                    }
                    
                    return true;
                }
            }
            
            // Patched method to create ghost element
            patchedCreateGhostElement() {
                try {
                    return this.originalCreateGhostElement();
                } catch (e) {
                    console.log('Error in createGhostElement, using patched version', e);
                    
                    // Create a simplified ghost element
                    const ghostElement = document.createElement('div');
                    ghostElement.style.position = 'absolute';
                    ghostElement.style.zIndex = '1000';
                    ghostElement.style.background = 'rgba(0, 0, 0, 0.2)';
                    ghostElement.style.border = '1px dashed #aaa';
                    ghostElement.style.padding = '4px';
                    ghostElement.style.borderRadius = '4px';
                    ghostElement.style.pointerEvents = 'none';
                    ghostElement.style.width = '200px';
                    ghostElement.style.height = '30px';
                    
                    // Add text if we have a dragged element
                    if (this.draggedElement) {
                        ghostElement.textContent = this.draggedElement.name || 'Dragging...';
                    }
                    
                    // Append to document body
                    document.body.appendChild(ghostElement);
                    
                    this.ghostElement = ghostElement;
                    return ghostElement;
                }
            }
            
            // Patched method to update ghost position
            patchedUpdateGhostPosition(event) {
                try {
                    return this.originalUpdateGhostPosition(event);
                } catch (e) {
                    console.log('Error in updateGhostPosition, using patched version', e);
                    
                    if (!this.ghostElement) return;
                    
                    // Get mouse position
                    const x = event.clientX;
                    const y = event.clientY;
                    
                    // Update ghost element position
                    this.ghostElement.style.left = (x + 10) + 'px';
                    this.ghostElement.style.top = (y + 10) + 'px';
                    
                    // Trigger the onGhostPositionChanged event
                    if (this.onGhostPositionChanged) {
                        this.onGhostPositionChanged.fire(this, {
                            x: x,
                            y: y,
                            clientX: event.clientX,
                            clientY: event.clientY,
                            pageX: event.pageX,
                            pageY: event.pageY,
                            ghostElement: this.ghostElement,
                            draggedElement: this.draggedElement
                        });
                    }
                }
            }
            
            // Patched method for drop handling
            patchedDoDrop(event) {
                try {
                    return this.originalDoDrop(event);
                } catch (e) {
                    console.log('Error in doDrop, using patched version', e);
                    
                    // Prevent default
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    
                    // If we don't have a draggedElement, we can't do anything
                    if (!this.draggedElement) {
                        console.log('No dragged element, clearing drag state');
                        this.clear();
                        return false;
                    }
                    
                    // If we don't have a dropTarget, try to find one
                    if (!this.dropTarget) {
                        console.log('No drop target, trying to find one');
                        const dropTargetInfo = this.findDropTargetByEvent(event);
                        if (dropTargetInfo) {
                            this.dropTarget = dropTargetInfo.dropTarget;
                            this.isBottom = dropTargetInfo.isBottom;
                            this.isEdge = dropTargetInfo.isEdge || false;
                        }
                    }
                    
                    // If we still don't have a dropTarget, try to use the current page
                    if (!this.dropTarget && this.survey) {
                        console.log('Still no drop target, using current page');
                        this.dropTarget = this.survey.currentPage || (this.survey.pages && this.survey.pages.length > 0 ? this.survey.pages[0] : null);
                        this.isBottom = true;
                    }
                    
                    // If we still don't have a dropTarget, we can't do anything
                    if (!this.dropTarget) {
                        console.log('Could not find a drop target, clearing drag state');
                        this.clear();
                        return false;
                    }
                    
                    // Perform the drop operation
                    try {
                        console.log('Performing drop operation', {
                            draggedElement: this.draggedElement.name || 'Unknown',
                            dropTarget: this.dropTarget.name || 'Unknown',
                            isBottom: this.isBottom
                        });
                        
                        // Fire beforeDrop event
                        if (this.onBeforeDrop) {
                            const beforeDropOptions = {
                                draggedElement: this.draggedElement,
                                dropTarget: this.dropTarget,
                                isBottom: this.isBottom,
                                isEdge: this.isEdge
                            };
                            
                            const canDrop = this.onBeforeDrop.fire(this, beforeDropOptions);
                            if (canDrop === false) {
                                console.log('Drop prevented by beforeDrop event');
                                this.clear();
                                return false;
                            }
                        }
                        
                        // Move the element
                        this.moveElement(this.draggedElement, this.dropTarget, this.isBottom, this.isEdge);
                        
                        // Fire afterDrop event
                        if (this.onAfterDrop) {
                            const afterDropOptions = {
                                draggedElement: this.draggedElement,
                                dropTarget: this.dropTarget,
                                isBottom: this.isBottom,
                                isEdge: this.isEdge
                            };
                            
                            this.onAfterDrop.fire(this, afterDropOptions);
                        }
                        
                        console.log('Drop operation completed successfully');
                        
                        // Clear the drag state
                        this.clear();
                        return true;
                    } catch (e) {
                        console.error('Error performing drop operation:', e);
                        this.clear();
                        return false;
                    }
                }
            }
            
            // Patched method for drag end handling
            patchedDoDragEnd(event) {
                try {
                    return this.originalDoDragEnd(event);
                } catch (e) {
                    console.log('Error in doDragEnd, using patched version', e);
                    
                    // Fire dragEnd event
                    if (this.onDragEnd) {
                        this.onDragEnd.fire(this, { draggedElement: this.draggedElement });
                    }
                    
                    // Clear the drag state
                    this.clear();
                }
            }
            
            // Helper method to clear the drag state
            clear() {
                // Remove ghost element
                if (this.ghostElement && this.ghostElement.parentNode) {
                    this.ghostElement.parentNode.removeChild(this.ghostElement);
                }
                
                // Reset state
                this.ghostElement = null;
                this.isDragging = false;
                
                // Fire dragClear event
                if (this.onDragClear) {
                    this.onDragClear.fire(this, { draggedElement: this.draggedElement });
                }
                
                // Reset drag state
                this.draggedElement = null;
                this.dropTarget = null;
                this.isBottom = false;
                this.isEdge = false;
            }
            
            // Helper method to find drop target
            findDropTargetByEvent(event) {
                try {
                    // Get elements at the current mouse position
                    const elements = document.elementsFromPoint(event.clientX, event.clientY);
                    
                    // First try to find elements with specific SurveyJS data attributes
                    for (let i = 0; i < elements.length; i++) {
                        const element = elements[i];
                        
                        // Check for SurveyJS specific attributes
                        const surveyElement = this.findSurveyElementByDomElement(element);
                        if (surveyElement) {
                            // Determine if we're at the bottom of the element
                            const rect = element.getBoundingClientRect();
                            const isBottom = event.clientY > rect.top + rect.height / 2;
                            
                            console.log('Found drop target:', {
                                element: surveyElement.name || 'Unknown',
                                type: surveyElement.getType ? surveyElement.getType() : 'Unknown',
                                isBottom
                            });
                            
                            return {
                                dropTarget: surveyElement,
                                isBottom: isBottom,
                                isEdge: false // Simplified
                            };
                        }
                    }
                    
                    // If we couldn't find a specific element, try to find the page
                    if (this.survey && this.survey.pages && this.survey.pages.length > 0) {
                        // Default to the current page or first page
                        const page = this.survey.currentPage || this.survey.pages[0];
                        
                        console.log('Using page as drop target:', page.name);
                        
                        return {
                            dropTarget: page,
                            isBottom: true, // Add to the bottom of the page
                            isEdge: false
                        };
                    }
                    
                    return null;
                } catch (e) {
                    console.error('Error finding drop target:', e);
                    return null;
                }
            }
            
            // Helper method to find survey element by DOM element
            findSurveyElementByDomElement(element) {
                try {
                    // If element is null or doesn't have dataset, return null
                    if (!element || !element.dataset) return null;
                    
                    // Check for SurveyJS specific data attributes
                    const questionId = element.dataset.questionId || element.dataset.questionname;
                    const panelId = element.dataset.panelId || element.dataset.panelname;
                    const pageId = element.dataset.pageId || element.dataset.pagename;
                    
                    // Also check for element ID which might contain the name
                    const elementId = element.id;
                    let extractedName = null;
                    
                    if (elementId) {
                        // Try to extract name from ID patterns like "sq_123" or "sp_123" or "page123"
                        const matches = elementId.match(/sq_(\w+)/) || 
                                       elementId.match(/sp_(\w+)/) || 
                                       elementId.match(/page(\w+)/);
                        
                        if (matches && matches.length > 1) {
                            extractedName = matches[1];
                        }
                    }
                    
                    // Check for class names that might indicate element type
                    const isQuestion = element.classList && 
                                     (element.classList.contains('sv_q') || 
                                      element.classList.contains('sv_qstn') ||
                                      element.classList.contains('question'));
                    
                    const isPanel = element.classList && 
                                  (element.classList.contains('sv_p') || 
                                   element.classList.contains('panel'));
                    
                    const isPage = element.classList && 
                                 (element.classList.contains('sv_page') || 
                                  element.classList.contains('page'));
                    
                    if (this.survey) {
                        // Try to find the element in the survey
                        if (questionId) {
                            return this.survey.getQuestionByName(questionId);
                        }
                        
                        if (panelId) {
                            return this.survey.getPanelByName(panelId);
                        }
                        
                        if (pageId) {
                            return this.survey.getPageByName(pageId);
                        }
                        
                        if (extractedName) {
                            return this.survey.getQuestionByName(extractedName) || 
                                   this.survey.getPanelByName(extractedName) || 
                                   this.survey.getPageByName(extractedName);
                        }
                        
                        // If we found a question/panel/page by class but not by ID,
                        // we need to determine which one it is by traversing up the DOM
                        if (isQuestion || isPanel || isPage) {
                            // Get all questions, panels, and pages
                            const allQuestions = this.survey.getAllQuestions();
                            const allPanels = [];
                            const allPages = this.survey.pages;
                            
                            // Get all panels
                            this.survey.pages.forEach(page => {
                                page.panels.forEach(panel => {
                                    allPanels.push(panel);
                                });
                            });
                            
                            // Find the closest element by comparing DOM positions
                            const elementRect = element.getBoundingClientRect();
                            
                            let closestElement = null;
                            let minDistance = Number.MAX_VALUE;
                            
                            const checkElements = (elements) => {
                                elements.forEach(surveyElement => {
                                    // Try to find the DOM element for this survey element
                                    const domElement = document.getElementById(surveyElement.id) || 
                                                     document.querySelector(`[data-name="${surveyElement.name}"]`);
                                    
                                    if (domElement) {
                                        const rect = domElement.getBoundingClientRect();
                                        const distance = Math.sqrt(
                                            Math.pow(rect.left - elementRect.left, 2) + 
                                            Math.pow(rect.top - elementRect.top, 2)
                                        );
                                        
                                        if (distance < minDistance) {
                                            minDistance = distance;
                                            closestElement = surveyElement;
                                        }
                                    }
                                });
                            };
                            
                            if (isQuestion) checkElements(allQuestions);
                            if (isPanel) checkElements(allPanels);
                            if (isPage) checkElements(allPages);
                            
                            if (closestElement) {
                                return closestElement;
                            }
                        }
                    }
                    
                    // If we still haven't found anything, check parent elements
                    if (element.parentElement) {
                        return this.findSurveyElementByDomElement(element.parentElement);
                    }
                } catch (e) {
                    console.error('Error finding survey element:', e);
                }
                
                return null;
            }

            // New method to handle moveElement with better error handling
            patchedMoveElement(draggedElement, targetElement, isBottom, isEdge) {
                console.log('Moving element with patched method', {
                    draggedElement: draggedElement ? draggedElement.name : 'Unknown',
                    targetElement: targetElement ? targetElement.name : 'Unknown',
                    isBottom,
                    isEdge
                });
                
                try {
                    // If we have the original moveElement method, try to use it
                    if (typeof this.originalMoveElement === 'function') {
                        return this.originalMoveElement(draggedElement, targetElement, isBottom, isEdge);
                    }
                    
                    // Otherwise, implement our own version
                    
                    // First, determine the type of the elements
                    const draggedType = draggedElement.getType ? draggedElement.getType() : 'unknown';
                    const targetType = targetElement.getType ? targetElement.getType() : 'unknown';
                    
                    console.log('Element types', { draggedType, targetType });
                    
                    // Handle different scenarios based on element types
                    
                    // Case 1: Moving a question
                    if (draggedType === 'question' || draggedType.indexOf('question') >= 0) {
                        // Case 1.1: Target is a page
                        if (targetType === 'page') {
                            // Remove the question from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Add the question to the target page
                            if (isBottom) {
                                targetElement.addElement(draggedElement);
                            } else {
                                targetElement.addElement(draggedElement, 0);
                            }
                            
                            return true;
                        }
                        
                        // Case 1.2: Target is a panel
                        if (targetType === 'panel') {
                            // Remove the question from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Add the question to the target panel
                            if (isBottom) {
                                targetElement.addElement(draggedElement);
                            } else {
                                targetElement.addElement(draggedElement, 0);
                            }
                            
                            return true;
                        }
                        
                        // Case 1.3: Target is another question
                        if (targetType === 'question' || targetType.indexOf('question') >= 0) {
                            // Find the parent of the target question
                            const targetParent = this.findParent(targetElement);
                            if (!targetParent) {
                                console.error('Could not find parent of target question');
                                return false;
                            }
                            
                            // Remove the question from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Find the index of the target question
                            const targetIndex = targetParent.elements.indexOf(targetElement);
                            if (targetIndex < 0) {
                                console.error('Could not find target question in parent');
                                return false;
                            }
                            
                            // Add the question to the target parent at the appropriate index
                            const newIndex = isBottom ? targetIndex + 1 : targetIndex;
                            targetParent.addElement(draggedElement, newIndex);
                            
                            return true;
                        }
                    }
                    
                    // Case 2: Moving a panel
                    if (draggedType === 'panel') {
                        // Case 2.1: Target is a page
                        if (targetType === 'page') {
                            // Remove the panel from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Add the panel to the target page
                            if (isBottom) {
                                targetElement.addElement(draggedElement);
                            } else {
                                targetElement.addElement(draggedElement, 0);
                            }
                            
                            return true;
                        }
                        
                        // Case 2.2: Target is another panel
                        if (targetType === 'panel') {
                            // Find the parent of the target panel
                            const targetParent = this.findParent(targetElement);
                            if (!targetParent) {
                                console.error('Could not find parent of target panel');
                                return false;
                            }
                            
                            // Remove the panel from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Find the index of the target panel
                            const targetIndex = targetParent.elements.indexOf(targetElement);
                            if (targetIndex < 0) {
                                console.error('Could not find target panel in parent');
                                return false;
                            }
                            
                            // Add the panel to the target parent at the appropriate index
                            const newIndex = isBottom ? targetIndex + 1 : targetIndex;
                            targetParent.addElement(draggedElement, newIndex);
                            
                            return true;
                        }
                        
                        // Case 2.3: Target is a question
                        if (targetType === 'question' || targetType.indexOf('question') >= 0) {
                            // Find the parent of the target question
                            const targetParent = this.findParent(targetElement);
                            if (!targetParent) {
                                console.error('Could not find parent of target question');
                                return false;
                            }
                            
                            // Remove the panel from its current location
                            const oldParent = this.findParent(draggedElement);
                            if (oldParent) {
                                oldParent.removeElement(draggedElement);
                            }
                            
                            // Find the index of the target question
                            const targetIndex = targetParent.elements.indexOf(targetElement);
                            if (targetIndex < 0) {
                                console.error('Could not find target question in parent');
                                return false;
                            }
                            
                            // Add the panel to the target parent at the appropriate index
                            const newIndex = isBottom ? targetIndex + 1 : targetIndex;
                            targetParent.addElement(draggedElement, newIndex);
                            
                            return true;
                        }
                    }
                    
                    // Case 3: Moving a page
                    if (draggedType === 'page') {
                        // Case 3.1: Target is another page
                        if (targetType === 'page') {
                            // Find the survey
                            const survey = this.survey;
                            if (!survey) {
                                console.error('Could not find survey');
                                return false;
                            }
                            
                            // Find the index of the target page
                            const targetIndex = survey.pages.indexOf(targetElement);
                            if (targetIndex < 0) {
                                console.error('Could not find target page in survey');
                                return false;
                            }
                            
                            // Find the index of the dragged page
                            const draggedIndex = survey.pages.indexOf(draggedElement);
                            if (draggedIndex < 0) {
                                console.error('Could not find dragged page in survey');
                                return false;
                            }
                            
                            // Remove the page from its current location
                            survey.pages.splice(draggedIndex, 1);
                            
                            // Calculate the new index
                            let newIndex = isBottom ? targetIndex + 1 : targetIndex;
                            if (draggedIndex < targetIndex) {
                                newIndex--;
                            }
                            
                            // Add the page at the new index
                            survey.pages.splice(newIndex, 0, draggedElement);
                            
                            return true;
                        }
                    }
                    
                    // If we get here, we don't know how to handle this case
                    console.error('Unsupported move operation', {
                        draggedType,
                        targetType,
                        isBottom,
                        isEdge
                    });
                    
                    return false;
                } catch (e) {
                    console.error('Error moving element:', e);
                    return false;
                }
            }
            
            // Helper method to find the parent of an element
            findParent(element) {
                if (!element || !this.survey) return null;
                
                // Check if the element is a page
                if (this.survey.pages.indexOf(element) >= 0) {
                    return this.survey;
                }
                
                // Check if the element is in a page
                for (let i = 0; i < this.survey.pages.length; i++) {
                    const page = this.survey.pages[i];
                    
                    // Check if the element is directly in the page
                    if (page.elements && page.elements.indexOf(element) >= 0) {
                        return page;
                    }
                    
                    // Check if the element is in a panel in the page
                    if (page.elements) {
                        for (let j = 0; j < page.elements.length; j++) {
                            const pageElement = page.elements[j];
                            
                            // If this is a panel, check if the element is in it
                            if (pageElement.getType && pageElement.getType() === 'panel' && 
                                pageElement.elements && pageElement.elements.indexOf(element) >= 0) {
                                return pageElement;
                            }
                        }
                    }
                }
                
                return null;
            }
        }
        
        // Replace the original class with our patched version
        SurveyCreator.DragDropSurveyElements = PatchedDragDropSurveyElements;
    }

    initializeSurvey() {
        console.log('Initializing Survey with enhanced Lightning Locker compatibility...');
        
        if (window.Survey) {
            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true,
                // Add options that might help with Lightning Locker Service
                allowDragDrop: true, // Ensure drag-drop is enabled
                dragDropAlternativeMode: true, // Use alternative drag-drop mode
                showElementEditorAsPropertyGrid: true, // Use property grid instead of modal
                // Add additional options for better Lightning Locker compatibility
                enableLightningLockerCompatibility: true, // Custom flag we can check in our patches
                showEmbededSurveyTab: false, // Disable embedded survey tab which might cause issues
                haveCommercialLicense: true // Ensure all features are available
            };
            
            const defaultJson = {
                pages: [{
                    name: "Name",
                    elements: [{
                        name: "FirstName",
                        title: "Enter your first name:",
                        type: "text"
                    }, {
                        name: "LastName",
                        title: "Enter your last name:",
                        type: "text"
                    }]
                }]
            };
            
            // setLicenseKey("VkFMSURfUFJFRklYOzA9MjAyNS0xMi0zMQ==");

            // Configure global SurveyJS settings before creating the creator
            this.configureSurveyJSGlobalSettings();

            const creator = new SurveyCreator.SurveyCreator(creatorOptions);
            this.creatorInstance = creator;
            
            // Store original methods for reference and debugging
            this.storeOriginalCreatorMethods(creator);
            
            // Configure additional settings for Lightning Locker compatibility
            if (creator.survey) {
                creator.survey.dragDropEnabled = true;
                
                // Add custom properties to help with debugging
                creator.survey.lightningLockerEnabled = true;
                
                // Subscribe to survey events
                this.subscribeSurveyEvents(creator.survey);
            }
            
            // Add event listeners for drag-drop operations
            this.setupDragDropEventListeners(creator);
            
            // Add event listeners for other creator operations
            this.setupCreatorEventListeners(creator);
            
            creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
            creator.saveSurveyFunc = (saveNo, callback) => { 
                window.localStorage.setItem("survey-json", creator.text);
                callback(saveNo, true);
            };
            
            creator.render(this.template.querySelector('.surveyContainer'));
            
            // Make the creator instance available globally for debugging
            window.surveyCreator = creator;
            
            // Update the event debugger with the creator instance
            setTimeout(() => {
                const debuggerElement = this.template.querySelector('c-survey-js-event-debugger');
                if (debuggerElement) {
                    debuggerElement.creator = this.creatorInstance;
                }
            }, 500);
            
            console.log('SurveyJS Creator initialized with enhanced Lightning Locker compatibility');
            this.loaded = true;
        } else {
            console.error('SurveyJS library not loaded.');
        }
    }
    
    configureSurveyJSGlobalSettings() {
        console.log('Configuring global SurveyJS settings for Lightning Locker compatibility');
        
        try {
            // Configure SurveyJS settings
            if (window.Survey) {
                // Set global settings for better Lightning Locker compatibility
                window.Survey.settings = window.Survey.settings || {};
                
                // Ensure drag-drop is enabled
                window.Survey.settings.supportCreatorV2 = true;
                
                // Configure DOM interaction settings
                if (window.Survey.settings.dragDrop) {
                    window.Survey.settings.dragDrop.allowDragToTheSameLine = true;
                    window.Survey.settings.dragDrop.ghostPositionAllowType = "all";
                }
                
                // Configure other settings as needed
                window.Survey.settings.lazyRowsRendering = false; // Disable lazy rendering which might cause issues
                window.Survey.settings.lazyRendering = window.Survey.settings.lazyRendering || {};
                window.Survey.settings.lazyRendering.enabled = false; // Disable lazy rendering
                
                console.log('Successfully configured global SurveyJS settings');
            }
        } catch (error) {
            console.error('Error configuring global SurveyJS settings:', error);
        }
    }

    storeOriginalCreatorMethods(creator) {
        console.log('Storing original creator methods for reference');
        
        try {
            // Store original methods for reference
            this.originalCreatorMethods = {
                // Store important methods
                render: creator.render,
                // Add other methods as needed
            };
            
            // Store dragDropSurveyElements methods if available
            if (creator.dragDropSurveyElements) {
                this.originalDragDropMethods = {
                    startDragToolboxItem: creator.dragDropSurveyElements.startDragToolboxItem,
                    startDragSurveyElement: creator.dragDropSurveyElements.startDragSurveyElement,
                    dragOver: creator.dragDropSurveyElements.dragOver,
                    doDrop: creator.dragDropSurveyElements.doDrop,
                    // Add other methods as needed
                };
            }
            
            console.log('Successfully stored original creator methods');
        } catch (error) {
            console.error('Error storing original creator methods:', error);
        }
    }

    subscribeSurveyEvents(survey) {
        console.log('Subscribing to survey events for enhanced Lightning Locker compatibility');
        
        try {
            // Subscribe to survey events
            if (survey.onDragDropAllow) {
                survey.onDragDropAllow.add((sender, options) => {
                    console.log('Survey onDragDropAllow event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        source: options.source ? options.source.name : 'Unknown',
                        target: options.target ? options.target.name : 'Unknown',
                        allow: options.allow,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Always allow drag-drop operations in our patched environment
                    options.allow = true;
                    options.allowDropNextToAnother = true;
                });
            }
            
            // Subscribe to other survey events
            if (survey.onElementDragStart) {
                survey.onElementDragStart.add((sender, options) => {
                    console.log('Survey onElementDragStart event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        element: options.element ? options.element.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            if (survey.onElementDragEnd) {
                survey.onElementDragEnd.add((sender, options) => {
                    console.log('Survey onElementDragEnd event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        element: options.element ? options.element.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            console.log('Successfully subscribed to survey events');
        } catch (error) {
            console.error('Error subscribing to survey events:', error);
        }
    }

    setupCreatorEventListeners(creator) {
        console.log('Setting up creator event listeners for enhanced Lightning Locker compatibility');
        
        try {
            // Subscribe to creator events
            if (creator.onElementDragStart) {
                creator.onElementDragStart.add((sender, options) => {
                    console.log('Creator onElementDragStart event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        element: options.element ? options.element.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            if (creator.onElementDragEnd) {
                creator.onElementDragEnd.add((sender, options) => {
                    console.log('Creator onElementDragEnd event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        element: options.element ? options.element.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            if (creator.onModified) {
                creator.onModified.add((sender, options) => {
                    console.log('Creator onModified event:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        type: options.type,
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            // Add other event listeners as needed
            
            console.log('Successfully set up creator event listeners');
        } catch (error) {
            console.error('Error setting up creator event listeners:', error);
        }
    }

    setupDragDropEventListeners(creator) {
        if (!creator) return;
        
        try {
            console.log('Setting up enhanced drag-drop event listeners for Lightning Locker compatibility');
            
            // Listen for drag-drop events
            if (creator.onDragStart) {
                creator.onDragStart.add((sender, options) => {
                    console.log('Creator Drag start:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        draggedElement: options.draggedElement ? options.draggedElement.name : 'Unknown',
                        fromElement: options.fromElement ? options.fromElement.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                    
                    // Ensure we have a valid draggedElement
                    if (creator.dragDropSurveyElements && options.draggedElement) {
                        creator.dragDropSurveyElements.draggedElement = options.draggedElement;
                        creator.dragDropSurveyElements.isDragging = true;
                    }
                });
            }
            
            if (creator.onDragEnd) {
                creator.onDragEnd.add((sender, options) => {
                    console.log('Creator Drag end:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        draggedElement: options.draggedElement ? options.draggedElement.name : 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                });
            }
            
            if (creator.onBeforeDrop) {
                creator.onBeforeDrop.add((sender, options) => {
                    console.log('Creator Before drop:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        draggedElement: options.draggedElement ? options.draggedElement.name : 'Unknown',
                        dropTarget: options.dropTarget ? options.dropTarget.name : 'Unknown',
                        isBottom: options.isBottom,
                        timestamp: new Date().toISOString(),
                        senderDetails: JSON.stringify(sender, (key, value) => {
                            if (key === 'callbacks' || key === 'creator' || key === 'surveyValue' || 
                                key === 'onDragStart' || key === 'onDragEnd' || key === 'onBeforeDrop' || 
                                key === 'onAfterDrop' || key === 'onDragClear' || key === 'domAdapter') {
                                return '[Object]';
                            }
                            return value;
                        })
                    });
                    
                    // If dropTarget is null but we have a draggedElement, try to find a drop target
                    if (!options.dropTarget && options.draggedElement && creator.dragDropSurveyElements) {
                        console.log('No drop target in onBeforeDrop, attempting to find one');
                        
                        // Try to use the current page as the drop target
                        if (creator.survey && creator.survey.currentPage) {
                            options.dropTarget = creator.survey.currentPage;
                            options.isBottom = true;
                            
                            console.log('Using current page as drop target:', options.dropTarget.name);
                            
                            // Update the dragDropSurveyElements state
                            creator.dragDropSurveyElements.dropTarget = options.dropTarget;
                            creator.dragDropSurveyElements.isBottom = options.isBottom;
                        }
                    }
                    
                    // Always allow drop
                    return true;
                });
            }
            
            if (creator.onAfterDrop) {
                creator.onAfterDrop.add((sender, options) => {
                    console.log('Creator After drop:', {
                        sender: sender.constructor ? sender.constructor.name : 'Unknown',
                        draggedElement: options.draggedElement ? options.draggedElement.name : 'Unknown',
                        dropTarget: options.dropTarget ? options.dropTarget.name : 'Unknown',
                        isBottom: options.isBottom,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Force a refresh of the survey if needed
                    if (creator.survey) {
                        try {
                            creator.survey.render();
                        } catch (e) {
                            console.log('Error rendering survey after drop:', e);
                        }
                    }
                });
            }
            
            // Add listener for onGhostPositionChanged
            if (creator.dragDropSurveyElements && creator.dragDropSurveyElements.onGhostPositionChanged) {
                creator.dragDropSurveyElements.onGhostPositionChanged.add((sender, options) => {
                    console.log('Ghost position changed:', {
                        mousePosition: options.mousePosition || {
                            x: options.x,
                            y: options.y
                        },
                        draggedElement: options.draggedElement ? options.draggedElement.name : 
                                       (options.draggedElementInfo ? options.draggedElementInfo.name : 'Unknown'),
                        timestamp: new Date().toISOString()
                    });
                    
                    // Try to find a drop target based on the current mouse position
                    if (creator.dragDropSurveyElements && creator.dragDropSurveyElements.isDragging) {
                        const mousePosition = options.mousePosition || { x: options.x, y: options.y };
                        
                        if (mousePosition && (mousePosition.x || mousePosition.y)) {
                            // Create a synthetic event for finding the drop target
                            const syntheticEvent = {
                                clientX: mousePosition.x || 0,
                                clientY: mousePosition.y || 0,
                                pageX: mousePosition.pageX || mousePosition.x || 0,
                                pageY: mousePosition.pageY || mousePosition.y || 0,
                                preventDefault: () => {},
                                stopPropagation: () => {}
                            };
                            
                            // Find drop target
                            const dropTargetInfo = creator.dragDropSurveyElements.findDropTargetByEvent(syntheticEvent);
                            if (dropTargetInfo) {
                                creator.dragDropSurveyElements.dropTarget = dropTargetInfo.dropTarget;
                                creator.dragDropSurveyElements.isBottom = dropTargetInfo.isBottom;
                                creator.dragDropSurveyElements.isEdge = dropTargetInfo.isEdge || false;
                                
                                console.log('Found drop target during ghost position change:', {
                                    dropTarget: dropTargetInfo.dropTarget.name,
                                    isBottom: dropTargetInfo.isBottom
                                });
                            }
                        }
                    }
                });
            }
            
            // Add global event listeners to help with drag-drop
            document.addEventListener('dragover', (event) => {
                // Always prevent default to allow drop
                event.preventDefault();
                
                // If we're dragging a survey element, update the ghost position
                if (creator.dragDropSurveyElements && 
                    creator.dragDropSurveyElements.isDragging && 
                    creator.dragDropSurveyElements.ghostElement) {
                    creator.dragDropSurveyElements.patchedUpdateGhostPosition(event);
                    
                    // Also try to find a drop target
                    const dropTargetInfo = creator.dragDropSurveyElements.findDropTargetByEvent(event);
                    if (dropTargetInfo) {
                        creator.dragDropSurveyElements.dropTarget = dropTargetInfo.dropTarget;
                        creator.dragDropSurveyElements.isBottom = dropTargetInfo.isBottom;
                        creator.dragDropSurveyElements.isEdge = dropTargetInfo.isEdge || false;
                    }
                }
            });
            
            document.addEventListener('drop', (event) => {
                // Always prevent default
                event.preventDefault();
                
                console.log('Global drop event detected', {
                    clientX: event.clientX,
                    clientY: event.clientY,
                    target: event.target.tagName,
                    isDragging: creator.dragDropSurveyElements && creator.dragDropSurveyElements.isDragging,
                    timestamp: new Date().toISOString()
                });
                
                // If we're dragging a survey element, handle the drop
                if (creator.dragDropSurveyElements && 
                    creator.dragDropSurveyElements.isDragging && 
                    creator.dragDropSurveyElements.draggedElement) {
                    
                    // If we don't have a drop target, try to find one
                    if (!creator.dragDropSurveyElements.dropTarget) {
                        const dropTargetInfo = creator.dragDropSurveyElements.findDropTargetByEvent(event);
                        if (dropTargetInfo) {
                            creator.dragDropSurveyElements.dropTarget = dropTargetInfo.dropTarget;
                            creator.dragDropSurveyElements.isBottom = dropTargetInfo.isBottom;
                            creator.dragDropSurveyElements.isEdge = dropTargetInfo.isEdge || false;
                        } else if (creator.survey && creator.survey.currentPage) {
                            // Use current page as fallback
                            creator.dragDropSurveyElements.dropTarget = creator.survey.currentPage;
                            creator.dragDropSurveyElements.isBottom = true;
                        }
                    }
                    
                    creator.dragDropSurveyElements.patchedDoDrop(event);
                }
            });
            
            // Add mouseup listener to catch cases where drop event doesn't fire
            document.addEventListener('mouseup', (event) => {
                if (creator.dragDropSurveyElements && 
                    creator.dragDropSurveyElements.isDragging && 
                    creator.dragDropSurveyElements.draggedElement) {
                    console.log('Global mouseup event detected while dragging', {
                        clientX: event.clientX,
                        clientY: event.clientY,
                        target: event.target.tagName,
                        timestamp: new Date().toISOString()
                    });
                    
                    // If we don't have a drop target, try to find one
                    if (!creator.dragDropSurveyElements.dropTarget) {
                        const dropTargetInfo = creator.dragDropSurveyElements.findDropTargetByEvent(event);
                        if (dropTargetInfo) {
                            creator.dragDropSurveyElements.dropTarget = dropTargetInfo.dropTarget;
                            creator.dragDropSurveyElements.isBottom = dropTargetInfo.isBottom;
                            creator.dragDropSurveyElements.isEdge = dropTargetInfo.isEdge || false;
                        } else if (creator.survey && creator.survey.currentPage) {
                            // Use current page as fallback
                            creator.dragDropSurveyElements.dropTarget = creator.survey.currentPage;
                            creator.dragDropSurveyElements.isBottom = true;
                        }
                    }
                    
                    creator.dragDropSurveyElements.patchedDoDrop(event);
                }
            });
        } catch (e) {
            console.error('Error setting up drag-drop event listeners:', e);
        }
    }

    patchSurveyJSEventSystem() {
        console.log('Patching SurveyJS event system for Lightning Locker compatibility');
        
        try {
            // Patch Survey.onDragDropAllow event
            if (window.Survey && window.Survey.Survey && window.Survey.Survey.prototype) {
                const originalFireCallback = window.Survey.Base.prototype.fireCallback;
                window.Survey.Base.prototype.fireCallback = function(callback, parameters) {
                    try {
                        return originalFireCallback.call(this, callback, parameters);
                    } catch (e) {
                        console.log('Error in fireCallback, using patched version', e);
                        // Implement fallback behavior
                        if (typeof callback === "function") {
                            return callback(parameters);
                        }
                        return undefined;
                    }
                };
            }
            
            // Patch SurveyJS event firing mechanism
            if (window.Survey && window.Survey.EventBase) {
                const originalFire = window.Survey.EventBase.prototype.fire;
                window.Survey.EventBase.prototype.fire = function(sender, options) {
                    try {
                        return originalFire.call(this, sender, options);
                    } catch (e) {
                        console.log('Error in EventBase.fire, using patched version', e);
                        
                        // Implement fallback behavior
                        let result = undefined;
                        for (let i = 0; i < this.callbacks.length; i++) {
                            try {
                                const callbackResult = this.callbacks[i](sender, options);
                                if (typeof result === "undefined") result = callbackResult;
                            } catch (callbackError) {
                                console.log('Error in event callback', callbackError);
                            }
                        }
                        return result;
                    }
                };
            }
            
            console.log('Successfully patched SurveyJS event system');
        } catch (error) {
            console.error('Error patching SurveyJS event system:', error);
        }
    }

    patchSurveyJSDOMOperations() {
        console.log('Patching SurveyJS DOM operations for Lightning Locker compatibility');
        
        try {
            // Patch document.elementsFromPoint if it's being used by SurveyJS
            const originalElementsFromPoint = document.elementsFromPoint;
            if (originalElementsFromPoint) {
                document.elementsFromPoint = function(x, y) {
                    try {
                        return originalElementsFromPoint.call(document, x, y);
                    } catch (e) {
                        console.log('Error in document.elementsFromPoint, using patched version', e);
                        
                        // Fallback implementation
                        const element = document.elementFromPoint(x, y);
                        if (!element) return [];
                        
                        // Build a simple array of parent elements
                        const elements = [element];
                        let currentElement = element;
                        
                        while (currentElement.parentElement) {
                            elements.push(currentElement.parentElement);
                            currentElement = currentElement.parentElement;
                        }
                        
                        return elements;
                    }
                };
            }
            
            // Patch getBoundingClientRect which is often used in drag-drop operations
            const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
            Element.prototype.getBoundingClientRect = function() {
                try {
                    return originalGetBoundingClientRect.call(this);
                } catch (e) {
                    console.log('Error in getBoundingClientRect, using patched version', e);
                    
                    // Return a minimal rect with the element's position and size
                    const rect = {
                        x: this.offsetLeft,
                        y: this.offsetTop,
                        width: this.offsetWidth,
                        height: this.offsetHeight,
                        top: this.offsetTop,
                        right: this.offsetLeft + this.offsetWidth,
                        bottom: this.offsetTop + this.offsetHeight,
                        left: this.offsetLeft
                    };
                    
                    return rect;
                }
            };
            
            console.log('Successfully patched SurveyJS DOM operations');
        } catch (error) {
            console.error('Error patching SurveyJS DOM operations:', error);
        }
    }
}