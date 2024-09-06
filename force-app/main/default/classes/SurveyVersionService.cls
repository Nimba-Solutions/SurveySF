public class SurveyVersionService extends Service {

    private SurveyVersionRepository surveyversionRepository;

    // Constructor
    public SurveyVersionService() {
        // Initialize the surveyversionRepository
        this.surveyversionRepository = new SurveyVersionRepository();
        this.repository = surveyversionRepository;
    }

    // Get surveyversion by ID and map its fields to DTO
    public SurveyVersionDTO.BaseSurveyVersionDTO getSurveyVersionById(Id surveyversionId, String fieldSetName) {
        try {
            return surveyversionRepository.findSurveyVersionById(surveyversionId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching surveyversion by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve surveyversion');
        }
    }

    // Create new surveyversion using DTO with optional rollback handling
    public SurveyVersionDTO.BaseSurveyVersionDTO createSurveyVersion(SurveyVersionDTO.CreateSurveyVersionDTO createSurveyVersionDTO, Boolean rollbackOnError) {
        try {
            List<SurveyVersionDTO.CreateSurveyVersionDTO> dtoList = new List<SurveyVersionDTO.CreateSurveyVersionDTO>{createSurveyVersionDTO};
            return surveyversionRepository.createSurveyVersions(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating surveyversion: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveyversion');
        }
    }

    // Create multiple surveyversions using DTO with optional rollback handling
    public List<SurveyVersionDTO.BaseSurveyVersionDTO> createSurveyVersions(List<SurveyVersionDTO.CreateSurveyVersionDTO> surveyversionDTOs, Boolean rollbackOnError) {
        try {
            return surveyversionRepository.createSurveyVersions(surveyversionDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating surveyversions: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveyversions');
        }
    }

    // Update surveyversion using DTO with optional rollback handling
    public SurveyVersionDTO.BaseSurveyVersionDTO updateSurveyVersion(SurveyVersionDTO.UpdateSurveyVersionDTO updateSurveyVersionDTO, Boolean rollbackOnError) {
        try {
            List<SurveyVersionDTO.UpdateSurveyVersionDTO> dtoList = new List<SurveyVersionDTO.UpdateSurveyVersionDTO>{updateSurveyVersionDTO};
            return surveyversionRepository.updateSurveyVersions(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating surveyversion: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveyversion');
        }
    }

    // Update multiple surveyversions using DTO with optional rollback handling
    public List<SurveyVersionDTO.BaseSurveyVersionDTO> updateSurveyVersions(List<SurveyVersionDTO.UpdateSurveyVersionDTO> surveyversionDTOs, Boolean rollbackOnError) {
        try {
            return surveyversionRepository.updateSurveyVersions(surveyversionDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating surveyversions: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveyversions');
        }
    }

    // Delete surveyversions using DTOs with optional rollback handling
    public List<SurveyVersionDTO.BaseSurveyVersionDTO> deleteSurveyVersions(List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionDTOs, Boolean rollbackOnError) {
        try {
            return surveyversionRepository.deleteSurveyVersions(surveyversionDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting surveyversions: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete surveyversion(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}