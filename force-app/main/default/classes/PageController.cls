public with sharing class PageController {

    private static PageService pageService = new PageService();

    // Overloaded method to get a page by ID with optional field set name
    public static PageDTO.BasePageDTO getPageById(Id pageId) {
        return getPageById(pageId, null); 
    }

    public static PageDTO.BasePageDTO getPageById(Id pageId, String fieldSetName) {
        try {
            return pageService.getPageById(pageId, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single Page record using DTO
    public static PageDTO.BasePageDTO createPage(PageDTO.CreatePageDTO createPageDTO) {
        try {
            return pageService.createPage(createPageDTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple pages using DTOs
    public static List<PageDTO.BasePageDTO> createPages(List<PageDTO.CreatePageDTO> pageDTOs) {
        try {
            return pageService.createPages(pageDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update pages using DTOs
    public static List<PageDTO.BasePageDTO> updatePages(List<PageDTO.UpdatePageDTO> pageDTOs) {
        try {
            return pageService.updatePages(pageDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete pages by DTOs
    public static List<PageDTO.BasePageDTO> deletePages(List<PageDTO.BasePageDTO> pageDTOs) {
        try {
            return pageService.deletePages(pageDTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}