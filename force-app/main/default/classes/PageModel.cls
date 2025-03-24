public class PageModel {
    public String recordId;
    public String name;
    public Decimal order;
    public List<ElementModel> elements;
    
    public PageModel() {
        this.elements = new List<ElementModel>();
    }
    
    public Page__c toSObject(Id versionId) {
        Page__c page = new Page__c(
            SurveyVersion__c = versionId,
            Name__c = this.name,
            Order__c = this.order
        );
        return page;
    }
    
    public static PageModel fromSObject(Page__c page) {
        PageModel model = new PageModel();
        model.recordId = page.Id;
        model.name = page.Name__c;
        model.order = page.Order__c;
        return model;
    }
} 