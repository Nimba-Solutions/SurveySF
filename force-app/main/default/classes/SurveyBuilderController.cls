public with sharing class SurveyBuilderController {
    
    @AuraEnabled
    public static String saveSurvey(String jsonInput, String surveyVersionId) {
        try {
            SurveyVersion__c surveyVersion = null;
            if (String.isNotBlank(surveyVersionId)) {
                surveyVersion = [SELECT Id, Survey__c FROM SurveyVersion__c WHERE Id = :surveyVersionId];
            }
            
            return SurveyService.createRecordsFromJson(jsonInput, surveyVersion);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getSurveyVersion(String versionId) {
        try {
            Map<String, Object> result = SurveyService.getSurveyVersion(versionId);
            return (String)result.get('version');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getLatestVersion(String surveyId) {
        try {
            Map<String, Object> result = SurveyService.getLatestVersion(surveyId);
            return (String)result.get('version');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getLatestDraftVersion(String surveyId) {
        try {
            Map<String, Object> result = SurveyService.getLatestDraftVersion(surveyId);
            return (String)result.get('version');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 