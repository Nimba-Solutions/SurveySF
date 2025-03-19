public class ElementModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id pageId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String type { get; set; }
    @AuraEnabled public Decimal sequence { get; set; }
    @AuraEnabled public String body { get; set; }

    public static ElementModel toJson(Element__c record) {
        ElementModel model = new ElementModel();
        model.id = record.Id;
        model.pageId = record.Page__c;
        model.name = record.Name;
        model.type = record.Type__c;
        model.sequence = record.Sequence__c;
        model.body = record.Body__c;
        return model;
    }

    public Element__c toRecord() {
        return new Element__c(
            Id = this.id,
            Page__c = this.pageId,
            Name = this.name,
            Type__c = this.type,
            Sequence__c = this.sequence,
            Body__c = this.body
        );
    }
}
