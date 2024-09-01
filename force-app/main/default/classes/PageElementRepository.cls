public class PageElementRepository {
    public List<PageElement__c> getPageElementsByPageId(Id pageId) {
        return [SELECT Id, Element__c, Element__r.Body__c, Index__c, CreatedBy.Name, LastModifiedBy.Name, Page__c
                FROM PageElement__c
                WHERE Page__c = :pageId
                ORDER BY Index__c ASC];
    }
    
    public void createPageElement(PageElement__c pageElement) {
        insert pageElement;
    }
    
    public void updatePageElement(PageElement__c pageElement) {
        update pageElement;
    }
    
    public void deletePageElement(Id pageElementId) {
        delete [SELECT Id FROM PageElement__c WHERE Id = :pageElementId];
    }
}