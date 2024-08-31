public class ResponseDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public String createdBy { get; set; }
    @AuraEnabled public String lastModifiedBy { get; set; }
    @AuraEnabled public Id surveyVersionId { get; set; }
    @AuraEnabled public List<ResponseElementDTO> responseElements { get; set; }
    
    public ResponseDTO(Response__c response, List<ResponseElement__c> responseElements) {
        this.id = response.Id;
        this.name = response.Name;
        this.body = response.Body__c;
        this.createdBy = response.CreatedBy.Name;
        this.lastModifiedBy = response.LastModifiedBy.Name;
        this.surveyVersionId = response.Survey__c;
        this.responseElements = new List<ResponseElementDTO>();
        for (ResponseElement__c re : responseElements) {
            this.responseElements.add(new ResponseElementDTO(re));
        }
    }
}