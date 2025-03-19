public class PageModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id surveyVersionId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public Decimal sequence { get; set; }
    @AuraEnabled public String body { get; set; }
    @AuraEnabled public List<ElementModel> elements { get; set; }

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
