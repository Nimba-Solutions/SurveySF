public with sharing class SurveyController {
    @AuraEnabled(cacheable=true)
    public static SurveyVersionModel getLatestDraftVersion(Id surveyId) {
        return SurveyService.getLatestDraftVersion(surveyId);
    }
    
    @AuraEnabled(cacheable=true)
    public static SurveyVersionModel getLatestActiveVersion(Id surveyId) {
        return SurveyService.getLatestActiveVersion(surveyId);
    }
    
    @AuraEnabled(cacheable=true)
    public static SurveyVersionModel getLatestVersion(Id surveyId) {
        return SurveyService.getLatestVersion(surveyId);
    }
    
    @AuraEnabled
    public static void saveVersion(SurveyVersionModel versionModel) {
        SurveyService.saveVersion(versionModel);
    }
    
    @AuraEnabled
    public static void saveVersionAsDraft(SurveyVersionModel versionModel) {
        versionModel.status = 'Draft';
        SurveyService.saveVersion(versionModel);
    }
    
    @AuraEnabled
    public static void saveVersionAsActive(SurveyVersionModel versionModel) {
        versionModel.status = 'Active';
        SurveyService.saveVersion(versionModel);
    }
} 