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
} 