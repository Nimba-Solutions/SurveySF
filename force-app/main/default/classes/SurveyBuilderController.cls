public with sharing class SurveyBuilderController {
    @AuraEnabled
    public static String saveSurvey(String jsonString) {
        try {
            return SurveyService.saveAndEnrichJson(jsonString);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getLatestVersion(Id surveyId) {
        try {
            return SurveyService.getLatestVersionJson(surveyId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getVersionById(Id versionId) {
        try {
            return SurveyService.getVersionJson(versionId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 