public class SurveyVersionRepository extends Repository {

    public List<SurveyVersionDTO.BaseSurveyVersionDTO> createSurveyVersions(List<SurveyVersionDTO.CreateSurveyVersionDTO> surveyversionDtos, Boolean rollbackOnError) {
        try {
            List<SurveyVersion__c> surveyversions = new List<SurveyVersion__c>();
            for (SurveyVersionDTO.CreateSurveyVersionDTO dto : surveyversionDtos) {
                surveyversions.add(dto.toSurveyVersion());
            }

            DML.insertRecords(surveyversions, rollbackOnError);

            List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionResults = new List<SurveyVersionDTO.BaseSurveyVersionDTO>();
            for (SurveyVersion__c surveyversion : surveyversions) {
                surveyversionResults.add(new SurveyVersionDTO.BaseSurveyVersionDTO(surveyversion));
            }
            return surveyversionResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to create surveyversions: ' + ex.getMessage());
        }
    }

    public List<SurveyVersionDTO.BaseSurveyVersionDTO> updateSurveyVersions(List<SurveyVersionDTO.UpdateSurveyVersionDTO> surveyversionDtos, Boolean rollbackOnError) {
        try {
            List<SurveyVersion__c> surveyversions = new List<SurveyVersion__c>();
            for (SurveyVersionDTO.UpdateSurveyVersionDTO dto : surveyversionDtos) {
                surveyversions.add(dto.toSurveyVersion());
            }

            DML.updateRecords(surveyversions, rollbackOnError);

            List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionResults = new List<SurveyVersionDTO.BaseSurveyVersionDTO>();
            for (SurveyVersion__c surveyversion : surveyversions) {
                surveyversionResults.add(new SurveyVersionDTO.BaseSurveyVersionDTO(surveyversion));
            }
            return surveyversionResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update surveyversions: ' + ex.getMessage());
        }
    }

    public List<SurveyVersionDTO.BaseSurveyVersionDTO> deleteSurveyVersions(List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionDtos, Boolean rollbackOnError) {
        try {
            List<SurveyVersion__c> surveyversions = new List<SurveyVersion__c>();
            for (SurveyVersionDTO.BaseSurveyVersionDTO dto : surveyversionDtos) {
                surveyversions.add(dto.toSurveyVersion());
            }

            DML.deleteRecords(surveyversions, rollbackOnError);

            List<SurveyVersionDTO.BaseSurveyVersionDTO> surveyversionResults = new List<SurveyVersionDTO.BaseSurveyVersionDTO>();
            for (SurveyVersion__c surveyversion : surveyversions) {
                surveyversionResults.add(new SurveyVersionDTO.BaseSurveyVersionDTO(surveyversion));
            }
            return surveyversionResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete surveyversions: ' + ex.getMessage());
        }
    }

    public SurveyVersionDTO.BaseSurveyVersionDTO findSurveyVersionById(Id surveyversionId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyVersion__c') : getFieldsFromFieldSet('SurveyVersion__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyVersion__c WHERE Id = :surveyversionId LIMIT 1';
            SurveyVersion__c surveyversion = Database.query(query);
            return new SurveyVersionDTO.BaseSurveyVersionDTO(surveyversion);
        } catch (Exception ex) {
            throw new CustomException('Failed to find surveyversion by ID: ' + ex.getMessage());
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