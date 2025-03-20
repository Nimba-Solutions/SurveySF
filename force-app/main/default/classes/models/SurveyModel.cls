public class SurveyModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public String title { get; set; }
    @AuraEnabled public String description { get; set; }
    @AuraEnabled public Id activeVersionId { get; set; }
    @AuraEnabled public List<SurveyVersionModel> versions { get; set; }

    public static SurveyModel toJson(Survey__c survey, List<SurveyVersion__c> versions) {
        SurveyModel model = new SurveyModel();
        model.id = survey.Id;
        model.title = survey.Name;
        model.activeVersionId = survey.ActiveVersion__c;
        
        model.versions = new List<SurveyVersionModel>();
        if(versions != null) {
            for(SurveyVersion__c version : versions) {
                model.versions.add(SurveyVersionModel.toJson(version));
            }
        }
        
        return model;
    }

    public Survey__c toRecord() {
        Survey__c record = new Survey__c(
            Id = this.id,
            Name = this.title,
            ActiveVersion__c = this.activeVersionId
        );
        
        // Handle versions if they exist
        if(this.versions != null && !this.versions.isEmpty()) {
            List<SurveyVersion__c> versionRecords = new List<SurveyVersion__c>();
            for(SurveyVersionModel versionModel : this.versions) {
                versionRecords.add(versionModel.toRecord());
            }
            // Note: We can't insert/update here as this is just a model method
            // The service layer should handle the actual DML operations
        }
        
        return record;
    }
}