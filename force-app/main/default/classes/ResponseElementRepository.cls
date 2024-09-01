public class ResponseElementRepository {
    public List<ResponseElement__c> getResponseElementsByResponseId(Id responseId) {
        return [SELECT Id, Body__c, CreatedBy.Name, LastModifiedBy.Name, ElementVersion__c, Response__c
                FROM ResponseElement__c
                WHERE Response__c = :responseId];
    }
    
    public void createResponseElement(List<ResponseElement__c> responseElements) {
        insert responseElements;
    }
    
    public void updateResponseElement(ResponseElement__c responseElement) {
        update responseElement;
    }
    
    public void deleteResponseElement(Id responseElementId) {
        delete [SELECT Id FROM ResponseElement__c WHERE Id = :responseElementId];
    }
}