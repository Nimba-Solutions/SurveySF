import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import SURVEY_CORE_CSS from "@salesforce/resourceUrl/surveycoremin"; //CSS
import SURVEY_PDF from '@salesforce/resourceUrl/surveypdfminjs'; //JS
import JS_PDF from '@salesforce/resourceUrl/jspdfmin'; //JS
import SURVEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURVEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //CSS
import SURVEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //CSS
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSurveyResponse from '@salesforce/apex/SurveyBuilder.getSurveyResponse';
import getSurveyJSON from '@salesforce/apex/SurveyBuilder.getSurveyJSON';

export default class SurveyPreview extends LightningElement {

    surveyInitialized = false;
    loaded = false;

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
                                    loadScript(this, SURVEY_PDF)
                                    .then(() => {
                                        loadScript(this, JS_PDF)
                                        .then(() => {
                                            this.initializeSurvey();
                                        })
                                        .catch(error => {
                                            console.error('Error loading JS_PDF resources:', error);
                                        });
                                    })
                                    .catch(error => {
                                        console.error('Error loading SURVEY_PDF resources:', error);
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
    
        if (window.Survey) {
            // let url = new URL(window.location.href);
            
            if(window.location.href.includes('Survey_Response__c')){
                let recordId = window.location.href.split('Survey_Response__c/')[1].split('/')[0];

                getSurveyResponse({recId : recordId})
                .then(result => {
                    console.log('result-'+JSON.stringify(result));
    
                    const survey = new Survey.Model(result.Survey_Version__r.Body__c);
                    survey.data =  JSON.parse(result.Body__c);
                    survey.mode = "display";
    
                    const savePdf = function (surveyData) {
                        const surveyPdf = new SurveyPDF.SurveyPDF(result.Survey_Version__r.Body__c, {});
                        surveyPdf.data = surveyData;
                        surveyPdf.save();
                    };
    
                    survey.addNavigationItem({
                        id: "pdf-export",
                        title: "Save as PDF",
                        action: () => savePdf(survey.data)
                    });
                    survey.render(this.template.querySelector(".surveyContainer"));
    
                    this.loaded = true;
    
                }).catch(err=>{
                    console.log('error in fetching survey-'+err);
                    console.log('error in fetching survey-'+err.body);
                    console.log('error in fetching survey-'+err.message);
                })
            }else{
                let recordId;
                let objectApi;

                if(window.location.href.includes('Survey__c')){
                    objectApi = 'Survey__c';
                    recordId = window.location.href.split('Survey__c/')[1].split('/')[0];
                }else{
                    objectApi = 'SurveyVersion__c';
                    recordId = window.location.href.split('SurveyVersion__c/')[1].split('/')[0];
                }
                
                getSurveyJSON({recId : recordId,objectName : objectApi})
                .then(result => {
    
                    const survey = new Survey.Model(result);
                    // survey.mode = "display";
                    survey.showCompleteButton = false;

                    survey.render(this.template.querySelector(".surveyContainer"));
    
                    this.loaded = true;
    
                }).catch(err=>{
                    console.log('error in fetching survey-'+err);
                    console.log('error in fetching survey-'+err.body);
                    console.log('error in fetching survey-'+err.message);
                })
            }


        } else {
            console.error('SurveyJS library not loaded.');
        }
    }
}