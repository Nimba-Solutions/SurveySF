import { LightningElement, api } from "lwc";

/**
 * Simple LWC component that adds a UUID read-only property to SurveyJS questions
 */
export default class UuidDisplay extends LightningElement {
  @api surveyCreator;
  isInitialized = false;
  targetType = "question"; // Default to question, but can be overridden

  /**
   * Sets the target type (survey or question) for this property
   * This is called by the property registrar based on where the component is placed
   * @param {string} type - The target type ("survey" or "question")
   */
  @api
  setTargetType(type) {
    console.log(`Setting target type to: ${type}`);
    if (type === "survey" || type === "question") {
      this.targetType = type;
    }
  }

  connectedCallback() {
    // If Survey is already loaded, register with it
    if (window.Survey) {
      this.registerUuidProperty(window.Survey);
      this.dispatchReadyEvent();
    }
  }

  /**
   * Dispatches a custom event to notify the property registrar that this component is ready
   * Uses the format ready:uuid-display to match the naming pattern in the registrar
   */
  dispatchReadyEvent() {
    if (this.isInitialized) {
      console.log("Dispatching ready:uuid-display event");
      const readyEvent = new CustomEvent("ready:uuid-display", {
        bubbles: true,
        composed: true,
        detail: {
          componentRef: this,
          targetType: this.targetType,
        },
      });
      this.dispatchEvent(readyEvent);
    }
  }

  /**
   * Registers a UUID property for the target element type (survey or question)
   * @param {object} Survey - The SurveyJS core library reference
   */
  registerUuidProperty(Survey) {
    if (!Survey) {
      console.error(
        "Cannot register UUID Property: Survey object not provided"
      );
      return;
    }

    console.log(`Registering UUID property for ${this.targetType}...`);

    // Add the uuid property to the target type (survey or question)
    Survey.Serializer.addProperty(this.targetType, {
      name: "uuid",
      displayName: "UUID",
      category: "general",
      visibleIndex: 0,
      type: "string",
      readOnly: true,
    });

    console.log(`UUID property registered successfully for ${this.targetType}`);
    this.isInitialized = true;
  }

  /**
   * Returns the name of the property this component handles
   * @returns {string} The property name
   */
  @api
  getPropertyName() {
    return "uuid";
  }

  /**
   * Registers the property with SurveyJS
   * This is a wrapper method to support the customPropertyRegistrar interface
   * @param {object} Survey - The SurveyJS core library reference
   * @returns {Promise} A promise that resolves when registration is complete
   */
  @api
  registerProperty(Survey) {
    if (Survey) {
      this.registerUuidProperty(Survey);
      this.dispatchReadyEvent();
    }
    return Promise.resolve();
  }
}
