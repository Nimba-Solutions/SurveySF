public class SurveyVersionModel {
    @AuraEnabled public String id { get; set; }
    @AuraEnabled public String surveyId { get; set; }
    @AuraEnabled public Decimal versionNumber { get; set; }
    @AuraEnabled public String status { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public Datetime activatedDate { get; set; }
    @AuraEnabled public String title { get; set; }
    @AuraEnabled public List<PageModel> pages { get; set; }
    
    public static SurveyVersionModel toJson(SurveyVersion__c record) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.id = record.Id;
        model.title = record.Name;
        model.surveyId = record.Survey__c;
        model.versionNumber = record.VersionNumber__c;
        model.status = record.Status__c;
        model.body = record.Body__c;
        model.activatedDate = record.ActivatedDate__c;
        return model;
    }

    public SurveyVersion__c toRecord() {
        return new SurveyVersion__c(
            Id = this.id,
            Survey__c = this.surveyId,
            VersionNumber__c = this.versionNumber,
            Status__c = this.status,
            Body__c = this.body,
            ActivatedDate__c = this.activatedDate,
            Name = this.title
        );
    }
}