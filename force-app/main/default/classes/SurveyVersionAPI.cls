@RestResource(urlMapping='/surveyversions/*')
global with sharing class SurveyVersionAPI {

    @HttpGet
    global static String getSurveyVersionById() {
        try {
            RestRequest req = RestContext.request;
            Id surveyversionId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            SurveyVersionDTO.BaseSurveyVersionDTO surveyversion = SurveyVersionController.getSurveyVersionById(surveyversionId, fieldSetName);
            return JSON.serialize(surveyversion);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createSurveyVersion() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single surveyversion or a list of surveyversions
            if (jsonInput.startsWith('[')) {
                List<SurveyVersionDTO.CreateSurveyVersionDTO> surveyversionDTOs = (List<SurveyVersionDTO.CreateSurveyVersionDTO>) JSON.deserialize(jsonInput, List<SurveyVersionDTO.CreateSurveyVersionDTO>.class);
                List<SurveyVersionDTO.BaseSurveyVersionDTO> result = SurveyVersionController.createSurveyVersions(surveyversionDTOs);
                return JSON.serialize(result);
            } else {
                SurveyVersionDTO.CreateSurveyVersionDTO createSurveyVersionDTO = (SurveyVersionDTO.CreateSurveyVersionDTO) JSON.deserialize(jsonInput, SurveyVersionDTO.CreateSurveyVersionDTO.class);
                SurveyVersionDTO.BaseSurveyVersionDTO result = SurveyVersionController.createSurveyVersion(createSurveyVersionDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateSurveyVersions() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyVersionDTO.UpdateSurveyVersionDTO> surveyversionDTOs = (List<SurveyVersionDTO.UpdateSurveyVersionDTO>) JSON.deserialize(jsonInput, List<SurveyVersionDTO.UpdateSurveyVersionDTO>.class);
            List<SurveyVersionDTO.BaseSurveyVersionDTO> updatedSurveyVersions = SurveyVersionController.updateSurveyVersions(surveyversionDTOs);
            return JSON.serialize(updatedSurveyVersions);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteSurveyVersions() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionDTOs = (List<SurveyVersionDTO.BaseSurveyVersionDTO>) JSON.deserialize(jsonInput, List<SurveyVersionDTO.BaseSurveyVersionDTO>.class);
            List<SurveyVersionDTO.BaseSurveyVersionDTO> deletedSurveyVersions = SurveyVersionController.deleteSurveyVersions(surveyversionDTOs);
            return JSON.serialize(deletedSurveyVersions);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}