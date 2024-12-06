public without sharing class SurveyTaker {

    @AuraEnabled
    public static Map<String,String> fetchSurvey(String encryptedId){
        encryptedId = encryptedId.replaceAll(' ','+');
        try {
            // decrypt the encrypted id 
            // it is encrypted with the crypto decryption method
            Blob surveyId = EncodingUtil.base64Decode(encryptedId);
            Blob decryptedSurveyId = Crypto.decryptWithManagedIV('AES256', Blob.valueOf(System.Label.Survey_Encryption_Key), surveyId);
            String surveyIdString = decryptedSurveyId.toString();

            Map<String,String> resMap = SurveyBuilder.getSurveyVersion(surveyIdString);
          
            return new Map<String,String>{'version' => resMap.get('version')};
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

       @AuraEnabled
    public static void saveResponse(String response,Id recId){
        try {
            insert new Survey_Response__c(Body__c=response,Survey__c = recId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}