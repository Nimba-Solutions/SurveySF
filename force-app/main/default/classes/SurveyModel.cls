public class SurveyModel {
    public Id id { get; set; }
    public String name { get; set; }
    public Id activeVersionId { get; set; }
    public List<SurveyVersionModel> versions { get; set; }

    public static SurveyModel toJson(Survey__c survey) {
        SurveyModel model = new SurveyModel();
        model.id = survey.Id;
        model.name = survey.Name;
        model.activeVersionId = survey.ActiveVersion__c;
        return model;
    }

    public Survey__c toRecord() {
        return new Survey__c(
            Id = this.id,
            Name = this.name,
            ActiveVersion__c = this.activeVersionId
        );
    }
}
