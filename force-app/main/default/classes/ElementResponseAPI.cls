@RestResource(urlMapping='/elementresponses/*')
global with sharing class ElementResponseAPI {

    @HttpGet
    global static String getElementResponseById() {
        try {
            RestRequest req = RestContext.request;
            Id elementresponseId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            ElementResponseDTO.BaseElementResponseDTO elementresponse = ElementResponseController.getElementResponseById(elementresponseId, fieldSetName);
            return JSON.serialize(elementresponse);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createElementResponse() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single elementresponse or a list of elementresponses
            if (jsonInput.startsWith('[')) {
                List<ElementResponseDTO.CreateElementResponseDTO> elementresponseDTOs = (List<ElementResponseDTO.CreateElementResponseDTO>) JSON.deserialize(jsonInput, List<ElementResponseDTO.CreateElementResponseDTO>.class);
                List<ElementResponseDTO.BaseElementResponseDTO> result = ElementResponseController.createElementResponses(elementresponseDTOs);
                return JSON.serialize(result);
            } else {
                ElementResponseDTO.CreateElementResponseDTO createElementResponseDTO = (ElementResponseDTO.CreateElementResponseDTO) JSON.deserialize(jsonInput, ElementResponseDTO.CreateElementResponseDTO.class);
                ElementResponseDTO.BaseElementResponseDTO result = ElementResponseController.createElementResponse(createElementResponseDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateElementResponses() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<ElementResponseDTO.UpdateElementResponseDTO> elementresponseDTOs = (List<ElementResponseDTO.UpdateElementResponseDTO>) JSON.deserialize(jsonInput, List<ElementResponseDTO.UpdateElementResponseDTO>.class);
            List<ElementResponseDTO.BaseElementResponseDTO> updatedElementResponses = ElementResponseController.updateElementResponses(elementresponseDTOs);
            return JSON.serialize(updatedElementResponses);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteElementResponses() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<ElementResponseDTO.BaseElementResponseDTO> elementresponseDTOs = (List<ElementResponseDTO.BaseElementResponseDTO>) JSON.deserialize(jsonInput, List<ElementResponseDTO.BaseElementResponseDTO>.class);
            List<ElementResponseDTO.BaseElementResponseDTO> deletedElementResponses = ElementResponseController.deleteElementResponses(elementresponseDTOs);
            return JSON.serialize(deletedElementResponses);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}