@RestResource(urlMapping='/surveys/*')
global with sharing class SurveyAPI {

    @HttpGet
    global static String getSurveyById() {
        try {
            RestRequest req = RestContext.request;
            Id surveyId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            SurveyDTO.BaseSurveyDTO survey = SurveyController.getSurveyById(surveyId, fieldSetName);
            return JSON.serialize(survey);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createSurvey() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single survey or a list of surveys
            if (jsonInput.startsWith('[')) {
                List<SurveyDTO.CreateSurveyDTO> surveyDTOs = (List<SurveyDTO.CreateSurveyDTO>) JSON.deserialize(jsonInput, List<SurveyDTO.CreateSurveyDTO>.class);
                List<SurveyDTO.BaseSurveyDTO> result = SurveyController.createSurveys(surveyDTOs);
                return JSON.serialize(result);
            } else {
                SurveyDTO.CreateSurveyDTO createSurveyDTO = (SurveyDTO.CreateSurveyDTO) JSON.deserialize(jsonInput, SurveyDTO.CreateSurveyDTO.class);
                SurveyDTO.BaseSurveyDTO result = SurveyController.createSurvey(createSurveyDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateSurveys() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyDTO.UpdateSurveyDTO> surveyDTOs = (List<SurveyDTO.UpdateSurveyDTO>) JSON.deserialize(jsonInput, List<SurveyDTO.UpdateSurveyDTO>.class);
            List<SurveyDTO.BaseSurveyDTO> updatedSurveys = SurveyController.updateSurveys(surveyDTOs);
            return JSON.serialize(updatedSurveys);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteSurveys() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyDTO.BaseSurveyDTO> surveyDTOs = (List<SurveyDTO.BaseSurveyDTO>) JSON.deserialize(jsonInput, List<SurveyDTO.BaseSurveyDTO>.class);
            List<SurveyDTO.BaseSurveyDTO> deletedSurveys = SurveyController.deleteSurveys(surveyDTOs);
            return JSON.serialize(deletedSurveys);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}