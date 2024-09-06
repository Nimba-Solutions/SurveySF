public with sharing class PageElementController {

    private static PageElementService pageelementService = new PageElementService();

    // Overloaded method to get a pageelement by ID with optional field set name
    public static PageElementDTO.BasePageElementDTO getPageElementById(Id pageelementId) {
        return getPageElementById(pageelementId, null); 
    }

    public static PageElementDTO.BasePageElementDTO getPageElementById(Id pageelementId, String fieldSetName) {
        try {
            return pageelementService.getPageElementById(pageelementId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single PageElement record using DTO
    public static PageElementDTO.BasePageElementDTO createPageElement(PageElementDTO.CreatePageElementDTO createPageElementDTO) {
        try {
            return pageelementService.createPageElement(createPageElementDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple pageelements using DTOs
    public static List<PageElementDTO.BasePageElementDTO> createPageElements(List<PageElementDTO.CreatePageElementDTO> pageelementDTOs) {
        try {
            return pageelementService.createPageElements(pageelementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update pageelements using DTOs
    public static List<PageElementDTO.BasePageElementDTO> updatePageElements(List<PageElementDTO.UpdatePageElementDTO> pageelementDTOs) {
        try {
            return pageelementService.updatePageElements(pageelementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete pageelements by DTOs
    public static List<PageElementDTO.BasePageElementDTO> deletePageElements(List<PageElementDTO.BasePageElementDTO> pageelementDTOs) {
        try {
            return pageelementService.deletePageElements(pageelementDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}