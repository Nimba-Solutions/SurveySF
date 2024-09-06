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

        // Constructor with fieldSetName
        public BaseSurveyDTO(Id surveyId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Survey__c') : getFieldsFromFieldSet('Survey__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Survey__c WHERE Id = :surveyId LIMIT 1';
            Survey__c survey = Database.query(query);
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
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateSurveyDTO extends BaseSurveyDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the Survey ID when updating
        public override Survey__c toSurvey() {
            Survey__c survey = super.toSurvey();
            survey.Id = this.id;
            return survey;
        }
    }

    // Helper method to get all fields for an object
    private static List<String> getAllFields(String objectName) {
        List<String> fieldNames = new List<String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        for (String fieldName : fieldMap.keySet()) {
            fieldNames.add(fieldName);
        }
        return fieldNames;
    }

    // Helper method to get fields from the Field Set
    private static List<String> getFieldsFromFieldSet(String objectName, String fieldSetName) {
        List<String> fieldNames = new List<String>();
        Schema.FieldSet fieldSet = Schema.getGlobalDescribe().get(objectName).getDescribe().fieldSets.getMap().get(fieldSetName);
        for (Schema.FieldSetMember f : fieldSet.getFields()) {
            fieldNames.add(f.getFieldPath());
        }
        return fieldNames;
    }
}
