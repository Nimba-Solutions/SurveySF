import { LightningElement, api, wire } from "lwc";
import getAvailableObjects from "@salesforce/apex/SurveyMetadataService.getAvailableObjects";

/**
 * LWC component that adds an Object Selector property to SurveyJS survey property grid
 * This allows users to select a Salesforce object for the survey from a dropdown list
 */
export default class ObjectSelector extends LightningElement {
  @api surveyCreator;
  availableObjects = [];
  objectChoices = [];
  isInitialized = false;

  /**
   * Wire adapter to fetch available objects from SurveyMetadataService
   */
  @wire(getAvailableObjects)
  wiredObjects({ error, data }) {
    if (data) {
      this.availableObjects = data;
      this.prepareObjectChoices();

      // If Survey is already loaded, register with it using the fetched objects
      if (window.Survey && !this.isInitialized) {
        this.registerObjectSelectorProperty(window.Survey);
      }
    } else if (error) {
      console.error("Error fetching available objects:", error);
    }
  }

  connectedCallback() {
    // If Survey is already loaded and we have our objects data, register with it
    if (
      window.Survey &&
      this.availableObjects.length > 0 &&
      !this.isInitialized
    ) {
      this.registerObjectSelectorProperty(window.Survey);
    }
  }

  /**
   * Prepares the choices array for the dropdown from the available objects
   */
  prepareObjectChoices() {
    this.objectChoices = this.availableObjects.map((obj) => {
      return {
        value: obj.apiName,
        text: `${obj.label} (${obj.apiName})`,
      };
    });

    // Sort choices by text for better UX
    this.objectChoices.sort((a, b) => a.text.localeCompare(b.text));
  }

  /**
   * Registers an object selector property for surveys (not questions)
   * @param {object} Survey - The SurveyJS core library reference
   */
  registerObjectSelectorProperty(Survey) {
    if (!Survey) {
      console.error(
        "Cannot register Object Selector Property: Survey object not provided"
      );
      return;
    }

    if (this.objectChoices.length === 0) {
      console.warn(
        "Cannot register Object Selector Property: No object choices available yet"
      );
      return;
    }

    console.log("Registering Object Selector property for surveys...");

    // Add the objectApiName property to survey (not to questions)
    Survey.Serializer.addProperty("survey", {
      name: "objectApiName",
      displayName: "Salesforce Object",
      category: "general",
      visibleIndex: 1,
      type: "dropdown",
      isRequired: false,
      searchEnabled: true,
      defaultValue: "",
      choices: this.objectChoices,
    });

    console.log(
      "Object Selector property registered successfully with",
      this.objectChoices.length,
      "choices"
    );
    this.isInitialized = true;
  }

  /**
   * Returns the name of the property this component handles
   * @returns {string} The property name
   */
  @api
  getPropertyName() {
    return "objectApiName";
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
      // Only register if we have our object choices ready
      if (this.objectChoices.length > 0) {
        this.registerObjectSelectorProperty(Survey);
        return Promise.resolve();
      } else {
        // If we don't have choices yet, wait for them
        return new Promise((resolve) => {
          // Check every 100ms if choices are ready
          const checkInterval = setInterval(() => {
            if (this.objectChoices.length > 0) {
              clearInterval(checkInterval);
              this.registerObjectSelectorProperty(Survey);
              resolve();
            }
          }, 100);

          // Set a timeout to avoid infinite waiting
          setTimeout(() => {
            clearInterval(checkInterval);
            console.warn("Timed out waiting for object choices");
            resolve();
          }, 5000);
        });
      }
    }
    return Promise.resolve();
  }
}
