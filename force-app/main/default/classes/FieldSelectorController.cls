public with sharing class FieldSelectorController {
    @AuraEnabled(cacheable=true)
    public static List<Object> getFields(String objectName) {
        try {
            return FieldService.getFieldsForObject(objectName);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 