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

        // Constructor with fieldSetName
        public BaseSurveyPageDTO(Id surveypageId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('SurveyPage__c') : getFieldsFromFieldSet('SurveyPage__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM SurveyPage__c WHERE Id = :surveypageId LIMIT 1';
            SurveyPage__c surveypage = Database.query(query);
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
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateSurveyPageDTO extends BaseSurveyPageDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateSurveyPageDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the SurveyPage ID when updating
        public override SurveyPage__c toSurveyPage() {
            SurveyPage__c surveypage = super.toSurveyPage();
            surveypage.Id = this.id;
            return surveypage;
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
