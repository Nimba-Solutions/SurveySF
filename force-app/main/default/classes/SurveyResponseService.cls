public class SurveyResponseService extends Service {

    private SurveyResponseRepository surveyresponseRepository;

    // Constructor
    public SurveyResponseService() {
        // Initialize the surveyresponseRepository
        this.surveyresponseRepository = new SurveyResponseRepository();
        this.repository = surveyresponseRepository;
    }

    // Get surveyresponse by ID and map its fields to DTO
    public SurveyResponseDTO.BaseSurveyResponseDTO getSurveyResponseById(Id surveyresponseId, String fieldSetName) {
        try {
            return surveyresponseRepository.findSurveyResponseById(surveyresponseId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching surveyresponse by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve surveyresponse');
        }
    }

    // Create new surveyresponse using DTO with optional rollback handling
    public SurveyResponseDTO.BaseSurveyResponseDTO createSurveyResponse(SurveyResponseDTO.CreateSurveyResponseDTO createSurveyResponseDTO, Boolean rollbackOnError) {
        try {
            List<SurveyResponseDTO.CreateSurveyResponseDTO> dtoList = new List<SurveyResponseDTO.CreateSurveyResponseDTO>{createSurveyResponseDTO};
            return surveyresponseRepository.createSurveyResponses(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating surveyresponse: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveyresponse');
        }
    }

    // Create multiple surveyresponses using DTO with optional rollback handling
    public List<SurveyResponseDTO.BaseSurveyResponseDTO> createSurveyResponses(List<SurveyResponseDTO.CreateSurveyResponseDTO> surveyresponseDTOs, Boolean rollbackOnError) {
        try {
            return surveyresponseRepository.createSurveyResponses(surveyresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating surveyresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveyresponses');
        }
    }

    // Update surveyresponse using DTO with optional rollback handling
    public SurveyResponseDTO.BaseSurveyResponseDTO updateSurveyResponse(SurveyResponseDTO.UpdateSurveyResponseDTO updateSurveyResponseDTO, Boolean rollbackOnError) {
        try {
            List<SurveyResponseDTO.UpdateSurveyResponseDTO> dtoList = new List<SurveyResponseDTO.UpdateSurveyResponseDTO>{updateSurveyResponseDTO};
            return surveyresponseRepository.updateSurveyResponses(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating surveyresponse: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveyresponse');
        }
    }

    // Update multiple surveyresponses using DTO with optional rollback handling
    public List<SurveyResponseDTO.BaseSurveyResponseDTO> updateSurveyResponses(List<SurveyResponseDTO.UpdateSurveyResponseDTO> surveyresponseDTOs, Boolean rollbackOnError) {
        try {
            return surveyresponseRepository.updateSurveyResponses(surveyresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating surveyresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveyresponses');
        }
    }

    // Delete surveyresponses using DTOs with optional rollback handling
    public List<SurveyResponseDTO.BaseSurveyResponseDTO> deleteSurveyResponses(List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseDTOs, Boolean rollbackOnError) {
        try {
            return surveyresponseRepository.deleteSurveyResponses(surveyresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting surveyresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete surveyresponse(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}