public class SurveyModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String description { get; set; }
    @AuraEnabled public Boolean isActive { get; set; }
    @AuraEnabled public List<SurveyVersionModel> versions { get; set; }
    
    public static SurveyModel toJson(Survey__c record) {
        SurveyModel model = new SurveyModel();
        model.id = record.Id;
        model.name = record.Name;
        model.description = record.Description__c;
        model.isActive = record.Is_Active__c;
        return model;
    }
    
    public Survey__c toRecord() {
        return new Survey__c(
            Id = this.id,
            Name = this.name,
            Description__c = this.description,
            Is_Active__c = this.isActive
        );
    }
} 