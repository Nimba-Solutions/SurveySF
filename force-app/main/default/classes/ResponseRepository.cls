public class ResponseRepository {
    public Response__c getResponseById(Id responseId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Survey__c
                FROM Response__c
                WHERE Id = :responseId
                LIMIT 1];
    }
    
    public List<Response__c> getResponsesBySurveyVersionId(Id surveyVersionId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Survey__c
                FROM Response__c
                WHERE Survey__c = :surveyVersionId];
    }
    
    public void createResponse(Response__c response) {
        insert response;
    }
    
    public void updateResponse(Response__c response) {
        update response;
    }
    
    public void deleteResponse(Id responseId) {
        delete [SELECT Id FROM Response__c WHERE Id = :responseId];
    }
}