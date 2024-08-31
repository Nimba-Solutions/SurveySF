public class SurveyDTO {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String createdBy { get; set; }
    @AuraEnabled public String lastModifiedBy { get; set; }
    @AuraEnabled public String owner { get; set; }
    @AuraEnabled public Id latestVersionId { get; set; }
    @AuraEnabled public String latestVersionBody { get; set; }
    
    public SurveyDTO(Survey__c survey, SurveyVersion__c latestVersion) {
        this.id = survey.Id;
        this.name = survey.Name;
        this.createdBy = survey.CreatedBy.Name;
        this.lastModifiedBy = survey.LastModifiedBy.Name;
        this.owner = survey.Owner.Name;
        
        if (latestVersion != null) {
            this.latestVersionId = latestVersion.Id;
            this.latestVersionBody = latestVersion.Body__c;
        }
    }
}