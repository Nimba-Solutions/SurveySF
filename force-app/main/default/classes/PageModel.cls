public class PageModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id surveyVersionId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public Decimal sequence { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public List<ElementModel> elements { get; set; }
    
    public static PageModel toJson(Page__c record) {
        PageModel model = new PageModel();
        model.id = record.Id;
        model.surveyVersionId = record.Survey_Version__c;
        model.name = record.Name;
        model.sequence = record.Sequence__c;
        model.body = record.Body__c;
        return model;
    }
    
    public Page__c toRecord() {
        return new Page__c(
            Id = this.id,
            Survey_Version__c = this.surveyVersionId,
            Name = this.name,
            Sequence__c = this.sequence,
            Body__c = this.body
        );
    }
} 