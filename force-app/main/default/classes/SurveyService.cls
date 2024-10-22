public with sharing class SurveyService {
    public static String createJsonFromRecords(Survey__c survey, List<SurveyVersion__c> versions, List<Page__c> pages, List<Element__c> elements) {
        SurveyModel surveyModel = SurveyModel.fromRecord(survey);
        surveyModel.versions = new List<SurveyVersionModel>();
        
        Map<Id, SurveyVersionModel> versionMap = new Map<Id, SurveyVersionModel>();
        Map<Id, PageModel> pageMap = new Map<Id, PageModel>();
        
        for (SurveyVersion__c version : versions) {
            SurveyVersionModel versionModel = SurveyVersionModel.fromRecord(version);
            versionModel.pages = new List<PageModel>();
            versionMap.put(version.Id, versionModel);
            surveyModel.versions.add(versionModel);
        }
        
        for (Page__c page : pages) {
            PageModel pageModel = PageModel.fromRecord(page);
            pageModel.elements = new List<ElementModel>();
            pageMap.put(page.Id, pageModel);
            versionMap.get(page.SurveyVersion__c).pages.add(pageModel);
        }
        
        for (Element__c element : elements) {
            ElementModel elementModel = ElementModel.fromRecord(element);
            pageMap.get(element.Page__c).elements.add(elementModel);
        }
        
        return JSON.serialize(surveyModel);
    }
    
    public static void createRecordsFromJson(String jsonInput) {
        SurveyModel surveyModel = (SurveyModel)JSON.deserialize(jsonInput, SurveyModel.class);
        
        Survey__c survey = surveyModel.toRecord();
        upsert survey;
        
        List<SurveyVersion__c> versions = new List<SurveyVersion__c>();
        List<Page__c> pages = new List<Page__c>();
        List<Element__c> elements = new List<Element__c>();
        
        for (SurveyVersionModel versionModel : surveyModel.versions) {
            SurveyVersion__c version = versionModel.toRecord();
            version.Survey__c = survey.Id;
            versions.add(version);
        }
        upsert versions;
        
        for (SurveyVersionModel versionModel : surveyModel.versions) {
            for (PageModel pageModel : versionModel.pages) {
                Page__c page = pageModel.toRecord();
                page.SurveyVersion__c = versionModel.id;
                pages.add(page);
            }
        }
        upsert pages;
        
        for (SurveyVersionModel versionModel : surveyModel.versions) {
            for (PageModel pageModel : versionModel.pages) {
                for (ElementModel elementModel : pageModel.elements) {
                    Element__c element = elementModel.toRecord();
                    element.Page__c = pageModel.id;
                    elements.add(element);
                }
            }
        }
        upsert elements;
    }
}
