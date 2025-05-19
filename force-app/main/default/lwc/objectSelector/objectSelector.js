import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getObjects from '@salesforce/apex/ObjectSelectorController.getObjects';

export default class ObjectSelector extends LightningElement {
    @api name;
    @api label = 'Object';
    @api value;
    @api required = false;
    @api disabled = false;
    @api showLabel = false;

    @track objects = [];
    @track error;
    @track isLoading = false;
    @track selectedObject;

    connectedCallback() {
        console.log('ObjectSelector connectedCallback');
        console.log('value:', this.value);
        
        this.loadObjects();
        
        if (this.value) {
            this.selectedObject = this.value;
        }
    }

    renderedCallback() {
        console.log('ObjectSelector renderedCallback');
        console.log('objects:', JSON.stringify(this.objects));
        console.log('selectedObject:', this.selectedObject);
    }

    async loadObjects() {
        console.log('ObjectSelector loadObjects');
        this.isLoading = true;
        this.error = null;
        
        try {
            const objects = await getObjects();
            console.log('Objects loaded:', JSON.stringify(objects));
            
            this.objects = objects.map(obj => ({
                label: obj.label,
                value: obj.apiName
            }));
        } catch (error) {
            console.error('Error loading objects:', error);
            this.error = error.body?.message || 'Error loading objects';
            this.showToast('Error', this.error, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    handleObjectChange(event) {
        console.log('ObjectSelector handleObjectChange:', JSON.stringify(event.detail));
        const detail = event.detail;
        this.selectedObject = detail.value;
        
        // Dispatch change event with object details
        this.dispatchEvent(new CustomEvent('change', { 
            detail: {
                value: detail.value,
                object: detail.option
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
    }
} 