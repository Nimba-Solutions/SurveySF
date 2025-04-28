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

    // POC below - Demo purpose only
    @AuraEnabled
    public static String saveSurveyPOC(String surveyId, String jsonString) {
        try {
            // This is just POC code to save the survey. If survey is already present, it will create a new version.
            Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
            string surveyTitle = String.valueOf(jsonMap.get('title'));

            if(surveyId == null || surveyId == '') {
                Survey__c survey = new Survey__c();
                survey.Title__c = surveyTitle;
                insert survey;
                SurveyVersion__c surveyVersion = new SurveyVersion__c();
                surveyVersion.Survey__c = survey.Id;
                surveyVersion.VersionNumber__c = 1;
                surveyVersion.Body__c = jsonString;
                insert surveyVersion;
            }
            else {
                List<Survey__c> existingSurveys = [SELECT Id
                                                FROM Survey__c 
                                                WHERE Id = :surveyId LIMIT 1];
                if(existingSurveys != null && existingSurveys.size() > 0) {
                    AggregateResult[] latestVersion = [SELECT MAX(VersionNumber__c) latestVersion 
                                                        FROM SurveyVersion__c 
                                                        WHERE Survey__c = :surveyId];
                    Decimal latestVersionNumber = latestVersion != null && latestVersion.size() > 0 
                                                    ? (Decimal) latestVersion[0].get('latestVersion')
                                                    : 0;

                    SurveyVersion__c surveyVersion = new SurveyVersion__c();
                    surveyVersion.Survey__c = surveyId;
                    surveyVersion.VersionNumber__c = latestVersionNumber + 1;
                    surveyVersion.Body__c = jsonString;
                    insert surveyVersion;
                }
                else {
                    Survey__c survey = new Survey__c();
                    survey.Title__c = surveyTitle;
                    insert survey;
                    SurveyVersion__c surveyVersion = new SurveyVersion__c();
                    surveyVersion.Survey__c = survey.Id;
                    surveyVersion.VersionNumber__c = 1;
                    surveyVersion.Body__c = jsonString;
                    insert surveyVersion;
                }
            }
            return jsonString;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String getLatestVersionBySurveyIdPOC(Id surveyId) {
        try {
            SurveyVersion__c surveyVersion = [SELECT Id, Body__c 
                                                FROM SurveyVersion__c 
                                                WHERE Survey__c = :surveyId 
                                                ORDER BY VersionNumber__c DESC LIMIT 1];
            return surveyVersion.Body__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String getVersionByIdPOC(Id surveyVersionId) {
        try {
            SurveyVersion__c surveyVersion = [SELECT Id, Body__c 
                                                FROM SurveyVersion__c 
                                                WHERE Id = :surveyVersionId 
                                                LIMIT 1];
            return surveyVersion.Body__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 