public class SurveyRepository {
    public Survey__c getSurveyById(Id surveyId) {
        return [SELECT Id, Name, CreatedBy.Name, LastModifiedBy.Name, Owner.Name
                FROM Survey__c
                WHERE Id = :surveyId
                LIMIT 1];
    }
    
    public List<Survey__c> getAllSurveys() {
        return [SELECT Id, Name, CreatedBy.Name, LastModifiedBy.Name, Owner.Name
                FROM Survey__c];
    }
    
    public void createSurvey(Survey__c survey) {
        insert survey;
    }
    
    public void updateSurvey(Survey__c survey) {
        update survey;
    }
    
    public void deleteSurvey(Id surveyId) {
        delete [SELECT Id FROM Survey__c WHERE Id = :surveyId];
    }
}