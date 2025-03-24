public class ElementService {
    public static ElementModel createElement(ElementModel model, Id pageId) {
        Element__c element = model.toSObject(pageId);
        insert element;
        return ElementModel.fromSObject(element);
    }
    
    public static void updateElementOrder(Id elementId, Decimal newOrder) {
        Element__c element = [SELECT Id, Order__c FROM Element__c WHERE Id = :elementId];
        element.Order__c = newOrder;
        update element;
    }
    
    public static void updateElementVisibility(Id elementId, String visibleIf) {
        Element__c element = [SELECT Id, VisibleIf__c FROM Element__c WHERE Id = :elementId];
        element.VisibleIf__c = visibleIf;
        update element;
    }
    
    public static void deleteElement(Id elementId) {
        Element__c element = [SELECT Id FROM Element__c WHERE Id = :elementId];
        delete element;
    }
    
    public static List<ElementModel> getElementsByPage(Id pageId) {
        List<Element__c> elements = [SELECT Id, Type__c, Name__c, Title__c, Order__c, IsRequired__c, VisibleIf__c
                                   FROM Element__c
                                   WHERE Page__c = :pageId
                                   ORDER BY Order__c ASC];
        
        List<ElementModel> models = new List<ElementModel>();
        for(Element__c element : elements) {
            models.add(ElementModel.fromSObject(element));
        }
        return models;
    }
} 