public with sharing class SurveyService {
    
    // TODO: Implement this method
    public static String createJsontoJsons(Survey__c survey, List<SurveyVersion__c> versions, List<Page__c> pages, List<Element__c> elements) {
        SurveyModel surveyModel = SurveyModel.toJson(survey);
        List<SurveyVersionModel> versionModels = new List<SurveyVersionModel>();
        
        for(SurveyVersion__c version : versions) {
            SurveyVersionModel versionModel = SurveyVersionModel.toJson(version);
            versionModels.add(versionModel);
        }
        
        surveyModel.versions = versionModels;
        return JSON.serialize(surveyModel);
    }

    public static Id createRecordsFromJson(String jsonInput, SurveyVersion__c surveyVersion) {
        try {
            // Deserialize into SurveyModel
            SurveyModel surveyModel = (SurveyModel)JSON.deserialize(jsonInput, SurveyModel.class);
            Survey__c survey;
            Decimal versionNumber = 0;
            
            if(surveyVersion != null){
                // Get the existing survey
                survey = [SELECT Id, Name FROM Survey__c WHERE Id = :surveyVersion.Survey__c];
                
                // Update survey name if changed
                if(survey.Name != surveyModel.title) {
                    survey.Name = surveyModel.title;
                    update survey;
                }
                
                versionNumber = surveyVersion.VersionNumber__c;
            } else {
                versionNumber = 1;
                // Create new Survey record
                survey = surveyModel.toRecord();
                insert survey;
            }

            SurveyVersion__c version;
            SurveyVersionModel versionModel = new SurveyVersionModel();
            versionModel.surveyId = survey.Id;
            versionModel.versionNumber = versionNumber;
            versionModel.body = jsonInput;
            versionModel.status = 'Draft';

            if(survey.Id != null) {
                if(survey.Status__c == 'Draft') {
                    // Update existing version
                    versionModel.id = surveyVersion.Id;
                    version = versionModel.toRecord();
                    update version;
                } 
            } else {
                // Create new version
                version = versionModel.toRecord();
                insert version;
            }
            
            // Create Page records
            List<Page__c> pages = new List<Page__c>();
            Map<String, Object> surveyData = (Map<String, Object>)JSON.deserializeUntyped(jsonInput);
            List<Object> pagesData = (List<Object>)surveyData.get('pages');
            if (pagesData != null) {
                for (Integer i = 0; i < pagesData.size(); i++) {
                    Map<String, Object> pageData = (Map<String, Object>)pagesData[i];
                    pages.add(new Page__c(
                        SurveyVersion__c = version.Id,
                        Name = (String)pageData.get('name'),
                        Sequence__c = i + 1,
                        Body__c = JSON.serialize(pageData)
                    ));
                }
                insert pages;
            }
            
            // Create Element records
            List<Element__c> elements = new List<Element__c>();
            for (Integer i = 0; i < pages.size(); i++) {
                Map<String, Object> pageData = (Map<String, Object>)pagesData[i];
                List<Object> elementsData = (List<Object>)pageData.get('elements');
                if (elementsData != null) {
                    for (Integer j = 0; j < elementsData.size(); j++) {
                        Map<String, Object> elementData = (Map<String, Object>)elementsData[j];
                        elements.add(new Element__c(
                            Page__c = pages[i].Id,
                            Name = (String)elementData.get('name'),
                            Sequence__c = j + 1,
                            Body__c = JSON.serialize(elementData)
                        ));
                    }
                }
            }
            if (!elements.isEmpty()) {
                insert elements;
            }
            
            System.debug('Survey saved successfully. Survey Id: ' + survey.Id);
            System.debug('Number of pages created: ' + pages.size());
            System.debug('Number of elements created: ' + elements.size());

            return version.Id;
        } catch (Exception e) {
            System.debug('Error creating records from JSON: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, Object> getSurveyVersion(Id recId) {
        try {
            SurveyVersion__c version = [SELECT Id, Name, Body__c, Status__c, Survey__c, VersionNumber__c, ActivatedDate__c FROM SurveyVersion__c WHERE Id = :recId];
            SurveyVersionModel model = SurveyVersionModel.toJson(version);
            return new Map<String, Object>{
                'version' => JSON.serialize(model),
                'siteDomain' => Site.getDomain(),
                'surveyId' => model.surveyId
            };
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, Object> getLatestVersion(Id surveyId) {
        try {
            SurveyVersion__c version = [SELECT Id, Name, Body__c, Status__c, Survey__c, VersionNumber__c, ActivatedDate__c FROM SurveyVersion__c WHERE Survey__c = :surveyId ORDER BY VersionNumber__c DESC LIMIT 1];
            SurveyVersionModel model = SurveyVersionModel.toJson(version);
            return new Map<String, Object>{
                'version' => JSON.serialize(model),
                'siteDomain' => Site.getDomain(),
                'surveyId' => model.surveyId
            };
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, Object> getLatestDraftVersion(Id surveyId) {
        try {
            SurveyVersion__c version = [SELECT Id, Name, Body__c, Status__c, Survey__c, VersionNumber__c, ActivatedDate__c FROM SurveyVersion__c WHERE Survey__c = :surveyId AND Status__c = 'Draft' ORDER BY VersionNumber__c DESC LIMIT 1];
            SurveyVersionModel model = SurveyVersionModel.toJson(version);
            return new Map<String, Object>{
                'version' => JSON.serialize(model),
                'siteDomain' => Site.getDomain(),
                'surveyId' => model.surveyId
            };
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}