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
            SurveyVersionDTO.BaseSurveyVersionDTO surveyversionDto = new SurveyVersionDTO.BaseSurveyVersionDTO(surveyversionId, fieldSetName);
            return surveyversionDto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find surveyversion by ID: ' + ex.getMessage());
        }
    }
}