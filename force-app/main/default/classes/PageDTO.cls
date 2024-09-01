public class PageDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public Decimal index { get; set; }
    @AuraEnabled public Id surveyVersionId { get; set; }
    @AuraEnabled public List<PageElementDTO> pageElements { get; set; }
    
    public PageDTO(Page__c page, List<PageElement__c> pageElements) {
        this.id = page.Id;
        this.name = page.Name;
        this.body = page.Body__c;
        this.index = page.Index__c;
        this.surveyVersionId = page.Survey__c;
        this.pageElements = new List<PageElementDTO>();
        
        if (pageElements != null) {
            for (PageElement__c pe : pageElements) {
                this.pageElements.add(new PageElementDTO(pe));
            }
        }
    }
}