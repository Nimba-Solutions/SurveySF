public class PageRepository {
    public List<Page__c> getPagesBySurveyVersionId(Id surveyVersionId) {
        return [SELECT Id, Name, Body__c, CreatedBy.Name, LastModifiedBy.Name, Index__c, Survey__c
                FROM Page__c
                WHERE Survey__c = :surveyVersionId
                ORDER BY Index__c ASC];
    }
    
    public void createPage(Page__c page) {
        insert page;
    }
    
    public void updatePage(Page__c page) {
        update page;
    }
    
    public void deletePage(Id pageId) {
        delete [SELECT Id FROM Page__c WHERE Id = :pageId];
    }
}