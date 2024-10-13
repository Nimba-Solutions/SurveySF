@RestResource(urlMapping='/%%%object%%%s/*')
global with sharing class %%%Object%%%API {

    @HttpGet
    global static String get%%%Object%%%ById() {
        try {
            RestRequest req = RestContext.request;
            Id %%%object%%%Id = (Id) req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
            String fieldSetName = 'Public';
            %%%Object%%%DTO.Base%%%Object%%%DTO %%%object%%% = %%%Object%%%Controller.get%%%Object%%%ById(%%%object%%%Id, fieldSetName);
            return JSON.serialize(%%%object%%%);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPost
    global static String create%%%Object%%%() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();

            // Check if input is a single %%%object%%% or a list of %%%object%%%s
            if (jsonInput.startsWith('[')) {
                List<%%%Object%%%DTO.Create%%%Object%%%DTO> %%%object%%%DTOs = (List<%%%Object%%%DTO.Create%%%Object%%%DTO>) JSON.deserialize(jsonInput, List<%%%Object%%%DTO.Create%%%Object%%%DTO>.class);
                List<%%%Object%%%DTO.Base%%%Object%%%DTO> result = %%%Object%%%Controller.create%%%Object%%%s(%%%object%%%DTOs);
                return JSON.serialize(result);
            } else {
                %%%Object%%%DTO.Create%%%Object%%%DTO create%%%Object%%%DTO = (%%%Object%%%DTO.Create%%%Object%%%DTO) JSON.deserialize(jsonInput, %%%Object%%%DTO.Create%%%Object%%%DTO.class);
                %%%Object%%%DTO.Base%%%Object%%%DTO result = %%%Object%%%Controller.create%%%Object%%%(create%%%Object%%%DTO);
                return JSON.serialize(result);
            }
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpPatch
    global static String update%%%Object%%%s() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<%%%Object%%%DTO.Update%%%Object%%%DTO> %%%object%%%DTOs = (List<%%%Object%%%DTO.Update%%%Object%%%DTO>) JSON.deserialize(jsonInput, List<%%%Object%%%DTO.Update%%%Object%%%DTO>.class);
            List<%%%Object%%%DTO.Base%%%Object%%%DTO> updated%%%Object%%%s = %%%Object%%%Controller.update%%%Object%%%s(%%%object%%%DTOs);
            return JSON.serialize(updated%%%Object%%%s);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }

    @HttpDelete
    global static String delete%%%Object%%%s() {
        try {
            RestRequest req = RestContext.request;
            String jsonInput = req.requestBody.toString();
            List<%%%Object%%%DTO.Base%%%Object%%%DTO> %%%object%%%DTOs = (List<%%%Object%%%DTO.Base%%%Object%%%DTO>) JSON.deserialize(jsonInput, List<%%%Object%%%DTO.Base%%%Object%%%DTO>.class);
            List<%%%Object%%%DTO.Base%%%Object%%%DTO> deleted%%%Object%%%s = %%%Object%%%Controller.delete%%%Object%%%s(%%%object%%%DTOs);
            return JSON.serialize(deleted%%%Object%%%s);
        } catch (CustomException ex) {
            throw new CustomException(ex.getMessage());
        } catch (Exception ex) {
            throw new CustomException('An unexpected error occurred: ' + ex.getMessage());
        }
    }
}