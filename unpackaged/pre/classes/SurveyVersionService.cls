public class SurveyVersionService {
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
            PageModel pageModel = PageModel.toJson(page);
            pageModel.elements = new List<ElementModel>();
            
            // Get elements for this page
            List<Element__c> elements = [
                SELECT Id, Name, Type__c, Sequence__c, Body__c
                FROM Element__c
                WHERE Page__c = :page.Id
                ORDER BY Sequence__c ASC
            ];
            
            for(Element__c element : elements) {
                pageModel.elements.add(ElementModel.toJson(element));
            }
            
            model.pages.add(pageModel);
        }
        
        return model;
    }
    
    @AuraEnabled
    public static SurveyVersionModel saveSurveyVersion(SurveyVersionModel model) {
        SurveyVersion__c version = model.toRecord();
        upsert version;
        
        // Save pages and elements
        if(model.pages != null && !model.pages.isEmpty()) {
            List<Page__c> pages = new List<Page__c>();
            List<Element__c> elements = new List<Element__c>();
            
            for(PageModel pageModel : model.pages) {
                Page__c page = pageModel.toRecord();
                page.SurveyVersion__c = version.Id;
                pages.add(page);
                
                // Save elements for this page
                if(pageModel.elements != null && !pageModel.elements.isEmpty()) {
                    for(ElementModel elementModel : pageModel.elements) {
                        Element__c element = elementModel.toRecord();
                        element.Page__c = page.Id;
                        elements.add(element);
                    }
                }
            }
            
            upsert pages;
            upsert elements;
        }
        
        return getSurveyVersion(version.Id);
    }
    
    @AuraEnabled
    public static void deleteSurveyVersion(Id versionId) {
        delete [SELECT Id FROM SurveyVersion__c WHERE Id = :versionId];
    }
} 