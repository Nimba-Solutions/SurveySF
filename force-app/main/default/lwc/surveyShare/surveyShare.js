import { LightningElement,api  } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import ShareSurvey from '@salesforce/apex/SurveyShare.ShareSurvey';
import getSurveyVersion from '@salesforce/apex/SurveyShare.getSurveyVersion';

export default class SurveyShare extends LightningElement {

    contactId;
    @api recordId;
    surveyUrl;
    surveyFound = false;

    connectedCallback() {
        let url = new URL(window.location.href);

        this.recordId = url.searchParams.get('recordId');
        console.log('in recordId',this.recordId);
        getSurveyVersion({surveyId : this.recordId}).then(res=>{
            
            if(res != 'No Active Survey Found!'){
                this.surveyFound = true;
                this.surveyUrl = res;
            } else{
            
            }
        }).catch(err=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: err.message || err.body?.message,
                    variant: 'error'
                })
            );
        })
    }
     
    SendSurvey(e) {

        ShareSurvey({contactId : this.contactId, surveyId : this.recordId,surveyUrl : this.surveyUrl}).then(res=>{

            if(res){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: res,
                        variant: 'error'
                    })
                );
            }else{
                this.dispatchEvent(new CloseActionScreenEvent());

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Survey Shared!',
                        variant: 'success'
                    })
                );
            }

        }).catch(err=>{

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: err.message || err.body?.message,
                    variant: 'error'
                })
            );
        })
 
   }

    selectContact(event){
        console.log('in select contact');
        this.contactId = event.detail.value[0];
    }

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    copyLink(){
        navigator.clipboard.writeText(this.surveyUrl);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Suvery Link Copied to Clipboard!',
                variant: 'success'
            })
        );
    }

    get disableSend(){
        return this.contactId ? false : true;
    }

    get disableCopy(){
        return this.surveyUrl ? false : true;
    }

}