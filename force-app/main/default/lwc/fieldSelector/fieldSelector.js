import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFieldsForObject from '@salesforce/apex/FieldService.getFieldsForObject';

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
    @api showLabel = false;
    @api supportRelationships = false;

    @track fields = [];
    @track isLoading = false;
    @track error;
    @track isRelationship = false;

    get selectedOption() {
        return this.selectedField || '';
    }

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
            const fields = await getFieldsForObject({ objectName: this.objectName });
            this.fields = fields.map(field => {
                const isReference = field.type === 'REFERENCE';
                const baseField = {
                    label: field.label,
                    value: field.apiName,
                    type: field.type,
                    isCustom: field.isCustom,
                    isUpdateable: field.isUpdateable,
                    isReference: isReference,
                    referenceTo: field.referenceTo
                };

                // If this is a reference field and relationships are supported, add a relationship option
                if (isReference && this.supportRelationships) {
                    return [
                        baseField,
                        {
                            ...baseField,
                            label: `${field.label} (Relationship)`,
                            value: `rel:${field.apiName}`,
                            isRelationship: true
                        }
                    ];
                }
                return [baseField];
            }).flat();

            // Force the select to show placeholder if no value is set
            if (!this.selectedField) {
                const select = this.template.querySelector('select');
                if (select) {
                    select.value = '';
                }
            }
        } catch (error) {
            console.error('Error loading fields:', error);
            this.error = error.message;
            this.showToast('Error', 'Failed to load fields: ' + error.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    handleFieldChange(event) {
        const selectedValue = event.target.value;
        this.selectedField = selectedValue;
        this.isRelationship = selectedValue.startsWith('rel:');
        
        const field = this.fields.find(f => f.value === selectedValue);
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.selectedField,
                field: field,
                isRelationship: this.isRelationship,
                referenceTo: field?.referenceTo
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
        this.isRelationship = false;
        this.error = null;
        // Force the select to show placeholder
        const select = this.template.querySelector('select');
        if (select) {
            select.value = '';
        }
    }
} 