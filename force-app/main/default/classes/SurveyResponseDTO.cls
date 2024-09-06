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

        // Constructor with fieldSetName
        public BaseSurveyResponseDTO(Id surveyresponseId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyResponse__c') : getFieldsFromFieldSet('SurveyResponse__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyResponse__c WHERE Id = :surveyresponseId LIMIT 1';
            SurveyResponse__c surveyresponse = Database.query(query);
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
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateSurveyResponseDTO extends BaseSurveyResponseDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyResponseDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the SurveyResponse ID when updating
        public override SurveyResponse__c toSurveyResponse() {
            SurveyResponse__c surveyresponse = super.toSurveyResponse();
            surveyresponse.Id = this.id;
            return surveyresponse;
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
