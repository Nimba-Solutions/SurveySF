public class %%%Object%%%DTO {

    public virtual class Base%%%Object%%%DTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public Base%%%Object%%%DTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a %%%Object%%%__c object
        public Base%%%Object%%%DTO(%%%Object%%%__c %%%object%%%) {
            this.fields = new Map<String, Object>();
            Map<String, Object> %%%object%%%Fields = %%%object%%%.getPopulatedFieldsAsMap();
            for (String fieldName : %%%object%%%Fields.keySet()) {
                this.fields.put(fieldName, %%%object%%%Fields.get(fieldName));
            }
        }

        // Constructor with fieldSetName
        public Base%%%Object%%%DTO(Id %%%object%%%Id, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('%%%Object%%%__c') : getFieldsFromFieldSet('%%%Object%%%__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM %%%Object%%%__c WHERE Id = :%%%object%%%Id LIMIT 1';
            %%%Object%%%__c %%%object%%% = Database.query(query);
            Map<String, Object> %%%object%%%Fields = %%%object%%%.getPopulatedFieldsAsMap();
            for (String fieldName : %%%object%%%Fields.keySet()) {
                this.fields.put(fieldName, %%%object%%%Fields.get(fieldName));
            }
        }

        // Converts DTO to %%%Object%%%__c
        public virtual %%%Object%%%__c to%%%Object%%%() {
            %%%Object%%%__c %%%object%%% = new %%%Object%%%__c();
            for (String fieldName : this.fields.keySet()) {
                %%%object%%%.put(fieldName, this.fields.get(fieldName));
            }
            return %%%object%%%;
        }
    }

    public class Create%%%Object%%%DTO extends Base%%%Object%%%DTO {
        public Create%%%Object%%%DTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class Update%%%Object%%%DTO extends Base%%%Object%%%DTO {
        @AuraEnabled public Id id { get; set; }

        public Update%%%Object%%%DTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the %%%Object%%% ID when updating
        public override %%%Object%%%__c to%%%Object%%%() {
            %%%Object%%%__c %%%object%%% = super.to%%%Object%%%();
            %%%object%%%.Id = this.id;
            return %%%object%%%;
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
