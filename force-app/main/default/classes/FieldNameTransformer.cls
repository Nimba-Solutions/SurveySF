public class FieldNameTransformer {

    // Method to transform field names (lowercase first character, remove underscores and __c suffix)
    public static String transformFieldName(String fieldName) {
        // Remove __c suffix
        String nameWithoutSuffix = fieldName.replace('__c', '');

        // Remove underscores and lowercase the first character
        String[] parts = nameWithoutSuffix.split('_');
        String transformedName = parts[0].toLowerCase();
        
        // Capitalize first letter of subsequent parts and append them
        for (Integer i = 1; i < parts.size(); i++) {
            transformedName += parts[i].capitalize();
        }

        return transformedName;
    }
}