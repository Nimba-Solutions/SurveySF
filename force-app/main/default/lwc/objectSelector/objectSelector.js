import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAvailableObjects from '@salesforce/apex/ObjectService.getAvailableObjects';

export default class ObjectSelector extends LightningElement {
    @api selectedObject;
    @api label = 'Select Object';
    @api placeholder = 'Select an object...';
    @api required = false;
    @api disabled = false;
    @api variant = 'label-hidden';
    @api name;
    @api showLabel = false;

    @track objects = [];
    @track isLoading = false;
    @track error;

    get selectedOption() {
        return this.selectedObject || '';
    }

    connectedCallback() {
        this.loadObjects();
    }

    @api
    get value() {
        return this.selectedObject;
    }

    set value(value) {
        this.selectedObject = value;
    }

    @api
    async loadObjects() {
        this.isLoading = true;
        this.error = null;

        try {
            const objects = await getAvailableObjects();
            this.objects = objects.map(obj => ({
                label: obj.label,
                value: obj.apiName
            }));
            
            // Force the select to show placeholder if no value is set
            if (!this.selectedObject) {
                const select = this.template.querySelector('select');
                if (select) {
                    select.value = '';
                }
            }
        } catch (error) {
            console.error('Error loading objects:', error);
            this.error = error.message;
            this.showToast('Error', 'Failed to load objects: ' + error.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    handleObjectChange(event) {
        const selectedValue = event.target.value;
        this.selectedObject = selectedValue;
        
        const object = this.objects.find(obj => obj.value === selectedValue);
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.selectedObject,
                object: object
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
        if (this.required && !this.selectedObject) {
            return {
                isValid: false,
                errorMessage: 'Please select an object'
            };
        }
        return { isValid: true };
    }

    @api
    reset() {
        this.selectedObject = null;
        this.error = null;
        // Force the select to show placeholder
        const select = this.template.querySelector('select');
        if (select) {
            select.value = '';
        }
    }
} 