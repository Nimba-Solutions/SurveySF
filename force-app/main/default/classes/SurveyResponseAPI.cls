@RestResource(urlMapping='/surveyresponses/*')
global with sharing class SurveyResponseAPI {

    @HttpGet
    global static String getSurveyResponseById() {
        try {
            RestRequest req = RestContext.request;
            Id surveyresponseId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            SurveyResponseDTO.BaseSurveyResponseDTO surveyresponse = SurveyResponseController.getSurveyResponseById(surveyresponseId, fieldSetName);
            return JSON.serialize(surveyresponse);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createSurveyResponse() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single surveyresponse or a list of surveyresponses
            if (jsonInput.startsWith('[')) {
                List<SurveyResponseDTO.CreateSurveyResponseDTO> surveyresponseDTOs = (List<SurveyResponseDTO.CreateSurveyResponseDTO>) JSON.deserialize(jsonInput, List<SurveyResponseDTO.CreateSurveyResponseDTO>.class);
                List<SurveyResponseDTO.BaseSurveyResponseDTO> result = SurveyResponseController.createSurveyResponses(surveyresponseDTOs);
                return JSON.serialize(result);
            } else {
                SurveyResponseDTO.CreateSurveyResponseDTO createSurveyResponseDTO = (SurveyResponseDTO.CreateSurveyResponseDTO) JSON.deserialize(jsonInput, SurveyResponseDTO.CreateSurveyResponseDTO.class);
                SurveyResponseDTO.BaseSurveyResponseDTO result = SurveyResponseController.createSurveyResponse(createSurveyResponseDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateSurveyResponses() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyResponseDTO.UpdateSurveyResponseDTO> surveyresponseDTOs = (List<SurveyResponseDTO.UpdateSurveyResponseDTO>) JSON.deserialize(jsonInput, List<SurveyResponseDTO.UpdateSurveyResponseDTO>.class);
            List<SurveyResponseDTO.BaseSurveyResponseDTO> updatedSurveyResponses = SurveyResponseController.updateSurveyResponses(surveyresponseDTOs);
            return JSON.serialize(updatedSurveyResponses);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteSurveyResponses() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseDTOs = (List<SurveyResponseDTO.BaseSurveyResponseDTO>) JSON.deserialize(jsonInput, List<SurveyResponseDTO.BaseSurveyResponseDTO>.class);
            List<SurveyResponseDTO.BaseSurveyResponseDTO> deletedSurveyResponses = SurveyResponseController.deleteSurveyResponses(surveyresponseDTOs);
            return JSON.serialize(deletedSurveyResponses);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}