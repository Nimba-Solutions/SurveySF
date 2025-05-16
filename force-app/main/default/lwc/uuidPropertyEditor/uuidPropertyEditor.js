import { LightningElement, api } from 'lwc';
import SURVEY_EXTENSIONS from '@salesforce/resourceUrl/surveyExtensions';
import { loadScript } from 'lightning/platformResourceLoader';

export default class UuidPropertyEditor extends LightningElement {
    @api surveyCreator;
    extensionLoaded = false;
    
    connectedCallback() {
        this.loadExtension();
    }
    
    loadExtension() {
        if (this.extensionLoaded) {
            console.log('UUID Property Editor already loaded');
            return Promise.resolve();
        }
        
        return loadScript(this, SURVEY_EXTENSIONS + '/uuidPropertyEditor.js')
            .then(() => {
                if (window.UuidPropertyEditor && typeof window.UuidPropertyEditor.register === 'function') {
                    console.log('Registering UUID Property Editor...');
                    window.UuidPropertyEditor.register();
                    this.extensionLoaded = true;
                    this.dispatchEvent(new CustomEvent('extensionloaded', {
                        detail: { name: 'uuidPropertyEditor' }
                    }));
                    console.log('UUID Property Editor registered successfully');
                } else {
                    console.error('UuidPropertyEditor global object not found or missing register method');
                }
            })
            .catch(error => {
                console.error('Error loading UUID Property Editor:', error);
            });
    }
    
    @api
    getPropertyName() {
        return 'uuid';
    }
    
    @api
    registerProperty(Survey, surveyCreator) {
        // This is a wrapper method to support the customPropertyRegistrar interface
        // The actual registration is done by the TypeScript extension
        if (!this.extensionLoaded) {
            console.warn('UUID Property Editor not loaded yet');
            // Try to load it
            return this.loadExtension();
        }
        
        return Promise.resolve();
    }
} 