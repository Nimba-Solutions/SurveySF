public with sharing class SurveyService {
    
    private static Survey__c getSurveyRecord(Id surveyId) {
        return [SELECT Id, Name, Body__c 
                FROM Survey__c 
                WHERE Id = :surveyId];
    }
    
    public static SurveyVersionModel getLatestDraftVersion(Id surveyId) {
        SurveyVersion__c version = SurveyVersionService.getLatestDraftVersionRecord(surveyId);
        if(version == null) return null;
        return SurveyVersionService.getSurveyVersion(version.Id);
    }
    
    public static SurveyVersionModel getLatestActiveVersion(Id surveyId) {
        SurveyVersion__c version = SurveyVersionService.getLatestActiveVersionRecord(surveyId);
        if(version == null) return null;
        return SurveyVersionService.getSurveyVersion(version.Id);
    }
    
    public static SurveyVersionModel getLatestVersion(Id surveyId) {
        SurveyVersion__c version = SurveyVersionService.getLatestVersionRecord(surveyId);
        if(version == null) return null;
        return SurveyVersionService.getSurveyVersion(version.Id);
    }

    public static SurveyVersionModel getVersionById(Id versionId) {
        return SurveyVersionService.getSurveyVersion(versionId);
    }
    
    public static SurveyVersionModel saveVersion(SurveyVersionModel versionModel) {
        return SurveyVersionService.saveSurveyVersion(versionModel);
    }

    @AuraEnabled
    public static SurveyModel getSurvey(Id surveyId) {
        Survey__c survey = [
            SELECT Id, Name, Body__c,
                   (SELECT Id, Name, Version__c, Status__c, Body__c 
                    FROM SurveyVersions__r 
                    ORDER BY Version__c DESC)
            FROM Survey__c 
            WHERE Id = :surveyId
        ];
        
        SurveyModel model = SurveyModel.toJson(survey);
        model.versions = new List<SurveyVersionModel>();
        
        for(SurveyVersion__c version : survey.SurveyVersions__r) {
            model.versions.add(SurveyVersionModel.toJson(version));
        }
        
        return model;
    }
    
    @AuraEnabled
    public static SurveyModel saveSurvey(SurveyModel model) {
        Survey__c survey = model.toRecord();
        upsert survey;
        
        // If we have versions, save them too
        if(model.versions != null && !model.versions.isEmpty()) {
            List<SurveyVersion__c> versions = new List<SurveyVersion__c>();
            for(SurveyVersionModel versionModel : model.versions) {
                SurveyVersion__c version = versionModel.toRecord();
                version.Survey__c = survey.Id;
                versions.add(version);
            }
            upsert versions;
        }
        
        return getSurvey(survey.Id);
    }
    
    @AuraEnabled
    public static void deleteSurvey(Id surveyId) {
        delete [SELECT Id FROM Survey__c WHERE Id = :surveyId];
    }
} 