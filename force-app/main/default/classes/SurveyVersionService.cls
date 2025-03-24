public class SurveyVersionService {
    public static SurveyVersionModel createVersion(SurveyVersionModel model, Id surveyId) {
        SurveyVersion__c version = model.toSObject(surveyId);
        insert version;
        
        for(PageModel page : model.pages) {
            Page__c pageObj = page.toSObject(version.Id);
            insert pageObj;
            
            for(ElementModel element : page.elements) {
                Element__c elementObj = element.toSObject(pageObj.Id);
                insert elementObj;
            }
        }
        
        return SurveyVersionModel.fromSObject(version);
    }
    
    public static void deactivateVersion(Id versionId) {
        SurveyVersion__c version = [SELECT Id, IsActive__c FROM SurveyVersion__c WHERE Id = :versionId];
        version.IsActive__c = false;
        update version;
    }
    
    public static void activateVersion(Id versionId) {
        // Deactivate all other versions of the same survey
        SurveyVersion__c version = [SELECT Id, Survey__c, IsActive__c FROM SurveyVersion__c WHERE Id = :versionId];
        List<SurveyVersion__c> otherVersions = [SELECT Id FROM SurveyVersion__c WHERE Survey__c = :version.Survey__c AND Id != :versionId];
        
        for(SurveyVersion__c otherVersion : otherVersions) {
            otherVersion.IsActive__c = false;
        }
        update otherVersions;
        
        // Activate the selected version
        version.IsActive__c = true;
        update version;
    }
} 