import { LightningElement,wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import DEFAULTV2 from '@salesforce/resourceUrl/defaultV2'; //CSS
import SURBEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURBEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //CSS
import SURBEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //CSS
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createSurveyFromJSON from '@salesforce/apex/SurveyBuilder.createSurveyFromJSON';
import getSurveyVersion from '@salesforce/apex/SurveyBuilder.getSurveyVersion';

export default class SurveyBuilder extends LightningElement {
    surveyInitialized = false;
    loaded = false;
    surveyJson = {};
    disableSave = true;
    surveyVersionRec;

    connectedCallback(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.has('surveyId__c')){
            const survyId = urlParams.get('surveyId__c');
            getSurveyVersion({recId : survyId}).then(result => {
                this.surveyVersionRec = result.fields;
                this.surveyJson = JSON.parse(this.surveyVersionRec.Body__c);
                // this.disableSave = false;
            }).catch(error => {
                console.error('Error loading getSurveyVersion:', error);
            });
        }
    }

    renderedCallback() {
        if (this.surveyInitialized) {
            return;
        }
        this.surveyInitialized = true;

        loadStyle(this, DEFAULTV2)
            .then(() => {
                loadScript(this, SURVEY_CORE)
                .then(() => {
                    loadScript(this, SURVEY_JS_UI)
                    .then(() => {
                        loadStyle(this, SURBEY_CREATOR_CORE_CSS)
                        .then(() => {
                            loadScript(this, SURBEY_CREATOR_CORE_JS)
                            .then(() => {
                                loadScript(this, SURBEY_CREATOR_JS)
                                .then(() => {
                                    this.initializeSurvey();
                                })
                                .catch(error => {
                                    console.error('Error loading SURBEY_CREATOR_JS resources:', error);
                                });
                            })
                            .catch(error => {
                                console.error('Error loading SURBEY_CREATOR_CORE_JS resources:', error);
                            });
                        })
                        .catch(error => {
                            console.error('Error loading SURBEY_CREATOR_CORE_CSS resources:', error);
                        });
                    })
                    .catch(error => {
                        console.error('Error loading SURBEY JS UI resources:', error);
                    });
                })
                .catch(error => {
                    console.error('Error loading SURBEY CORE resources:', error);
                })
                .finally(result => {
                    console.log('loadScript result:', result);
                });
            })
            .catch(error => {
                console.error('Error loading resources:', error);
            });
    }

    initializeSurvey() {
    
        let tempThis = this;
        if (window.Survey) {
            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true
            };
            
            const defaultJson = {
                pages: [{
                    name: "Page Name",
                    elements: [{
                        name: "FirstName",
                        title: "Enter your first name:",
                        type: "text"
                    }, {
                        name: "LastName",
                        title: "Enter your last name:",
                        type: "text"
                    }]
                }]
            };
            

            const creator = new SurveyCreator.SurveyCreator(creatorOptions);
            // creator.text = JSON.stringify(defaultJson);
            creator.text = Object.keys(tempThis.surveyJson).length === 0 ? JSON.stringify(defaultJson) : JSON.stringify(tempThis.surveyJson);
            creator.saveSurveyFunc = (saveNo, callback) => { 
                // tempThis.disableSave = false;

                // window.localStorage.setItem("survey-json", creator.text);
                tempThis.surveyJson = JSON.parse(creator.text);
                callback(saveNo, true);
            };
            
            creator.render(this.template.querySelector('.surveyContainer'));
            this.loaded = true;
        } else {
            console.error('SurveyJS library not loaded.');
        }
    }

    handleSave(event){
        if(!this.surveyJson.title){
            this.disableSave = true;
            this.showErrorToast(
                'Please provide survey title'
            );
        } else {
            // let survey = null;
            // let surveyVersion = {'Name' : this.surveyJson.title, 'Version__c' : 1, 'Body__c' : JSON.stringify(this.surveyJson)};
            // if(event.currentTarget.dataset.version == 'new'){
            //     surveyVersion.Version__c = ++this.surveyVersionRec.Version__c;
            //     surveyVersion.Survey__c = this.surveyVersionRec.Survey__c;
            // }else if(this.surveyVersionRec){
            //     // existing survey update code placeholder
            // }else{
            //     survey = {'Name' : this.surveyJson.title};
            // }

            // let surveyPages = [];

            // for(let page of this.surveyJson.pages){
            //     let pageObj = {'Body__c' : JSON.stringify(page), 'Name' : page.name};
            //     surveyPages.push(pageObj);
            // }
            
            // createSurvey({survey : survey, surveyVersion : surveyVersion, pages : surveyPages}).then(res=>{
            //     this.showSuccessToast(
            //         'Survey saved successfully');
            // }).catch(err=>{
            //         this.showErrorToast('Error saving survey');
            // })

            let surveyVersion = null;
            let isUpdate = false;
             if(event.currentTarget.dataset.version == 'new'){
                surveyVersion = this.surveyVersionRec;

            }else if(this.surveyVersionRec){
                // existing survey update code placeholder
                isUpdate = true;
            }
            
            createSurveyFromJSON({jsonString : JSON.stringify(this.surveyJson),surveyVersion : surveyVersion,isUpdate : isUpdate}).then(res=>{
                this.showSuccessToast(
                    'Survey saved successfully');
            }).catch(err=>{
                    this.showErrorToast('Error saving survey');
            })
        }
    }

    enableSave(){
        this.disableSave = false;
    }

    get saveLabel(){
        if(this.surveyVersionRec){
            // return 'Update';
            return 'Save';
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

    showSuccessToast(msg) {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: msg,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}