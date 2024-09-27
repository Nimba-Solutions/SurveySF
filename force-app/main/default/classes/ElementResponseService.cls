public class ElementResponseService extends Service {

    private ElementResponseRepository elementresponseRepository;

    // Constructor
    public ElementResponseService() {
        // Initialize the elementresponseRepository
        this.elementresponseRepository = new ElementResponseRepository();
        this.repository = elementresponseRepository;
    }

    // Get elementresponse by ID and map its fields to DTO
    public ElementResponseDTO.BaseElementResponseDTO getElementResponseById(Id elementresponseId, String fieldSetName) {
        try {
            return elementresponseRepository.findElementResponseById(elementresponseId, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching elementresponse by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve elementresponse');
        }
    }

    // Create new elementresponse using DTO with optional rollback handling
    public ElementResponseDTO.BaseElementResponseDTO createElementResponse(ElementResponseDTO.CreateElementResponseDTO createElementResponseDTO, Boolean rollbackOnError) {
        try {
            List<ElementResponseDTO.CreateElementResponseDTO> dtoList = new List<ElementResponseDTO.CreateElementResponseDTO>{createElementResponseDTO};
            return elementresponseRepository.createElementResponses(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating elementresponse: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create elementresponse');
        }
    }

    // Create multiple elementresponses using DTO with optional rollback handling
    public List<ElementResponseDTO.BaseElementResponseDTO> createElementResponses(List<ElementResponseDTO.CreateElementResponseDTO> elementresponseDTOs, Boolean rollbackOnError) {
        try {
            return elementresponseRepository.createElementResponses(elementresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating elementresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create elementresponses');
        }
    }

    // Update elementresponse using DTO with optional rollback handling
    public ElementResponseDTO.BaseElementResponseDTO updateElementResponse(ElementResponseDTO.UpdateElementResponseDTO updateElementResponseDTO, Boolean rollbackOnError) {
        try {
            List<ElementResponseDTO.UpdateElementResponseDTO> dtoList = new List<ElementResponseDTO.UpdateElementResponseDTO>{updateElementResponseDTO};
            return elementresponseRepository.updateElementResponses(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating elementresponse: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update elementresponse');
        }
    }

    // Update multiple elementresponses using DTO with optional rollback handling
    public List<ElementResponseDTO.BaseElementResponseDTO> updateElementResponses(List<ElementResponseDTO.UpdateElementResponseDTO> elementresponseDTOs, Boolean rollbackOnError) {
        try {
            return elementresponseRepository.updateElementResponses(elementresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating elementresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update elementresponses');
        }
    }

    // Delete elementresponses using DTOs with optional rollback handling
    public List<ElementResponseDTO.BaseElementResponseDTO> deleteElementResponses(List<ElementResponseDTO.BaseElementResponseDTO> elementresponseDTOs, Boolean rollbackOnError) {
        try {
            return elementresponseRepository.deleteElementResponses(elementresponseDTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting elementresponses: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete elementresponse(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}