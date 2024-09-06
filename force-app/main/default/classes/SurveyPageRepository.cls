public class SurveyPageRepository extends Repository {

    public List<SurveyPageDTO.BaseSurveyPageDTO> createSurveyPages(List<SurveyPageDTO.CreateSurveyPageDTO> surveypageDtos, Boolean rollbackOnError) {
        try {
            List<SurveyPage__c> surveypages = new List<SurveyPage__c>();
            for (SurveyPageDTO.CreateSurveyPageDTO dto : surveypageDtos) {
                surveypages.add(dto.toSurveyPage());
            }

            DML.insertRecords(surveypages, rollbackOnError);

            List<SurveyPageDTO.BaseSurveyPageDTO> surveypageResults = new List<SurveyPageDTO.BaseSurveyPageDTO>();
            for (SurveyPage__c surveypage : surveypages) {
                surveypageResults.add(new SurveyPageDTO.BaseSurveyPageDTO(surveypage));
            }
            return surveypageResults;
        } catch (Exception ex) {
            String fullErrorMessage = 'Failed to create surveypages. Original error: ' + ex.getMessage() + '\n' + ex.getStackTraceString();
            System.debug(LoggingLevel.ERROR, fullErrorMessage);
            throw new CustomException(fullErrorMessage);
        }
    }


    public List<SurveyPageDTO.BaseSurveyPageDTO> updateSurveyPages(List<SurveyPageDTO.UpdateSurveyPageDTO> surveypageDtos, Boolean rollbackOnError) {
        try {
            List<SurveyPage__c> surveypages = new List<SurveyPage__c>();
            for (SurveyPageDTO.UpdateSurveyPageDTO dto : surveypageDtos) {
                surveypages.add(dto.toSurveyPage());
            }

            DML.updateRecords(surveypages, rollbackOnError);

            List<SurveyPageDTO.BaseSurveyPageDTO> surveypageResults = new List<SurveyPageDTO.BaseSurveyPageDTO>();
            for (SurveyPage__c surveypage : surveypages) {
                surveypageResults.add(new SurveyPageDTO.BaseSurveyPageDTO(surveypage));
            }
            return surveypageResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to update surveypages: ' + ex.getMessage());
        }
    }

    public List<SurveyPageDTO.BaseSurveyPageDTO> deleteSurveyPages(List<SurveyPageDTO.BaseSurveyPageDTO> surveypageDtos, Boolean rollbackOnError) {
        try {
            List<SurveyPage__c> surveypages = new List<SurveyPage__c>();
            for (SurveyPageDTO.BaseSurveyPageDTO dto : surveypageDtos) {
                surveypages.add(dto.toSurveyPage());
            }

            DML.deleteRecords(surveypages, rollbackOnError);

            List<SurveyPageDTO.BaseSurveyPageDTO> surveypageResults = new List<SurveyPageDTO.BaseSurveyPageDTO>();
            for (SurveyPage__c surveypage : surveypages) {
                surveypageResults.add(new SurveyPageDTO.BaseSurveyPageDTO(surveypage));
            }
            return surveypageResults;
        } catch (Exception ex) {
            throw new CustomException('Failed to delete surveypages: ' + ex.getMessage());
        }
    }

    public SurveyPageDTO.BaseSurveyPageDTO findSurveyPageById(Id surveypageId, String fieldSetName) {
        try {
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyPage__c') : getFieldsFromFieldSet('SurveyPage__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyPage__c WHERE Id = :surveypageId LIMIT 1';
            SurveyPage__c surveypage = Database.query(query);
            return new SurveyPageDTO.BaseSurveyPageDTO(surveypage);
        } catch (Exception ex) {
            throw new CustomException('Failed to find surveypage by ID: ' + ex.getMessage());
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