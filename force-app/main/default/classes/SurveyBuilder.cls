public class SurveyBuilder {

    @AuraEnabled
    public static Id createSurveyFromJSON(String jsonString,SurveyVersion__c surveyVersion, Boolean isUpdate){
        try {
            if(isUpdate){
                List<Page__c> pages = new List<Page__c>();
                pages = [SELECT Id FROM Page__c WHERE SurveyVersion__c = :surveyVersion.Id];
                if(!pages.isEmpty()){
                    delete [ SELECT Id FROM Element__c WHERE Page__c IN :pages];

                    delete pages;
                }
            }
        
            return SurveyService.createRecordsFromJson(jsonString,surveyVersion,isUpdate);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String,String> getSurveyVersion(Id recId){
        try {
            // encrypt the survey id before redirecting to the survey
            Blob blobSurveyId = Blob.valueOf(recId);
            Blob encryptedId = Crypto.encryptWithManagedIV('AES256', EncodingUtil.base64Decode(System.Label.Survey_Encryption_Key), blobSurveyId);
            String surveyIdString = EncodingUtil.base64Encode(encryptedId);

            List<SurveyVersion__c> surveyVersion = new List<SurveyVersion__c>();
            Map<String,String> returnMap = new Map<String,String>();

            surveyVersion = [SELECT Id,Survey__c,Body__c,VersionNumber__c,Status__c FROM SurveyVersion__c WHERE Id = :recId LIMIT 1];
            if(surveyVersion.isEmpty()){
               returnMap.put('error','No version found!');
                return returnMap;
            }
            returnMap.put('version', JSON.serialize(surveyVersion[0]));
            returnMap.put('surveyId', surveyIdString);
            List<SurveyVersion__c> surveyVersionLst = [SELECT Id,Survey__c,Body__c,VersionNumber__c,Status__c FROM SurveyVersion__c WHERE Survey__c = :surveyVersion[0].Survey__c];
            
            returnMap.put('surveyVersionList', JSON.serialize(surveyVersionLst));

            //fetching survey site link
            Site sit = [SELECT Id, Name, Subdomain, UrlPathPrefix, Status,masterlabel FROM Site WHERE masterlabel = 'Survey' AND Status = 'Active' AND UrlPathPrefix != 'vforcesite' LIMIT 1];
            String siteDomain = [SELECT Id, Domain.Domain, SiteId, PathPrefix FROM DomainSite WHERE SiteId =: sit.Id LIMIT 1].Domain.Domain;
            returnMap.put('siteDomain', siteDomain);

            return returnMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void markActive(Id recId){
        try {
            update new SurveyVersion__c(
                Id = recId,
                Status__c = 'Active',
                ActivatedDate__c = system.now()
            );
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static SurveyResponse__c getSurveyResponse(Id recId){
        try {
            system.debug('recId-'+recId);
            return [SELECT Id,Survey_Version__r.Body__c,Body__c FROM SurveyResponse__c WHERE Id = :recId];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String getSurveyJSON(Id recId, String objectName){
        try {
            if(objectName == 'SurveyVersion__c'){
                return [SELECT Id,Body__c FROM SurveyVersion__c WHERE Id = :recId].Body__c;
            }

            return [SELECT Id,Body__c FROM SurveyVersion__c WHERE Survey__c = :recId ORDER BY CreatedDate DESC LIMIT 1].Body__c;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<SurveyVersion__c> getSurveyVersionBySurvey(Id recId){
        try {
            return [SELECT Id,Body__c FROM SurveyVersion__c WHERE Survey__c = :recId ORDER BY CreatedDate DESC];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}