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
            super();
        }
    }

    public class UpdateElementResponseDTO extends BaseElementResponseDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdateElementResponseDTO() {
            super();
        }

        // Include the ElementResponse ID when updating
        public override ElementResponse__c toElementResponse() {
            ElementResponse__c elementresponse = super.toElementResponse();
            elementresponse.Id = this.id;
            return elementresponse;
        }
    }
}