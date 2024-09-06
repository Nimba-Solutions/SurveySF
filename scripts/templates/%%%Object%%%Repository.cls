public class %%%Object%%%Repository extends Repository {

    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> create%%%Object%%%s(List<%%%Object%%%DTO.Create%%%Object%%%DTO> %%%object%%%Dtos, Boolean rollbackOnError) {
        try {
            List<%%%Object%%%__c> %%%object%%%s = new List<%%%Object%%%__c>();
            for (%%%Object%%%DTO.Create%%%Object%%%DTO dto : %%%object%%%Dtos) {
                %%%object%%%s.add(dto.to%%%Object%%%());
            }

            DML.insertRecords(%%%object%%%s, rollbackOnError);

            List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%Results = new List<%%%Object%%%DTO.Base%%%Object%%%DTO>();
            for (%%%Object%%%__c %%%object%%% : %%%object%%%s) {
                %%%object%%%Results.add(new %%%Object%%%DTO.Base%%%Object%%%DTO(%%%object%%%));
            }
            return %%%object%%%Results;
        } catch (Exception ex) {
            throw new CustomException('Failed to create %%%object%%%s: ' + ex.getMessage());
        }
    }

    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> update%%%Object%%%s(List<%%%Object%%%DTO.Update%%%Object%%%DTO> %%%object%%%Dtos, Boolean rollbackOnError) {
        try {
            List<%%%Object%%%__c> %%%object%%%s = new List<%%%Object%%%__c>();
            for (%%%Object%%%DTO.Update%%%Object%%%DTO dto : %%%object%%%Dtos) {
                %%%object%%%s.add(dto.to%%%Object%%%());
            }

            DML.updateRecords(%%%object%%%s, rollbackOnError);

            List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%Results = new List<%%%Object%%%DTO.Base%%%Object%%%DTO>();
            for (%%%Object%%%__c %%%object%%% : %%%object%%%s) {
                %%%object%%%Results.add(new %%%Object%%%DTO.Base%%%Object%%%DTO(%%%object%%%));
            }
            return %%%object%%%Results;
        } catch (Exception ex) {
            throw new CustomException('Failed to update %%%object%%%s: ' + ex.getMessage());
        }
    }

    public List<%%%Object%%%DTO.Base%%%Object%%%DTO> delete%%%Object%%%s(List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%Dtos, Boolean rollbackOnError) {
        try {
            List<%%%Object%%%__c> %%%object%%%s = new List<%%%Object%%%__c>();
            for (%%%Object%%%DTO.Base%%%Object%%%DTO dto : %%%object%%%Dtos) {
                %%%object%%%s.add(dto.to%%%Object%%%());
            }

            DML.deleteRecords(%%%object%%%s, rollbackOnError);

            List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%Results = new List<%%%Object%%%DTO.Base%%%Object%%%DTO>();
            for (%%%Object%%%__c %%%object%%% : %%%object%%%s) {
                %%%object%%%Results.add(new %%%Object%%%DTO.Base%%%Object%%%DTO(%%%object%%%));
            }
            return %%%object%%%Results;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete %%%object%%%s: ' + ex.getMessage());
        }
    }

    public %%%Object%%%DTO.Base%%%Object%%%DTO find%%%Object%%%ById(Id %%%object%%%Id, String fieldSetName) {
        try {
            %%%Object%%%DTO.Base%%%Object%%%DTO %%%object%%%Dto = new %%%Object%%%DTO.Base%%%Object%%%DTO(%%%object%%%Id, fieldSetName);
            return %%%object%%%Dto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find %%%object%%% by ID: ' + ex.getMessage());
        }
    }
}