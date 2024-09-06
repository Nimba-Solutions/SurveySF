public class ElementResponseRepository extends Repository {

    public List<ElementResponseDTO.BaseElementResponseDTO> createElementResponses(List<ElementResponseDTO.CreateElementResponseDTO> elementresponseDtos, Boolean rollbackOnError) {
        try {
            List<ElementResponse__c> elementresponses = new List<ElementResponse__c>();
            for (ElementResponseDTO.CreateElementResponseDTO dto : elementresponseDtos) {
                elementresponses.add(dto.toElementResponse());
            }

            DML.insertRecords(elementresponses, rollbackOnError);

            List<ElementResponseDTO.BaseElementResponseDTO> elementresponseResults = new List<ElementResponseDTO.BaseElementResponseDTO>();
            for (ElementResponse__c elementresponse : elementresponses) {
                elementresponseResults.add(new ElementResponseDTO.BaseElementResponseDTO(elementresponse));
            }
            return elementresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create elementresponses: ' + ex.getMessage());
        }
    }

    public List<ElementResponseDTO.BaseElementResponseDTO> updateElementResponses(List<ElementResponseDTO.UpdateElementResponseDTO> elementresponseDtos, Boolean rollbackOnError) {
        try {
            List<ElementResponse__c> elementresponses = new List<ElementResponse__c>();
            for (ElementResponseDTO.UpdateElementResponseDTO dto : elementresponseDtos) {
                elementresponses.add(dto.toElementResponse());
            }

            DML.updateRecords(elementresponses, rollbackOnError);

            List<ElementResponseDTO.BaseElementResponseDTO> elementresponseResults = new List<ElementResponseDTO.BaseElementResponseDTO>();
            for (ElementResponse__c elementresponse : elementresponses) {
                elementresponseResults.add(new ElementResponseDTO.BaseElementResponseDTO(elementresponse));
            }
            return elementresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update elementresponses: ' + ex.getMessage());
        }
    }

    public List<ElementResponseDTO.BaseElementResponseDTO> deleteElementResponses(List<ElementResponseDTO.BaseElementResponseDTO> elementresponseDtos, Boolean rollbackOnError) {
        try {
            List<ElementResponse__c> elementresponses = new List<ElementResponse__c>();
            for (ElementResponseDTO.BaseElementResponseDTO dto : elementresponseDtos) {
                elementresponses.add(dto.toElementResponse());
            }

            DML.deleteRecords(elementresponses, rollbackOnError);

            List<ElementResponseDTO.BaseElementResponseDTO> elementresponseResults = new List<ElementResponseDTO.BaseElementResponseDTO>();
            for (ElementResponse__c elementresponse : elementresponses) {
                elementresponseResults.add(new ElementResponseDTO.BaseElementResponseDTO(elementresponse));
            }
            return elementresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete elementresponses: ' + ex.getMessage());
        }
    }

    public ElementResponseDTO.BaseElementResponseDTO findElementResponseById(Id elementresponseId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('ElementResponse__c') : getFieldsFromFieldSet('ElementResponse__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM ElementResponse__c WHERE Id = :elementresponseId LIMIT 1';
            ElementResponse__c elementresponse = Database.query(query);
            return new ElementResponseDTO.BaseElementResponseDTO(elementresponse);
        } catch (Exception ex) {
            throw new CustomException('Failed to find elementresponse by ID: ' + ex.getMessage());
        }
    }

    private List<String> getAllFields(String objectName) {
        List<String> fieldNames = new List<String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        for (String fieldName : fieldMap.keySet()) {
            fieldNames.add(fieldName);
        }
        return fieldNames;
    }

    private List<String> getFieldsFromFieldSet(String objectName, String fieldSetName) {
        List<String> fieldNames = new List<String>();
        Schema.FieldSet fieldSet = Schema.getGlobalDescribe().get(objectName).getDescribe().fieldSets.getMap().get(fieldSetName);
        for (Schema.FieldSetMember f : fieldSet.getFields()) {
            fieldNames.add(f.getFieldPath());
        }
        return fieldNames;
    }
}