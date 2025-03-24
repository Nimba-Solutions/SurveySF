public with sharing class SurveyService {
    
    private static SurveyVersion__c getVersionRecord(Id versionId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Id = :versionId];
    }
    
    private static SurveyVersion__c getLatestDraftVersionRecord(Id surveyId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Draft'
                ORDER BY VersionNumber__c DESC 
                LIMIT 1];
    }
    
    private static SurveyVersion__c getLatestActiveVersionRecord(Id surveyId) {
        return [SELECT Id, Name, Survey__c, VersionNumber__c, 
                Status__c, Body__c, ActivatedDate__c 
                FROM SurveyVersion__c 
                WHERE Survey__c = :surveyId 
                AND Status__c = 'Active'
                ORDER BY VersionNumber__c DESC 
                LIMIT 1];
    }
    
    private static SurveyVersion__c getLatestVersionRecord(Id surveyId) {
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
        SurveyVersion__c version = getLatestDraftVersionRecord(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    public static SurveyVersionModel getLatestActiveVersion(Id surveyId) {
        SurveyVersion__c version = getLatestActiveVersionRecord(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    public static SurveyVersionModel getLatestVersion(Id surveyId) {
        SurveyVersion__c version = getLatestVersionRecord(surveyId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }

    public static SurveyVersionModel getVersionById(Id versionId) {
        SurveyVersion__c version = getVersionRecord(versionId);
        if(version == null) return null;
        
        return buildVersionModel(version);
    }
    
    private static String injectIdIntoJson(String json, Map<String, Id> recordIds) {
        if(String.isBlank(json)) return json;
        
        // Parse the JSON
        Map<String, Object> jsonMap = (Map<String, Object>)JSON.deserializeUntyped(json);
        
        // Process this object
        if(jsonMap.containsKey('pages')) {
            // This is a version object
            jsonMap.put('recordId', recordIds.get('version'));
            
            // Process pages
            List<Object> pages = (List<Object>)jsonMap.get('pages');
            for(Object pageObj : pages) {
                Map<String, Object> page = (Map<String, Object>)pageObj;
                
                // This is a page object
                String pageName = (String)page.get('name');
                page.put('recordId', recordIds.get('page_' + pageName));
                
                // Process elements
                if(page.containsKey('elements')) {
                    List<Object> elements = (List<Object>)page.get('elements');
                    for(Object elementObj : elements) {
                        Map<String, Object> element = (Map<String, Object>)elementObj;
                        
                        // This is an element object
                        String elementName = (String)element.get('name');
                        element.put('recordId', recordIds.get('element_' + elementName));
                    }
                }
            }
        }
        
        return JSON.serialize(jsonMap);
    }
    
    private static SurveyVersionModel buildVersionModel(SurveyVersion__c version) {
        SurveyVersionModel versionModel = new SurveyVersionModel();
        versionModel.recordId = version.Id;
        versionModel.name = version.Name;
        versionModel.surveyId = version.Survey__c;
        versionModel.versionNumber = version.VersionNumber__c;
        versionModel.status = version.Status__c;
        versionModel.body = version.Body__c;
        versionModel.activatedDate = version.ActivatedDate__c;
        versionModel.pages = new List<PageModel>();
        
        // Get pages for this version
        List<Page__c> pages = getVersionPages(version.Id);
        
        // Get elements for all pages
        Set<Id> pageIds = new Map<Id, Page__c>(pages).keySet();
        List<Element__c> elements = getPageElements(pageIds);
        
        // Build ID map for all records
        Map<String, Id> recordIds = new Map<String, Id>();
        recordIds.put('version', version.Id);
        
        // Map elements to pages
        Map<Id, List<Element__c>> pageToElements = new Map<Id, List<Element__c>>();
        for(Element__c element : elements) {
            if(!pageToElements.containsKey(element.Page__c)) {
                pageToElements.put(element.Page__c, new List<Element__c>());
            }
            pageToElements.get(element.Page__c).add(element);
            recordIds.put('element_' + element.Name, element.Id);
        }
        
        // Build the complete hierarchy
        for(Page__c page : pages) {
            PageModel pageModel = new PageModel();
            pageModel.recordId = page.Id;
            pageModel.name = page.Name;
            pageModel.sequence = page.Sequence__c;
            pageModel.body = page.Body__c;
            recordIds.put('page_' + page.Name, page.Id);
            
            // Inject IDs into body
            if(pageModel.body != null) {
                pageModel.body = injectIdIntoJson(pageModel.body, recordIds);
            }
            
            pageModel.elements = new List<ElementModel>();
            
            List<Element__c> pageElements = pageToElements.get(page.Id);
            if(pageElements != null) {
                for(Element__c element : pageElements) {
                    ElementModel elementModel = new ElementModel();
                    elementModel.recordId = element.Id;
                    elementModel.name = element.Name;
                    elementModel.type = element.Type__c;
                    elementModel.sequence = element.Sequence__c;
                    elementModel.body = element.Body__c;
                    
                    // Inject IDs into body
                    if(elementModel.body != null) {
                        elementModel.body = injectIdIntoJson(elementModel.body, recordIds);
                    }
                    
                    pageModel.elements.add(elementModel);
                }
            }
            
            versionModel.pages.add(pageModel);
        }
        
        // Inject IDs into version body
        if(versionModel.body != null) {
            versionModel.body = injectIdIntoJson(versionModel.body, recordIds);
        }
        
        return versionModel;
    }
    
    public static SurveyVersionModel saveVersion(SurveyVersionModel versionModel) {
        // If we have a version ID, check its status
        if(versionModel.recordId != null) {
            SurveyVersion__c existingVersion = getVersionRecord(versionModel.recordId);
            
            // If version is Active, create a new draft version
            if(existingVersion.Status__c == 'Active') {
                // Clear all record IDs to force new records
                versionModel.recordId = null;
                if(versionModel.pages != null) {
                    for(PageModel page : versionModel.pages) {
                        page.recordId = null;
                        if(page.elements != null) {
                            for(ElementModel element : page.elements) {
                                element.recordId = null;
                            }
                        }
                    }
                }
                versionModel.status = 'Draft';
            }
            // If version is Draft, update existing records
            else if(existingVersion.Status__c == 'Draft') {
                versionModel.status = 'Draft';
            }
        }
        else {
            // New version, default to Draft
            versionModel.status = 'Draft';
        }

        // Save the version record
        SurveyVersion__c versionRecord = new SurveyVersion__c(
            Id = versionModel.recordId,
            Name = versionModel.name,
            Survey__c = versionModel.surveyId,
            VersionNumber__c = versionModel.versionNumber,
            Status__c = versionModel.status,
            Body__c = versionModel.body,
            ActivatedDate__c = versionModel.activatedDate
        );
        upsert versionRecord;
        
        if(versionModel.pages == null || versionModel.pages.isEmpty()) {
            // Even with no pages, we need to return the version with its ID
            Map<String, Id> recordIds = new Map<String, Id>();
            recordIds.put('version', versionRecord.Id);
            
            if(versionModel.body != null) {
                versionModel.body = injectIdIntoJson(versionModel.body, recordIds);
            }
            versionModel.recordId = versionRecord.Id;
            return versionModel;
        }
        
        // Get existing pages and elements
        List<Page__c> existingPages = getVersionPages(versionRecord.Id);
        Set<Id> existingPageIds = new Map<Id, Page__c>(existingPages).keySet();
        List<Element__c> existingElements = getPageElements(existingPageIds);
        
        // Maps to track what we're keeping
        Set<Id> pagesToKeep = new Set<Id>();
        Set<Id> elementsToKeep = new Set<Id>();
        
        // Lists for new/updated records
        List<Page__c> pagesToUpsert = new List<Page__c>();
        List<Element__c> elementsToUpsert = new List<Element__c>();
        
        // Build ID map for all records
        Map<String, Id> recordIds = new Map<String, Id>();
        recordIds.put('version', versionRecord.Id);
        
        // Process each page
        for(PageModel pageModel : versionModel.pages) {
            // Extract the Salesforce ID from the JSON
            String recordId = extractIdFromJson(pageModel.body);
            Page__c pageRecord = new Page__c(
                Id = pageModel.recordId,
                Name = pageModel.name,
                SurveyVersion__c = versionRecord.Id,
                Sequence__c = pageModel.sequence,
                Body__c = pageModel.body
            );
            
            if(String.isNotBlank(recordId)) {
                pageRecord.Id = recordId;
                pagesToKeep.add(recordId);
            }
            
            pagesToUpsert.add(pageRecord);
            
            // Process elements
            if(pageModel.elements != null && !pageModel.elements.isEmpty()) {
                for(ElementModel elementModel : pageModel.elements) {
                    String elementRecordId = extractIdFromJson(elementModel.body);
                    Element__c elementRecord = new Element__c(
                        Id = elementModel.recordId,
                        Name = elementModel.name,
                        Page__c = pageRecord.Id,
                        Type__c = elementModel.type,
                        Sequence__c = elementModel.sequence,
                        Body__c = elementModel.body
                    );
                    
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
        
        // After saving, update the ID map with new records
        for(Page__c page : pagesToUpsert) {
            recordIds.put('page_' + page.Name, page.Id);
        }
        
        for(Element__c element : elementsToUpsert) {
            recordIds.put('element_' + element.Name, element.Id);
        }
        
        // Inject all IDs back into the JSON and update the models
        if(versionModel.body != null) {
            versionModel.body = injectIdIntoJson(versionModel.body, recordIds);
        }
        versionModel.recordId = versionRecord.Id;
        
        for(PageModel pageModel : versionModel.pages) {
            if(pageModel.body != null) {
                pageModel.body = injectIdIntoJson(pageModel.body, recordIds);
            }
            
            if(pageModel.elements != null) {
                for(ElementModel elementModel : pageModel.elements) {
                    if(elementModel.body != null) {
                        elementModel.body = injectIdIntoJson(elementModel.body, recordIds);
                    }
                }
            }
        }
        
        return versionModel;
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