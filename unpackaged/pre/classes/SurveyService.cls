public with sharing class SurveyService {
    
    private static Survey__c getSurveyRecord(Id surveyId) {
        return [SELECT Id, Name, Description__c, Body__c 
                FROM Survey__c 
                WHERE Id = :surveyId];
    }
    
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
                    ElementModel elementModel = ElementModel.toJson(element);
                    pageModel.elements.add(elementModel);
                }
            }
            
            versionModel.pages.add(pageModel);
        }
        
        return versionModel;
    }
    
    public static SurveyVersionModel saveVersion(SurveyVersionModel versionModel) {
        // If we have a version ID, check its status
        if(versionModel.id != null) {
            SurveyVersion__c existingVersion = getVersionRecord(versionModel.id);
            
            // If version is Active, create a new draft version
            if(existingVersion.Status__c == 'Active') {
                // Clear all record IDs to force new records
                versionModel.id = null;
                if(versionModel.pages != null) {
                    for(PageModel page : versionModel.pages) {
                        page.id = null;
                        if(page.elements != null) {
                            for(ElementModel element : page.elements) {
                                element.id = null;
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
        SurveyVersion__c versionRecord = versionModel.toRecord();
        upsert versionRecord;
        
        if(versionModel.pages == null || versionModel.pages.isEmpty()) {
            versionModel.id = versionRecord.Id;
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
        
        // Process each page
        for(PageModel pageModel : versionModel.pages) {
            Page__c pageRecord = pageModel.toRecord();
            pageRecord.SurveyVersion__c = versionRecord.Id;
            
            if(pageModel.id != null) {
                pageRecord.Id = pageModel.id;
                pagesToKeep.add(pageModel.id);
            }
            
            pagesToUpsert.add(pageRecord);
            
            // Process elements
            if(pageModel.elements != null && !pageModel.elements.isEmpty()) {
                for(ElementModel elementModel : pageModel.elements) {
                    Element__c elementRecord = elementModel.toRecord();
                    elementRecord.Page__c = pageRecord.Id;
                    
                    if(elementModel.id != null) {
                        elementRecord.Id = elementModel.id;
                        elementsToKeep.add(elementModel.id);
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
        
        // Update the model with new IDs
        versionModel.id = versionRecord.Id;
        
        for(Integer i = 0; i < versionModel.pages.size(); i++) {
            PageModel pageModel = versionModel.pages[i];
            pageModel.id = pagesToUpsert[i].Id;
            
            if(pageModel.elements != null) {
                for(Integer j = 0; j < pageModel.elements.size(); j++) {
                    ElementModel elementModel = pageModel.elements[j];
                    elementModel.id = elementsToUpsert[j].Id;
                }
            }
        }
        
        return versionModel;
    }

    @AuraEnabled
    public static SurveyModel getSurvey(Id surveyId) {
        Survey__c survey = [
            SELECT Id, Name, Description__c, Status__c,
                   (SELECT Id, Name, Version__c, Status__c, Body__c 
                    FROM Survey_Versions__r 
                    ORDER BY Version__c DESC)
            FROM Survey__c 
            WHERE Id = :surveyId
        ];
        
        SurveyModel model = SurveyModel.toJson(survey);
        model.versions = new List<SurveyVersionModel>();
        
        for(Survey_Version__c version : survey.Survey_Versions__r) {
            model.versions.add(SurveyVersionModel.toJson(version));
        }
        
        return model;
    }
    
    @AuraEnabled
    public static SurveyModel saveSurvey(SurveyModel model) {
        Survey__c survey = model.toRecord();
        upsert survey;
        
        // If we have versions, save them too
        if(model.versions != null && !model.versions.isEmpty()) {
            List<Survey_Version__c> versions = new List<Survey_Version__c>();
            for(SurveyVersionModel versionModel : model.versions) {
                Survey_Version__c version = versionModel.toRecord();
                version.Survey__c = survey.Id;
                versions.add(version);
            }
            upsert versions;
        }
        
        return getSurvey(survey.Id);
    }
    
    @AuraEnabled
    public static void deleteSurvey(Id surveyId) {
        delete [SELECT Id FROM Survey__c WHERE Id = :surveyId];
    }
} 