public with sharing class FieldService {
    
    @AuraEnabled(cacheable=true)
    public static List<FieldMetadata> getFieldsForObject(String objectName) {
        System.debug('FieldService.getFieldsForObject() called with objectName: ' + objectName);
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
                    
                    // Add reference information for lookup/master-detail fields
                    if (fieldDescribe.getType() == Schema.DisplayType.REFERENCE) {
                        List<Schema.SObjectType> referenceTo = fieldDescribe.getReferenceTo();
                        if (!referenceTo.isEmpty()) {
                            fieldMetadata.referenceTo = referenceTo[0].getDescribe().getName();
                        }
                    }
                    
                    result.add(fieldMetadata);
                }
            }
        } catch (Exception e) {
            System.debug('Error getting fields for object ' + objectName + ': ' + e.getMessage());
        }
        
        return result;
    }
    
    // Wrapper class for serialization
    public class FieldMetadata {
        @AuraEnabled public String apiName;
        @AuraEnabled public String label;
        @AuraEnabled public String type;
        @AuraEnabled public Boolean isCustom;
        @AuraEnabled public Boolean isUpdateable;
        @AuraEnabled public String referenceTo;
    }
} 