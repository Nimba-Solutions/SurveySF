public class ElementModel {
    public String recordId;
    public String type;
    public String name;
    public String title;
    public Decimal order;
    public Boolean isRequired;
    public String visibleIf;
    public Map<String, Object> properties;
    
    public ElementModel() {
        this.properties = new Map<String, Object>();
    }
    
    public Element__c toSObject(Id pageId) {
        Element__c element = new Element__c(
            Page__c = pageId,
            Type__c = this.type,
            Name__c = this.name,
            Title__c = this.title,
            Order__c = this.order,
            IsRequired__c = this.isRequired,
            VisibleIf__c = this.visibleIf
        );
        return element;
    }
    
    public static ElementModel fromSObject(Element__c element) {
        ElementModel model = new ElementModel();
        model.recordId = element.Id;
        model.type = element.Type__c;
        model.name = element.Name__c;
        model.title = element.Title__c;
        model.order = element.Order__c;
        model.isRequired = element.IsRequired__c;
        model.visibleIf = element.VisibleIf__c;
        return model;
    }
} 