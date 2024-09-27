public class PageService extends Service {

    private PageRepository pageRepository;

    // Constructor
    public PageService() {
        // Initialize the pageRepository
        this.pageRepository = new PageRepository();
        this.repository = pageRepository;
    }

    // Get page by ID and map its fields to DTO
    public PageDTO.BasePageDTO getPageById(Id pageId, String fieldSetName) {
        try {
            return pageRepository.findPageById(pageId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching page by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve page');
        }
    }

    // Create new page using DTO with optional rollback handling
    public PageDTO.BasePageDTO createPage(PageDTO.CreatePageDTO createPageDTO, Boolean rollbackOnError) {
        try {
            List<PageDTO.CreatePageDTO> dtoList = new List<PageDTO.CreatePageDTO>{createPageDTO};
            return pageRepository.createPages(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating page: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create page');
        }
    }

    // Create multiple pages using DTO with optional rollback handling
    public List<PageDTO.BasePageDTO> createPages(List<PageDTO.CreatePageDTO> pageDTOs, Boolean rollbackOnError) {
        try {
            return pageRepository.createPages(pageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating pages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create pages');
        }
    }

    // Update page using DTO with optional rollback handling
    public PageDTO.BasePageDTO updatePage(PageDTO.UpdatePageDTO updatePageDTO, Boolean rollbackOnError) {
        try {
            List<PageDTO.UpdatePageDTO> dtoList = new List<PageDTO.UpdatePageDTO>{updatePageDTO};
            return pageRepository.updatePages(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating page: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update page');
        }
    }

    // Update multiple pages using DTO with optional rollback handling
    public List<PageDTO.BasePageDTO> updatePages(List<PageDTO.UpdatePageDTO> pageDTOs, Boolean rollbackOnError) {
        try {
            return pageRepository.updatePages(pageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating pages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update pages');
        }
    }

    // Delete pages using DTOs with optional rollback handling
    public List<PageDTO.BasePageDTO> deletePages(List<PageDTO.BasePageDTO> pageDTOs, Boolean rollbackOnError) {
        try {
            return pageRepository.deletePages(pageDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting pages: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete page(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}