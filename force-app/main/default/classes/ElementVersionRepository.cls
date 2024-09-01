public class ElementVersionRepository {
    public Id createElementVersion(ElementVersion__c elementVersion) {
        insert elementVersion;
        return elementVersion.Id;
    }
    
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
}