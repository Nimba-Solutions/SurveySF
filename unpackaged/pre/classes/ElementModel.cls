public class ElementModel {
    @AuraEnabled public Id id { get; set; }
    @AuraEnabled public Id pageId { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String type { get; set; }
    @AuraEnabled public Decimal sequence { get; set; }
    @AuraEnabled public String body { get; set; }
    
    // Additional fields from the JSON structure
    @AuraEnabled public Boolean startWithNewLine { get; set; }
    @AuraEnabled public Map<String, String> title { get; set; }
    @AuraEnabled public Integer rateCount { get; set; }
    @AuraEnabled public Integer rateMin { get; set; }
    @AuraEnabled public Integer rateMax { get; set; }
    @AuraEnabled public Map<String, String> minRateDescription { get; set; }
    @AuraEnabled public Map<String, String> maxRateDescription { get; set; }
    @AuraEnabled public String rateDescriptionLocation { get; set; }
    @AuraEnabled public List<String> choices { get; set; }
    @AuraEnabled public String visibleIf { get; set; }
    @AuraEnabled public Integer maxLength { get; set; }
    @AuraEnabled public Map<String, String> description { get; set; }
    @AuraEnabled public Boolean isRequired { get; set; }
    @AuraEnabled public List<ChoiceWrapper> complexChoices { get; set; }
    @AuraEnabled public Boolean showOtherItem { get; set; }
    @AuraEnabled public Map<String, String> otherPlaceholder { get; set; }
    @AuraEnabled public Map<String, String> otherText { get; set; }
    @AuraEnabled public Integer colCount { get; set; }
    @AuraEnabled public Integer maxSelectedChoices { get; set; }
    @AuraEnabled public Map<String, String> placeholder { get; set; }
    @AuraEnabled public List<ValidatorWrapper> validators { get; set; }
    
    public class ChoiceWrapper {
        @AuraEnabled public String value { get; set; }
        @AuraEnabled public Object text { get; set; } // Can be String or Map<String, String>
    }
    
    public class ValidatorWrapper {
        @AuraEnabled public String type { get; set; }
    }

    public static ElementModel toJson(Element__c record) {
        ElementModel model = new ElementModel();
        model.id = record.Id;
        model.pageId = record.Page__c;
        model.name = record.Name;
        model.type = record.Type__c;
        model.sequence = record.Sequence__c;
        model.body = record.Body__c;
        return model;
    }

    public Element__c toRecord() {
        return new Element__c(
            Id = this.id,
            Page__c = this.pageId,
            Name = this.name,
            Type__c = this.type,
            Sequence__c = this.sequence,
            Body__c = this.body
        );
    }
}