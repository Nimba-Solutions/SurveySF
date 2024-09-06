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

        // Constructor with fieldSetName
        public BaseSurveyVersionDTO(Id surveyversionId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyVersion__c') : getFieldsFromFieldSet('SurveyVersion__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyVersion__c WHERE Id = :surveyversionId LIMIT 1';
            SurveyVersion__c surveyversion = Database.query(query);
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
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateSurveyVersionDTO extends BaseSurveyVersionDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyVersionDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the SurveyVersion ID when updating
        public override SurveyVersion__c toSurveyVersion() {
            SurveyVersion__c surveyversion = super.toSurveyVersion();
            surveyversion.Id = this.id;
            return surveyversion;
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
