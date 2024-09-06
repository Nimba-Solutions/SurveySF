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
            super();
        }
    }

    public class UpdateElementDTO extends BaseElementDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateElementDTO() {
            super();
        }

        // Include the Element ID when updating
        public override Element__c toElement() {
            Element__c element = super.toElement();
            element.Id = this.id;
            return element;
        }
    }
}