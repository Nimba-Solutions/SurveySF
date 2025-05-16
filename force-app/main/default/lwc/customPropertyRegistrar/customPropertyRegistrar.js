import { LightningElement, api, track } from "lwc";

export default class CustomPropertyRegistrar extends LightningElement {
  @api surveyCreator;
  @track registeredProperties = [];

  connectedCallback() {
    console.log("CustomPropertyRegistrar component connected");
    // Setup event listeners for property ready notifications
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for the fieldmapper:ready event
    this.template.addEventListener(
      "fieldmapper:ready",
      this.handlePropertyComponentReady.bind(this)
    );

    // Add more event listeners for other property types here as needed
    // Example: this.template.addEventListener('otherproperty:ready', this.handlePropertyComponentReady.bind(this));
  }

  @api
  registerCustomProperties() {
    if (!window.Survey || !window.Survey.Serializer) {
      console.error(
        "Cannot register custom properties - Survey.Serializer is not available"
      );
      return;
    }

    console.log("Registering custom properties with SurveyJS");

    // Find all custom property components in the template
    const customPropertyElements =
      this.template.querySelectorAll(".custom-property");

    if (customPropertyElements.length === 0) {
      console.warn("No custom property components found in template");
    } else {
      console.log(
        `Found ${customPropertyElements.length} custom property components`
      );
    }

    // Register each custom property component
    Array.from(customPropertyElements).forEach((element) => {
      this.registerComponentProperty(element);
    });
  }

  registerComponentProperty(element) {
    try {
      const component = element;

      if (!component || typeof component.registerProperty !== "function") {
        console.error(
          "Component missing registerProperty method:",
          element.tagName
        );
        return;
      }

      // Call the component's registerProperty method with SurveyJS and surveyCreator
      component.registerProperty(window.Survey, this.surveyCreator);

      // Get the property name and track it
      const propertyName = component.getPropertyName();

      if (propertyName && !this.registeredProperties.includes(propertyName)) {
        this.registeredProperties.push(propertyName);
        console.log(`Registered custom property: ${propertyName}`);
      }
    } catch (error) {
      console.error("Error registering component property:", error);
    }
  }

  handlePropertyComponentReady(event) {
    console.log(`Property component ready event received: ${event.type}`);

    const component = event.detail?.componentRef;
    if (!component) {
      console.error("No component reference in event detail");
      return;
    }

    if (!window.Survey || !window.Survey.Serializer) {
      console.warn("Survey.Serializer not available for property registration");
      return;
    }

    try {
      // Register the component's property with SurveyJS
      component.registerProperty(window.Survey, this.surveyCreator);

      // Track the registered property
      const propertyName = component.getPropertyName();
      if (propertyName && !this.registeredProperties.includes(propertyName)) {
        this.registeredProperties.push(propertyName);
        console.log(
          `Registered custom property from ready event: ${propertyName}`
        );
      }
    } catch (error) {
      console.error("Error registering property from ready event:", error);
    }
  }

  @api
  getRegisteredProperties() {
    return this.registeredProperties;
  }
}
