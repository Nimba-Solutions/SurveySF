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

    @AuraEnabled(cacheable=true)
    public static SurveyVersionModel getVersionById(Id versionId) {
        return SurveyService.getVersionById(versionId);
    }
    
    @AuraEnabled
    public static SurveyVersionModel saveVersion(SurveyVersionModel versionModel) {
        return SurveyService.saveVersion(versionModel);
    }
} 