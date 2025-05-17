import { LightningElement, api, track } from "lwc";

export default class CustomPropertyRegistrar extends LightningElement {
  @api surveyCreator;
  @track registeredProperties = [];
  // Define the valid target types for SurveyJS properties
  validTargetTypes = ["survey", "question"];

  connectedCallback() {
    console.log("CustomPropertyRegistrar component connected");
  }

  renderedCallback() {
    // Setup event listeners for all custom property components
    this.setupEventListeners();
  }

  /**
   * Gets all LWC custom components within the container (those starting with c-)
   * @returns {Array} Array of objects containing component elements and their target types
   */
  getAllCustomPropertyComponents() {
    // Find the custom properties container
    const container = this.template.querySelector(".custom-properties");

    if (!container) {
      console.warn("Custom properties container not found");
      return [];
    }

    const allComponents = [];

    // Loop through all valid target types (survey, question)
    this.validTargetTypes.forEach((targetType) => {
      // Get the container for this target type
      const typeContainer = container.querySelector(`.${targetType}`);

      if (typeContainer) {
        // Get all LWC components in this container
        const components = Array.from(typeContainer.children).filter(
          (element) => element.tagName.toLowerCase().startsWith("c-")
        );

        // Add each component with its target type
        components.forEach((comp) => {
          allComponents.push({
            element: comp,
            targetType: targetType,
          });
        });
      }
    });

    return allComponents;
  }

  setupEventListeners() {
    // Get all custom property components
    const customPropertyItems = this.getAllCustomPropertyComponents();

    if (customPropertyItems.length === 0) {
      console.warn("No custom property components found");
      return;
    }

    console.log(
      `Found ${customPropertyItems.length} custom property components`
    );

    // Set up listeners for each component based on its tag name
    customPropertyItems.forEach(({ element }) => {
      // Extract the component base name (strip out 'c-' prefix)
      const tagName = element.tagName.toLowerCase();
      const componentName = tagName.replace("c-", "");

      // Create an event name like "ready:uuid-display" for each component
      const eventName = `ready:${componentName}`;

      console.log(`Setting up listener for ${eventName}`);

      // Avoid duplicating listeners
      this.template.removeEventListener(
        eventName,
        this.handlePropertyComponentReady
      );
      this.template.addEventListener(
        eventName,
        this.handlePropertyComponentReady.bind(this)
      );
    });
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

    // Get all custom property components
    const customPropertyItems = this.getAllCustomPropertyComponents();

    if (customPropertyItems.length === 0) {
      console.warn("No custom property components found");
    } else {
      console.log(
        `Found ${customPropertyItems.length} custom property components`
      );
    }

    // Register each custom property component
    customPropertyItems.forEach(({ element, targetType }) => {
      // Extract the component name from its tag for logging
      const tagName = element.tagName.toLowerCase();
      console.log(
        `Processing property component: ${tagName} for ${targetType}`
      );

      // Set the target type on the component before registration
      if (typeof element.setTargetType === "function") {
        element.setTargetType(targetType);
      }

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
      // Get the target type from the event if available
      const targetType = event.detail?.targetType;
      if (targetType && typeof component.setTargetType === "function") {
        component.setTargetType(targetType);
      }

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
