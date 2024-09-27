@RestResource(urlMapping='/pages/*')
global with sharing class PageAPI {

    @HttpGet
    global static String getPageById() {
        try {
            RestRequest req = RestContext.request;
            Id pageId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            PageDTO.BasePageDTO page = PageController.getPageById(pageId, fieldSetName);
            return JSON.serialize(page);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createPage() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single page or a list of pages
            if (jsonInput.startsWith('[')) {
                List<PageDTO.CreatePageDTO> pageDTOs = (List<PageDTO.CreatePageDTO>) JSON.deserialize(jsonInput, List<PageDTO.CreatePageDTO>.class);
                List<PageDTO.BasePageDTO> result = PageController.createPages(pageDTOs);
                return JSON.serialize(result);
            } else {
                PageDTO.CreatePageDTO createPageDTO = (PageDTO.CreatePageDTO) JSON.deserialize(jsonInput, PageDTO.CreatePageDTO.class);
                PageDTO.BasePageDTO result = PageController.createPage(createPageDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updatePages() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<PageDTO.UpdatePageDTO> pageDTOs = (List<PageDTO.UpdatePageDTO>) JSON.deserialize(jsonInput, List<PageDTO.UpdatePageDTO>.class);
            List<PageDTO.BasePageDTO> updatedPages = PageController.updatePages(pageDTOs);
            return JSON.serialize(updatedPages);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deletePages() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<PageDTO.BasePageDTO> pageDTOs = (List<PageDTO.BasePageDTO>) JSON.deserialize(jsonInput, List<PageDTO.BasePageDTO>.class);
            List<PageDTO.BasePageDTO> deletedPages = PageController.deletePages(pageDTOs);
            return JSON.serialize(deletedPages);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}