public with sharing class ObjectSelectorController {
    @AuraEnabled(cacheable=true)
    public static List<Object> getObjects() {
        try {
            return ObjectService.getAvailableObjects();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 