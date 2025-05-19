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

    get fieldSelectorKey() {
        return this.selectedObject ? `field-${this.selectedObject}` : '';
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
    }

    handleObjectChange(event) {
        console.log('MappingBuilder handleObjectChange:', event.detail);
        const newObject = event.detail.value;
        
        // Reset all field-related state
        this.selectedField = null;
        this.selectedRelatedField = null;
        this.isRelationship = false;
        this.relatedObject = null;
        
        // Temporarily hide field selector
        this.showFieldSelector = false;
        
        // Update the object
        this.selectedObject = newObject;
        
        // Force a re-render of the field selector
        if (newObject) {
            // Use setTimeout to ensure the field selector is removed before being re-added
            setTimeout(() => {
                this.showFieldSelector = true;
            }, 0);
        }
        
        this.dispatchChangeEvent();
    }

    handleFieldChange(event) {
        console.log('MappingBuilder handleFieldChange:', event.detail);
        this.selectedField = event.detail.value;
        this.isRelationship = event.detail.isRelationship;
        this.relatedObject = event.detail.referenceTo;
        this.selectedRelatedField = null;
        this.dispatchChangeEvent();
    }

    handleRelatedFieldChange(event) {
        console.log('MappingBuilder handleRelatedFieldChange:', event.detail);
        this.selectedRelatedField = event.detail.value;
        this.dispatchChangeEvent();
    }

    dispatchChangeEvent() {
        const detail = {
            object: this.selectedObject,
            field: this.selectedField,
            isRelationship: this.isRelationship,
            relatedObject: this.relatedObject,
            relatedField: this.selectedRelatedField
        };
        console.log('MappingBuilder dispatchChangeEvent:', detail);
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
    }
} 