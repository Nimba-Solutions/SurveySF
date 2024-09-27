@RestResource(urlMapping='/surveypages/*')
global with sharing class SurveyPageAPI {

    @HttpGet
    global static String getSurveyPageById() {
        try {
            RestRequest req = RestContext.request;
            Id surveypageId = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            SurveyPageDTO.BaseSurveyPageDTO surveypage = SurveyPageController.getSurveyPageById(surveypageId, fieldSetName);
            return JSON.serialize(surveypage);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String createSurveyPage() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single surveypage or a list of surveypages
            if (jsonInput.startsWith('[')) {
                List<SurveyPageDTO.CreateSurveyPageDTO> surveypageDTOs = (List<SurveyPageDTO.CreateSurveyPageDTO>) JSON.deserialize(jsonInput, List<SurveyPageDTO.CreateSurveyPageDTO>.class);
                List<SurveyPageDTO.BaseSurveyPageDTO> result = SurveyPageController.createSurveyPages(surveypageDTOs);
                return JSON.serialize(result);
            } else {
                SurveyPageDTO.CreateSurveyPageDTO createSurveyPageDTO = (SurveyPageDTO.CreateSurveyPageDTO) JSON.deserialize(jsonInput, SurveyPageDTO.CreateSurveyPageDTO.class);
                SurveyPageDTO.BaseSurveyPageDTO result = SurveyPageController.createSurveyPage(createSurveyPageDTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String updateSurveyPages() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyPageDTO.UpdateSurveyPageDTO> surveypageDTOs = (List<SurveyPageDTO.UpdateSurveyPageDTO>) JSON.deserialize(jsonInput, List<SurveyPageDTO.UpdateSurveyPageDTO>.class);
            List<SurveyPageDTO.BaseSurveyPageDTO> updatedSurveyPages = SurveyPageController.updateSurveyPages(surveypageDTOs);
            return JSON.serialize(updatedSurveyPages);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String deleteSurveyPages() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<SurveyPageDTO.BaseSurveyPageDTO> surveypageDTOs = (List<SurveyPageDTO.BaseSurveyPageDTO>) JSON.deserialize(jsonInput, List<SurveyPageDTO.BaseSurveyPageDTO>.class);
            List<SurveyPageDTO.BaseSurveyPageDTO> deletedSurveyPages = SurveyPageController.deleteSurveyPages(surveypageDTOs);
            return JSON.serialize(deletedSurveyPages);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}