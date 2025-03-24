public class SurveyVersionModel {
    public String recordId;
    public Decimal versionNumber;
    public Boolean isActive;
    public List<PageModel> pages;
    
    public SurveyVersionModel() {
        this.pages = new List<PageModel>();
    }
    
    public SurveyVersion__c toSObject(Id surveyId) {
        return new SurveyVersion__c(
            Id = this.recordId,
            Survey__c = surveyId,
            VersionNumber__c = this.versionNumber,
            IsActive__c = this.isActive
        );
    }
    
    public static SurveyVersionModel fromSObject(SurveyVersion__c version) {
        SurveyVersionModel model = new SurveyVersionModel();
        model.recordId = version.Id;
        model.versionNumber = version.VersionNumber__c;
        model.isActive = version.IsActive__c;
        
        // Process nested pages
        if (version.Pages__r != null) {
            for (Page__c page : version.Pages__r) {
                model.pages.add(PageModel.fromSObject(page));
            }
        }
        
        return model;
    }
} 