public class PageDTO {

    public virtual class BasePageDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BasePageDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a Page__c object
        public BasePageDTO(Page__c page) {
            this.fields = new Map<String, Object>();
            Map<String, Object> pageFields = page.getPopulatedFieldsAsMap();
            for (String fieldName : pageFields.keySet()) {
                this.fields.put(fieldName, pageFields.get(fieldName));
            }
        }

        // Constructor with fieldSetName
        public BasePageDTO(Id pageId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('Page__c') : getFieldsFromFieldSet('Page__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM Page__c WHERE Id = :pageId LIMIT 1';
            Page__c page = Database.query(query);
            Map<String, Object> pageFields = page.getPopulatedFieldsAsMap();
            for (String fieldName : pageFields.keySet()) {
                this.fields.put(fieldName, pageFields.get(fieldName));
            }
        }

        // Converts DTO to Page__c
        public virtual Page__c toPage() {
            Page__c page = new Page__c();
            for (String fieldName : this.fields.keySet()) {
                page.put(fieldName, this.fields.get(fieldName));
            }
            return page;
        }
    }

    public class CreatePageDTO extends BasePageDTO {
        public CreatePageDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdatePageDTO extends BasePageDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdatePageDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the Page ID when updating
        public override Page__c toPage() {
            Page__c page = super.toPage();
            page.Id = this.id;
            return page;
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
