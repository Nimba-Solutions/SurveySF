public class ElementResponseDTO {

    public virtual class BaseElementResponseDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseElementResponseDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a ElementResponse__c object
        public BaseElementResponseDTO(ElementResponse__c elementresponse) {
            this.fields = new Map<String, Object>();
            Map<String, Object> elementresponseFields = elementresponse.getPopulatedFieldsAsMap();
            for (String fieldName : elementresponseFields.keySet()) {
                this.fields.put(fieldName, elementresponseFields.get(fieldName));
            }
        }

        // Constructor with fieldSetName
        public BaseElementResponseDTO(Id elementresponseId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('ElementResponse__c') : getFieldsFromFieldSet('ElementResponse__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM ElementResponse__c WHERE Id = :elementresponseId LIMIT 1';
            ElementResponse__c elementresponse = Database.query(query);
            Map<String, Object> elementresponseFields = elementresponse.getPopulatedFieldsAsMap();
            for (String fieldName : elementresponseFields.keySet()) {
                this.fields.put(fieldName, elementresponseFields.get(fieldName));
            }
        }

        // Converts DTO to ElementResponse__c
        public virtual ElementResponse__c toElementResponse() {
            ElementResponse__c elementresponse = new ElementResponse__c();
            for (String fieldName : this.fields.keySet()) {
                elementresponse.put(fieldName, this.fields.get(fieldName));
            }
            return elementresponse;
        }
    }

    public class CreateElementResponseDTO extends BaseElementResponseDTO {
        public CreateElementResponseDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateElementResponseDTO extends BaseElementResponseDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateElementResponseDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the ElementResponse ID when updating
        public override ElementResponse__c toElementResponse() {
            ElementResponse__c elementresponse = super.toElementResponse();
            elementresponse.Id = this.id;
            return elementresponse;
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
