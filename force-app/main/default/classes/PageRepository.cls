public class PageRepository extends Repository {

    public List<PageDTO.BasePageDTO> createPages(List<PageDTO.CreatePageDTO> pageDtos, Boolean rollbackOnError) {
        try {
            List<Page__c> pages = new List<Page__c>();
            for (PageDTO.CreatePageDTO dto : pageDtos) {
                pages.add(dto.toPage());
            }

            DML.insertRecords(pages, rollbackOnError);

            List<PageDTO.BasePageDTO> pageResults = new List<PageDTO.BasePageDTO>();
            for (Page__c page : pages) {
                pageResults.add(new PageDTO.BasePageDTO(page));
            }
            return pageResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create pages: ' + ex.getMessage());
        }
    }

    public List<PageDTO.BasePageDTO> updatePages(List<PageDTO.UpdatePageDTO> pageDtos, Boolean rollbackOnError) {
        try {
            List<Page__c> pages = new List<Page__c>();
            for (PageDTO.UpdatePageDTO dto : pageDtos) {
                pages.add(dto.toPage());
            }

            DML.updateRecords(pages, rollbackOnError);

            List<PageDTO.BasePageDTO> pageResults = new List<PageDTO.BasePageDTO>();
            for (Page__c page : pages) {
                pageResults.add(new PageDTO.BasePageDTO(page));
            }
            return pageResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update pages: ' + ex.getMessage());
        }
    }

    public List<PageDTO.BasePageDTO> deletePages(List<PageDTO.BasePageDTO> pageDtos, Boolean rollbackOnError) {
        try {
            List<Page__c> pages = new List<Page__c>();
            for (PageDTO.BasePageDTO dto : pageDtos) {
                pages.add(dto.toPage());
            }

            DML.deleteRecords(pages, rollbackOnError);

            List<PageDTO.BasePageDTO> pageResults = new List<PageDTO.BasePageDTO>();
            for (Page__c page : pages) {
                pageResults.add(new PageDTO.BasePageDTO(page));
            }
            return pageResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete pages: ' + ex.getMessage());
        }
    }

    public PageDTO.BasePageDTO findPageById(Id pageId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Page__c') : getFieldsFromFieldSet('Page__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Page__c WHERE Id = :pageId LIMIT 1';
            Page__c page = Database.query(query);
            return new PageDTO.BasePageDTO(page);
        } catch (Exception ex) {
            throw new CustomException('Failed to find page by ID: ' + ex.getMessage());
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