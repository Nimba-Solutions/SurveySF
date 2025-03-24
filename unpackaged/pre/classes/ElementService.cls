public with sharing class ElementService {
    @AuraEnabled
    public static ElementModel getElement(Id elementId) {
        Element__c element = [
            SELECT Id, Name, Page__c, Type__c, Sequence__c, Body__c
            FROM Element__c 
            WHERE Id = :elementId
        ];
        
        return ElementModel.toJson(element);
    }
    
    @AuraEnabled
    public static ElementModel saveElement(ElementModel model) {
        Element__c element = model.toRecord();
        upsert element;
        return getElement(element.Id);
    }
    
    @AuraEnabled
    public static void deleteElement(Id elementId) {
        delete [SELECT Id FROM Element__c WHERE Id = :elementId];
    }
    
    public static List<Element__c> getPageElements(Set<Id> pageIds) {
        return [SELECT Id, Name, Page__c, Type__c, Sequence__c, Body__c 
                FROM Element__c 
                WHERE Page__c IN :pageIds 
                ORDER BY Sequence__c ASC];
    }
} 