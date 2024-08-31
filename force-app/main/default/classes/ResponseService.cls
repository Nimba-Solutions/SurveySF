public class ResponseService {
    private ResponseRepository responseRepo;
    private ResponseElementRepository responseElementRepo;
    
    public ResponseService() {
        this.responseRepo = new ResponseRepository();
        this.responseElementRepo = new ResponseElementRepository();
    }
    
    public ResponseDTO getResponseWithElements(Id responseId) {
        Response__c response = responseRepo.getResponseById(responseId);
        List<ResponseElement__c> responseElements = responseElementRepo.getResponseElementsByResponseId(responseId);
        return new ResponseDTO(response, responseElements);
    }
    
    public List<ResponseDTO> getResponsesBySurveyVersionId(Id surveyVersionId) {
        List<ResponseDTO> responseDTOs = new List<ResponseDTO>();
        for (Response__c response : responseRepo.getResponsesBySurveyVersionId(surveyVersionId)) {
            List<ResponseElement__c> responseElements = responseElementRepo.getResponseElementsByResponseId(response.Id);
            responseDTOs.add(new ResponseDTO(response, responseElements));
        }
        return responseDTOs;
    }
    
    public void createResponse(String responseBody, Id surveyVersionId, List<ResponseElementDTO> responseElements) {
        Response__c newResponse = new Response__c(
            Body__c = responseBody,
            Survey__c = surveyVersionId
        );
        responseRepo.createResponse(newResponse);
        
        List<ResponseElement__c> newResponseElements = new List<ResponseElement__c>();
        for (ResponseElementDTO reDTO : responseElements) {
            newResponseElements.add(new ResponseElement__c(
                Body__c = reDTO.body,
                ElementVersion__c = reDTO.elementId,
                Response__c = newResponse.Id
            ));
        }
        responseElementRepo.createResponseElement(newResponseElements);
    }
}