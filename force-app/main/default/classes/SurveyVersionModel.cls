public class SurveyVersionModel {
    public String recordId;
    public Decimal versionNumber;
    public Boolean isActive;
    public List<PageModel> pages;
    
    public SurveyVersionModel() {
        this.pages = new List<PageModel>();
    }
    
    public SurveyVersion__c toSObject(Id surveyId) {
        SurveyVersion__c version = new SurveyVersion__c(
            Survey__c = surveyId,
            VersionNumber__c = this.versionNumber,
            IsActive__c = this.isActive
        );
        return version;
    }
    
    public static SurveyVersionModel fromSObject(SurveyVersion__c version) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.recordId = version.Id;
        model.versionNumber = version.VersionNumber__c;
        model.isActive = version.IsActive__c;
        return model;
    }
} 