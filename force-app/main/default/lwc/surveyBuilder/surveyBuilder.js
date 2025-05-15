import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore';
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui';
import SURVEY_CORE_CSS from "@salesforce/resourceUrl/surveycoremin";
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss';
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs';
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin';
import SURVEY_INDEX_JS from '@salesforce/resourceUrl/indexmin';
import DEFAULT_SURVEY_JSON from '@salesforce/resourceUrl/defaultSurveyJson';

// APEX
// import saveSurvey from '@salesforce/apex/SurveyBuilderController.saveSurvey';
import loadLatestVersion from '@salesforce/apex/SurveyBuilderController.getLatestVersionBySurveyIdPOC';
import saveSurvey from '@salesforce/apex/SurveyBuilderController.saveSurveyPOC';

export default class SurveyBuilder extends LightningElement {
    surveyInitialized = false;
    @track isLoading = true;
    resourcesLoading = false; // Flag to prevent repeated resource loading attempts
    surveyJson = {};
    notFound = false;
    @track hasUnsavedChanges = false;
    creator = null;
    defaultSurveyJson;
    surveyId;
    @track showModal = false;
    currentQuestion = null;
    surveyResourcesLoaded = false;
    surveyDataLoaded = false;
    
    get isSaveDisabled() {
        return this.isLoading || !this.hasUnsavedChanges;
    }
    
    get currentQuestionText() {
        if (!this.currentQuestion) return '';
        
        // Try to get a meaningful name for the question
        const name = this.currentQuestion.name || '';
        const title = this.currentQuestion.title || '';
        const type = this.currentQuestion.getType ? this.currentQuestion.getType() : '';
        
        if (title) return `${title} (${type})`;
        if (name) return `${name} (${type})`;
        return type || 'Question';
    }

    connectedCallback() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        if(urlParams.has('versionId')) {
            const versionId = urlParams.get('versionId');
            console.log(`TODO: Load Survey Content for SurveyVersion__c.Id: ${versionId}`);
        } else if(urlParams.has('surveyId')) {
            const surveyId = urlParams.get('surveyId');
            console.log(`TODO: Load Survey Content for Survey__c.Id's latest SurveyVersion__c: ${surveyId}`);
        }
    }

    renderedCallback() {
        // Skip if already initialized or resources are currently loading
        if (this.surveyInitialized || this.resourcesLoading) {
            return;
        }

        // Set flag to prevent concurrent loading
        this.resourcesLoading = true;

        // First initialize the custom property registrar
        this.initializeCustomPropertyRegistrar()
            .then(() => {
                // Now load survey resources
                return this.loadSurveyResources();
            })
            .then(() => {
                this.surveyResourcesLoaded = true;
                console.log('Survey resources loaded successfully');
                
                // Next load the survey data
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                
                if (urlParams.has('c__surveyId')) {
                    this.surveyId = urlParams.get('c__surveyId');
                    return loadLatestVersion({ surveyId: this.surveyId })
                        .then(result => {
                            if (result == null || result == undefined) {
                                this.notFound = true;
                                this.showErrorToast('Survey not found');
                                return null;
                            }
                            return JSON.parse(result);
                        });
                } else {
                    // Use default survey JSON
                    return fetch(DEFAULT_SURVEY_JSON).then(response => response.json());
                }
            })
            .then(surveyData => {
                if (!surveyData) return;
                
                this.surveyJson = surveyData;
                this.isLoading = false;
                this.surveyDataLoaded = true;
                console.log('Survey data loaded:', this.surveyJson);
                
                // Check if we can initialize now
                this.resourcesLoading = false;
                this.checkAndInitializeSurvey();
            })
            .catch(error => {
                console.error('Error in survey loading process:', error);
                this.showErrorToast('Error loading survey: ' + (error.message || JSON.stringify(error)));
                this.isLoading = false;
                this.resourcesLoading = false;
            });
    }
    
    // Fix the initializeCustomPropertyRegistrar method
    initializeCustomPropertyRegistrar() {
        console.log('Initializing custom property registrar...');
        // Get the property registrar via lwc:ref instead of querySelector
        const propertyRegistrar = this.refs.propertyRegistrar;
        if (!propertyRegistrar) {
            console.warn('Custom property registrar reference not found');
            return Promise.resolve();
        }
        
        return Promise.resolve();
    }
    
    // Load SurveyJS resources in sequence to ensure proper dependency order
    loadSurveyResources() {
        console.log('Starting to load Survey resources in sequence...');
        
        // Step 1: Load CSS first
        return Promise.all([
            loadStyle(this, SURVEY_CORE_CSS),
            loadStyle(this, SURVEY_CREATOR_CORE_CSS)
        ])
        .then(() => {
            console.log('Survey CSS loaded successfully');
            
            // Step 2: Load Survey core
            return loadScript(this, SURVEY_CORE);
        })
        .then(() => {
            console.log('Survey core loaded successfully: window.Survey =', !!window.Survey);
            
            // Step 3: Load SurveyJS UI
            return loadScript(this, SURVEY_JS_UI);
        })
        .then(() => {
            console.log('SurveyJS UI loaded successfully');
            
            // Step 4: Load Survey Creator Core
            return loadScript(this, SURVEY_CREATOR_CORE_JS);
        })
        .then(() => {
            console.log('Survey Creator Core loaded successfully: window.SurveyCreator =', !!window.SurveyCreator);
            
            // Step 5: Load Survey Creator
            return loadScript(this, SURVEY_CREATOR_JS);
        })
        .then(() => {
            console.log('Survey Creator loaded successfully: SurveyCreator.SurveyCreator =', 
                      !!window.SurveyCreator?.SurveyCreator);
            
            if (!window.SurveyCreator || !window.SurveyCreator.SurveyCreator) {
                console.log('SurveyCreator diagnostic info:');
                console.log('SurveyCreator object keys:', window.SurveyCreator ? Object.keys(window.SurveyCreator) : 'undefined');
            }
            
            // Step 6: Load Index
            return loadScript(this, SURVEY_INDEX_JS);
        })
        .then(() => {
            console.log('All survey resources loaded successfully');
            return Promise.resolve();
        });
    }

    // Update the initializeSurvey method to use refs
    initializeSurvey() {
        // Check if already initialized to avoid re-initialization
        if (this.surveyInitialized) {
            console.log('Survey already initialized. Skipping initialization.');
            return;
        }
        
        // Make sure all required libraries are loaded
        if (!window.Survey || !window.Survey.Serializer || !window.SurveyCreator || !window.SurveyCreator.SurveyCreator) { 
            console.error('SurveyJS libraries not fully loaded. Survey:', !!window.Survey, 
                          'Serializer:', !!window.Survey?.Serializer, 
                          'SurveyCreator:', !!window.SurveyCreator, 
                          'SurveyCreator.SurveyCreator:', !!window.SurveyCreator?.SurveyCreator);
            
            // Try to manually fix the SurveyCreator object if needed
            if (window.Survey && !window.SurveyCreator) {
                console.log('Attempting to fix missing SurveyCreator...');
                if (window.SurveyCreatorCore) {
                    window.SurveyCreator = window.SurveyCreatorCore;
                    console.log('Assigned SurveyCreatorCore to SurveyCreator');
                }
            }
            
            return;
        }
        
        console.log('Initializing Survey...');
        this.surveyInitialized = true;
        
        try {
            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true
            };
            
            const creator = new window.SurveyCreator.SurveyCreator(creatorOptions);
            this.creator = creator;
            
            // Register custom properties with the registrar after creator is available
            // Use the lwc:ref instead of querySelector
            const propertyRegistrar = this.refs.propertyRegistrar;
            if (propertyRegistrar) {
                propertyRegistrar.surveyCreator = this.creator;
                propertyRegistrar.registerCustomProperties();
                console.log('Registered custom properties via registrar');
            } else {
                console.warn('Custom property registrar reference not found for registration');
            }
            
            console.log('Added POC custom property with "value" type');
            
            creator.text = JSON.stringify(this.surveyJson);
            
            creator.saveSurveyFunc = (saveNo, callback) => {
                this.hasUnsavedChanges = true;
                this.surveyJson = JSON.parse(creator.text);
                callback(saveNo, true);
            };
            
            creator.render(this.template.querySelector('.surveyContainer'));
            console.log('Survey Creator rendered successfully');
            
            // Initialize the event debugger only after creator is fully ready
            setTimeout(() => {
                // Find and refresh the event debugger
                const eventDebugger = this.template.querySelector('c-survey-js-event-debugger');
                if (eventDebugger) {
                    console.log('Refreshing the event debugger with the initialized creator');
                    eventDebugger.refresh();
                }
            }, 500);
            
        } catch (error) {
            console.error('Error initializing survey:', error);
            this.showErrorToast('Error initializing survey: ' + (error.message || JSON.stringify(error)));
            this.surveyInitialized = false; // Reset flag so we can try again
        }
    }

    handleSave(event) {
        if(!this.surveyJson.title) {
            this.showErrorToast('Please provide survey title');
            return;
        }
        // Log survey JSON to console
        console.log(JSON.stringify(this.surveyJson, null, 2));

        // This is a POC for saving survey
        saveSurvey({ surveyId: this.surveyId, jsonString: JSON.stringify(this.surveyJson) })
            .then(() => {
                this.showSuccessToast('Survey saved successfully!');
                this.hasUnsavedChanges = false;
            })
            .catch(error => {
                console.error('Error saving survey:', error);
                this.showErrorToast('Error saving survey');
            });
    }

    showSuccessToast(message) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message,
            variant: 'success'
        }));
    }

    showErrorToast(message) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error',
            message,
            variant: 'error'
        }));
    }

    checkAndInitializeSurvey() {
        // Only proceed if we have both resources and data loaded
        if (this.surveyResourcesLoaded && this.surveyDataLoaded && !this.surveyInitialized) {
            console.log('Both resources and data are loaded, initializing survey...');
            this.initializeSurvey();
        } else {
            console.log('Not ready to initialize yet. Resources loaded:', this.surveyResourcesLoaded, 
                      'Data loaded:', this.surveyDataLoaded, 
                      'Already initialized:', this.surveyInitialized);
        }
    }
}