public with sharing class ObjectService {
    
    @AuraEnabled(cacheable=true)
    public static List<ObjectMetadata> getAvailableObjects() {
        System.debug('ObjectService.getAvailableObjects() called');
        List<ObjectMetadata> result = new List<ObjectMetadata>();
        
        // Get standard and custom objects the user has access to
        Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
        List<String> objectNames = new List<String>(globalDescribe.keySet());
        objectNames.sort(); // Sort alphabetically
        
        for (String objectName : objectNames) {
            Schema.SObjectType objType = globalDescribe.get(objectName);
            Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
            
            // Only include objects that are accessible
            if (objDescribe.isAccessible()) {
                String name = objDescribe.getName();
                
                // Filter out history objects, share objects, and other system objects
                if (!name.endsWith('__History') && 
                    !name.endsWith('__Share') && 
                    !name.endsWith('__hd') && 
                    !name.endsWith('__c_hd') && 
                    !name.endsWith('__Feed') &&
                    !name.startsWith('Auth') &&
                    !name.startsWith('Login') &&
                    !name.contains('History') &&
                    !name.equals('OldValue') &&
                    !name.equals('NewValue')) {
                    
                    ObjectMetadata objMetadata = new ObjectMetadata();
                    objMetadata.apiName = name;
                    objMetadata.label = objDescribe.getLabel();
                    objMetadata.isCustom = objDescribe.isCustom();
                    result.add(objMetadata);
                }
            }
        }
        
        System.debug('ObjectService.getAvailableObjects() returning ' + result.size() + ' objects');
        return result;
    }
    
    // Wrapper class for serialization
    public class ObjectMetadata {
        @AuraEnabled public String apiName;
        @AuraEnabled public String label;
        @AuraEnabled public Boolean isCustom;
    }
} 