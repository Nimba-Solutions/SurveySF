public class PageService {
    public static PageModel createPage(PageModel model, Id versionId) {
        Page__c page = model.toSObject(versionId);
        insert page;
        
        for(ElementModel element : model.elements) {
            Element__c elementObj = element.toSObject(page.Id);
            insert elementObj;
        }
        
        return PageModel.fromSObject(page);
    }
    
    public static void updatePageOrder(Id pageId, Decimal newOrder) {
        Page__c page = [SELECT Id, Order__c FROM Page__c WHERE Id = :pageId];
        page.Order__c = newOrder;
        update page;
    }
    
    public static void deletePage(Id pageId) {
        // Delete all elements first
        List<Element__c> elements = [SELECT Id FROM Element__c WHERE Page__c = :pageId];
        delete elements;
        
        // Then delete the page
        Page__c page = [SELECT Id FROM Page__c WHERE Id = :pageId];
        delete page;
    }
} 