public with sharing class SurveyShare {

    @AuraEnabled
    public static string getSurveyVersion(String surveyId){
        try {
            List<SurveyVersion__c> surveyVersion = [SELECT Id,Survey__c,Body__c,VersionNumber__c,Status__c,Survey__r.Name FROM SurveyVersion__c WHERE Survey__c = :surveyId AND Status__c = 'Active' ORDER BY CreatedDate DESC LIMIT 1];

            if(surveyVersion.isEmpty()){
                return 'No Active Survey Found!';
            }

            // encrypt the survey id before redirecting to the survey
            Blob blobSurveyId = Blob.valueOf(surveyVersion[0].Id);
            Blob encryptedId = Crypto.encryptWithManagedIV('AES256', EncodingUtil.base64Decode(System.Label.Survey_Encryption_Key), blobSurveyId);
            String surveyIdString = EncodingUtil.base64Encode(encryptedId);

            //fetching survey site link
            Site sit = [SELECT Id, Name, Subdomain, UrlPathPrefix, Status,masterlabel FROM Site WHERE masterlabel = 'Survey' AND Status = 'Active' AND UrlPathPrefix != 'vforcesite' LIMIT 1];
            String siteDomain = [SELECT Id, Domain.Domain, SiteId, PathPrefix FROM DomainSite WHERE SiteId =: sit.Id LIMIT 1].Domain.Domain;

            return siteDomain+'/survey?surveyId='+surveyIdString;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String ShareSurvey(String contactId,String surveyId, String surveyUrl){
        try {
            system.debug('contactId- '+contactId);
            system.debug('surveyId- '+surveyId);

            List<SurveyVersion__c> surveyVersion = [SELECT Id,Survey__c,Body__c,VersionNumber__c,Status__c,Survey__r.Name FROM SurveyVersion__c WHERE Survey__c = :surveyId AND Status__c = 'Active' ORDER BY CreatedDate DESC LIMIT 1];

            if(surveyVersion.isEmpty()){
                return 'No Active Survey Found!';
            }

            Contact con = [SELECT Id,Email FROM Contact WHERE Id=: contactId];

            if(con.Email == null){
                return 'Email is not present on contact!';
            }

            List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
            //Email to contact
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            message.setHtmlBody('Survey Link - '+ surveyUrl);
            message.setSubject('Survey - '+surveyVersion[0].Survey__r.Name);
            message.setTargetObjectId(con.Id);
            emails.add(message);
          
            Messaging.SendEmailResult [] r = Messaging.sendEmail(emails); 

            return null;

        }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}