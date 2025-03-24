public class SurveyModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public List<SurveyVersionModel> versions { get; set; }
    
    public static SurveyModel toJson(Survey__c record) {
        SurveyModel model = new SurveyModel();
        model.id = record.Id;
        model.name = record.Name;
        model.body = record.Body__c;
        return model;
    }
    
    public Survey__c toRecord() {
        return new Survey__c(
            Id = this.id,
            Name = this.name,
            Body__c = this.body
        );
    }
} 