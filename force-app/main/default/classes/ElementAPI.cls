@RestResource(urlMapping='/elements/*')
global with sharing class ElementAPI {

    @HttpGet
    global static String getElementById() {
        try {
            RestRequest req = RestContext.request;
            Id elementId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            ElementDTO.BaseElementDTO element = ElementController.getElementById(elementId, fieldSetName);
            return JSON.serialize(element);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createElement() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single element or a list of elements
            if (jsonInput.startsWith('[')) {
                List<ElementDTO.CreateElementDTO> elementDTOs = (List<ElementDTO.CreateElementDTO>) JSON.deserialize(jsonInput, List<ElementDTO.CreateElementDTO>.class);
                List<ElementDTO.BaseElementDTO> result = ElementController.createElements(elementDTOs);
                return JSON.serialize(result);
            } else {
                ElementDTO.CreateElementDTO createElementDTO = (ElementDTO.CreateElementDTO) JSON.deserialize(jsonInput, ElementDTO.CreateElementDTO.class);
                ElementDTO.BaseElementDTO result = ElementController.createElement(createElementDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateElements() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<ElementDTO.UpdateElementDTO> elementDTOs = (List<ElementDTO.UpdateElementDTO>) JSON.deserialize(jsonInput, List<ElementDTO.UpdateElementDTO>.class);
            List<ElementDTO.BaseElementDTO> updatedElements = ElementController.updateElements(elementDTOs);
            return JSON.serialize(updatedElements);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteElements() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<ElementDTO.BaseElementDTO> elementDTOs = (List<ElementDTO.BaseElementDTO>) JSON.deserialize(jsonInput, List<ElementDTO.BaseElementDTO>.class);
            List<ElementDTO.BaseElementDTO> deletedElements = ElementController.deleteElements(elementDTOs);
            return JSON.serialize(deletedElements);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}