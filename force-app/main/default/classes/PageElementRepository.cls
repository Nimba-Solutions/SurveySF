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
            PageElementDTO.BasePageElementDTO pageelementDto = new PageElementDTO.BasePageElementDTO(pageelementId, fieldSetName);
            return pageelementDto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find pageelement by ID: ' + ex.getMessage());
        }
    }
}