public class ResponseElementDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public Id elementId { get; set; }
    @AuraEnabled public Id responseId { get; set; }
    
    public ResponseElementDTO(Id id, String body, Id elementId, Id responseId) {
        this.id = id;
        this.body = body;
        this.elementId = elementId;
        this.responseId = responseId;
    }
    
    public ResponseElementDTO(ResponseElement__c responseElement) {
        this(responseElement.Id, responseElement.Body__c, responseElement.ElementVersion__c, responseElement.Response__c);
    }
    
    // Constructor for creating new response elements
    public ResponseElementDTO(String body, Id elementId) {
        this(null, body, elementId, null);
    }
}