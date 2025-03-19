import { LightningElement,api } from 'lwc';
import getSurveyVersionBySurvey from '@salesforce/apex/SurveyBuilder.getSurveyVersionBySurvey';

export default class SurveyEdit extends LightningElement {

    @api invoke() {
        let recordId = window.location.href.split('Survey__c/')[1].split('/')[0];

        getSurveyVersionBySurvey({recId : recordId})
        .then(result => {
            
            let builderUrl = window.location.href.split('lightning/')[0] + 'lightning/n/SurveyBuilder?versionId=' + result[0].Id;

            window.location.href = builderUrl;

        }).catch(err=>{
            console.log('error in fetching survey-'+err);
            console.log('error in fetching survey-'+err.body);
            console.log('error in fetching survey-'+err.message);
        })
    }
}