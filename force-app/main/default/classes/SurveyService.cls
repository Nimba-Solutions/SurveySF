public with sharing class SurveyService {
    
    public static String createJsonFromRecords(Survey__c survey, List<SurveyVersion__c> versions, List<Page__c> pages, List<Element__c> elements) {
        SurveyModel surveyModel = SurveyModel.fromRecord(survey);
        List<SurveyVersionModel> versionModels = new List<SurveyVersionModel>();
        List<PageModel> pageModels = new List<PageModel>();
        List<ElementModel> elementModels = new List<ElementModel>();
        
        for(SurveyVersion__c version : versions) {
            versionModels.add(SurveyVersionModel.fromRecord(version));
        }
        
        for(Page__c page : pages) {
            pageModels.add(PageModel.fromRecord(page));
        }
        
        for(Element__c element : elements) {
            elementModels.add(ElementModel.fromRecord(element));
        }
        
        Map<String, Object> surveyJson = new Map<String, Object>();
        surveyJson.put('id', surveyModel.id);
        surveyJson.put('name', surveyModel.name);
        surveyJson.put('activeVersionId', surveyModel.activeVersionId);
        
        List<Map<String, Object>> versionsJson = new List<Map<String, Object>>();
        for(SurveyVersionModel version : versionModels) {
            Map<String, Object> versionJson = new Map<String, Object>();
            versionJson.put('id', version.id);
            versionJson.put('surveyId', version.surveyId);
            versionJson.put('versionNumber', version.versionNumber);
            versionJson.put('status', version.status);
            versionJson.put('body', version.body);
            versionJson.put('activatedDate', version.activatedDate);
            versionsJson.add(versionJson);
        }
        surveyJson.put('versions', versionsJson);
        
        return JSON.serialize(surveyJson);
    }

    public static Id createRecordsFromJson(String jsonInput, SurveyVersion__c surveyVersion, Boolean isUpdate) {
        try {
            // Deserialize the JSON input into a Map for survey data
            Map<String, Object> surveyData = (Map<String, Object>) JSON.deserializeUntyped(jsonInput);
            SurveyModel surveyModel;
            Decimal versionNumber = 0;
            
            if(surveyVersion != null){
                // Get the existing survey
                Survey__c survey = [SELECT Id, Name FROM Survey__c WHERE Id = :surveyVersion.Survey__c];
                surveyModel = SurveyModel.fromRecord(survey);
                
                // Update survey name if changed
                if(surveyModel.name != (String)surveyData.get('title')) {
                    surveyModel.name = (String)surveyData.get('title');
                    update surveyModel.toRecord();
                }
                
                versionNumber = surveyVersion.VersionNumber__c;
            } else {
                versionNumber = 1;
                // Create new Survey record
                surveyModel = new SurveyModel();
                surveyModel.name = (String)surveyData.get('title');
                insert surveyModel.toRecord();
            }

            // Create version record using the model
            SurveyVersionModel versionModel = new SurveyVersionModel();
            versionModel.surveyId = surveyModel.id;
            versionModel.versionNumber = versionNumber;
            versionModel.body = jsonInput;
            versionModel.status = isUpdate ? surveyVersion.Status__c : 'Draft';

            if(isUpdate && surveyVersion != null) {
                // Update existing version
                versionModel.id = surveyVersion.Id;
                update versionModel.toRecord();
            } else {
                // Create new version
                insert versionModel.toRecord();
            }
            
            // Delete existing pages and elements if updating
            if(isUpdate && surveyVersion != null) {
                List<Page__c> existingPages = [SELECT Id FROM Page__c WHERE SurveyVersion__c = :surveyVersion.Id];
                if(!existingPages.isEmpty()) {
                    delete [SELECT Id FROM Element__c WHERE Page__c IN :existingPages];
                    delete existingPages;
                }
            }
            
            // Create Page records
            List<Page__c> pages = new List<Page__c>();
            List<Object> pagesData = (List<Object>) surveyData.get('pages');
            if (pagesData != null) {
                for (Integer i = 0; i < pagesData.size(); i++) {
                    Map<String, Object> pageData = (Map<String, Object>) pagesData[i];
                    PageModel pageModel = new PageModel();
                    pageModel.surveyVersionId = versionModel.id;
                    pageModel.name = (String)pageData.get('name');
                    pageModel.sequence = i + 1;
                    pageModel.body = JSON.serialize(pageData);
                    pages.add(pageModel.toRecord());
                }
                insert pages;
            }
            
            // Create Element records
            List<Element__c> elements = new List<Element__c>();
            for (Integer i = 0; i < pages.size(); i++) {
                Map<String, Object> pageData = (Map<String, Object>) pagesData[i];
                List<Object> elementsData = (List<Object>) pageData.get('elements');
                if (elementsData != null) {
                    for (Integer j = 0; j < elementsData.size(); j++) {
                        Map<String, Object> elementData = (Map<String, Object>) elementsData[j];
                        ElementModel elementModel = new ElementModel();
                        elementModel.pageId = pages[i].Id;
                        elementModel.name = (String)elementData.get('name');
                        elementModel.sequence = j + 1;
                        elementModel.body = JSON.serialize(elementData);
                        elementModel.type = (String)elementData.get('type');
                        elements.add(elementModel.toRecord());
                    }
                }
            }
            if (!elements.isEmpty()) {
                insert elements;
            }
            
            System.debug('Survey saved successfully. Survey Id: ' + surveyModel.id);
            System.debug('Number of pages created: ' + pages.size());
            System.debug('Number of elements created: ' + elements.size());

            return versionModel.id;
        } catch (Exception e) {
            System.debug('Error creating records from JSON: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
            throw new AuraHandledException(e.getMessage());
        }
    }
}