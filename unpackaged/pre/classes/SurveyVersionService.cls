public with sharing class SurveyVersionService {
    @AuraEnabled
    public static SurveyVersionModel getSurveyVersion(Id versionId) {
        SurveyVersion__c version = [
            SELECT Id, Name, Version__c, Status__c, Body__c,
                   (SELECT Id, Name, Sequence__c, Body__c 
                    FROM Pages__r 
                    ORDER BY Sequence__c ASC)
            FROM SurveyVersion__c 
            WHERE Id = :versionId
        ];
        
        SurveyVersionModel model = SurveyVersionModel.toJson(version);
        model.pages = new List<PageModel>();
        
        for(Page__c page : version.Pages__r) {
            model.pages.add(PageService.getPage(page.Id));
        }
        
        return model;
    }
    
    @AuraEnabled
    public static SurveyVersionModel saveSurveyVersion(SurveyVersionModel model) {
        SurveyVersion__c version = model.toRecord();
        upsert version;
        
        // Save pages and elements
        if(model.pages != null && !model.pages.isEmpty()) {
            for(PageModel pageModel : model.pages) {
                pageModel.surveyVersionId = version.Id;
                PageService.savePage(pageModel);
            }
        }
        
        return getSurveyVersion(version.Id);
    }
    
    @AuraEnabled
    public static void deleteSurveyVersion(Id versionId) {
        delete [SELECT Id FROM SurveyVersion__c WHERE Id = :versionId];
    }
    
    public static SurveyVersion__c getVersionRecord(Id versionId) {
        return [SELECT Id, Name, Survey__c, Version__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Id = :versionId];
    }
    
    public static SurveyVersion__c getLatestVersionRecord(Id surveyId) {
        return [SELECT Id, Name, Survey__c, Version__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                ORDER BY Version__c DESC 
                LIMIT 1];
    }
    
    public static SurveyVersion__c getLatestDraftVersionRecord(Id surveyId) {
        return [SELECT Id, Name, Survey__c, Version__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Draft'
                ORDER BY Version__c DESC 
                LIMIT 1];
    }
    
    public static SurveyVersion__c getLatestActiveVersionRecord(Id surveyId) {
        return [SELECT Id, Name, Survey__c, Version__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Active'
                ORDER BY Version__c DESC 
                LIMIT 1];
    }
} 