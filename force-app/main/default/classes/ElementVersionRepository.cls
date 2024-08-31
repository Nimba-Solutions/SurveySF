public class ElementVersionRepository {
    public ElementVersion__c getLatestVersionByElementId(Id elementId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Element__c
                FROM ElementVersion__c
                WHERE Element__c = :elementId
                ORDER BY CreatedDate DESC
                LIMIT 1];
    }
    
    public List<ElementVersion__c> getAllVersionsByElementId(Id elementId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Element__c
                FROM ElementVersion__c
                WHERE Element__c = :elementId
                ORDER BY CreatedDate DESC];
    }
    
    public void createElementVersion(ElementVersion__c elementVersion) {
        insert elementVersion;
    }
    
    public void updateElementVersion(ElementVersion__c elementVersion) {
        update elementVersion;
    }
}