public with sharing class PageService {
    @AuraEnabled
    public static PageModel getPage(Id pageId) {
        Page__c page = [
            SELECT Id, Name, SurveyVersion__c, Sequence__c, Body__c,
                   (SELECT Id, Name, Type__c, Sequence__c, Body__c 
                    FROM Elements__r 
                    ORDER BY Sequence__c ASC)
            FROM Page__c 
            WHERE Id = :pageId
        ];
        
        PageModel model = PageModel.toJson(page);
        model.elements = new List<ElementModel>();
        
        for(Element__c element : page.Elements__r) {
            model.elements.add(ElementModel.toJson(element));
        }
        
        return model;
    }
    
    @AuraEnabled
    public static PageModel savePage(PageModel model) {
        Page__c page = model.toRecord();
        upsert page;
        
        // Save elements
        if(model.elements != null && !model.elements.isEmpty()) {
            List<Element__c> elements = new List<Element__c>();
            for(ElementModel elementModel : model.elements) {
                Element__c element = elementModel.toRecord();
                element.Page__c = page.Id;
                elements.add(element);
            }
            upsert elements;
        }
        
        return getPage(page.Id);
    }
    
    @AuraEnabled
    public static void deletePage(Id pageId) {
        delete [SELECT Id FROM Page__c WHERE Id = :pageId];
    }
    
    public static List<Page__c> getVersionPages(Id versionId) {
        return [SELECT Id, Name, SurveyVersion__c, Sequence__c, Body__c 
                FROM Page__c 
                WHERE SurveyVersion__c = :versionId 
                ORDER BY Sequence__c ASC];
    }
} 