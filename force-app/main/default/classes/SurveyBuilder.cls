public with sharing class SurveyBuilder {

    @AuraEnabled
    public static void createSurveyFromJSON(String jsonString,SurveyVersion__c surveyVersion, Boolean isUpdate){
        try {
            if(isUpdate){
                // surveyVersion.Version__c--;
                // code here to delete all the elements and pages first and then call SurveyJsService.createSurveyFromJson
            }
        
            SurveyJsService.createSurveyFromJson(jsonString,surveyVersion,isUpdate);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
       
    @AuraEnabled
    public static SurveyVersionDTO.BaseSurveyVersionDTO getSurveyVersion(Id recId){
        try {
            return SurveyVersionController.getSurveyVersionById(recId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}