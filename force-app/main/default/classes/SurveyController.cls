public with sharing class SurveyController {
    @AuraEnabled(cacheable=true)
    public static List<SurveyDTO> getAllSurveys() {
        SurveyService surveyService = new SurveyService();
        return surveyService.getAllSurveysWithLatestVersions();
    }
    
    @AuraEnabled(cacheable=true)
    public static SurveyDTO getSurveyWithLatestVersion(Id surveyId) {
        SurveyService surveyService = new SurveyService();
        return surveyService.getSurveyWithLatestVersion(surveyId);
    }
    
    @AuraEnabled
    public static void createSurvey(String surveyName, String surveyBody) {
        SurveyService surveyService = new SurveyService();
        surveyService.createSurveyWithVersion(surveyName, surveyBody);
    }
    
    @AuraEnabled
    public static void updateSurveyVersion(Id surveyId, String newSurveyBody) {
        SurveyService surveyService = new SurveyService();
        surveyService.updateSurveyVersion(surveyId, newSurveyBody);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<PageDTO> getPagesBySurveyVersionId(Id surveyVersionId) {
        PageService pageService = new PageService();
        return pageService.getPagesBySurveyVersionId(surveyVersionId);
    }
    
    @AuraEnabled
    public static void createPage(String pageBody, Id surveyVersionId, Decimal index) {
        PageService pageService = new PageService();
        pageService.createPage(pageBody, surveyVersionId, index);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ElementDTO> getAllElements() {
        ElementService elementService = new ElementService();
        return elementService.getAllElementsWithLatestVersions();
    }
    
    @AuraEnabled
    public static void createElement(String elementBody) {
        ElementService elementService = new ElementService();
        elementService.createElementWithVersion(elementBody);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ResponseDTO> getResponsesBySurveyVersionId(Id surveyVersionId) {
        ResponseService responseService = new ResponseService();
        return responseService.getResponsesBySurveyVersionId(surveyVersionId);
    }
    
    @AuraEnabled
    public static void createResponse(String responseBody, Id surveyVersionId, List<ResponseElementDTO> responseElements) {
        ResponseService responseService = new ResponseService();
        responseService.createResponse(responseBody, surveyVersionId, responseElements);
    }
}