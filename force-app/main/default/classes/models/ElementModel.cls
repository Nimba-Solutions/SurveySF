public class ElementModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id pageId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String type { get; set; }
    @AuraEnabled public Decimal sequence { get; set; }
    @AuraEnabled public String body { get; set; }

    public static ElementModel toJson(Element__c element) {
        ElementModel model = new ElementModel();
        model.id = element.Id;
        model.pageId = element.Page__c;
        model.name = element.Name;
        model.type = element.Type__c;
        model.sequence = element.Sequence__c;
        model.body = element.Body__c;
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
