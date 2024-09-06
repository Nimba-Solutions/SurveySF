public class PageElementDTO {

    public virtual class BasePageElementDTO {
        @AuraEnabled public Map<String, Object> fields { get; set; }

        // Default constructor
        public BasePageElementDTO() {
            this.fields = new Map<String, Object>();
        }

        // Constructor that accepts a PageElement__c object
        public BasePageElementDTO(PageElement__c pageelement) {
            this.fields = new Map<String, Object>();
            Map<String, Object> pageelementFields = pageelement.getPopulatedFieldsAsMap();
            for (String fieldName : pageelementFields.keySet()) {
                this.fields.put(fieldName, pageelementFields.get(fieldName));
            }
        }

        // Constructor with fieldSetName
        public BasePageElementDTO(Id pageelementId, String fieldSetName) {
            this.fields = new Map<String, Object>();
            List<String> fieldsToSelect = (fieldSetName == null) ? getAllFields('PageElement__c') : getFieldsFromFieldSet('PageElement__c', fieldSetName);
            String query = 'SELECT ' + String.join(fieldsToSelect, ', ') + ' FROM PageElement__c WHERE Id = :pageelementId LIMIT 1';
            PageElement__c pageelement = Database.query(query);
            Map<String, Object> pageelementFields = pageelement.getPopulatedFieldsAsMap();
            for (String fieldName : pageelementFields.keySet()) {
                this.fields.put(fieldName, pageelementFields.get(fieldName));
            }
        }

        // Converts DTO to PageElement__c
        public virtual PageElement__c toPageElement() {
            PageElement__c pageelement = new PageElement__c();
            for (String fieldName : this.fields.keySet()) {
                pageelement.put(fieldName, this.fields.get(fieldName));
            }
            return pageelement;
        }
    }

    public class CreatePageElementDTO extends BasePageElementDTO {
        public CreatePageElementDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }
    }

    public class UpdatePageElementDTO extends BasePageElementDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdatePageElementDTO() {
            super(null, null);  // This will fetch all fields since no field set is specified
        }

        // Include the PageElement ID when updating
        public override PageElement__c toPageElement() {
            PageElement__c pageelement = super.toPageElement();
            pageelement.Id = this.id;
            return pageelement;
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
