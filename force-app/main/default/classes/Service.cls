public abstract class Service {
    
    protected Repository repository;

    // Find by ID
    public SObject findById(String sObjectType, Id recordId) {
        return repository.findById(sObjectType, recordId);
    }
    
    // Create records with optional rollback handling
    public void createRecords(List<SObject> records, Boolean rollbackOnError) {
        repository.createRecords(records, rollbackOnError);
    }

    // Update records with optional rollback handling
    public void updateRecords(List<SObject> records, Boolean rollbackOnError) {
        repository.updateRecords(records, rollbackOnError);
    }

    // Delete records with optional rollback handling
    public void deleteRecords(List<SObject> records, Boolean rollbackOnError) {
        repository.deleteRecords(records, rollbackOnError);
    }
}