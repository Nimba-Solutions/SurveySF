public class SurveyPageDTO {

    public virtual class BaseSurveyPageDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseSurveyPageDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a SurveyPage__c object
        public BaseSurveyPageDTO(SurveyPage__c surveypage) {
            this.fields = new Map<String, Object>();
            Map<String, Object> surveypageFields = surveypage.getPopulatedFieldsAsMap();
            for (String fieldName : surveypageFields.keySet()) {
                this.fields.put(fieldName, surveypageFields.get(fieldName));
            }
        }

        // Converts DTO to SurveyPage__c
        public virtual SurveyPage__c toSurveyPage() {
            SurveyPage__c surveypage = new SurveyPage__c();
            for (String fieldName : this.fields.keySet()) {
                surveypage.put(fieldName, this.fields.get(fieldName));
            }
            return surveypage;
        }
    }

    public class CreateSurveyPageDTO extends BaseSurveyPageDTO {
        public CreateSurveyPageDTO() {
            super();
        }
    }

    public class UpdateSurveyPageDTO extends BaseSurveyPageDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyPageDTO() {
            super();
        }

        // Include the SurveyPage ID when updating
        public override SurveyPage__c toSurveyPage() {
            SurveyPage__c surveypage = super.toSurveyPage();
            surveypage.Id = this.id;
            return surveypage;
        }
    }
}