public with sharing class SurveyMetadataService {
    
    @AuraEnabled(cacheable=true)
    public static List<ObjectMetadata> getAvailableObjects() {
        System.debug('SurveyMetadataService.getAvailableObjects() called');
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
        
        System.debug('SurveyMetadataService.getAvailableObjects() returning ' + result.size() + ' objects');
        return result;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<FieldMetadata> getFieldsForObject(String objectName) {
        System.debug('SurveyMetadataService.getFieldsForObject() called with objectName: ' + objectName);
        List<FieldMetadata> result = new List<FieldMetadata>();
        
        try {
            // Get the object type and describe
            Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
            if (objType == null) {
                return result;
            }
            
            Map<String, Schema.SObjectField> fieldMap = objType.getDescribe().fields.getMap();
            List<String> fieldNames = new List<String>(fieldMap.keySet());
            fieldNames.sort(); // Sort alphabetically
            
            for (String fieldName : fieldNames) {
                Schema.SObjectField field = fieldMap.get(fieldName);
                Schema.DescribeFieldResult fieldDescribe = field.getDescribe();
                
                // Only include fields that are accessible
                if (fieldDescribe.isAccessible()) {
                    FieldMetadata fieldMetadata = new FieldMetadata();
                    fieldMetadata.apiName = fieldDescribe.getName();
                    fieldMetadata.label = fieldDescribe.getLabel();
                    fieldMetadata.type = String.valueOf(fieldDescribe.getType());
                    fieldMetadata.isCustom = fieldDescribe.isCustom();
                    fieldMetadata.isUpdateable = fieldDescribe.isUpdateable();
                    result.add(fieldMetadata);
                }
            }
        } catch (Exception e) {
            System.debug('Error getting fields for object ' + objectName + ': ' + e.getMessage());
        }
        
        return result;
    }
    
    // Wrapper classes for serialization
    public class ObjectMetadata {
        @AuraEnabled public String apiName;
        @AuraEnabled public String label;
        @AuraEnabled public Boolean isCustom;
    }
    
    public class FieldMetadata {
        @AuraEnabled public String apiName;
        @AuraEnabled public String label;
        @AuraEnabled public String type;
        @AuraEnabled public Boolean isCustom;
        @AuraEnabled public Boolean isUpdateable;
    }
} 