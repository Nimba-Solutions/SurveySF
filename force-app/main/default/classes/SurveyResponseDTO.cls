public class SurveyResponseDTO {

    public virtual class BaseSurveyResponseDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseSurveyResponseDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a SurveyResponse__c object
        public BaseSurveyResponseDTO(SurveyResponse__c surveyresponse) {
            this.fields = new Map<String, Object>();
            Map<String, Object> surveyresponseFields = surveyresponse.getPopulatedFieldsAsMap();
            for (String fieldName : surveyresponseFields.keySet()) {
                this.fields.put(fieldName, surveyresponseFields.get(fieldName));
            }
        }

        // Converts DTO to SurveyResponse__c
        public virtual SurveyResponse__c toSurveyResponse() {
            SurveyResponse__c surveyresponse = new SurveyResponse__c();
            for (String fieldName : this.fields.keySet()) {
                surveyresponse.put(fieldName, this.fields.get(fieldName));
            }
            return surveyresponse;
        }
    }

    public class CreateSurveyResponseDTO extends BaseSurveyResponseDTO {
        public CreateSurveyResponseDTO() {
            super();
        }
    }

    public class UpdateSurveyResponseDTO extends BaseSurveyResponseDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyResponseDTO() {
            super();
        }

        // Include the SurveyResponse ID when updating
        public override SurveyResponse__c toSurveyResponse() {
            SurveyResponse__c surveyresponse = super.toSurveyResponse();
            surveyresponse.Id = this.id;
            return surveyresponse;
        }
    }
}