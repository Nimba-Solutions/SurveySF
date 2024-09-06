public class ElementDTO {

    public virtual class BaseElementDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BaseElementDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a Element__c object
        public BaseElementDTO(Element__c element) {
            this.fields = new Map<String, Object>();
            Map<String, Object> elementFields = element.getPopulatedFieldsAsMap();
            for (String fieldName : elementFields.keySet()) {
                this.fields.put(fieldName, elementFields.get(fieldName));
            }
        }

        // Constructor with fieldSetName
        public BaseElementDTO(Id elementId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Element__c') : getFieldsFromFieldSet('Element__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Element__c WHERE Id = :elementId LIMIT 1';
            Element__c element = Database.query(query);
            Map<String, Object> elementFields = element.getPopulatedFieldsAsMap();
            for (String fieldName : elementFields.keySet()) {
                this.fields.put(fieldName, elementFields.get(fieldName));
            }
        }

        // Converts DTO to Element__c
        public virtual Element__c toElement() {
            Element__c element = new Element__c();
            for (String fieldName : this.fields.keySet()) {
                element.put(fieldName, this.fields.get(fieldName));
            }
            return element;
        }
    }

    public class CreateElementDTO extends BaseElementDTO {
        public CreateElementDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdateElementDTO extends BaseElementDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateElementDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the Element ID when updating
        public override Element__c toElement() {
            Element__c element = super.toElement();
            element.Id = this.id;
            return element;
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
