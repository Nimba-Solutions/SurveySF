public class %%%Object%%%Service extends Service {

    private %%%Object%%%Repository %%%object%%%Repository;

    // Constructor
    public %%%Object%%%Service() {
        // Initialize the %%%object%%%Repository
        this.%%%object%%%Repository = new %%%Object%%%Repository();
        this.repository = %%%object%%%Repository;
    }

    // Get %%%object%%% by ID and map its fields to DTO
    public %%%Object%%%DTO.Base%%%Object%%%DTO get%%%Object%%%ById(Id %%%object%%%Id, String fieldSetName) {
        try {
            return %%%object%%%Repository.find%%%Object%%%ById(%%%object%%%Id, fieldSetName);
        } catch (Exception ex) {
            logError('Error fetching %%%object%%% by ID: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to retrieve %%%object%%%');
        }
    }

    // Create new %%%object%%% using DTO with optional rollback handling
    public %%%Object%%%DTO.Base%%%Object%%%DTO create%%%Object%%%(%%%Object%%%DTO.Create%%%Object%%%DTO create%%%Object%%%DTO, Boolean rollbackOnError) {
        try {
            List<%%%Object%%%DTO.Create%%%Object%%%DTO> dtoList = new List<%%%Object%%%DTO.Create%%%Object%%%DTO>{create%%%Object%%%DTO};
            return %%%object%%%Repository.create%%%Object%%%s(dtoList, rollbackOnError)[0];  // Return first DTO created
        } catch (Exception ex) {
            logError('Error creating %%%object%%%: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create %%%object%%%');
        }
    }

    // Create multiple %%%object%%%s using DTO with optional rollback handling
    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> create%%%Object%%%s(List<%%%Object%%%DTO.Create%%%Object%%%DTO> %%%object%%%DTOs, Boolean rollbackOnError) {
        try {
            return %%%object%%%Repository.create%%%Object%%%s(%%%object%%%DTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error creating %%%object%%%s: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to create %%%object%%%s');
        }
    }

    // Update %%%object%%% using DTO with optional rollback handling
    public %%%Object%%%DTO.Base%%%Object%%%DTO update%%%Object%%%(%%%Object%%%DTO.Update%%%Object%%%DTO update%%%Object%%%DTO, Boolean rollbackOnError) {
        try {
            List<%%%Object%%%DTO.Update%%%Object%%%DTO> dtoList = new List<%%%Object%%%DTO.Update%%%Object%%%DTO>{update%%%Object%%%DTO};
            return %%%object%%%Repository.update%%%Object%%%s(dtoList, rollbackOnError)[0];  // Return first DTO updated
        } catch (Exception ex) {
            logError('Error updating %%%object%%%: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update %%%object%%%');
        }
    }

    // Update multiple %%%object%%%s using DTO with optional rollback handling
    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> update%%%Object%%%s(List<%%%Object%%%DTO.Update%%%Object%%%DTO> %%%object%%%DTOs, Boolean rollbackOnError) {
        try {
            return %%%object%%%Repository.update%%%Object%%%s(%%%object%%%DTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error updating %%%object%%%s: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to update %%%object%%%s');
        }
    }

    // Delete %%%object%%%s using DTOs with optional rollback handling
    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> delete%%%Object%%%s(List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%DTOs, Boolean rollbackOnError) {
        try {
            return %%%object%%%Repository.delete%%%Object%%%s(%%%object%%%DTOs, rollbackOnError);  // Repository returns DTOs
        } catch (Exception ex) {
            logError('Error deleting %%%object%%%s: ' + ex.getMessage(), ex);
            throw new CustomException('Failed to delete %%%object%%%(s)');
        }
    }

    // Log error method
    private void logError(String message, Exception ex) {
        System.debug(LoggingLevel.ERROR, message + ': ' + ex.getMessage());
    }
}