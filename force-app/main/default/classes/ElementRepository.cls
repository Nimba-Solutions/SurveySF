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
            ElementDTO.BaseElementDTO elementDto = new ElementDTO.BaseElementDTO(elementId, fieldSetName);
            return elementDto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find element by ID: ' + ex.getMessage());
        }
    }
}