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
import loadSurvey from '@salesforce/apex/SurveyBuilderController.getVersionByIdPOC';

export default class SurveyForm extends LightningElement {
    surveyInitialized = false;
    @track isLoading = true;
    surveyJson = {};
    defaultSurveyJson;
    surveyVersionId;

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
        if (this.surveyInitialized) {
            return;
        }

        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);        
        // Load JSON from Apex Controller
        if(urlParams.has('c__surveyVersionId')){
            this.surveyVersionId = urlParams.get('c__surveyVersionId');
            loadSurvey({ surveyVersionId: this.surveyVersionId })
            .then(result => {
                if (result == null || result == undefined) {
                    this.notFound = true;
                    this.showErrorToast('Survey not found');
                    return;
                }
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
                    this.isLoading = false;
                    this.surveyJson = JSON.parse(result);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading resources:', error);
                    this.showErrorToast('Error loading survey resources');
                    this.isLoading = false;
                });
            })
        }
        else {
            // Load default survey JSON if surveyVersionId is not provided
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
                this.defaultSurveyJson = defaultJson;
                this.isLoading = false;
                this.surveyJson = this.defaultSurveyJson;
                this.initializeSurvey();
            })
            .catch(error => {
                console.error('Error loading resources:', error);
                this.showErrorToast('Error loading survey resources');
                this.isLoading = false;
            });
        }

        
    }

    initializeSurvey() {
        if (!window.Survey || this.surveyInitialized) return;
        
        this.surveyInitialized = true;        

        const survey = new window.Survey.Model(this.surveyJson);
        survey.render(this.template.querySelector('.surveyContainer'));

        survey.onComplete.add((survey) => {
            console.log(JSON.stringify(survey.data));
            this.showSuccessToast('Survey completed successfully!');
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