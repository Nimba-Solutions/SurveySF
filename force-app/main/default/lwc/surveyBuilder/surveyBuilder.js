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
    surveyJson = {};
    notFound = false;
    @track hasUnsavedChanges = false;
    creator = null;
    defaultSurveyJson;
    surveyId;
    mappingComponent = null;
    _mappingComponentQueried = false; // Flag to ensure querySelector runs once
    
    get isSaveDisabled() {
        return this.isLoading || !this.hasUnsavedChanges;
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
        // Attempt to get the mapping component reference only once after it's rendered
        if (!this._mappingComponentQueried && !this.mappingComponent) {
            this.mappingComponent = this.template.querySelector('c-survey-question-mapping');
            if (this.mappingComponent) {
                console.log('Mapping component reference obtained in renderedCallback:', this.mappingComponent);
                this._mappingComponentQueried = true;
                // If SurveyJS is already initialized and waiting, pass it now
                if (window.Survey && window.SurveyCreator && this.creator && !window.Survey.mappingComponent) {
                    window.Survey.mappingComponent = this.mappingComponent;
                    console.log('Made mapping component available to SurveyJS from renderedCallback:', this.mappingComponent);
                }
            } else {
                 // If the component is not found yet, set flag to try again on next render cycle
                 // This might happen if c-survey-question-mapping itself has internal async rendering
                 this._mappingComponentQueried = false;
            }
        }

        if (this.surveyInitialized) {
            // console.log('Survey already initialized, skipping resource loading in renderedCallback.');
            return;
        }

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        // Load survey JSON of the latest version if surveyId is provided
        if(urlParams.has('c__surveyId')){
            this.surveyId = urlParams.get('c__surveyId');
            loadLatestVersion({ surveyId: this.surveyId })
            .then(result => {
                if (result == null || result == undefined) {
                    this.notFound = true;
                    this.showErrorToast('Survey not found');
                    return;
                }
                
                console.log('Loading Survey resources...');
                Promise.all([
                    loadStyle(this, SURVEY_CORE_CSS),
                    loadScript(this, SURVEY_CORE),
                    loadScript(this, SURVEY_JS_UI),
                    loadStyle(this, SURVEY_CREATOR_CORE_CSS),
                    loadScript(this, SURVEY_CREATOR_CORE_JS),
                    loadScript(this, SURVEY_CREATOR_JS),
                    loadScript(this, SURVEY_INDEX_JS)
                ])
                .then(([,,,,,,]) => {
                    console.log('Survey resources loaded successfully.');
                    console.log(`Survey JSON: ${result}`);
                    this.isLoading = false;
                    this.surveyJson = JSON.parse(result);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading resources:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                    this.showErrorToast('Error loading survey resources: ' + (error.message || JSON.stringify(error)));
                    this.isLoading = false;
                });

            })
        }
        else {
            // Load default survey JSON if surveyId is not provided
            console.log('Loading Survey resources...');
            Promise.all([
                loadStyle(this, SURVEY_CORE_CSS),
                loadScript(this, SURVEY_CORE),
                loadScript(this, SURVEY_JS_UI),
                loadStyle(this, SURVEY_CREATOR_CORE_CSS),
                loadScript(this, SURVEY_CREATOR_CORE_JS),
                loadScript(this, SURVEY_CREATOR_JS),
                loadScript(this, SURVEY_INDEX_JS),
                fetch(DEFAULT_SURVEY_JSON).then(response => response.json())
            ])
            .then(([,,,,,,,defaultJson]) => {
                console.log('Survey resources loaded successfully.');
                console.log(this.surveyJson);
                this.defaultSurveyJson = defaultJson;
                this.isLoading = false;
                this.surveyJson = this.defaultSurveyJson;
                this.initializeSurvey();
            })
            .catch(error => {
                console.error('Error loading resources:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                this.showErrorToast('Error loading survey resources: ' + (error.message || JSON.stringify(error)));
                this.isLoading = false;
            });
        }        
    }

    initializeSurvey() {
        if (!window.Survey || !window.SurveyCreator || this.surveyInitialized) { // Check for SurveyCreator as well
            console.log('SurveyJS core or SurveyCreator not ready, or survey already initialized. Deferring initialization.');
            return;
        }
        
        this.surveyInitialized = true;
        console.log('Initializing Survey...');
        
        const creatorOptions = {
            showLogicTab: true,
            isAutoSave: true
        };
        
        const creator = new window.SurveyCreator.SurveyCreator(creatorOptions);
        this.creator = creator;
        
        // Make mapping component available to SurveyJS if already obtained
        if (this.mappingComponent && !window.Survey.mappingComponent) {
            window.Survey.mappingComponent = this.mappingComponent;
            console.log('Made mapping component available to SurveyJS from initializeSurvey:', this.mappingComponent);
        } else if (!this.mappingComponent) {
            console.warn('Mapping component not yet available when initializeSurvey was called.');
        }
        
        // Add a custom "Hello World" property to all questions
        window.Survey.Serializer.addProperty("question", {
            name: "helloWorldCategory",
            displayName: "Hello World Category",
            category: "general",
            default: "option1",
            type: "dropdown",
            choices: [
                { value: "option1", text: "Basic Option" },
                { value: "option2", text: "Standard Option" },
                { value: "option3", text: "Premium Option" },
                { value: "option4", text: "Enterprise Option" }
            ],
            visibleIndex: 3 // Controls where in the property list this appears
        });
        
        creator.text = JSON.stringify(this.surveyJson);
        
        creator.saveSurveyFunc = (saveNo, callback) => {
            this.hasUnsavedChanges = true;
            this.surveyJson = JSON.parse(creator.text);
            callback(saveNo, true);
        };
        
        creator.render(this.template.querySelector('.surveyContainer'));
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
}