import { LightningElement, api, track } from 'lwc';
import getAvailableObjects from '@salesforce/apex/SurveyMetadataService.getAvailableObjects';
import getFieldsForObject from '@salesforce/apex/SurveyMetadataService.getFieldsForObject';

export default class MetadataSelector extends LightningElement {
    @api 
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.parseInitialValue();
    }
    
    // New input parameters
    @api sObject = '';
    @api fieldType = '';
    
    _value = '';
    
    @track selectedObject = '';
    @track selectedField = '';
    @track objectOptions = [];
    @track fieldOptions = [];
    @track fieldOptionsUnfiltered = [];
    @track isLoading = true;
    @track error;
    
    get fieldSelectDisabled() {
        return !this.selectedObject;
    }
    
    connectedCallback() {
        console.log('MetadataSelector component connected');
        this.loadObjects();
        
        // Apply sObject input if provided
        if (this.sObject && !this.selectedObject) {
            this.selectedObject = this.sObject;
            this.loadFieldsForObject();
        }
    }
    
    renderedCallback() {
        if (this.objectOptions.length > 0 && !this.isLoading) {
            console.log('MetadataSelector component is ready, dispatching ready event');
            this.notifyReady();
        }
    }
    
    parseInitialValue() {
        // Parse the initial value if it exists
        if (this._value) {
            try {
                console.log('Parsing initial value:', this._value);
                const mapping = typeof this._value === 'string' ? JSON.parse(this._value) : this._value;
                this.selectedObject = mapping.object || this.sObject || '';
                this.selectedField = mapping.field || '';
                
                if (this.selectedObject) {
                    this.loadFieldsForObject();
                }
            } catch (error) {
                console.error('Error parsing mapping value:', error);
                this.error = 'Invalid mapping format: ' + (error.message || JSON.stringify(error));
            }
        }
    }
    
    loadObjects() {
        console.log('Loading available Salesforce objects...');
        this.isLoading = true;
        getAvailableObjects()
            .then(result => {
                console.log('Successfully loaded objects:', result.length);
                this.objectOptions = result.map(obj => ({
                    label: obj.label,
                    value: obj.apiName
                }));
                this.isLoading = false;
                // Removed duplicate call to notifyReady() here
                
                // If sObject was specified, select it now
                if (this.sObject && !this.selectedObject) {
                    this.selectedObject = this.sObject;
                    this.loadFieldsForObject();
                }
            })
            .catch(error => {
                console.error('Error loading objects:', error);
                this.error = 'Error loading objects: ' + (error.message || JSON.stringify(error));
                this.isLoading = false;
            });
    }
    
    notifyReady() {
        console.log('MetadataSelector component is ready, dispatching ready event');
        this.dispatchEvent(new CustomEvent('custompropready', {
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
            this.fieldOptionsUnfiltered = [];
            return;
        }
        
        this.isLoading = true;
        getFieldsForObject({ objectName: this.selectedObject })
            .then(result => {
                console.log('Loaded fields for', this.selectedObject, ':', result.length);
                // Store all fields first
                this.fieldOptionsUnfiltered = result.map(field => ({
                    label: field.label,
                    value: field.apiName,
                    type: field.type
                }));
                
                // Then filter if fieldType is specified
                this.filterFieldsByType();
                
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Error loading fields:', error);
                this.error = 'Error loading fields: ' + (error.message || JSON.stringify(error));
                this.isLoading = false;
            });
    }
    
    filterFieldsByType() {
        if (!this.fieldType || !this.fieldOptionsUnfiltered.length) {
            this.fieldOptions = [...this.fieldOptionsUnfiltered]; // Use all fields if no type filter
            return;
        }
        
        // Convert fieldType to lowercase for case-insensitive comparison
        const typeLower = this.fieldType.toLowerCase();
        
        this.fieldOptions = this.fieldOptionsUnfiltered.filter(field => {
            // If field.type is available, check if it matches or contains the requested fieldType
            if (field.type) {
                return field.type.toLowerCase().includes(typeLower);
            }
            return true; // Include fields with no type information
        });
        
        console.log(`Filtered fields by type '${this.fieldType}': ${this.fieldOptions.length} of ${this.fieldOptionsUnfiltered.length}`);
        
        // If current selection is no longer valid, clear it
        if (this.selectedField && !this.fieldOptions.some(f => f.value === this.selectedField)) {
            this.selectedField = '';
            this.notifyValueChange();
        }
    }
    
    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        this.selectedField = ''; // Reset field selection
        this.loadFieldsForObject();
        this.notifyValueChange();
    }
    
    handleFieldChange(event) {
        this.selectedField = event.detail.value;
        this.notifyValueChange();
    }
    
    notifyValueChange() {
        try {
            const selection = {
                object: this.selectedObject,
                field: this.selectedField,
                fieldType: this.getSelectedFieldType()
            };
            
            const selectionJson = JSON.stringify(selection);
            this._value = selectionJson;
            
            // Dispatch a custom event with the new value
            const valueChangeEvent = new CustomEvent('valuechange', {
                detail: {
                    value: selectionJson,
                    selection: selection
                },
                bubbles: true,
                composed: true
            });
            
            this.dispatchEvent(valueChangeEvent);
        } catch (error) {
            console.error('Error updating selection value:', error);
            this.error = 'Error updating selection: ' + (error.message || JSON.stringify(error));
        }
    }
    
    getSelectedFieldType() {
        if (!this.selectedField) return null;
        const selectedFieldInfo = this.fieldOptionsUnfiltered.find(f => f.value === this.selectedField);
        return selectedFieldInfo ? selectedFieldInfo.type : null;
    }
    
    @api
    getSelection() {
        return {
            object: this.selectedObject,
            field: this.selectedField,
            fieldType: this.getSelectedFieldType()
        };
    }
    
    @api
    getSelectionJson() {
        return JSON.stringify(this.getSelection());
    }
    
    @api
    reset() {
        this.selectedObject = this.sObject || ''; // Reset to initial sObject if provided
        this.selectedField = '';
        this.fieldOptions = [];
        this.fieldOptionsUnfiltered = [];
        this._value = '';
        
        if (this.selectedObject) {
            this.loadFieldsForObject(); // Reload fields if we have an object
        }
        
        this.notifyValueChange();
    }
    
    /**
     * Updates the field type filter and refilters fields
     * @param {String} newFieldType - The field type to filter by
     */
    @api
    updateFieldTypeFilter(newFieldType) {
        this.fieldType = newFieldType;
        this.filterFieldsByType();
    }
} 


