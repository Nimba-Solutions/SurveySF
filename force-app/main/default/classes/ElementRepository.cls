public class ElementRepository {
    public Element__c getElementById(Id elementId) {
        return [SELECT Id, Name, CreatedBy.Name, LastModifiedBy.Name, Owner.Name
                FROM Element__c
                WHERE Id = :elementId
                LIMIT 1];
    }
    
    public List<Element__c> getAllElements() {
        return [SELECT Id, Name, CreatedBy.Name, LastModifiedBy.Name, Owner.Name
                FROM Element__c];
    }
    
    public void createElement(Element__c element) {
        insert element;
    }
    
    public void updateElement(Element__c element) {
        update element;
    }
    
    public void deleteElement(Id elementId) {
        delete [SELECT Id FROM Element__c WHERE Id = :elementId];
    }
}