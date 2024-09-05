public class DML {

    // Insert records with optional rollback handling
    public static void insertRecords(List<SObject> records, Boolean rollbackOnError) {
        Savepoint sp;
        if (rollbackOnError) {
            sp = Database.setSavepoint();
        }
        
        if (records != null && !records.isEmpty()) {
            Database.SaveResult[] results = Database.insert(records, false);
            handleSaveResults(results, 'insert', rollbackOnError, sp);
        }
    }

    // Update records with optional rollback handling
    public static void updateRecords(List<SObject> records, Boolean rollbackOnError) {
        Savepoint sp;
        if (rollbackOnError) {
            sp = Database.setSavepoint();
        }
        
        if (records != null && !records.isEmpty()) {
            Database.SaveResult[] results = Database.update(records, false);
            handleSaveResults(results, 'update', rollbackOnError, sp);
        }
    }

    // Delete records with optional rollback handling
    public static void deleteRecords(List<SObject> records, Boolean rollbackOnError) {
        Savepoint sp;
        if (rollbackOnError) {
            sp = Database.setSavepoint();
        }
        
        if (records != null && !records.isEmpty()) {
            Database.DeleteResult[] results = Database.delete(records, false);
            handleDeleteResults(results, rollbackOnError, sp);
        }
    }

    // Handle results for insert/update operations
    private static void handleSaveResults(Database.SaveResult[] results, String operation, Boolean rollbackOnError, Savepoint sp) {
        for (Database.SaveResult result : results) {
            if (!result.isSuccess()) {
                for (Database.Error error : result.getErrors()) {
                    String errorMessage = 'Error during ' + operation + ' operation: ' + error.getMessage();
                    System.debug(errorMessage);
                    if (rollbackOnError) {
                        Database.rollback(sp);
                        throw new CustomException(errorMessage);
                    }
                }
            }
        }
    }

    // Handle results for delete operations
    private static void handleDeleteResults(Database.DeleteResult[] results, Boolean rollbackOnError, Savepoint sp) {
        for (Database.DeleteResult result : results) {
            if (!result.isSuccess()) {
                for (Database.Error error : result.getErrors()) {
                    String errorMessage = 'Error during delete operation: ' + error.getMessage();
                    System.debug(errorMessage);
                    if (rollbackOnError) {
                        Database.rollback(sp);
                        throw new CustomException(errorMessage);
                    }
                }
            }
        }
    }
}