import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FieldSelector extends LightningElement {
    @api objectName;
    @api selectedField;
    @api label = 'Select Field';
    @api placeholder = 'Select a field...';
    @api required = false;
    @api disabled = false;
    @api variant = 'label-hidden';
    @api name;
    @api fieldType;
    @api showLabel = true;

    @track fields = [];
    @track isLoading = false;
    @track error;

    connectedCallback() {
        if (this.objectName) {
            this.loadFields();
        }
    }

    @api
    get value() {
        return this.selectedField;
    }

    set value(value) {
        this.selectedField = value;
    }

    @api
    async loadFields() {
        if (!this.objectName) {
            console.warn('No object name provided to fieldSelector');
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            // TODO: Replace with actual field loading logic
            // This should load fields from the object based on fieldType if specified
            const fields = await this.getFieldsForObject(this.objectName, this.fieldType);
            this.fields = fields;
        } catch (error) {
            console.error('Error loading fields:', error);
            this.error = error.message;
            this.showToast('Error', 'Failed to load fields: ' + error.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    async getFieldsForObject(objectName, fieldType) {
        // TODO: Implement actual field loading logic
        // This should:
        // 1. Get fields from the object
        // 2. Filter by fieldType if specified
        // 3. Return array of { label, value } objects
        return [];
    }

    handleFieldChange(event) {
        this.selectedField = event.detail.value;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.selectedField,
                field: this.fields.find(f => f.value === this.selectedField)
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