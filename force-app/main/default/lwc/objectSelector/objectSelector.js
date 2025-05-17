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
  targetType = "survey"; // Default to survey, but can be overridden
  debugMode = false; // Debug mode, disabled by default

  /**
   * Debug logging utility that only logs when debug mode is enabled
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   */
  debug(message, ...args) {
    if (this.debugMode) {
      console.debug(`[ObjectSelector] ${message}`, ...args);
    }
  }

  /**
   * Enable or disable debug logging
   * @param {boolean} enabled - Whether debug mode should be enabled
   */
  @api
  setDebugMode(enabled) {
    this.debugMode = !!enabled;
  }

  /**
   * Sets the target type (survey or question) for this property
   * This is called by the property registrar based on where the component is placed
   * @param {string} type - The target type ("survey" or "question")
   */
  @api
  setTargetType(type) {
    this.debug(`Setting target type to: ${type}`);
    if (type === "survey" || type === "question") {
      this.targetType = type;
    }
  }

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
        this.dispatchReadyEvent();
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
      this.dispatchReadyEvent();
    }
  }

  /**
   * Dispatches a custom event to notify the property registrar that this component is ready
   * Uses the format ready:object-selector to match the naming pattern in the registrar
   */
  dispatchReadyEvent() {
    if (this.isInitialized && this.objectChoices.length > 0) {
      this.debug("Dispatching ready:object-selector event");
      const readyEvent = new CustomEvent("ready:object-selector", {
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

    this.debug(`Prepared ${this.objectChoices.length} object choices`);
  }

  /**
   * Registers an object selector property for the target element type (survey or question)
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

    this.debug(
      `Registering Object Selector property for ${this.targetType}...`
    );

    // Add the objectApiName property to the target type (survey or question)
    Survey.Serializer.addProperty(this.targetType, {
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

    this.debug(
      `Object Selector property registered successfully for ${this.targetType} with`,
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
        this.dispatchReadyEvent();
        return Promise.resolve();
      } else {
        // If we don't have choices yet, wait for them
        this.debug("Waiting for object choices to be loaded...");
        return new Promise((resolve) => {
          // Check every 100ms if choices are ready
          const checkInterval = setInterval(() => {
            if (this.objectChoices.length > 0) {
              clearInterval(checkInterval);
              this.debug("Object choices loaded, proceeding with registration");
              this.registerObjectSelectorProperty(Survey);
              this.dispatchReadyEvent();
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
