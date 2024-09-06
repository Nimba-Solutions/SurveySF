public class SurveyDTO {
    public virtual class BaseSurveyDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseSurveyDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a Survey__c object
        public BaseSurveyDTO(Survey__c survey) {
            this.fields = new Map<String, Object>();
            Map<String, Object> surveyFields = survey.getPopulatedFieldsAsMap();
            for (String fieldName : surveyFields.keySet()) {
                this.fields.put(fieldName, surveyFields.get(fieldName));
            }
        }

        // Converts DTO to Survey__c
        public virtual Survey__c toSurvey() {
            Survey__c survey = new Survey__c();
            for (String fieldName : this.fields.keySet()) {
                survey.put(fieldName, this.fields.get(fieldName));
            }
            return survey;
        }
    }

    public class CreateSurveyDTO extends BaseSurveyDTO {
        public CreateSurveyDTO() {
            super();
        }
    }

    public class UpdateSurveyDTO extends BaseSurveyDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyDTO() {
            super();
        }

        // Include the Survey ID when updating
        public override Survey__c toSurvey() {
            Survey__c survey = super.toSurvey();
            survey.Id = this.id;
            return survey;
        }
    }
}