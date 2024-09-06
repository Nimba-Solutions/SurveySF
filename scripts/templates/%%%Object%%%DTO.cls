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
            super();
        }
    }

    public class Update%%%Object%%%DTO extends Base%%%Object%%%DTO {
        @AuraEnabled public Id id { get; set; }

        public Update%%%Object%%%DTO() {
            super();
        }

        // Include the %%%Object%%% ID when updating
        public override %%%Object%%%__c to%%%Object%%%() {
            %%%Object%%%__c %%%object%%% = super.to%%%Object%%%();
            %%%object%%%.Id = this.id;
            return %%%object%%%;
        }
    }
}