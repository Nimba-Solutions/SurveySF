public class PageService {
    private PageRepository pageRepo;
    private PageElementRepository pageElementRepo;
    
    public PageService() {
        this.pageRepo = new PageRepository();
        this.pageElementRepo = new PageElementRepository();
    }
    
    public List<PageDTO> getPagesBySurveyVersionId(Id surveyVersionId) {
        List<PageDTO> pageDTOs = new List<PageDTO>();
        for (Page__c page : pageRepo.getPagesBySurveyVersionId(surveyVersionId)) {
            List<PageElement__c> pageElements = pageElementRepo.getPageElementsByPageId(page.Id);
            pageDTOs.add(new PageDTO(page, pageElements));
        }
        return pageDTOs;
    }
    
    public void createPage(String pageBody, Id surveyVersionId, Decimal index) {
        Page__c newPage = new Page__c(
            Body__c = pageBody,
            Survey__c = surveyVersionId,
            Index__c = index
        );
        pageRepo.createPage(newPage);
    }
    
    public void updatePage(Id pageId, String pageBody, Decimal index) {
        Page__c page = new Page__c(
            Id = pageId,
            Body__c = pageBody,
            Index__c = index
        );
        pageRepo.updatePage(page);
    }
}