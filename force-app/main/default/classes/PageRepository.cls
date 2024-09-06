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
            PageDTO.BasePageDTO pageDto = new PageDTO.BasePageDTO(pageId, fieldSetName);
            return pageDto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find page by ID: ' + ex.getMessage());
        }
    }
}