public without sharing class SurveyTaker {

    @AuraEnabled
    public static Map<String,String> fetchSurvey(String encryptedId){
        encryptedId = encryptedId.replaceAll(' ','+');
        try {
            // decrypt the encrypted id 
            // it is encrypted with the crypto decryption method
            Blob surveyId = EncodingUtil.base64Decode(encryptedId);
            Blob decryptedSurveyId = Crypto.decryptWithManagedIV('AES256', EncodingUtil.base64Decode(System.Label.Survey_Encryption_Key), surveyId);
            String surveyIdString = decryptedSurveyId.toString();

            Map<String,String> resMap = SurveyBuilder.getSurveyVersion(surveyIdString);
          
            return new Map<String,String>{'version' => resMap.get('version')};
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

       @AuraEnabled
    public static void saveResponse(String response,Id recId,Id surveyId){
        try {
            insert new SurveyResponse__c(Body__c=response,SurveyVersion__c = recId,Survey__c = surveyId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}