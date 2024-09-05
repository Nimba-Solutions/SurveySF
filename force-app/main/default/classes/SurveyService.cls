public class SurveyService extends Service {

    private SurveyRepository surveyRepository;

    // Constructor
    public SurveyService() {
        // Initialize the surveyRepository
        this.surveyRepository = new SurveyRepository();
        this.repository = surveyRepository;
    }

    // Get survey by ID and map its fields to DTO
    public SurveyDTO.BaseSurveyDTO getSurveyById(Id surveyId, String fieldSetName) {
        try {
            return surveyRepository.findSurveyById(surveyId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching survey by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve survey');
        }
    }

    // Create new survey using DTO with optional rollback handling
    public SurveyDTO.BaseSurveyDTO createSurvey(SurveyDTO.CreateSurveyDTO createSurveyDTO, Boolean rollbackOnError) {
        try {
            List<SurveyDTO.CreateSurveyDTO> dtoList = new List<SurveyDTO.CreateSurveyDTO>{createSurveyDTO};
            return surveyRepository.createSurveys(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating survey: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create survey');
        }
    }

    // Create multiple surveys using DTO with optional rollback handling
    public List<SurveyDTO.BaseSurveyDTO> createSurveys(List<SurveyDTO.CreateSurveyDTO> surveyDTOs, Boolean rollbackOnError) {
        try {
            return surveyRepository.createSurveys(surveyDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating surveys: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveys');
        }
    }

    // Update survey using DTO with optional rollback handling
    public SurveyDTO.BaseSurveyDTO updateSurvey(SurveyDTO.UpdateSurveyDTO updateSurveyDTO, Boolean rollbackOnError) {
        try {
            List<SurveyDTO.UpdateSurveyDTO> dtoList = new List<SurveyDTO.UpdateSurveyDTO>{updateSurveyDTO};
            return surveyRepository.updateSurveys(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating survey: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update survey');
        }
    }

    // Update multiple surveys using DTO with optional rollback handling
    public List<SurveyDTO.BaseSurveyDTO> updateSurveys(List<SurveyDTO.UpdateSurveyDTO> surveyDTOs, Boolean rollbackOnError) {
        try {
            return surveyRepository.updateSurveys(surveyDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating surveys: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveys');
        }
    }

    // Delete surveys using DTOs with optional rollback handling
    public List<SurveyDTO.BaseSurveyDTO> deleteSurveys(List<SurveyDTO.BaseSurveyDTO> surveyDTOs, Boolean rollbackOnError) {
        try {
            return surveyRepository.deleteSurveys(surveyDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting surveys: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete survey(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}