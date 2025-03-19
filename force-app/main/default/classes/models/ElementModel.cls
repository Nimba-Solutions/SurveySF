public class ElementModel {
    public Id id { get; set; }
    public Id pageId { get; set; }
    public String name { get; set; }
    public String type { get; set; }
    public Decimal sequence { get; set; }
    public String body { get; set; }

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
