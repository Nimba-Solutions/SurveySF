import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SURVEY_CORE from '@salesforce/resourceUrl/surveycore'; //JS
import SURVEY_JS_UI from '@salesforce/resourceUrl/surveyjsui'; //JS
import DEFAULTV2 from '@salesforce/resourceUrl/defaultV2'; //CSS
import SURBEY_CREATOR_CORE_CSS from '@salesforce/resourceUrl/surveycreatorcorecss'; //CSS
import SURBEY_CREATOR_CORE_JS from '@salesforce/resourceUrl/surveycreatorcorejs'; //CSS
// import SurveyDarkTheme_JS from '@salesforce/resourceUrl/SurveyDarkTheme'; //CSS
import SURBEY_CREATOR_JS from '@salesforce/resourceUrl/surveycreatormin'; //CSS
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import fetchSurvey from '@salesforce/apex/SurveyTaker.fetchSurvey';
import saveResponse from '@salesforce/apex/SurveyTaker.saveResponse';

export default class SurveyTaker extends LightningElement {

    surveyInitialized = false;
    loaded = false;
    notFound = false;
    surveyVersionRec;
    surveyJson = {};

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
                                    // loadScript(this, SurveyDarkTheme_JS)
                                    // .then(() => {
                                    //     this.initializeSurvey();
                                    // })
                                    // .catch(error => {
                                    //     console.error('Error loading SurveyDarkTheme_JS resources:', error);
                                    // });
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
    
        // let tempThis = this;
        if (window.Survey) {
            let url = new URL(window.location.href);

            let encryptedSurveyId = url.searchParams.get('surveyId');
            console.log('encryptedSurveyId-',encryptedSurveyId);
            if(!encryptedSurveyId){
                console.log('encryptedSurveyId-',encryptedSurveyId);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Survey Not Found',
                        variant: 'error'
                    })
                );

                this.notFound = true;
                this.loaded = true;

                return;
            }else{
                fetchSurvey({encryptedId:encryptedSurveyId})
                .then(result => {
                    console.log('result-',result);
                    this.surveyVersionRec = (JSON.parse(result.version));
                    this.surveyJson = JSON.parse(this.surveyVersionRec.Body__c);

                    const survey = new Survey.Model(JSON.stringify(this.surveyJson));
                    survey.applyTheme(SurveyTheme.LayeredDarkPanelless);
                    let tempThis = this;
                    survey.onComplete.add(JSONresult=>{

                        console.log('JSONresult-',JSON.stringify(JSONresult.data));
                        saveResponse({response : JSON.stringify(JSONresult.data),recId : tempThis.surveyVersionRec.Id}).then(res=>{}).catch(err=>{console.log('err',err)});
                    });

                    survey.render(this.template.querySelector(".surveyContainer"));

                    this.loaded = true;

                }).catch(err=>{
                    console.log('error in fetching survey',JSON.stringify(err));
                })
            }

            // const defaultJson = {
            //     pages: [{
            //         name: "Page Name",
            //         elements: [{
            //             name: "FirstName",
            //             title: "Enter your first name:",
            //             type: "text"
            //         }, {
            //             name: "LastName",
            //             title: "Enter your last name:",
            //             type: "text"
            //         }]
            //     }]
            // };
            
            
        } else {
            console.error('SurveyJS library not loaded.');
        }
    }


}