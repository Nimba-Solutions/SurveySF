public class SurveyVersionDTO {

    public virtual class BaseSurveyVersionDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseSurveyVersionDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a SurveyVersion__c object
        public BaseSurveyVersionDTO(SurveyVersion__c surveyversion) {
            this.fields = new Map<String, Object>();
            Map<String, Object> surveyversionFields = surveyversion.getPopulatedFieldsAsMap();
            for (String fieldName : surveyversionFields.keySet()) {
                this.fields.put(fieldName, surveyversionFields.get(fieldName));
            }
        }

        // Converts DTO to SurveyVersion__c
        public virtual SurveyVersion__c toSurveyVersion() {
            SurveyVersion__c surveyversion = new SurveyVersion__c();
            for (String fieldName : this.fields.keySet()) {
                surveyversion.put(fieldName, this.fields.get(fieldName));
            }
            return surveyversion;
        }
    }

    public class CreateSurveyVersionDTO extends BaseSurveyVersionDTO {
        public CreateSurveyVersionDTO() {
            super();
        }
    }

    public class UpdateSurveyVersionDTO extends BaseSurveyVersionDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyVersionDTO() {
            super();
        }

        // Include the SurveyVersion ID when updating
        public override SurveyVersion__c toSurveyVersion() {
            SurveyVersion__c surveyversion = super.toSurveyVersion();
            surveyversion.Id = this.id;
            return surveyversion;
        }
    }
}