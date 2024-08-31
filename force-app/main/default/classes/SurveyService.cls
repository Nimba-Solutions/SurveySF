public class SurveyService {
    private SurveyRepository surveyRepo;
    private SurveyVersionRepository surveyVersionRepo;
    
    public SurveyService() {
        this.surveyRepo = new SurveyRepository();
        this.surveyVersionRepo = new SurveyVersionRepository();
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
}