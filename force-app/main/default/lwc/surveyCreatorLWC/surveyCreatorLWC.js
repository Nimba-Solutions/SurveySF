import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import SURVEY_CORE_CSS from '@salesforce/resourceUrl/surveycoremin'; //CSS (renamed from DEFAULTV2)
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //JS
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //JS

export default class SurveyCreatorLWC extends LightningElement {
    surveyInitialized = false;
    loaded = false;
    creatorInstance = null;

    renderedCallback() {
        if (this.surveyInitialized) {
            return;
        }
        this.surveyInitialized = true;
        loadStyle(this, SURVEY_CORE_CSS)
            .then(() => {
                console.log('SurveyJS CSS loaded.');
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
                                    this.initializeSurvey();
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
                        console.log('SurveyJS JS UI loaded.');
                    })
                    .catch(error => {
                        console.error('Error loading SURVEY JS UI resources:', error);
                    });
                })
                .catch(error => {
                    console.error('Error loading SURVEY CORE resources:', error);
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
        console.log('Initializing Survey...');
        
        if (window.Survey) {
            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true
            };
            
            const defaultJson = {
                pages: [{
                    name: "Name",
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
            
            // setLicenseKey("VkFMSURfUFJFRklYOzA9MjAyNS0xMi0zMQ==");

            const creator = new SurveyCreator.SurveyCreator(creatorOptions);
            this.creatorInstance = creator;
            
            creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
            creator.saveSurveyFunc = (saveNo, callback) => { 
                window.localStorage.setItem("survey-json", creator.text);
                callback(saveNo, true);
            };
            
            creator.render(this.template.querySelector('.surveyContainer'));
            
            console.log('SurveyJS Creator initialized');
            this.loaded = true;
        } else {
            console.error('SurveyJS library not loaded.');
        }
    }
}