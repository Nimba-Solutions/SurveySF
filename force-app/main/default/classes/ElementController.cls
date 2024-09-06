public with sharing class ElementController {

    private static ElementService elementService = new ElementService();

    // Overloaded method to get a element by ID with optional field set name
    public static ElementDTO.BaseElementDTO getElementById(Id elementId) {
        return getElementById(elementId, null); 
    }

    public static ElementDTO.BaseElementDTO getElementById(Id elementId, String fieldSetName) {
        try {
            return elementService.getElementById(elementId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single Element record using DTO
    public static ElementDTO.BaseElementDTO createElement(ElementDTO.CreateElementDTO createElementDTO) {
        try {
            return elementService.createElement(createElementDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple elements using DTOs
    public static List<ElementDTO.BaseElementDTO> createElements(List<ElementDTO.CreateElementDTO> elementDTOs) {
        try {
            return elementService.createElements(elementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update elements using DTOs
    public static List<ElementDTO.BaseElementDTO> updateElements(List<ElementDTO.UpdateElementDTO> elementDTOs) {
        try {
            return elementService.updateElements(elementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete elements by DTOs
    public static List<ElementDTO.BaseElementDTO> deleteElements(List<ElementDTO.BaseElementDTO> elementDTOs) {
        try {
            return elementService.deleteElements(elementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}