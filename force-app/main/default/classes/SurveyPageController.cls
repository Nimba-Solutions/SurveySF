public with sharing class SurveyPageController {

    private static SurveyPageService surveypageService = new SurveyPageService();

    // Overloaded method to get a surveypage by ID with optional field set name
    public static SurveyPageDTO.BaseSurveyPageDTO getSurveyPageById(Id surveypageId) {
        return getSurveyPageById(surveypageId, null); 
    }

    public static SurveyPageDTO.BaseSurveyPageDTO getSurveyPageById(Id surveypageId, String fieldSetName) {
        try {
            return surveypageService.getSurveyPageById(surveypageId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single SurveyPage record using DTO
    public static SurveyPageDTO.BaseSurveyPageDTO createSurveyPage(SurveyPageDTO.CreateSurveyPageDTO createSurveyPageDTO) {
        try {
            return surveypageService.createSurveyPage(createSurveyPageDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple surveypages using DTOs
    public static List<SurveyPageDTO.BaseSurveyPageDTO> createSurveyPages(List<SurveyPageDTO.CreateSurveyPageDTO> surveyPageDTOs) {
        try {
            return surveyPageService.createSurveyPages(surveyPageDTOs, true);
        } catch (CustomException ex) {
            System.debug(LoggingLevel.ERROR, 'Error in SurveyPageController: ' + ex.getMessage());
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            System.debug(LoggingLevel.ERROR, 'Unexpected error in SurveyPageController: ' + ex.getMessage());
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }


    // Update surveypages using DTOs
    public static List<SurveyPageDTO.BaseSurveyPageDTO> updateSurveyPages(List<SurveyPageDTO.UpdateSurveyPageDTO> surveypageDTOs) {
        try {
            return surveypageService.updateSurveyPages(surveypageDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete surveypages by DTOs
    public static List<SurveyPageDTO.BaseSurveyPageDTO> deleteSurveyPages(List<SurveyPageDTO.BaseSurveyPageDTO> surveypageDTOs) {
        try {
            return surveypageService.deleteSurveyPages(surveypageDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}