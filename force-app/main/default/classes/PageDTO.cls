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
            super();
        }
    }

    public class UpdatePageDTO extends BasePageDTO {
        @AuraEnabled public Id id { get; set; }

        public UpdatePageDTO() {
            super();
        }

        // Include the Page ID when updating
        public override Page__c toPage() {
            Page__c page = super.toPage();
            page.Id = this.id;
            return page;
        }
    }
}