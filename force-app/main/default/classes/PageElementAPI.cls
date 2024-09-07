@RestResource(urlMapping='/pageelements/*')
global with sharing class PageElementAPI {

    @HttpGet
    global static String getPageElementById() {
        try {
            RestRequest req = RestContext.request;
            Id pageelementId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            PageElementDTO.BasePageElementDTO pageelement = PageElementController.getPageElementById(pageelementId, fieldSetName);
            return JSON.serialize(pageelement);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createPageElement() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single pageelement or a list of pageelements
            if (jsonInput.startsWith('[')) {
                List<PageElementDTO.CreatePageElementDTO> pageelementDTOs = (List<PageElementDTO.CreatePageElementDTO>) JSON.deserialize(jsonInput, List<PageElementDTO.CreatePageElementDTO>.class);
                List<PageElementDTO.BasePageElementDTO> result = PageElementController.createPageElements(pageelementDTOs);
                return JSON.serialize(result);
            } else {
                PageElementDTO.CreatePageElementDTO createPageElementDTO = (PageElementDTO.CreatePageElementDTO) JSON.deserialize(jsonInput, PageElementDTO.CreatePageElementDTO.class);
                PageElementDTO.BasePageElementDTO result = PageElementController.createPageElement(createPageElementDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updatePageElements() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<PageElementDTO.UpdatePageElementDTO> pageelementDTOs = (List<PageElementDTO.UpdatePageElementDTO>) JSON.deserialize(jsonInput, List<PageElementDTO.UpdatePageElementDTO>.class);
            List<PageElementDTO.BasePageElementDTO> updatedPageElements = PageElementController.updatePageElements(pageelementDTOs);
            return JSON.serialize(updatedPageElements);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deletePageElements() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<PageElementDTO.BasePageElementDTO> pageelementDTOs = (List<PageElementDTO.BasePageElementDTO>) JSON.deserialize(jsonInput, List<PageElementDTO.BasePageElementDTO>.class);
            List<PageElementDTO.BasePageElementDTO> deletedPageElements = PageElementController.deletePageElements(pageelementDTOs);
            return JSON.serialize(deletedPageElements);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}