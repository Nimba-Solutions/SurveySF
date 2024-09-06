public class ElementService extends Service {

    private ElementRepository elementRepository;

    // Constructor
    public ElementService() {
        // Initialize the elementRepository
        this.elementRepository = new ElementRepository();
        this.repository = elementRepository;
    }

    // Get element by ID and map its fields to DTO
    public ElementDTO.BaseElementDTO getElementById(Id elementId, String fieldSetName) {
        try {
            return elementRepository.findElementById(elementId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching element by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve element');
        }
    }

    // Create new element using DTO with optional rollback handling
    public ElementDTO.BaseElementDTO createElement(ElementDTO.CreateElementDTO createElementDTO, Boolean rollbackOnError) {
        try {
            List<ElementDTO.CreateElementDTO> dtoList = new List<ElementDTO.CreateElementDTO>{createElementDTO};
            return elementRepository.createElements(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating element: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create element');
        }
    }

    // Create multiple elements using DTO with optional rollback handling
    public List<ElementDTO.BaseElementDTO> createElements(List<ElementDTO.CreateElementDTO> elementDTOs, Boolean rollbackOnError) {
        try {
            return elementRepository.createElements(elementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating elements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create elements');
        }
    }

    // Update element using DTO with optional rollback handling
    public ElementDTO.BaseElementDTO updateElement(ElementDTO.UpdateElementDTO updateElementDTO, Boolean rollbackOnError) {
        try {
            List<ElementDTO.UpdateElementDTO> dtoList = new List<ElementDTO.UpdateElementDTO>{updateElementDTO};
            return elementRepository.updateElements(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating element: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update element');
        }
    }

    // Update multiple elements using DTO with optional rollback handling
    public List<ElementDTO.BaseElementDTO> updateElements(List<ElementDTO.UpdateElementDTO> elementDTOs, Boolean rollbackOnError) {
        try {
            return elementRepository.updateElements(elementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating elements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update elements');
        }
    }

    // Delete elements using DTOs with optional rollback handling
    public List<ElementDTO.BaseElementDTO> deleteElements(List<ElementDTO.BaseElementDTO> elementDTOs, Boolean rollbackOnError) {
        try {
            return elementRepository.deleteElements(elementDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting elements: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete element(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}