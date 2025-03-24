public class PageModel {
    public String recordId;
    public String name;
    public Decimal order;
    public List<ElementModel> elements;
    
    public PageModel() {
        this.elements = new List<ElementModel>();
    }
    
    public Page__c toSObject(Id versionId) {
        return new Page__c(
            Id = this.recordId,
            SurveyVersion__c = versionId,
            Name__c = this.name,
            Order__c = this.order
        );
    }
    
    public static PageModel fromSObject(Page__c page) {
        PageModel model = new PageModel();
        model.recordId = page.Id;
        model.name = page.Name__c;
        model.order = page.Order__c;
        
        // Process nested elements
        if (page.Elements__r != null) {
            for (Element__c element : page.Elements__r) {
                model.elements.add(ElementModel.fromSObject(element));
            }
        }
        
        return model;
    }
} 