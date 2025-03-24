public class SurveyVersionModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id surveyId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public Decimal version { get; set; }
    @AuraEnabled public String status { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public List<PageModel> pages { get; set; }
    
    public static SurveyVersionModel toJson(SurveyVersion__c record) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.id = record.Id;
        model.surveyId = record.Survey__c;
        model.name = record.Name;
        model.version = record.Version__c;
        model.status = record.Status__c;
        model.body = record.Body__c;
        return model;
    }
    
    public SurveyVersion__c toRecord() {
        return new SurveyVersion__c(
            Id = this.id,
            Survey__c = this.surveyId,
            Name = this.name,
            Version__c = this.version,
            Status__c = this.status,
            Body__c = this.body
        );
    }
} 