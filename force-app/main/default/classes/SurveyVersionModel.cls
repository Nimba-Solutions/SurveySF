public class SurveyVersionModel {
    public Id id { get; set; }
    public Id surveyId { get; set; }
    public String versionNumber { get; set; }
    public String status { get; set; }
    public String body { get; set; }
    public Datetime activatedDate { get; set; }
    public List<PageModel> pages { get; set; }

    public static SurveyVersionModel fromRecord(SurveyVersion__c version) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.id = version.Id;
        model.surveyId = version.Survey__c;
        model.versionNumber = version.VersionNumber__c;
        model.status = version.Status__c;
        model.body = version.Body__c;
        model.activatedDate = version.ActivatedDate__c;
        return model;
    }

    public SurveyVersion__c toRecord() {
        return new SurveyVersion__c(
            Id = this.id,
            Survey__c = this.surveyId,
            VersionNumber__c = this.versionNumber,
            Status__c = this.status,
            Body__c = this.body,
            ActivatedDate__c = this.activatedDate
        );
    }
}
