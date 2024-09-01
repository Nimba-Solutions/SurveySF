public class ElementDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String createdBy { get; set; }
    @AuraEnabled public String lastModifiedBy { get; set; }
    @AuraEnabled public String owner { get; set; }
    @AuraEnabled public Id latestVersionId { get; set; }
    @AuraEnabled public String latestVersionBody { get; set; }
    
    public ElementDTO(Element__c element, ElementVersion__c latestVersion) {
        this.id = element.Id;
        this.name = element.Name;
        this.createdBy = element.CreatedBy.Name;
        this.lastModifiedBy = element.LastModifiedBy.Name;
        this.owner = element.Owner.Name;
        
        if (latestVersion != null) {
            this.latestVersionId = latestVersion.Id;
            this.latestVersionBody = latestVersion.Body__c;
        }
    }
}