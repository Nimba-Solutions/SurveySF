public class PageElementDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id elementId { get; set; }
    @AuraEnabled public Decimal index { get; set; }
    @AuraEnabled public Id pageId { get; set; }
    
    public PageElementDTO(PageElement__c pageElement) {
        this.id = pageElement.Id;
        this.elementId = pageElement.Element__c;
        this.index = pageElement.Index__c;
        this.pageId = pageElement.Page__c;
    }
    
    // Additional constructor for creating new page elements
    public PageElementDTO(Id elementId, Decimal index, Id pageId) {
        this.elementId = elementId;
        this.index = index;
        this.pageId = pageId;
    }
}