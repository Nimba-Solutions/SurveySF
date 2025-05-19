import { LightningElement, api } from 'lwc';

/**
 * Base component for all SurveyJS property components
 * Provides common functionality and interface for property registration
 */
export default class SurveyProperty extends LightningElement {
    @api surveyCreator;
    isInitialized = false;
    targetType = "question"; // Default to question, but can be overridden
    debugMode = false;

    /**
     * The name of the property this component handles
     * Must be overridden by child classes
     */
    get propertyName() {
        throw new Error('propertyName getter must be implemented by child class');
    }

    /**
     * The display name of the property in the SurveyJS property grid
     * Must be overridden by child classes
     */
    get displayName() {
        throw new Error('displayName getter must be implemented by child class');
    }

    /**
     * The category of the property in the SurveyJS property grid
     * Can be overridden by child classes
     */
    get category() {
        return "general";
    }

    /**
     * The visible index of the property in the SurveyJS property grid
     * Can be overridden by child classes
     */
    get visibleIndex() {
        return 0;
    }

    /**
     * The type of the property in SurveyJS
     * Must be overridden by child classes
     */
    get propertyType() {
        throw new Error('propertyType getter must be implemented by child class');
    }

    /**
     * Additional property configuration options
     * Can be overridden by child classes
     */
    get propertyOptions() {
        return {};
    }

    /**
     * Debug logging utility that only logs when debug mode is enabled
     */
    debug(message, ...args) {
        if (this.debugMode) {
            console.debug(`[${this.constructor.name}] ${message}`, ...args);
        }
    }

    /**
     * Enable or disable debug logging
     */
    @api
    setDebugMode(enabled) {
        this.debugMode = !!enabled;
    }

    /**
     * Sets the target type (survey or question) for this property
     */
    @api
    setTargetType(type) {
        this.debug(`Setting target type to: ${type}`);
        if (type === "survey" || type === "question") {
            this.targetType = type;
        }
    }

    /**
     * Dispatches a ready event to notify the property registrar
     */
    dispatchReadyEvent() {
        if (this.isInitialized) {
            const componentName = this.constructor.name
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase()
                .substring(1); // Remove leading dash

            this.debug(`Dispatching ready:${componentName} event`);
            const readyEvent = new CustomEvent(`ready:${componentName}`, {
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
     * Registers the property with SurveyJS
     * This is the main method that child classes should override
     */
    @api
    registerProperty(Survey) {
        if (!Survey || !Survey.Serializer) {
            console.error("Survey.Serializer is not available");
            return Promise.resolve();
        }

        this.debug(`Registering ${this.propertyName} property for ${this.targetType}...`);

        // Add the property to the target type
        Survey.Serializer.addProperty(this.targetType, {
            name: this.propertyName,
            displayName: this.displayName,
            category: this.category,
            visibleIndex: this.visibleIndex,
            type: this.propertyType,
            ...this.propertyOptions
        });

        this.debug(`${this.propertyName} property registered successfully for ${this.targetType}`);
        this.isInitialized = true;
        this.dispatchReadyEvent();
        return Promise.resolve();
    }

    /**
     * Returns the name of the property this component handles
     */
    @api
    getPropertyName() {
        return this.propertyName;
    }
}