public class SurveyModel {
    public String recordId;
    public String title;
    public String description;
    public String widthMode;
    public String width;
    public List<SurveyVersionModel> versions;
    
    public SurveyModel() {
        this.versions = new List<SurveyVersionModel>();
    }
    
    public Survey__c toSObject() {
        Survey__c survey = new Survey__c(
            Title__c = this.title,
            Description__c = this.description,
            WidthMode__c = this.widthMode,
            Width__c = this.width
        );
        return survey;
    }
    
    public static SurveyModel fromSObject(Survey__c survey) {
        SurveyModel model = new SurveyModel();
        model.recordId = survey.Id;
        model.title = survey.Title__c;
        model.description = survey.Description__c;
        model.widthMode = survey.WidthMode__c;
        model.width = survey.Width__c;
        return model;
    }
} 