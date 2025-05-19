import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFields from '@salesforce/apex/FieldSelectorController.getFields';

export default class FieldSelector extends LightningElement {
    @api name;
    @api label = 'Field';
    @api objectName;
    @api value;
    @api required = false;
    @api disabled = false;
    @api showLabel = false;
    @api supportRelationships = false;

    @track fields = [];
    @track error;
    @track isLoading = false;
    @track selectedField;

    connectedCallback() {
        console.log('FieldSelector connectedCallback');
        console.log('objectName:', this.objectName);
        console.log('value:', this.value);
        console.log('supportRelationships:', this.supportRelationships);
        
        if (this.objectName) {
            this.loadFields();
        }
        if (this.value) {
            this.selectedField = this.value;
        }
    }

    renderedCallback() {
        console.log('FieldSelector renderedCallback');
        console.log('fields:', JSON.stringify(this.fields));
        console.log('selectedField:', this.selectedField);
    }

    async loadFields() {
        console.log('FieldSelector loadFields');
        this.isLoading = true;
        this.error = null;
        
        try {
            const fields = await getFields({ 
                objectName: this.objectName,
                supportRelationships: this.supportRelationships
            });
            console.log('Fields loaded:', JSON.stringify(fields));
            
            this.fields = fields.map(field => ({
                label: field.label,
                value: field.apiName,
                isRelationship: field.isRelationship,
                referenceTo: field.referenceTo
            }));
        } catch (error) {
            console.error('Error loading fields:', error);
            this.error = error.body?.message || 'Error loading fields';
            this.showToast('Error', this.error, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    handleFieldChange(event) {
        console.log('FieldSelector handleFieldChange:', JSON.stringify(event.detail));
        const detail = event.detail;
        this.selectedField = detail.value;
        
        // Dispatch change event with field details
        this.dispatchEvent(new CustomEvent('change', { 
            detail: {
                value: detail.value,
                isRelationship: detail.option.isRelationship,
                field: detail.option
            }
        }));
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
        if (this.required && !this.selectedField) {
            return {
                isValid: false,
                errorMessage: 'Please select a field'
            };
        }
        return { isValid: true };
    }

    @api
    reset() {
        this.selectedField = null;
        this.error = null;
    }
} 