import { LightningElement,wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import SURVEY_CORE_CSS from "@salesforce/resourceUrl/surveycoremin"; //CSS
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //JS
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //JS
import SURVEY_INDEX_JS from '@salesforce/resourceUrl/indexmin'; //JS
import DEFAULT_SURVEY_JSON from '@salesforce/resourceUrl/defaultSurveyJson'; //JSON

// Import new controller methods
import getLatestDraftVersion from '@salesforce/apex/SurveyController.getLatestDraftVersion';
import getLatestActiveVersion from '@salesforce/apex/SurveyController.getLatestActiveVersion';
import getLatestVersion from '@salesforce/apex/SurveyController.getLatestVersion';
import saveVersion from '@salesforce/apex/SurveyController.saveVersion';
import saveVersionAsDraft from '@salesforce/apex/SurveyController.saveVersionAsDraft';
import saveVersionAsActive from '@salesforce/apex/SurveyController.saveVersionAsActive';

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
            getSurveyVersion({ versionId })
                .then(result => {
                    this.surveyVersionRec = JSON.parse(result);
                    this.surveyJson = JSON.parse(this.surveyVersionRec.Body__c);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading getSurveyVersion:', error);
                    this.notFound = true;
                });
        } else if(urlParams.has('surveyId')) {
            const surveyId = urlParams.get('surveyId');
            getLatestVersion({ surveyId })
                .then(result => {
                    this.surveyVersionRec = JSON.parse(result);
                    this.surveyJson = JSON.parse(this.surveyVersionRec.Body__c);
                    this.initializeSurvey();
                })
                .catch(error => {
                    console.error('Error loading getLatestVersion:', error);
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
        this.surveyInitialized = true;

        loadStyle(this, SURVEY_CORE_CSS)
            .then(() => {
                loadScript(this, SURVEY_CORE)
                .then(() => {
                    loadScript(this, SURVEY_JS_UI)
                    .then(() => {
                        loadStyle(this, SURVEY_CREATOR_CORE_CSS)
                        .then(() => {
                            loadScript(this, SURVEY_CREATOR_CORE_JS)
                            .then(() => {
                                loadScript(this, SURVEY_CREATOR_JS)
                                .then(() => {
                                    loadScript(this, SURVEY_INDEX_JS)
                                    .then(() => {
                                        // Load the default survey JSON
                                        fetch(DEFAULT_SURVEY_JSON)
                                            .then(response => response.json())
                                            .then(data => {
                                                this.defaultSurveyJson = data;
                                                // Only initialize if we don't have a version
                                                if (!this.surveyVersionRec) {
                                                    this.initializeSurvey();
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Error loading default survey JSON:', error);
                                            });
                                    })
                                    .catch(error => {
                                        console.error('Error loading SURVEY_INDEX_JS resources:', error);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error loading SURVEY_CREATOR_JS resources:', error);
                                });
                            })
                            .catch(error => {
                                console.error('Error loading SURVEY_CREATOR_CORE_JS resources:', error);
                            });
                        })
                        .catch(error => {
                            console.error('Error loading SURVEY_CREATOR_CORE_CSS resources:', error);
                        });
                    })
                    .catch(error => {
                        console.error('Error loading SURVEY JS UI resources:', error);
                    });
                })
                .catch(error => {
                    console.error('Error loading SURVEY CORE resources:', error);
                });
            })
            .catch(error => {
                console.error('Error loading resources:', error);
            });
    }

    initializeSurvey() {
    
        let tempThis = this;
        if (window.Survey && !this.notFound) {

            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true
            };
            
            const creator = new SurveyCreator.SurveyCreator(creatorOptions);
            this.creator = creator;
            
            creator.text = Object.keys(tempThis.surveyJson).length === 0 ? JSON.stringify(this.defaultSurveyJson) : JSON.stringify(tempThis.surveyJson);
            creator.saveSurveyFunc = (saveNo, callback) => { 
                tempThis.disableSave = false;  // Enable save when changes are detected
                tempThis.changesUnSaved = true;
                tempThis.surveyJson = JSON.parse(creator.text);
                callback(saveNo, true);
            };
            
            creator.render(this.template.querySelector('.surveyContainer'));

            // Make the creator instance available globally for debugging
            window.surveyCreator = creator;

            // Update the event debugger with the creator instance
            setTimeout(() => {
                const debuggerElement = this.template.querySelector("c-survey-js-event-debugger");
                if (debuggerElement) {
                    debuggerElement.creator = this.creator;
                }
            }, 500);
            
            this.loaded = true;
        } else {
            console.error('SurveyJS library not loaded.');
        }
    }

    handleSave(event) {
        if(!this.surveyJson.title) {
            this.disableSave = true;
            this.showErrorToast('Please provide survey title');
            return;
        }

        const isNewVersion = event.target.dataset.version === 'new';
        const surveyData = {
            ...this.surveyVersionRec,
            body: JSON.stringify(this.surveyJson)
        };

        // If saving as new version, remove the Id
        if (isNewVersion) {
            delete surveyData.Id;
        }

        const savePromise = this.showActivate ? 
            saveVersionAsDraft({ versionModel: surveyData }) :
            saveVersionAsActive({ versionModel: surveyData });

        savePromise
            .then(() => {
                this.changesUnSaved = false;
                this.disableSave = true;
                this.showSuccessToast('Survey saved successfully');
                
                // Refresh the version data
                this.refreshVersionData();
            })
            .catch(error => {
                console.error('Error saving survey:', error);
                this.showErrorToast('Error saving survey: ' + error.body?.message || error.message);
            });
    }

    copySurveyLink(){
        navigator.clipboard.writeText(this.siteDomain+'/survey?surveyId='+this.encryptedSurveyId);
        this.showSuccessToast('Suvery Link Copied to Clipboard!');
    }

    openVersion(event){
        
         console.log('TODO: Implement surveyBuilder.openVersion()')
    }

    clickDropDown(){
        this.showDropDown  = !this.showDropDown;
    }

    handleActivate() {
        saveVersionAsActive({ versionModel: this.surveyVersionRec })
            .then(() => {
                let tempVersion = JSON.parse(JSON.stringify(this.surveyVersionRec));
                tempVersion.Status__c = 'Active';
                this.surveyVersionRec = tempVersion;
                this.showSuccessToast('Survey Activated successfully');
            })
            .catch(error => {
                this.showErrorToast('Error activating survey: ' + error.body?.message || error.message);
            });
    }

    get showActivate(){
        if(this.surveyVersionRec){
            return this.surveyVersionRec.Status__c == 'Draft' ? true : false;
        }
        return false;
    }

    get disableEdit(){
        if(this.surveyVersionRec){
            return this.surveyVersionRec.Status__c == 'Active' ? true : false;
        }
        return false;
    }

    get showSaveButton(){
        if(this.surveyVersionRec){
            return this.surveyVersionRec.Status__c == 'Draft' ? true : false;
        }
        return true;
    }

    get saveLabel(){
        if(this.surveyVersionRec){
            return 'Update';
            // return 'Save';
        }else{
            return 'Save';
        }
    }

    showErrorToast(msg) {
        const evt = new ShowToastEvent({
            title: 'Error',
            message: msg,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showSuccessToast(msg, url) {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: msg,
            variant: 'success',
            mode: 'dismissable',
            messageData: {
                url: url
            }
        });
        this.dispatchEvent(evt);
    }

    refreshVersionData() {
        const getVersionPromise = this.showActivate ?
            getLatestDraftVersion({ surveyId: this.surveyVersionRec.Survey__c }) :
            getLatestActiveVersion({ surveyId: this.surveyVersionRec.Survey__c });

        getVersionPromise
            .then(result => {
                this.surveyVersionRec = result;
                this.surveyJson = JSON.parse(result.body);
            })
            .catch(error => {
                console.error('Error refreshing version:', error);
                this.showErrorToast('Error refreshing version data');
            });
    }
}