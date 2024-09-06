public with sharing class SurveyVersionController {

    private static SurveyVersionService surveyversionService = new SurveyVersionService();

    // Overloaded method to get a surveyversion by ID with optional field set name
    public static SurveyVersionDTO.BaseSurveyVersionDTO getSurveyVersionById(Id surveyversionId) {
        return getSurveyVersionById(surveyversionId, null); 
    }

    public static SurveyVersionDTO.BaseSurveyVersionDTO getSurveyVersionById(Id surveyversionId, String fieldSetName) {
        try {
            return surveyversionService.getSurveyVersionById(surveyversionId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single SurveyVersion record using DTO
    public static SurveyVersionDTO.BaseSurveyVersionDTO createSurveyVersion(SurveyVersionDTO.CreateSurveyVersionDTO createSurveyVersionDTO) {
        try {
            return surveyversionService.createSurveyVersion(createSurveyVersionDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple surveyversions using DTOs
    public static List<SurveyVersionDTO.BaseSurveyVersionDTO> createSurveyVersions(List<SurveyVersionDTO.CreateSurveyVersionDTO> surveyversionDTOs) {
        try {
            return surveyversionService.createSurveyVersions(surveyversionDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update surveyversions using DTOs
    public static List<SurveyVersionDTO.BaseSurveyVersionDTO> updateSurveyVersions(List<SurveyVersionDTO.UpdateSurveyVersionDTO> surveyversionDTOs) {
        try {
            return surveyversionService.updateSurveyVersions(surveyversionDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete surveyversions by DTOs
    public static List<SurveyVersionDTO.BaseSurveyVersionDTO> deleteSurveyVersions(List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionDTOs) {
        try {
            return surveyversionService.deleteSurveyVersions(surveyversionDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}