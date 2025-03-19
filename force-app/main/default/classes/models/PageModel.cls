public class PageModel {
    public Id id { get; set; }
    public Id surveyVersionId { get; set; }
    public String name { get; set; }
    public Decimal sequence { get; set; }
    public String body { get; set; }
    public List<ElementModel> elements { get; set; }

    public static PageModel toJson(Page__c page) {
        PageModel model = new PageModel();
        model.id = page.Id;
        model.surveyVersionId = page.SurveyVersion__c;
        model.name = page.Name;
        model.sequence = page.Sequence__c;
        model.body = page.Body__c;
        return model;
    }

    public Page__c toRecord() {
        return new Page__c(
            Id = this.id,
            SurveyVersion__c = this.surveyVersionId,
            Name = this.name,
            Sequence__c = this.sequence,
            Body__c = this.body
        );
    }
}
