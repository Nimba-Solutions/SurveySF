public class SurveyVersionModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id surveyId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public Decimal version { get; set; }
    @AuraEnabled public Boolean isActive { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public List<PageModel> pages { get; set; }
    
    public static SurveyVersionModel toJson(Survey_Version__c record) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.id = record.Id;
        model.surveyId = record.Survey__c;
        model.name = record.Name;
        model.version = record.Version__c;
        model.isActive = record.Is_Active__c;
        model.body = record.Body__c;
        return model;
    }
    
    public Survey_Version__c toRecord() {
        return new Survey_Version__c(
            Id = this.id,
            Survey__c = this.surveyId,
            Name = this.name,
            Version__c = this.version,
            Is_Active__c = this.isActive,
            Body__c = this.body
        );
    }
} 