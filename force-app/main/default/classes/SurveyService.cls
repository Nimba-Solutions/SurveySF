public with sharing class SurveyService {
    public static void createRecordsFromJson(String jsonInput) {
        try {
            // Deserialize the JSON input into a Map
            Map<String, Object> surveyData = (Map<String, Object>) JSON.deserializeUntyped(jsonInput);
            
            // Create Survey record
            Survey__c survey = new Survey__c(
                Name = 'Survey from JSON'
            );
            insert survey;
            
            // Create SurveyVersion record
            SurveyVersion__c version = new SurveyVersion__c(
                Survey__c = survey.Id,
                VersionNumber__c = '1.0',
                Status__c = 'Draft',
                Body__c = jsonInput
            );
            insert version;
            
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
            
            System.debug('Survey created successfully. Survey Id: ' + survey.Id);
            System.debug('Number of pages created: ' + pages.size());
            System.debug('Number of elements created: ' + elements.size());
        } catch (Exception e) {
            System.debug('Error creating records from JSON: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
    }
}