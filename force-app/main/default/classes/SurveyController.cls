public with sharing class SurveyController {
    private static SurveyService surveyService = new SurveyService();

    // Overloaded method to get a survey by ID with optional field set name
    public static SurveyDTO.BaseSurveyDTO getSurveyById(Id surveyId) {
        return getSurveyById(surveyId, null); 
    }

    public static SurveyDTO.BaseSurveyDTO getSurveyById(Id surveyId, String fieldSetName) {
        try {
            return surveyService.getSurveyById(surveyId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single Survey record using DTO
    public static SurveyDTO.BaseSurveyDTO createSurvey(SurveyDTO.CreateSurveyDTO createSurveyDTO) {
        try {
            return surveyService.createSurvey(createSurveyDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple surveys using DTOs
    public static List<SurveyDTO.BaseSurveyDTO> createSurveys(List<SurveyDTO.CreateSurveyDTO> surveyDTOs) {
        try {
            return surveyService.createSurveys(surveyDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update surveys using DTOs
    public static List<SurveyDTO.BaseSurveyDTO> updateSurveys(List<SurveyDTO.UpdateSurveyDTO> surveyDTOs) {
        try {
            return surveyService.updateSurveys(surveyDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete surveys by DTOs
    public static List<SurveyDTO.BaseSurveyDTO> deleteSurveys(List<SurveyDTO.BaseSurveyDTO> surveyDTOs) {
        try {
            return surveyService.deleteSurveys(surveyDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}