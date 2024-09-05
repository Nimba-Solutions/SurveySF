public abstract class Repository {

    // Cache for field names for any SObject type
    private static Map<String, List<String>> cachedFieldNamesMap = new Map<String, List<String>>();

    // Create records and return the list of inserted records with IDs
    public List<SObject> createRecords(List<SObject> records, Boolean rollbackOnError) {
        if (records != null && !records.isEmpty()) {
            try {
                DML.insertRecords(records, rollbackOnError);
                return records; // Return records with IDs after insertion
            } catch (Exception ex) {
                handleDmlException(ex);
            }
        }
        return null;
    }

    // Update records and return the updated list of records
    public List<SObject> updateRecords(List<SObject> records, Boolean rollbackOnError) {
        if (records != null && !records.isEmpty()) {
            try {
                DML.updateRecords(records, rollbackOnError);
                return records; // Return updated records
            } catch (Exception ex) {
                handleDmlException(ex);
            }
        }
        return null;
    }

    // Delete records and return the list of deleted records
    public List<SObject> deleteRecords(List<SObject> records, Boolean rollbackOnError) {
        if (records != null && !records.isEmpty()) {
            try {
                DML.deleteRecords(records, rollbackOnError);
                return records; // Return the deleted records
            } catch (Exception ex) {
                handleDmlException(ex);
            }
        }
        return null;
    }

    // Find a record by ID and return it
    public SObject findById(String sObjectType, Id recordId) {
        String query = 'SELECT Id FROM ' + sObjectType + ' WHERE Id = :recordId LIMIT 1';
        List<SObject> result = Database.query(query);
        if (result.isEmpty()) {
            throw new CustomException('Record with ID ' + recordId + ' not found.');
        }
        return result[0];
    }

    // Build dynamic SOQL query for specific fields and SObject
    public String buildDynamicQuery(String sObjectName, Id recordId, List<String> fieldNames) {
        if (fieldNames == null || fieldNames.isEmpty()) {
            fieldNames = getFieldNames(sObjectName); 
        }
        String query = 'SELECT ' + String.join(fieldNames, ', ') + ' FROM ' + sObjectName + ' WHERE Id = :recordId';
        return query;
    }

    // Cache and get all field names for a given SObject type
    public List<String> getFieldNames(String sObjectName) {
        if (!cachedFieldNamesMap.containsKey(sObjectName)) {
            List<String> cachedFieldNames = new List<String>();
            Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap();
            for (String fieldName : fieldMap.keySet()) {
                if (!fieldName.equalsIgnoreCase('LastModifiedDate')) {
                    cachedFieldNames.add(fieldName);
                }
            }
            cachedFieldNamesMap.put(sObjectName, cachedFieldNames);
        }
        return cachedFieldNamesMap.get(sObjectName);
    }

    // Exception handling for DML operations
    private void handleDmlException(Exception ex) {
        throw new CustomException('DML operation failed: ' + ex.getMessage());
    }
}