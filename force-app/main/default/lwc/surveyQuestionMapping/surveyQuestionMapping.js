import { LightningElement, api, wire, track } from 'lwc';
import getAvailableObjects from '@salesforce/apex/SurveyMetadataService.getAvailableObjects';
import getFieldsForObject from '@salesforce/apex/SurveyMetadataService.getFieldsForObject';

export default class SurveyQuestionMapping extends LightningElement {
    @api 
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.parseInitialValue();
    }
    
    _value = '';
    @api question;
    
    @track selectedObject = '';
    @track selectedField = '';
    @track objectOptions = [];
    @track fieldOptions = [];
    @track isLoading = true;
    @track error;
    
    get fieldSelectDisabled() {
        return !this.selectedObject;
    }
    
    connectedCallback() {
        console.log('SurveyQuestionMapping component connected');
        this.loadObjects();
    }
    
    renderedCallback() {
        // Dispatch a custom event to notify the parent component that this component is ready
        if (this.objectOptions.length > 0 && !this.isLoading) {
            console.log('SurveyQuestionMapping component is ready, dispatching ready event');
            this.dispatchEvent(new CustomEvent('mappingcomponentready', {
                bubbles: true,
                composed: true,
                detail: {
                    componentRef: this
                }
            }));
        }
    }
    
    parseInitialValue() {
        // Parse the initial value if it exists
        if (this._value) {
            try {
                console.log('Parsing initial value:', this._value);
                const mapping = typeof this._value === 'string' ? JSON.parse(this._value) : this._value;
                this.selectedObject = mapping.object || '';
                this.selectedField = mapping.field || '';
                
                if (this.selectedObject) {
                    this.loadFieldsForObject();
                }
            } catch (error) {
                console.error('Error parsing mapping value:', JSON.stringify(error, Object.getOwnPropertyNames(error)), this._value);
                this.error = 'Invalid mapping format: ' + (error.message || JSON.stringify(error));
            }
        }
    }
    
    loadObjects() {
        console.log('Attempting to load objects from SurveyMetadataService...');
        this.isLoading = true;
        getAvailableObjects()
            .then(result => {
                console.log('Successfully loaded objects from SurveyMetadataService:', result.length);
                this.objectOptions = result.map(obj => ({
                    label: obj.label,
                    value: obj.apiName
                }));
                this.isLoading = false;
                
                // Dispatch the ready event now that we have loaded the objects
                this.notifyReady();
            })
            .catch(error => {
                console.error('Error loading objects:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                this.error = 'Error loading objects: ' + (error.message || JSON.stringify(error));
                this.isLoading = false;
            });
    }
    
    notifyReady() {
        console.log('SurveyQuestionMapping component is ready, dispatching ready event');
        this.dispatchEvent(new CustomEvent('mappingcomponentready', {
            bubbles: true,
            composed: true,
            detail: {
                componentRef: this
            }
        }));
    }
    
    loadFieldsForObject() {
        if (!this.selectedObject) {
            this.fieldOptions = [];
            return;
        }
        
        this.isLoading = true;
        getFieldsForObject({ objectName: this.selectedObject })
            .then(result => {
                console.log('Loaded fields for', this.selectedObject, ':', result.length);
                this.fieldOptions = result.map(field => ({
                    label: field.label,
                    value: field.apiName,
                    type: field.type
                }));
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Error loading fields:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                this.error = 'Error loading fields: ' + (error.message || JSON.stringify(error));
                this.isLoading = false;
            });
    }
    
    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        this.selectedField = ''; // Reset field selection
        this.loadFieldsForObject();
        this.updateValue();
    }
    
    handleFieldChange(event) {
        this.selectedField = event.detail.value;
        this.updateValue();
    }
    
    updateValue() {
        try {
            const mapping = {
                object: this.selectedObject,
                field: this.selectedField,
                questionType: this.question ? this.question.getType() : ''
            };
            
            const mappingJson = JSON.stringify(mapping);
            console.log('Updating mapping value:', mappingJson);
            
            // Dispatch a custom event with the new value
            const valueChangeEvent = new CustomEvent('valuechange', {
                detail: mappingJson,
                bubbles: true,
                composed: true
            });
            
            this.dispatchEvent(valueChangeEvent);
        } catch (error) {
            console.error('Error updating mapping value:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
            this.error = 'Error updating mapping: ' + (error.message || JSON.stringify(error));
        }
    }
} 