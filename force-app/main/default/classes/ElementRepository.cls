public class ElementRepository extends Repository {

    public List<ElementDTO.BaseElementDTO> createElements(List<ElementDTO.CreateElementDTO> elementDtos, Boolean rollbackOnError) {
        try {
            List<Element__c> elements = new List<Element__c>();
            for (ElementDTO.CreateElementDTO dto : elementDtos) {
                elements.add(dto.toElement());
            }

            DML.insertRecords(elements, rollbackOnError);

            List<ElementDTO.BaseElementDTO> elementResults = new List<ElementDTO.BaseElementDTO>();
            for (Element__c element : elements) {
                elementResults.add(new ElementDTO.BaseElementDTO(element));
            }
            return elementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create elements: ' + ex.getMessage());
        }
    }

    public List<ElementDTO.BaseElementDTO> updateElements(List<ElementDTO.UpdateElementDTO> elementDtos, Boolean rollbackOnError) {
        try {
            List<Element__c> elements = new List<Element__c>();
            for (ElementDTO.UpdateElementDTO dto : elementDtos) {
                elements.add(dto.toElement());
            }

            DML.updateRecords(elements, rollbackOnError);

            List<ElementDTO.BaseElementDTO> elementResults = new List<ElementDTO.BaseElementDTO>();
            for (Element__c element : elements) {
                elementResults.add(new ElementDTO.BaseElementDTO(element));
            }
            return elementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update elements: ' + ex.getMessage());
        }
    }

    public List<ElementDTO.BaseElementDTO> deleteElements(List<ElementDTO.BaseElementDTO> elementDtos, Boolean rollbackOnError) {
        try {
            List<Element__c> elements = new List<Element__c>();
            for (ElementDTO.BaseElementDTO dto : elementDtos) {
                elements.add(dto.toElement());
            }

            DML.deleteRecords(elements, rollbackOnError);

            List<ElementDTO.BaseElementDTO> elementResults = new List<ElementDTO.BaseElementDTO>();
            for (Element__c element : elements) {
                elementResults.add(new ElementDTO.BaseElementDTO(element));
            }
            return elementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete elements: ' + ex.getMessage());
        }
    }

    public ElementDTO.BaseElementDTO findElementById(Id elementId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Element__c') : getFieldsFromFieldSet('Element__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Element__c WHERE Id = :elementId LIMIT 1';
            Element__c element = Database.query(query);
            return new ElementDTO.BaseElementDTO(element);
        } catch (Exception ex) {
            throw new CustomException('Failed to find element by ID: ' + ex.getMessage());
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