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
            throw new CustomException('Failed to create surveypages: ' + ex.getMessage());
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
            SurveyPageDTO.BaseSurveyPageDTO surveypageDto = new SurveyPageDTO.BaseSurveyPageDTO(surveypageId, fieldSetName);
            return surveypageDto;
        } catch (Exception ex) {
            throw new CustomException('Failed to find surveypage by ID: ' + ex.getMessage());
        }
    }
}