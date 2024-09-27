public class PageElementService extends Service {

    private PageElementRepository pageelementRepository;

    // Constructor
    public PageElementService() {
        // Initialize the pageelementRepository
        this.pageelementRepository = new PageElementRepository();
        this.repository = pageelementRepository;
    }

    // Get pageelement by ID and map its fields to DTO
    public PageElementDTO.BasePageElementDTO getPageElementById(Id pageelementId, String fieldSetName) {
        try {
            return pageelementRepository.findPageElementById(pageelementId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching pageelement by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve pageelement');
        }
    }

    // Create new pageelement using DTO with optional rollback handling
    public PageElementDTO.BasePageElementDTO createPageElement(PageElementDTO.CreatePageElementDTO createPageElementDTO, Boolean rollbackOnError) {
        try {
            List<PageElementDTO.CreatePageElementDTO> dtoList = new List<PageElementDTO.CreatePageElementDTO>{createPageElementDTO};
            return pageelementRepository.createPageElements(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating pageelement: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create pageelement');
        }
    }

    // Create multiple pageelements using DTO with optional rollback handling
    public List<PageElementDTO.BasePageElementDTO> createPageElements(List<PageElementDTO.CreatePageElementDTO> pageelementDTOs, Boolean rollbackOnError) {
        try {
            return pageelementRepository.createPageElements(pageelementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating pageelements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create pageelements');
        }
    }

    // Update pageelement using DTO with optional rollback handling
    public PageElementDTO.BasePageElementDTO updatePageElement(PageElementDTO.UpdatePageElementDTO updatePageElementDTO, Boolean rollbackOnError) {
        try {
            List<PageElementDTO.UpdatePageElementDTO> dtoList = new List<PageElementDTO.UpdatePageElementDTO>{updatePageElementDTO};
            return pageelementRepository.updatePageElements(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating pageelement: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update pageelement');
        }
    }

    // Update multiple pageelements using DTO with optional rollback handling
    public List<PageElementDTO.BasePageElementDTO> updatePageElements(List<PageElementDTO.UpdatePageElementDTO> pageelementDTOs, Boolean rollbackOnError) {
        try {
            return pageelementRepository.updatePageElements(pageelementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating pageelements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update pageelements');
        }
    }

    // Delete pageelements using DTOs with optional rollback handling
    public List<PageElementDTO.BasePageElementDTO> deletePageElements(List<PageElementDTO.BasePageElementDTO> pageelementDTOs, Boolean rollbackOnError) {
        try {
            return pageelementRepository.deletePageElements(pageelementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting pageelements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete pageelement(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}