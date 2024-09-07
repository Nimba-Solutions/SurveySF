public class PageElementRepository extends Repository {

    public List<PageElementDTO.BasePageElementDTO> createPageElements(List<PageElementDTO.CreatePageElementDTO> pageelementDtos, Boolean rollbackOnError) {
        try {
            List<PageElement__c> pageelements = new List<PageElement__c>();
            for (PageElementDTO.CreatePageElementDTO dto : pageelementDtos) {
                pageelements.add(dto.toPageElement());
            }

            DML.insertRecords(pageelements, rollbackOnError);

            List<PageElementDTO.BasePageElementDTO> pageelementResults = new List<PageElementDTO.BasePageElementDTO>();
            for (PageElement__c pageelement : pageelements) {
                pageelementResults.add(new PageElementDTO.BasePageElementDTO(pageelement));
            }
            return pageelementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create pageelements: ' + ex.getMessage());
        }
    }

    public List<PageElementDTO.BasePageElementDTO> updatePageElements(List<PageElementDTO.UpdatePageElementDTO> pageelementDtos, Boolean rollbackOnError) {
        try {
            List<PageElement__c> pageelements = new List<PageElement__c>();
            for (PageElementDTO.UpdatePageElementDTO dto : pageelementDtos) {
                pageelements.add(dto.toPageElement());
            }

            DML.updateRecords(pageelements, rollbackOnError);

            List<PageElementDTO.BasePageElementDTO> pageelementResults = new List<PageElementDTO.BasePageElementDTO>();
            for (PageElement__c pageelement : pageelements) {
                pageelementResults.add(new PageElementDTO.BasePageElementDTO(pageelement));
            }
            return pageelementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update pageelements: ' + ex.getMessage());
        }
    }

    public List<PageElementDTO.BasePageElementDTO> deletePageElements(List<PageElementDTO.BasePageElementDTO> pageelementDtos, Boolean rollbackOnError) {
        try {
            List<PageElement__c> pageelements = new List<PageElement__c>();
            for (PageElementDTO.BasePageElementDTO dto : pageelementDtos) {
                pageelements.add(dto.toPageElement());
            }

            DML.deleteRecords(pageelements, rollbackOnError);

            List<PageElementDTO.BasePageElementDTO> pageelementResults = new List<PageElementDTO.BasePageElementDTO>();
            for (PageElement__c pageelement : pageelements) {
                pageelementResults.add(new PageElementDTO.BasePageElementDTO(pageelement));
            }
            return pageelementResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete pageelements: ' + ex.getMessage());
        }
    }

    public PageElementDTO.BasePageElementDTO findPageElementById(Id pageelementId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('PageElement__c') : getFieldsFromFieldSet('PageElement__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM PageElement__c WHERE Id = :pageelementId LIMIT 1';
            PageElement__c pageelement = Database.query(query);
            return new PageElementDTO.BasePageElementDTO(pageelement);
        } catch (Exception ex) {
            throw new CustomException('Failed to find pageelement by ID: ' + ex.getMessage());
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