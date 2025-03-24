import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveSurvey from '@salesforce/apex/SurveyBuilderController.saveSurvey';
import getLatestVersion from '@salesforce/apex/SurveyBuilderController.getLatestVersion';
import getVersionById from '@salesforce/apex/SurveyBuilderController.getVersionById';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore';
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui';
import SURVEY_CORE_CSS from "@salesforce/resourceUrl/surveycoremin";
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss';
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs';
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin';
import SURVEY_INDEX_JS from '@salesforce/resourceUrl/indexmin';
import DEFAULT_SURVEY_JSON from '@salesforce/resourceUrl/defaultSurveyJson';

export default class SurveyBuilder extends LightningElement {
    surveyInitialized = false;
    loaded = false;
    surveyJson = {};
    disableSave = true;
    surveyVersionRec;
    encryptedSurveyId;
    surveyVersionList = [];
    showDropDown = false;
    notFound = false;
    changesUnSaved = false;
    siteDomain = '';
    creator = null;
    defaultSurveyJson;

    connectedCallback() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        if(urlParams.has('versionId')) {
            const versionId = urlParams.get('versionId');
            getVersionById({ versionId })
                .then(result => {
                    this.surveyVersionRec = { body: result };
                    this.surveyJson = JSON.parse(result);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading version:', error);
                    this.notFound = true;
                });
        } else if(urlParams.has('surveyId')) {
            const surveyId = urlParams.get('surveyId');
            getLatestVersion({ surveyId })
                .then(result => {
                    this.surveyVersionRec = { body: result };
                    this.surveyJson = JSON.parse(result);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading latest version:', error);
                    this.notFound = true;
                });
        } else {
            // If no parameters, initialize with default JSON
            this.initializeSurvey();
        }
    }

    renderedCallback() {
        if (this.surveyInitialized) {
            return;
        }

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
            this.loaded = true;
            if (!this.surveyVersionRec) {
                this.surveyJson = this.defaultSurveyJson;
            }
            this.initializeSurvey();
        })
        .catch(error => {
            console.error('Error loading resources:', error);
            this.showErrorToast('Error loading survey resources');
        });
    }

    initializeSurvey() {
        if (!window.Survey || this.surveyInitialized) return;
        
        this.surveyInitialized = true;
        
        const creatorOptions = {
            showLogicTab: true,
            isAutoSave: true
        };
        
        const creator = new window.SurveyCreator.SurveyCreator(creatorOptions);
        this.creator = creator;
        
        creator.text = JSON.stringify(this.surveyJson);
        
        creator.saveSurveyFunc = (saveNo, callback) => {
            this.disableSave = false;
            this.changesUnSaved = true;
            this.surveyJson = JSON.parse(creator.text);
            
            saveSurvey({ jsonString: creator.text })
                .then(result => {
                    this.surveyJson = JSON.parse(result);
                    this.changesUnSaved = false;
                    this.showSuccessToast('Survey saved successfully');
                    callback(saveNo, true);
                })
                .catch(error => {
                    console.error('Error saving survey:', error);
                    this.showErrorToast('Error saving survey: ' + (error.body?.message || error.message));
                    callback(saveNo, false);
                });
        };
        
        creator.render(this.template.querySelector('.surveyContainer'));
    }

    handleSave(event) {
        if(!this.surveyJson.title) {
            this.disableSave = true;
            this.showErrorToast('Please provide survey title');
            return;
        }

        saveSurvey({ jsonString: JSON.stringify(this.surveyJson) })
            .then(result => {
                this.surveyJson = JSON.parse(result);
                this.changesUnSaved = false;
                this.disableSave = true;
                this.showSuccessToast('Survey saved successfully');
                this.refreshVersion();
            })
            .catch(error => {
                console.error('Error saving survey:', error);
                this.showErrorToast('Error saving survey: ' + (error.body?.message || error.message));
            });
    }

    handleActivate() {
        saveVersionAsActive({ 
            versionModel: {
                ...this.surveyVersionRec,
                body: JSON.stringify(this.surveyJson)
            }
        })
        .then(() => {
            this.surveyVersionRec = {
                ...this.surveyVersionRec,
                Status__c: 'Active'
            };
            this.showSuccessToast('Survey activated successfully');
        })
        .catch(error => {
            this.showErrorToast('Error activating survey: ' + (error.body?.message || error.message));
        });
    }

    refreshVersion() {
        const surveyId = this.surveyVersionRec.Survey__c;
        getLatestVersion({ surveyId })
            .then(result => {
                this.surveyVersionRec = { body: result };
                this.surveyJson = JSON.parse(result);
            })
            .catch(error => {
                console.error('Error refreshing version:', error);
                this.showErrorToast('Error refreshing survey data');
            });
    }

    copySurveyLink() {
        navigator.clipboard.writeText(this.siteDomain + '/survey?surveyId=' + this.encryptedSurveyId);
        this.showSuccessToast('Survey Link Copied to Clipboard!');
    }

    openVersion(event) {
        const versionId = event.currentTarget.dataset.surveyid;
        getVersionById({ versionId })
            .then(result => {
                this.surveyVersionRec = { body: result };
                this.surveyJson = JSON.parse(result);
                this.creator.text = result;
            })
            .catch(error => {
                console.error('Error opening version:', error);
                this.showErrorToast('Error opening survey version');
            });
    }

    clickDropDown() {
        this.showDropDown = !this.showDropDown;
    }

    get showActivate() {
        if(this.surveyVersionRec) {
            return this.surveyVersionRec.Status__c === 'Draft';
        }
        return false;
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