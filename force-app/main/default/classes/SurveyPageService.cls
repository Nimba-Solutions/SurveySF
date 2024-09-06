public class SurveyPageService extends Service {

    private SurveyPageRepository surveypageRepository;

    // Constructor
    public SurveyPageService() {
        // Initialize the surveypageRepository
        this.surveypageRepository = new SurveyPageRepository();
        this.repository = surveypageRepository;
    }

    // Get surveypage by ID and map its fields to DTO
    public SurveyPageDTO.BaseSurveyPageDTO getSurveyPageById(Id surveypageId, String fieldSetName) {
        try {
            return surveypageRepository.findSurveyPageById(surveypageId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching surveypage by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve surveypage');
        }
    }

    // Create new surveypage using DTO with optional rollback handling
    public SurveyPageDTO.BaseSurveyPageDTO createSurveyPage(SurveyPageDTO.CreateSurveyPageDTO createSurveyPageDTO, Boolean rollbackOnError) {
        try {
            List<SurveyPageDTO.CreateSurveyPageDTO> dtoList = new List<SurveyPageDTO.CreateSurveyPageDTO>{createSurveyPageDTO};
            return surveypageRepository.createSurveyPages(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating surveypage: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveypage');
        }
    }

    // Create multiple surveypages using DTO with optional rollback handling
    public List<SurveyPageDTO.BaseSurveyPageDTO> createSurveyPages(List<SurveyPageDTO.CreateSurveyPageDTO> surveypageDTOs, Boolean rollbackOnError) {
        try {
            return surveypageRepository.createSurveyPages(surveypageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating surveypages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create surveypages');
        }
    }

    // Update surveypage using DTO with optional rollback handling
    public SurveyPageDTO.BaseSurveyPageDTO updateSurveyPage(SurveyPageDTO.UpdateSurveyPageDTO updateSurveyPageDTO, Boolean rollbackOnError) {
        try {
            List<SurveyPageDTO.UpdateSurveyPageDTO> dtoList = new List<SurveyPageDTO.UpdateSurveyPageDTO>{updateSurveyPageDTO};
            return surveypageRepository.updateSurveyPages(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating surveypage: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveypage');
        }
    }

    // Update multiple surveypages using DTO with optional rollback handling
    public List<SurveyPageDTO.BaseSurveyPageDTO> updateSurveyPages(List<SurveyPageDTO.UpdateSurveyPageDTO> surveypageDTOs, Boolean rollbackOnError) {
        try {
            return surveypageRepository.updateSurveyPages(surveypageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating surveypages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update surveypages');
        }
    }

    // Delete surveypages using DTOs with optional rollback handling
    public List<SurveyPageDTO.BaseSurveyPageDTO> deleteSurveyPages(List<SurveyPageDTO.BaseSurveyPageDTO> surveypageDTOs, Boolean rollbackOnError) {
        try {
            return surveypageRepository.deleteSurveyPages(surveypageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting surveypages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete surveypage(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}