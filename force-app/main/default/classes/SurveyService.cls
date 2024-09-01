public class SurveyService {
    private SurveyRepository surveyRepo;
    private SurveyVersionRepository surveyVersionRepo;
    private PageRepository pageRepo;
    private PageElementRepository pageElementRepo;
    private ElementService elementService;
    
    public SurveyService() {
        this.surveyRepo = new SurveyRepository();
        this.surveyVersionRepo = new SurveyVersionRepository();
        this.pageRepo = new PageRepository();
        this.pageElementRepo = new PageElementRepository();
        this.elementService = new ElementService();
    }
    
    public SurveyDTO getSurveyWithLatestVersion(Id surveyId) {
        Survey__c survey = surveyRepo.getSurveyById(surveyId);
        SurveyVersion__c latestVersion = surveyVersionRepo.getLatestVersionBySurveyId(surveyId);
        
        return new SurveyDTO(survey, latestVersion);
    }
    
    public List<SurveyDTO> getAllSurveysWithLatestVersions() {
        List<SurveyDTO> surveyDTOs = new List<SurveyDTO>();
        for (Survey__c survey : surveyRepo.getAllSurveys()) {
            SurveyVersion__c latestVersion = surveyVersionRepo.getLatestVersionBySurveyId(survey.Id);
            surveyDTOs.add(new SurveyDTO(survey, latestVersion));
        }
        return surveyDTOs;
    }
    
    public void createSurveyWithVersion(String surveyName, String surveyBody) {
        Survey__c newSurvey = new Survey__c();
        newSurvey.Title__c = surveyName;
        surveyRepo.createSurvey(newSurvey);
        
        SurveyVersion__c newVersion = new SurveyVersion__c(
            Survey__c = newSurvey.Id,
            Body__c = surveyBody
        );
        surveyVersionRepo.createSurveyVersion(newVersion);
    }
    
    public void updateSurveyVersion(Id surveyId, String newSurveyBody) {
        SurveyVersion__c newVersion = new SurveyVersion__c(
            Survey__c = surveyId,
            Body__c = newSurveyBody
        );
        surveyVersionRepo.createSurveyVersion(newVersion);
    }
    
    public void createSurveyFromJSON(String surveyName, String jsonString) {
        SurveyJSONParser.ParsedSurvey parsedSurvey = SurveyJSONParser.parseSurveyJSON(jsonString);
        
        // Create Survey
        Survey__c newSurvey = new Survey__c();
        newSurvey.Title__c = surveyName;
        surveyRepo.createSurvey(newSurvey);
        
        // Create SurveyVersion
        SurveyVersion__c newVersion = new SurveyVersion__c(
            Survey__c = newSurvey.Id,
            Body__c = parsedSurvey.surveyBody
        );
        surveyVersionRepo.createSurveyVersion(newVersion);
        
        // Create Pages and PageElements
        for (Integer pageIndex = 0; pageIndex < parsedSurvey.pages.size(); pageIndex++) {
            SurveyJSONParser.ParsedPage parsedPage = parsedSurvey.pages[pageIndex];
            
            Page__c newPage = new Page__c(
                Survey__c = newVersion.Id,
                Body__c = parsedPage.pageBody,
                Index__c = pageIndex
            );
            pageRepo.createPage(newPage);
            
            List<PageElement__c> pageElements = new List<PageElement__c>();
            for (SurveyJSONParser.ParsedElement parsedElement : parsedPage.elements) {
                // Create Element and ElementVersion
                Id elementVersionId = elementService.createElementWithVersion(parsedElement.elementBody);
                
                PageElement__c pageElement = new PageElement__c(
                    Page__c = newPage.Id,
                    Element__c = elementVersionId,
                    Index__c = parsedElement.index
                );
                pageElements.add(pageElement);
            }
            for (PageElement__c pe : pageElements) {
                pageElementRepo.createPageElement(pe);
            }
        }
    }
    public String createJSONFromSurvey(Id surveyId) {
        // Step 1: Fetch the survey with its latest version
        SurveyDTO surveyDTO = getSurveyWithLatestVersion(surveyId);
        if (surveyDTO == null) {
            return null;
        }
        
        // Step 2: Initialize the JSON structure
        Map<String, Object> jsonMap = new Map<String, Object>();
        jsonMap.put('title', surveyDTO.title);
        jsonMap.put('completedHtml', surveyDTO.latestVersionBody);
        
        // Step 3: Fetch the pages by Index__c
        List<Map<String, Object>> pagesList = new List<Map<String, Object>>();
        List<Page__c> pages = pageRepo.getPagesBySurveyVersionId(surveyDTO.latestVersionId);
        
        
        // Step 4: Process each page and its elements
        for (Page__c page : pages) {
            Map<String, Object> pageMap = new Map<String, Object>();
            pageMap.put('name', page.Name);
            
            // Fetch the elements by Index__c
            List<Map<String, Object>> elementsList = new List<Map<String, Object>>();
            List<PageElement__c> pageElements = pageElementRepo.getPageElementsByPageId(page.Id);
            
            // Add each element to the elements list
            for (PageElement__c pageElement : pageElements) {
                Map<String, Object> elementMap = (Map<String, Object>) JSON.deserializeUntyped(pageElement.Element__r.Body__c);
                elementsList.add(elementMap);
            }
            
            pageMap.put('elements', elementsList);
            pagesList.add(pageMap);
        }
        
        jsonMap.put('pages', pagesList);
        
        // Step 5: Serialize the JSON map to a JSON string
        return JSON.serialize(jsonMap);
    }
    
}