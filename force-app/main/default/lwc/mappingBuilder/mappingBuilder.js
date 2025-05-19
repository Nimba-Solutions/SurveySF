import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MappingBuilder extends LightningElement {
    @api defaultObject;
    @api defaultField;
    @api label = 'Mapping Builder';
    @api required = false;
    @api disabled = false;

    @track selectedObject;
    @track selectedField;
    @track selectedRelatedField;
    @track isRelationship = false;
    @track relatedObject;
    @track error;
    @track showFieldSelector = false;
    @track relationshipChain = [];

    get fieldSelectorKey() {
        return this.selectedObject ? `field-${this.selectedObject}` : '';
    }

    get supportRelationships() {
        console.log('MappingBuilder supportRelationships getter called');
        return true;
    }

    connectedCallback() {
        console.log('MappingBuilder connectedCallback');
        console.log('defaultObject:', this.defaultObject);
        console.log('defaultField:', this.defaultField);
        
        if (this.defaultObject) {
            this.selectedObject = this.defaultObject;
            this.showFieldSelector = true;
        }
        if (this.defaultField) {
            this.selectedField = this.defaultField;
        }
    }

    renderedCallback() {
        console.log('MappingBuilder renderedCallback');
        console.log('selectedObject:', this.selectedObject);
        console.log('selectedField:', this.selectedField);
        console.log('isRelationship:', this.isRelationship);
        console.log('relatedObject:', this.relatedObject);
        console.log('relationshipChain:', JSON.stringify(this.relationshipChain));
    }

    handleObjectChange(event) {
        console.log('MappingBuilder handleObjectChange:', JSON.stringify(event.detail));
        const newObject = event.detail.value;
        
        // Reset all field-related state
        this.selectedField = null;
        this.selectedRelatedField = null;
        this.isRelationship = false;
        this.relatedObject = null;
        this.relationshipChain = [];
        
        // Update the object and show field selector
        this.selectedObject = newObject;
        this.showFieldSelector = !!newObject;
        
        this.dispatchChangeEvent();
    }

    handleFieldChange(event) {
        console.log('MappingBuilder handleFieldChange:', JSON.stringify(event.detail));
        const detail = event.detail;
        
        // Update field selection
        this.selectedField = detail.value;
        this.isRelationship = detail.isRelationship;
        
        // If this is a relationship field, update the related object and add to chain
        if (this.isRelationship && detail.field && detail.field.referenceTo) {
            this.relatedObject = detail.field.referenceTo;
            console.log('Related object set to:', this.relatedObject);
            
            // Add to relationship chain
            this.relationshipChain.push({
                object: this.selectedObject,
                field: detail.field.apiName,
                relatedObject: this.relatedObject
            });
        } else {
            this.relatedObject = null;
            this.relationshipChain = [];
        }
        
        // Reset related field selection
        this.selectedRelatedField = null;
        
        this.dispatchChangeEvent();
    }

    handleRelatedFieldChange(event) {
        console.log('MappingBuilder handleRelatedFieldChange:', JSON.stringify(event.detail));
        const detail = event.detail;
        
        // Update related field selection
        this.selectedRelatedField = detail.value;
        
        // If this is a relationship field, update the chain
        if (detail.isRelationship && detail.field && detail.field.referenceTo) {
            // Add to relationship chain
            this.relationshipChain.push({
                object: this.relatedObject,
                field: detail.field.apiName,
                relatedObject: detail.field.referenceTo
            });
            
            // Update related object for next level
            this.relatedObject = detail.field.referenceTo;
        } else {
            // If not a relationship, keep the current chain but don't add a new level
            this.relatedObject = null;
        }
        
        this.dispatchChangeEvent();
    }

    dispatchChangeEvent() {
        const detail = {
            object: this.selectedObject,
            field: this.selectedField,
            isRelationship: this.isRelationship,
            relatedObject: this.relatedObject,
            relatedField: this.selectedRelatedField,
            relationshipChain: this.relationshipChain
        };
        console.log('MappingBuilder dispatchChangeEvent:', JSON.stringify(detail));
        this.dispatchEvent(new CustomEvent('change', { detail }));
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    @api
    validate() {
        if (this.required) {
            if (!this.selectedObject || !this.selectedField) {
                return {
                    isValid: false,
                    errorMessage: 'Please select both an object and a field'
                };
            }
            if (this.isRelationship && !this.selectedRelatedField) {
                return {
                    isValid: false,
                    errorMessage: 'Please select a related field'
                };
            }
        }
        return { isValid: true };
    }

    @api
    reset() {
        this.selectedObject = this.defaultObject || null;
        this.selectedField = this.defaultField || null;
        this.selectedRelatedField = null;
        this.isRelationship = false;
        this.relatedObject = null;
        this.error = null;
        this.showFieldSelector = !!this.defaultObject;
        this.relationshipChain = [];
    }
} 