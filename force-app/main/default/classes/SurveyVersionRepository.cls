public class SurveyVersionRepository {
    public SurveyVersion__c getLatestVersionBySurveyId(Id surveyId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Survey__c
                FROM SurveyVersion__c
                WHERE Survey__c = :surveyId
                ORDER BY CreatedDate DESC
                LIMIT 1];
    }
    
    public List<SurveyVersion__c> getAllVersionsBySurveyId(Id surveyId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Survey__c
                FROM SurveyVersion__c
                WHERE Survey__c = :surveyId
                ORDER BY CreatedDate DESC];
    }
    
    public void createSurveyVersion(SurveyVersion__c surveyVersion) {
        insert surveyVersion;
    }
    
    public void updateSurveyVersion(SurveyVersion__c surveyVersion) {
        update surveyVersion;
    }
}