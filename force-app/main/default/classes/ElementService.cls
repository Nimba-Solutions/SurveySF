public class ElementService {
    private ElementRepository elementRepo;
    private ElementVersionRepository elementVersionRepo;
    
    public ElementService() {
        this.elementRepo = new ElementRepository();
        this.elementVersionRepo = new ElementVersionRepository();
    }
    
    public ElementDTO getElementWithLatestVersion(Id elementId) {
        Element__c element = elementRepo.getElementById(elementId);
        ElementVersion__c latestVersion = elementVersionRepo.getLatestVersionByElementId(elementId);
        return new ElementDTO(element, latestVersion);
    }
    
    public List<ElementDTO> getAllElementsWithLatestVersions() {
        List<ElementDTO> elementDTOs = new List<ElementDTO>();
        for (Element__c element : elementRepo.getAllElements()) {
            ElementVersion__c latestVersion = elementVersionRepo.getLatestVersionByElementId(element.Id);
            elementDTOs.add(new ElementDTO(element, latestVersion));
        }
        return elementDTOs;
    }
    
    public Id createElementWithVersion(String elementBody) {
        Element__c newElement = new Element__c();
        Id elementId = elementRepo.createElement(newElement);
        
        ElementVersion__c newVersion = new ElementVersion__c(
            Element__c = elementId,
            Body__c = elementBody
        );
        return elementVersionRepo.createElementVersion(newVersion);
    }
    
    public Id updateElementVersion(Id elementId, String newElementBody) {
        ElementVersion__c newVersion = new ElementVersion__c(
            Element__c = elementId,
            Body__c = newElementBody
        );
        return elementVersionRepo.createElementVersion(newVersion);
    }
}