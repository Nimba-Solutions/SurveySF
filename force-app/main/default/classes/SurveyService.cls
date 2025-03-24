public class SurveyService {
    public static SurveyModel createFromJson(String jsonString) {
        return (SurveyModel)JSON.deserialize(jsonString, SurveyModel.class);
    }
    
    public static String toJson(SurveyModel model) {
        return JSON.serialize(model);
    }
    
    public static Survey__c saveSurvey(SurveyModel model) {
        Survey__c survey = model.toSObject();
        insert survey;
        
        for(SurveyVersionModel version : model.versions) {
            SurveyVersion__c versionObj = version.toSObject(survey.Id);
            insert versionObj;
            
            for(PageModel page : version.pages) {
                Page__c pageObj = page.toSObject(versionObj.Id);
                insert pageObj;
                
                for(ElementModel element : page.elements) {
                    Element__c elementObj = element.toSObject(pageObj.Id);
                    insert elementObj;
                }
            }
        }
        
        return survey;
    }
    
    public static SurveyModel getSurvey(Id surveyId) {
        Survey__c survey = [SELECT Id, Title__c, Description__c, WidthMode__c, Width__c,
                          (SELECT Id, VersionNumber__c, IsActive__c,
                           (SELECT Id, Name__c, Order__c,
                            (SELECT Id, Type__c, Name__c, Title__c, Order__c, IsRequired__c, VisibleIf__c
                             FROM Elements__r
                             ORDER BY Order__c ASC)
                            FROM Pages__r
                            ORDER BY Order__c ASC)
                           FROM SurveyVersions__r
                           ORDER BY VersionNumber__c DESC)
                          FROM Survey__c
                          WHERE Id = :surveyId];
        
        return SurveyModel.fromSObject(survey);
    }
    
    public static String saveAndEnrichJson(String jsonString) {
        // Convert JSON to model
        SurveyModel model = createFromJson(jsonString);
        
        // Save the survey and get the created records
        Survey__c survey = saveSurvey(model);
        
        // Get the complete model with all record IDs
        SurveyModel enrichedModel = getSurvey(survey.Id);
        
        // Convert back to JSON
        return toJson(enrichedModel);
    }
    
    public static String enrichExistingJson(Id surveyId) {
        // Get the complete model with all record IDs
        SurveyModel model = getSurvey(surveyId);
        
        // Convert to JSON
        return toJson(model);
    }
} 