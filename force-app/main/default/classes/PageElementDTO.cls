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
            super();
        }
    }

    public class UpdatePageElementDTO extends BasePageElementDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdatePageElementDTO() {
            super();
        }

        // Include the PageElement ID when updating
        public override PageElement__c toPageElement() {
            PageElement__c pageelement = super.toPageElement();
            pageelement.Id = this.id;
            return pageelement;
        }
    }
}