import { LightningElement, api, wire } from "lwc";
import SurveyProperty from 'c/surveyProperty';
import getAvailableObjects from "@salesforce/apex/SurveyMetadataService.getAvailableObjects";

/**
 * LWC component that adds an Object Selector property to SurveyJS survey property grid
 * This allows users to select a Salesforce object for the survey from a dropdown list
 */
export default class ObjectSelector extends SurveyProperty {
  @api surveyCreator;
  availableObjects = [];
  objectChoices = [];
  isInitialized = false;
  targetType = "survey"; // Default to survey, but can be overridden
  debugMode = false; // Debug mode, disabled by default

  get propertyName() {
    return 'objectApiName';
  }

  get displayName() {
    return 'Salesforce Object';
  }

  get propertyType() {
    return 'dropdown';
  }

  get propertyOptions() {
    return {
      isRequired: false,
      searchEnabled: true,
      defaultValue: "",
      choices: this.objectChoices
    };
  }

  get visibleIndex() {
    return 1;
  }

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
        this.registerProperty(window.Survey);
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
      this.registerProperty(window.Survey);
    }
  }

  /**
   * Prepares the choices array for the dropdown from the available objects
   */
  prepareObjectChoices() {
    this.objectChoices = this.availableObjects.map((obj) => ({
      value: obj.apiName,
      text: `${obj.label} (${obj.apiName})`,
    }));

    // Sort choices by text for better UX
    this.objectChoices.sort((a, b) => a.text.localeCompare(b.text));

    this.debug(`Prepared ${this.objectChoices.length} object choices`);
  }

  /**
   * Override registerProperty to handle async object loading
   */
  @api
  registerProperty(Survey) {
    if (!Survey) return Promise.resolve();

    // Only register if we have our object choices ready
    if (this.objectChoices.length > 0) {
      return super.registerProperty(Survey);
    } else {
      // If we don't have choices yet, wait for them
      this.debug("Waiting for object choices to be loaded...");
      return new Promise((resolve) => {
        // Check every 100ms if choices are ready
        const checkInterval = setInterval(() => {
          if (this.objectChoices.length > 0) {
            clearInterval(checkInterval);
            this.debug("Object choices loaded, proceeding with registration");
            super.registerProperty(Survey).then(resolve);
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
}
