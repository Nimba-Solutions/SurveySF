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
import markActive from '@salesforce/apex/SurveyBuilder.markActive';

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

    connectedCallback(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.has('surveyId__c')){
            const survyId = urlParams.get('surveyId__c');
            getSurveyVersion({recId : survyId}).then(result => {
                if(result.error){
                    this.notFound = true;
                }else{
                    this.siteDomain = result.siteDomain;
                    this.encryptedSurveyId = result.surveyId;
                    this.surveyVersionRec = JSON.parse(result.version);
                    this.surveyJson = JSON.parse(this.surveyVersionRec.Body__c);
                    this.surveyVersionList = JSON.parse(result.surveyVersionList);
                }

                // this.disableSave = false;
            }).catch(error => {
                console.error('Error loading getSurveyVersion:', JSON.stringify(error));
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
        if (window.Survey && !this.notFound) {

            const creatorOptions = {
                showLogicTab: true,
                isAutoSave: true
            };
            
            const defaultJson = {"completedHtmlOnCondition":[{"expression":"{nps-score} <= 6 or {rebuy} = false","html":{"default":"Thanks for your feedback! We highly value all ideas and suggestions from our customers, whether they\'re positive or critical. In the future, our team might reach out to you to learn more about how we can further improve our product so that it exceeds your expectations.","fr":"Merci pour vos commentaires! Nous accordons une grande importance à toutes les idées et suggestions de nos clients, qu\'elles soient positives ou critiques. À l\'avenir, notre équipe pourrait vous contacter pour en savoir plus sur la façon dont nous pouvons encore améliorer notre produit afin qu\'il dépasse vos attentes."}},{"expression":"{nps-score} = 6 or {nps-score} = 7","html":{"default":"Thanks for your feedback. Our goal is to create the best possible product, and your thoughts, ideas, and suggestions play a major role in helping us identify opportunities to improve.","fr":"Merci pour vos commentaires. Notre objectif est de créer le meilleur produit possible, et vos réflexions, idées et suggestions jouent un rôle majeur pour nous aider à identifier les opportunités d\'amélioration."}},{"expression":"{nps-score} >= 8","html":{"default":"Thanks for your feedback. It\'s great to hear that you\'re a fan of our product. Your feedback helps us discover new opportunities to improve it and make sure you have the best possible experience.","fr":"Merci pour vos commentaires. Nous sommes ravis d\'entendre que vous avez apprécié notre produit. Vos commentaires nous aident à découvrir de nouvelles opportunités pour l\'améliorer et vous assurer la meilleure expérience possible."}}],"pages":[{"name":"page1","elements":[{"type":"rating","name":"question2"},{"type":"rating","name":"nps-score","startWithNewLine":false,"title":{"default":"On a scale from 0 to 10, how likely are you to recommend us to a friend or colleague?","fr":"Sur une échelle de 0 à 10, quelle est la probabilité que vous recommandiez notre produit à un ami ou à un collègue?"},"rateCount":11,"rateMin":0,"rateMax":10,"minRateDescription":{"default":"Very unlikely","fr":"Très improbable"},"maxRateDescription":{"default":"Very likely","fr":"Très probable"},"rateDescriptionLocation":"bottom"},{"type":"dropdown","name":"question1","choices":["Item 1","Item 3","Item 4","Item 5"]},{"type":"comment","name":"disappointing-experience","visibleIf":"{nps-score} <= 5","title":{"default":"How did we disappoint you and what can we do to make things right?","fr":"Nous n\'avons pas été a la hauteur de vos attentes, comment pouvons-nous améliorer?"},"maxLength":300},{"type":"comment","name":"improvements-required","visibleIf":"{nps-score} >= 6","title":{"default":"What can we do to make your experience more satisfying?","fr":"Que pouvons-nous faire pour rendre votre expérience plus satisfaisante?"},"maxLength":300},{"type":"checkbox","name":"promoter-features","visibleIf":"{nps-score} >= 9","title":{"default":"Which of the following features do you value the most?","fr":"Laquelle des fonctionnalités suivantes appréciez-vous le plus ?"},"description":{"default":"Please select no more than three features.","fr":"Veuillez ne pas sélectionner plus de trois fonctionnalités."},"isRequired":true,"choices":[{"value":"performance","text":"Performance"},{"value":"stability","text":{"default":"Stability","fr":"Stabilité"}},{"value":"ui","text":{"default":"User interface","fr":"Interface utilisateur"}},{"value":"complete-functionality","text":{"default":"Complete functionality","fr":"Ensemble des fonctionnalités"}},{"value":"learning-materials","text":{"default":"Learning materials (documentation, demos, code examples)","fr":"Matériel d\'apprentissage (documentation, démos, exemples de code)"}},{"value":"support","text":{"default":"Quality support","fr":"Accompagnement de qualité"}}],"showOtherItem":true,"otherPlaceholder":{"default":"Please specify...","fr":"Veuillez préciser..."},"otherText":{"default":"Other features","fr":"Autres fonctionnalités"},"colCount":2,"maxSelectedChoices":3}]},{"name":"page2","elements":[{"type":"boolean","name":"rebuy","title":{"default":"Would you buy our product again?","fr":"Achèteriez-vous à nouveau notre produit?"}}]},{"name":"page3","elements":[{"type":"radiogroup","name":"testimonial","title":{"default":"Would you mind providing us a brief testimonial for the website?","fr":"Accepteriez-vous de rédiger un bref commentaire pour notre site Internet?"},"choices":[{"value":"yes","text":{"default":"Sure!","fr":"Bien sur!"}},{"value":"no","text":{"default":"No","fr":"Non merci."}}]},{"type":"text","name":"email","visibleIf":"{testimonial} = \'yes\'","title":{"default":"What is your email address?","fr":"Quelle est votre adresse e-mail?"},"validators":[{"type":"email"}],"placeholder":{"default":"Enter your email here","fr":"Veuillez saisir votre adresse e-mail ici"}}]}],"showPrevButton":false,"showQuestionNumbers":"off","completeText":{"fr":"Envoyer"},"widthMode":"static","width":"1000px"};
            
            const creator = new SurveyCreator.SurveyCreator(creatorOptions);
            creator.text = Object.keys(tempThis.surveyJson).length === 0 ? JSON.stringify(defaultJson) : JSON.stringify(tempThis.surveyJson);
            creator.saveSurveyFunc = (saveNo, callback) => { 
                tempThis.disableSave = true;
                tempThis.changesUnSaved = true;
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

            let surveyVersion = null;
            let isUpdate = false;
            if(event.currentTarget.dataset.version == 'new'){
                surveyVersion = JSON.parse(JSON.stringify(this.surveyVersionRec));
                delete surveyVersion.attributes;
            }else if(this.surveyVersionRec){
                isUpdate = true;
                surveyVersion = JSON.parse(JSON.stringify(this.surveyVersionRec));
                delete surveyVersion.attributes;
            }
            
            createSurveyFromJSON({jsonString : JSON.stringify(this.surveyJson),surveyVersion : surveyVersion,isUpdate : isUpdate}).then(res=>{
          
                this.showSuccessToast('Survey saved successfully');

                if(isUpdate){
                    this.changesUnSaved = false;
                    this.disableSave = true;
                }else if(surveyVersion){
                    setTimeout(() => {
                        let urli = window.location.href;
                        let customURL = urli.split('surveyId__c=')[0];
                        customURL = customURL+'surveyId__c='+res;
                        window.location.href = customURL;
                    }, 1100);
                }
            }).catch(err=>{
                console.log('err-',JSON.stringify(err));
                this.showErrorToast('Error saving survey');
            })
        }
    }

    enableSave(){
        this.disableSave = false;
    }

    copySurveyLink(){
        navigator.clipboard.writeText(this.siteDomain+'/survey?surveyId='+this.encryptedSurveyId);
        this.showSuccessToast('Suvery Link Copied to Clipboard!');
    }

    openVersion(event){
        
        let surveyid = event.currentTarget.dataset.surveyid;
        let urli = window.location.href;
        let customURL = urli.split('surveyId__c=')[0];
        customURL = customURL+'surveyId__c='+surveyid;
        window.location.href = customURL;
        // window.open(customURL);
    }

    clickDropDown(){
        this.showDropDown  = !this.showDropDown;
    }

    handleActivate(){
        markActive({recId : this.surveyVersionRec.Id}).then(res=>{
            let tempVersion = JSON.parse(JSON.stringify(this.surveyVersionRec));
            this.surveyVersionRec = undefined;
            tempVersion.Status__c = 'Active';
            this.surveyVersionRec = tempVersion;
            this.showSuccessToast(
                'Survey Activated successfully');
        }).catch(err=>{
            this.showErrorToast('Error saving survey');
        })
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