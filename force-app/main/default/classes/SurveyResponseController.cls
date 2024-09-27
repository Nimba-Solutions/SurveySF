public with sharing class SurveyResponseController {

    private static SurveyResponseService surveyresponseService = new SurveyResponseService();

    // Overloaded method to get a surveyresponse by ID with optional field set name
    public static SurveyResponseDTO.BaseSurveyResponseDTO getSurveyResponseById(Id surveyresponseId) {
        return getSurveyResponseById(surveyresponseId, null); 
    }

    public static SurveyResponseDTO.BaseSurveyResponseDTO getSurveyResponseById(Id surveyresponseId, String fieldSetName) {
        try {
            return surveyresponseService.getSurveyResponseById(surveyresponseId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single SurveyResponse record using DTO
    public static SurveyResponseDTO.BaseSurveyResponseDTO createSurveyResponse(SurveyResponseDTO.CreateSurveyResponseDTO createSurveyResponseDTO) {
        try {
            return surveyresponseService.createSurveyResponse(createSurveyResponseDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple surveyresponses using DTOs
    public static List<SurveyResponseDTO.BaseSurveyResponseDTO> createSurveyResponses(List<SurveyResponseDTO.CreateSurveyResponseDTO> surveyresponseDTOs) {
        try {
            return surveyresponseService.createSurveyResponses(surveyresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update surveyresponses using DTOs
    public static List<SurveyResponseDTO.BaseSurveyResponseDTO> updateSurveyResponses(List<SurveyResponseDTO.UpdateSurveyResponseDTO> surveyresponseDTOs) {
        try {
            return surveyresponseService.updateSurveyResponses(surveyresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete surveyresponses by DTOs
    public static List<SurveyResponseDTO.BaseSurveyResponseDTO> deleteSurveyResponses(List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseDTOs) {
        try {
            return surveyresponseService.deleteSurveyResponses(surveyresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}