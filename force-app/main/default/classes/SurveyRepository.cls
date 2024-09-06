public class SurveyRepository extends Repository {
    public List<SurveyDTO.BaseSurveyDTO> createSurveys(List<SurveyDTO.CreateSurveyDTO> surveyDtos, Boolean rollbackOnError) {
        try {
            List<Survey__c> surveys = new List<Survey__c>();
            for (SurveyDTO.CreateSurveyDTO dto : surveyDtos) {
                surveys.add(dto.toSurvey());
            }
            DML.insertRecords(surveys, rollbackOnError);
            List<SurveyDTO.BaseSurveyDTO> surveyResults = new List<SurveyDTO.BaseSurveyDTO>();
            for (Survey__c survey : surveys) {
                surveyResults.add(new SurveyDTO.BaseSurveyDTO(survey));
            }
            return surveyResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create surveys: ' + ex.getMessage());
        }
    }

    public List<SurveyDTO.BaseSurveyDTO> updateSurveys(List<SurveyDTO.UpdateSurveyDTO> surveyDtos, Boolean rollbackOnError) {
        try {
            List<Survey__c> surveys = new List<Survey__c>();
            for (SurveyDTO.UpdateSurveyDTO dto : surveyDtos) {
                surveys.add(dto.toSurvey());
            }
            DML.updateRecords(surveys, rollbackOnError);
            List<SurveyDTO.BaseSurveyDTO> surveyResults = new List<SurveyDTO.BaseSurveyDTO>();
            for (Survey__c survey : surveys) {
                surveyResults.add(new SurveyDTO.BaseSurveyDTO(survey));
            }
            return surveyResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update surveys: ' + ex.getMessage());
        }
    }

    public List<SurveyDTO.BaseSurveyDTO> deleteSurveys(List<SurveyDTO.BaseSurveyDTO> surveyDtos, Boolean rollbackOnError) {
        try {
            List<Survey__c> surveys = new List<Survey__c>();
            for (SurveyDTO.BaseSurveyDTO dto : surveyDtos) {
                surveys.add(dto.toSurvey());
            }
            DML.deleteRecords(surveys, rollbackOnError);
            List<SurveyDTO.BaseSurveyDTO> surveyResults = new List<SurveyDTO.BaseSurveyDTO>();
            for (Survey__c survey : surveys) {
                surveyResults.add(new SurveyDTO.BaseSurveyDTO(survey));
            }
            return surveyResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete surveys: ' + ex.getMessage());
        }
    }

    public SurveyDTO.BaseSurveyDTO findSurveyById(Id surveyId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Survey__c') : getFieldsFromFieldSet('Survey__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Survey__c WHERE Id = :surveyId LIMIT 1';
            Survey__c survey = Database.query(query);
            return new SurveyDTO.BaseSurveyDTO(survey);
        } catch (Exception ex) {
            throw new CustomException('Failed to find survey by ID: ' + ex.getMessage());
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