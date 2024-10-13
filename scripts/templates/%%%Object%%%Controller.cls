public with sharing class %%%Object%%%Controller {

    private static %%%Object%%%Service %%%object%%%Service = new %%%Object%%%Service();

    // Overloaded method to get a %%%object%%% by ID with optional field set name
    public static %%%Object%%%DTO.Base%%%Object%%%DTO get%%%Object%%%ById(Id %%%object%%%Id) {
        return get%%%Object%%%ById(%%%object%%%Id, null); 
    }

    public static %%%Object%%%DTO.Base%%%Object%%%DTO get%%%Object%%%ById(Id %%%object%%%Id, String fieldSetName) {
        try {
            return %%%object%%%Service.get%%%Object%%%ById(%%%object%%%Id, fieldSetName);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create a single %%%Object%%% record using DTO
    public static %%%Object%%%DTO.Base%%%Object%%%DTO create%%%Object%%%(%%%Object%%%DTO.Create%%%Object%%%DTO create%%%Object%%%DTO) {
        try {
            return %%%object%%%Service.create%%%Object%%%(create%%%Object%%%DTO, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Create multiple %%%object%%%s using DTOs
    public static List<%%%Object%%%DTO.Base%%%Object%%%DTO> create%%%Object%%%s(List<%%%Object%%%DTO.Create%%%Object%%%DTO> %%%object%%%DTOs) {
        try {
            return %%%object%%%Service.create%%%Object%%%s(%%%object%%%DTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Update %%%object%%%s using DTOs
    public static List<%%%Object%%%DTO.Base%%%Object%%%DTO> update%%%Object%%%s(List<%%%Object%%%DTO.Update%%%Object%%%DTO> %%%object%%%DTOs) {
        try {
            return %%%object%%%Service.update%%%Object%%%s(%%%object%%%DTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    // Delete %%%object%%%s by DTOs
    public static List<%%%Object%%%DTO.Base%%%Object%%%DTO> delete%%%Object%%%s(List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%DTOs) {
        try {
            return %%%object%%%Service.delete%%%Object%%%s(%%%object%%%DTOs, true);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage()); 
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}