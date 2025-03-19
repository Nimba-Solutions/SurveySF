public class SurveyService {
    private static SurveyVersion__c getLatestDraftVersion(Id surveyId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Draft'
                ORDER BY VersionNumber__c DESC 
                LIMIT 1];
    }
    
    private static SurveyVersion__c getLatestActiveVersion(Id surveyId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Active'
                ORDER BY VersionNumber__c DESC 
                LIMIT 1];
    }
    
    private static SurveyVersion__c getLatestVersion(Id surveyId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                ORDER BY VersionNumber__c DESC 
                LIMIT 1];
    }
    
    private static List<Page__c> getVersionPages(Id versionId) {
        return [SELECT Id, Name, SurveyVersion__c, Sequence__c, Body__c 
                FROM Page__c 
                WHERE SurveyVersion__c = :versionId 
                ORDER BY Sequence__c ASC];
    }
    
    private static List<Element__c> getPageElements(Set<Id> pageIds) {
        return [SELECT Id, Name, Page__c, Type__c, Sequence__c, Body__c 
                FROM Element__c 
                WHERE Page__c IN :pageIds 
                ORDER BY Sequence__c ASC];
    }
    
    public static SurveyVersionModel getLatestDraftVersion(Id surveyId) {
        SurveyVersion__c version = getLatestDraftVersion(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    public static SurveyVersionModel getLatestActiveVersion(Id surveyId) {
        SurveyVersion__c version = getLatestActiveVersion(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    public static SurveyVersionModel getLatestVersion(Id surveyId) {
        SurveyVersion__c version = getLatestVersion(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    private static SurveyVersionModel buildVersionModel(SurveyVersion__c version) {
        SurveyVersionModel versionModel = SurveyVersionModel.toJson(version);
        versionModel.pages = new List<PageModel>();
        
        // Get pages for this version
        List<Page__c> pages = getVersionPages(version.Id);
        
        // Get elements for all pages
        Set<Id> pageIds = new Map<Id, Page__c>(pages).keySet();
        List<Element__c> elements = getPageElements(pageIds);
        
        // Map elements to pages
        Map<Id, List<Element__c>> pageToElements = new Map<Id, List<Element__c>>();
        for(Element__c element : elements) {
            if(!pageToElements.containsKey(element.Page__c)) {
                pageToElements.put(element.Page__c, new List<Element__c>());
            }
            pageToElements.get(element.Page__c).add(element);
        }
        
        // Build the complete hierarchy
        for(Page__c page : pages) {
            PageModel pageModel = PageModel.toJson(page);
            pageModel.elements = new List<ElementModel>();
            
            List<Element__c> pageElements = pageToElements.get(page.Id);
            if(pageElements != null) {
                for(Element__c element : pageElements) {
                    pageModel.elements.add(ElementModel.toJson(element));
                }
            }
            
            versionModel.pages.add(pageModel);
        }
        
        return versionModel;
    }
    
    private static String injectIdIntoJson(String json, Id recordId) {
        if(String.isBlank(json)) return json;
        
        // Parse the JSON
        Map<String, Object> jsonMap = (Map<String, Object>)JSON.deserializeUntyped(json);
        
        // Add the Salesforce ID
        jsonMap.put('recordId', recordId);
        
        // Convert back to JSON
        return JSON.serialize(jsonMap);
    }
    
    public static void saveVersion(SurveyVersionModel versionModel) {
        // Save the version record
        SurveyVersion__c versionRecord = versionModel.toRecord();
        upsert versionRecord;
        
        if(versionModel.pages == null || versionModel.pages.isEmpty()) return;
        
        // Get existing pages and elements
        List<Page__c> existingPages = queryVersionPages(versionRecord.Id);
        Set<Id> existingPageIds = new Map<Id, Page__c>(existingPages).keySet();
        List<Element__c> existingElements = queryPageElements(existingPageIds);
        
        // Maps to track what we're keeping
        Set<Id> pagesToKeep = new Set<Id>();
        Set<Id> elementsToKeep = new Set<Id>();
        
        // Lists for new/updated records
        List<Page__c> pagesToUpsert = new List<Page__c>();
        List<Element__c> elementsToUpsert = new List<Element__c>();
        
        // Process each page
        for(PageModel pageModel : versionModel.pages) {
            // Extract the Salesforce ID from the JSON
            String recordId = extractIdFromJson(pageModel.body);
            Page__c pageRecord = pageModel.toRecord();
            pageRecord.SurveyVersion__c = versionRecord.Id;
            
            if(String.isNotBlank(recordId)) {
                pageRecord.Id = recordId;
                pagesToKeep.add(recordId);
            }
            
            pagesToUpsert.add(pageRecord);
            
            // Process elements
            if(pageModel.elements != null && !pageModel.elements.isEmpty()) {
                for(ElementModel elementModel : pageModel.elements) {
                    String elementRecordId = extractIdFromJson(elementModel.body);
                    Element__c elementRecord = elementModel.toRecord();
                    elementRecord.Page__c = pageRecord.Id;
                    
                    if(String.isNotBlank(elementRecordId)) {
                        elementRecord.Id = elementRecordId;
                        elementsToKeep.add(elementRecordId);
                    }
                    
                    elementsToUpsert.add(elementRecord);
                }
            }
        }
        
        // Delete pages and elements that are no longer present
        List<Page__c> pagesToDelete = new List<Page__c>();
        for(Page__c page : existingPages) {
            if(!pagesToKeep.contains(page.Id)) {
                pagesToDelete.add(page);
            }
        }
        
        List<Element__c> elementsToDelete = new List<Element__c>();
        for(Element__c element : existingElements) {
            if(!elementsToKeep.contains(element.Id)) {
                elementsToDelete.add(element);
            }
        }
        
        // Perform all DML operations
        if(!pagesToDelete.isEmpty()) delete pagesToDelete;
        if(!elementsToDelete.isEmpty()) delete elementsToDelete;
        if(!pagesToUpsert.isEmpty()) upsert pagesToUpsert;
        if(!elementsToUpsert.isEmpty()) upsert elementsToUpsert;
    }
    
    private static String extractIdFromJson(String json) {
        if(String.isBlank(json)) return null;
        
        try {
            Map<String, Object> jsonMap = (Map<String, Object>)JSON.deserializeUntyped(json);
            return (String)jsonMap.get('recordId');
        } catch(Exception e) {
            return null;
        }
    }
} 