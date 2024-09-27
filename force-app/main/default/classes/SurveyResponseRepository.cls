public class SurveyResponseRepository extends Repository {

    public List<SurveyResponseDTO.BaseSurveyResponseDTO> createSurveyResponses(List<SurveyResponseDTO.CreateSurveyResponseDTO> surveyresponseDtos, Boolean rollbackOnError) {
        try {
            List<SurveyResponse__c> surveyresponses = new List<SurveyResponse__c>();
            for (SurveyResponseDTO.CreateSurveyResponseDTO dto : surveyresponseDtos) {
                surveyresponses.add(dto.toSurveyResponse());
            }

            DML.insertRecords(surveyresponses, rollbackOnError);

            List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseResults = new List<SurveyResponseDTO.BaseSurveyResponseDTO>();
            for (SurveyResponse__c surveyresponse : surveyresponses) {
                surveyresponseResults.add(new SurveyResponseDTO.BaseSurveyResponseDTO(surveyresponse));
            }
            return surveyresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create surveyresponses: ' + ex.getMessage());
        }
    }

    public List<SurveyResponseDTO.BaseSurveyResponseDTO> updateSurveyResponses(List<SurveyResponseDTO.UpdateSurveyResponseDTO> surveyresponseDtos, Boolean rollbackOnError) {
        try {
            List<SurveyResponse__c> surveyresponses = new List<SurveyResponse__c>();
            for (SurveyResponseDTO.UpdateSurveyResponseDTO dto : surveyresponseDtos) {
                surveyresponses.add(dto.toSurveyResponse());
            }

            DML.updateRecords(surveyresponses, rollbackOnError);

            List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseResults = new List<SurveyResponseDTO.BaseSurveyResponseDTO>();
            for (SurveyResponse__c surveyresponse : surveyresponses) {
                surveyresponseResults.add(new SurveyResponseDTO.BaseSurveyResponseDTO(surveyresponse));
            }
            return surveyresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update surveyresponses: ' + ex.getMessage());
        }
    }

    public List<SurveyResponseDTO.BaseSurveyResponseDTO> deleteSurveyResponses(List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseDtos, Boolean rollbackOnError) {
        try {
            List<SurveyResponse__c> surveyresponses = new List<SurveyResponse__c>();
            for (SurveyResponseDTO.BaseSurveyResponseDTO dto : surveyresponseDtos) {
                surveyresponses.add(dto.toSurveyResponse());
            }

            DML.deleteRecords(surveyresponses, rollbackOnError);

            List<SurveyResponseDTO.BaseSurveyResponseDTO> surveyresponseResults = new List<SurveyResponseDTO.BaseSurveyResponseDTO>();
            for (SurveyResponse__c surveyresponse : surveyresponses) {
                surveyresponseResults.add(new SurveyResponseDTO.BaseSurveyResponseDTO(surveyresponse));
            }
            return surveyresponseResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete surveyresponses: ' + ex.getMessage());
        }
    }

    public SurveyResponseDTO.BaseSurveyResponseDTO findSurveyResponseById(Id surveyresponseId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyResponse__c') : getFieldsFromFieldSet('SurveyResponse__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyResponse__c WHERE Id = :surveyresponseId LIMIT 1';
            SurveyResponse__c surveyresponse = Database.query(query);
            return new SurveyResponseDTO.BaseSurveyResponseDTO(surveyresponse);
        } catch (Exception ex) {
            throw new CustomException('Failed to find surveyresponse by ID: ' + ex.getMessage());
        }
    }

    private List<String> getAllFields(String objectName) {
        List<String> fieldNames = new List<String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        for (String fieldName : fieldMap.keySet()) {
            fieldNames.add(fieldName);
        }
        return fieldNames;
    }

    private List<String> getFieldsFromFieldSet(String objectName, String fieldSetName) {
        List<String> fieldNames = new List<String>();
        Schema.FieldSet fieldSet = Schema.getGlobalDescribe().get(objectName).getDescribe().fieldSets.getMap().get(fieldSetName);
        for (Schema.FieldSetMember f : fieldSet.getFields()) {
            fieldNames.add(f.getFieldPath());
        }
        return fieldNames;
    }
}