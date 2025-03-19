public with sharing class SurveyService {
    
    // TODO: Implement this method
    public static String createJsonFromRecords(Survey__c survey, List<SurveyVersion__c> versions, List<Page__c> pages, List<Element__c> elements) {
        Map<String, Object> surveyJson = new Map<String, Object>();
        return JSON.serialize(surveyJson);
    }

    public static Id createRecordsFromJson(String jsonInput,SurveyVersion__c surveyVersion, Boolean isUpdate) {
        try {
            // Deserialize the JSON input into a Map
            Map<String, Object> surveyData = (Map<String, Object>) JSON.deserializeUntyped(jsonInput);
            Survey__c survey;
            Decimal versionNumber = 0;
            
            if(surveyVersion != null){
                // Get existing survey
                survey = [SELECT Id, Name FROM Survey__c WHERE Id = :surveyVersion.Survey__c];
                
                // Update survey name if changed
                if(survey.Name != (String)surveyData.get('title')) {
                    survey.Name = (String)surveyData.get('title');
                    update survey;
                }
       
                // If updating existing version, keep same version number
                // If creating new version (from Active), increment version number
                versionNumber = isUpdate ? surveyVersion.VersionNumber__c : (surveyVersion.VersionNumber__c + 1);
            } else {
                // This is a new survey
                versionNumber = 1;
                survey = new Survey__c(
                    Name = (String)surveyData.get('title')
                );
                insert survey;
            }

            SurveyVersion__c version;

            // Create or update SurveyVersion record
            version = new SurveyVersion__c(
                Survey__c = survey.Id,
                VersionNumber__c = versionNumber,
                Body__c = jsonInput,
                Name = (String)surveyData.get('title')
            );

            if(isUpdate){
                version.Id = surveyVersion.Id;
                update version;
            } else {
                insert version;
            }
            
            // Delete existing pages and elements if updating
            if(isUpdate) {
                List<Page__c> existingPages = [SELECT Id FROM Page__c WHERE SurveyVersion__c = :version.Id];
                if(!existingPages.isEmpty()) {
                    delete existingPages;
                }
            }
            
            // Create Page records
            List<Page__c> pages = new List<Page__c>();
            List<Object> pagesData = (List<Object>) surveyData.get('pages');
            if (pagesData != null) {
                for (Integer i = 0; i < pagesData.size(); i++) {
                    Map<String, Object> pageData = (Map<String, Object>) pagesData[i];
                    pages.add(new Page__c(
                        SurveyVersion__c = version.Id,
                        Name = (String) pageData.get('name'),
                        Sequence__c = i + 1,
                        Body__c = JSON.serialize(pageData)
                    ));
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
                        elements.add(new Element__c(
                            Page__c = pages[i].Id,
                            Name = (String) elementData.get('name'),
                            Sequence__c = j + 1,
                            Body__c = JSON.serialize(elementData)
                        ));
                    }
                }
            }
            if (!elements.isEmpty()) {
                insert elements;
            }
            
            System.debug('Survey created/updated successfully. Survey Id: ' + survey.Id);
            System.debug('Number of pages created: ' + pages.size());
            System.debug('Number of elements created: ' + elements.size());

            return version.Id;
        } catch (Exception e) {
            System.debug('Error creating records from JSON: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
            throw new AuraHandledException(e.getMessage());
        }
    }
}