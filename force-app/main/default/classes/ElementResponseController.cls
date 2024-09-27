public with sharing class ElementResponseController {

    private static ElementResponseService elementresponseService = new ElementResponseService();

    // Overloaded method to get a elementresponse by ID with optional field set name
    public static ElementResponseDTO.BaseElementResponseDTO getElementResponseById(Id elementresponseId) {
        return getElementResponseById(elementresponseId, null); 
    }

    public static ElementResponseDTO.BaseElementResponseDTO getElementResponseById(Id elementresponseId, String fieldSetName) {
        try {
            return elementresponseService.getElementResponseById(elementresponseId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single ElementResponse record using DTO
    public static ElementResponseDTO.BaseElementResponseDTO createElementResponse(ElementResponseDTO.CreateElementResponseDTO createElementResponseDTO) {
        try {
            return elementresponseService.createElementResponse(createElementResponseDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple elementresponses using DTOs
    public static List<ElementResponseDTO.BaseElementResponseDTO> createElementResponses(List<ElementResponseDTO.CreateElementResponseDTO> elementresponseDTOs) {
        try {
            return elementresponseService.createElementResponses(elementresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update elementresponses using DTOs
    public static List<ElementResponseDTO.BaseElementResponseDTO> updateElementResponses(List<ElementResponseDTO.UpdateElementResponseDTO> elementresponseDTOs) {
        try {
            return elementresponseService.updateElementResponses(elementresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete elementresponses by DTOs
    public static List<ElementResponseDTO.BaseElementResponseDTO> deleteElementResponses(List<ElementResponseDTO.BaseElementResponseDTO> elementresponseDTOs) {
        try {
            return elementresponseService.deleteElementResponses(elementresponseDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}