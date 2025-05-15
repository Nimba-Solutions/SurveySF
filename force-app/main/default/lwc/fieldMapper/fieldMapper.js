import { LightningElement, api, track } from 'lwc';

export default class FieldMapper extends LightningElement {
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
    @api propertyName = 'fieldMapper';
    @api displayName = 'Salesforce Field Mapper';
    @api fieldType = '';
    @api sObject = '';
    
    @track error;
    @track metadataSelector;
    
    connectedCallback() {
        console.log('FieldMapper component connected');
    }
    
    renderedCallback() {
        if (!this.metadataSelector) {
            this.metadataSelector = this.template.querySelector('c-metadata-selector');
            if (this.metadataSelector) {
                console.log('FieldMapper found the metadata selector');
            }
        }
    }
    
    parseInitialValue() {
        // This will be handled by the metadataSelector component
        console.log('FieldMapper passing value to metadata selector:', this._value);
    }
    
    handleValueChange(event) {
        console.log('FieldMapper got value change event:', event.detail);
        this._value = event.detail.value;
        
        // Dispatch a custom event with the new value
        const valueChangeEvent = new CustomEvent('valuechange', {
            detail: event.detail.value,
            bubbles: true,
            composed: true
        });
        
        this.dispatchEvent(valueChangeEvent);
    }
    
    handleReady(event) {
        console.log('FieldMapper: metadataSelector is ready');
        this.dispatchEvent(new CustomEvent('fieldmapper:ready', {
            bubbles: true,
            composed: true,
            detail: {
                componentRef: this
            }
        }));
    }
    
    // Methods for the Custom Property Registrar
    @api
    registerProperty(Survey, surveyCreator) {
        if (!Survey || !Survey.Serializer) {
            console.error('Survey.Serializer is not available');
            return;
        }
        
        // Add the custom property to all questions
        Survey.Serializer.addProperty("question", {
            name: this.propertyName,
            displayName: this.displayName,
            type: "string",
            isSerializable: true,
            visibleIndex: 3,
            onPropertyEditorUpdate: (propertyEditor, property) => {
                const obj = property.object;
                // This is called when the property editor is created
                
                // Handle click on edit button
                propertyEditor.koAddClick = () => {
                    // Store the current question reference
                    this.question = obj;
                    
                    // Trigger modal opening in survey builder
                    const openMappingEvent = new CustomEvent('openmapping', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            question: obj,
                            propertyName: this.propertyName,
                            component: this
                        }
                    });
                    this.dispatchEvent(openMappingEvent);
                };
            }
        });
        
        console.log(`Registered custom property: ${this.propertyName}`);
    }
    
    @api
    getPropertyName() {
        return this.propertyName;
    }
    
    @api
    reset() {
        if (this.metadataSelector) {
            this.metadataSelector.reset();
        }
    }
} 