import { LightningElement, api } from "lwc";

/**
 * Simple LWC component that adds a UUID read-only property to SurveyJS questions
 */
export default class UuidDisplay extends LightningElement {
  @api surveyCreator;

  connectedCallback() {
    // If Survey is already loaded, register with it
    if (window.Survey) {
      this.registerUuidProperty(window.Survey);
    }
  }

  /**
   * Registers a simple read-only UUID property for questions
   * @param {object} Survey - The SurveyJS core library reference
   */
  registerUuidProperty(Survey) {
    if (!Survey) {
      console.error(
        "Cannot register UUID Property: Survey object not provided"
      );
      return;
    }

    console.log("Registering UUID property for questions...");

    // Add the uuid property to questions
    Survey.Serializer.addProperty("question", {
      name: "uuid",
      displayName: "Question Id",
      category: "general",
      visibleIndex: 0,
      type: "string",
      readOnly: true,
    });

    console.log("UUID property registered successfully");
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
    }
    return Promise.resolve();
  }
}
