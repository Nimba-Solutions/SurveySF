public class SurveyModel {
    public Id id { get; set; }
    public String title { get; set; }
    public String description { get; set; }
    public Id activeVersionId { get; set; }
    public List<SurveyVersionModel> versions { get; set; }

    public static SurveyModel toJson(Survey__c survey) {
        SurveyModel model = new SurveyModel();
        model.id = survey.Id;
        model.title = survey.Name;
        model.activeVersionId = survey.ActiveVersion__c;
        return model;
    }

    public Survey__c toRecord() {
        Survey__c record = new Survey__c(
            Id = this.id,
            Name = this.title,
            ActiveVersion__c = this.activeVersionId,
            Description__c = this.description
        );
        return record;
    }
}