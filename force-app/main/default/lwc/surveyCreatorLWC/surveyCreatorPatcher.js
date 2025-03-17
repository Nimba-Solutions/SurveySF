/**
 * Utility class to handle SurveyJS DOM patching for LWC shadow DOM compatibility
 */
export class SurveyCreatorPatcher {
  /**
   * Initialize the DOM patcher with the component instance and creator
   * @param {LightningElement} componentInstance - The LWC component instance
   * @param {SurveyCreator} creator - The SurveyJS creator instance
   */
  constructor(componentInstance, creator) {
    this.componentInstance = componentInstance;
    this.creator = creator;
  }

  /**
   * Apply all necessary DOM patches for SurveyJS to work with LWC
   */
  applyPatches() {
    if (!this.creator.dragDropSurveyElements) {
      return;
    }

    console.log("Patching drag drop functionality");
    this.patchDragDropFunctionality();
  }

  /**
   * Find drop target that respects LWC boundaries
   * @param {Event} event - The drag/drop event
   * @returns {Element|null} - The found drop target or null
   */
  findDropTarget(event) {
    const container =
      this.componentInstance.template.querySelector(".surveyContainer");
    if (!container) return null;

    // Get relative position within the container
    const containerRect = container.getBoundingClientRect();
    const relativeX = event.clientX - containerRect.left;
    const relativeY = event.clientY - containerRect.top;

    // Use elementsFromPoint but filter to only elements within our container
    const elements = Array.from(
      document.elementsFromPoint(event.clientX, event.clientY)
    ).filter((el) => container.contains(el) || el === container);

    // First try to find direct drop targets
    let dropTarget = elements.find(
      (el) =>
        el.hasAttribute("data-sv-drop-target-survey-element") ||
        el.hasAttribute("data-sv-drop-target-page") ||
        el.hasAttribute("data-sv-drop-target-survey-page") ||
        el.hasAttribute("data-sv-drop-target-item-value")
    );

    // If no direct target, look for survey-element containers
    if (!dropTarget) {
      dropTarget = elements.find(
        (el) =>
          el.classList.contains("svc-page__content") ||
          el.classList.contains("svc-row") ||
          el.classList.contains("svc-question__content")
      );
    }

    return dropTarget;
  }

  /**
   * Create a synthetic drag/drop event that Salesforce will allow
   * @param {Event} originalEvent - The original event
   * @param {Element} dropTarget - The drop target element
   * @returns {PointerEvent} - The synthetic event
   */
  createSyntheticEvent(originalEvent, dropTarget) {
    const syntheticEvent = new PointerEvent("dragover", {
      clientX: originalEvent.clientX,
      clientY: originalEvent.clientY,
      bubbles: true,
      cancelable: true,
    });

    // Add required properties
    Object.defineProperties(syntheticEvent, {
      target: { value: dropTarget },
      currentTarget: { value: dropTarget },
      path: { value: [dropTarget] },
      composedPath: { value: () => [dropTarget] },
    });

    return syntheticEvent;
  }

  /**
   * Patch drag and drop functionality to work with LWC shadow DOM
   */
  patchDragDropFunctionality() {
    const dragDrop = this.creator.dragDropSurveyElements;

    // Store original methods
    const originalFindDropTargetElement = dragDrop.findDropTargetElement;
    const originalDragOver = dragDrop.dragOver;

    // Bind findDropTarget to this instance
    const boundFindDropTarget = this.findDropTarget.bind(this);

    // Patch dragOver
    dragDrop.dragOver = (event) => {
      const dropTarget = boundFindDropTarget(event);
      if (!dropTarget) return originalDragOver.call(dragDrop, event);

      const syntheticEvent = this.createSyntheticEvent(event, dropTarget);
      return originalDragOver.call(dragDrop, syntheticEvent);
    };

    // Patch findDropTargetElement
    dragDrop.findDropTargetElement = (event) => {
      const dropTarget = boundFindDropTarget(event);
      if (!dropTarget) return null;

      const syntheticEvent = this.createSyntheticEvent(event, dropTarget);
      return originalFindDropTargetElement.call(dragDrop, syntheticEvent);
    };
  }
}
