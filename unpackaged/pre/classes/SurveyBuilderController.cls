public with sharing class SurveyBuilderController {
    
    @AuraEnabled
    public static SurveyModel getSurvey(Id surveyId) {
        try {
            return SurveyService.getSurvey(surveyId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyVersionModel getLatestDraftVersion(Id surveyId) {
        try {
            return SurveyService.getLatestDraftVersion(surveyId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyVersionModel getLatestActiveVersion(Id surveyId) {
        try {
            return SurveyService.getLatestActiveVersion(surveyId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyVersionModel getLatestVersion(Id surveyId) {
        try {
            return SurveyService.getLatestVersion(surveyId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyVersionModel getVersionById(Id versionId) {
        try {
            return SurveyService.getVersionById(versionId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyVersionModel saveVersion(SurveyVersionModel versionModel) {
        try {
            return SurveyService.saveVersion(versionModel);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static SurveyModel saveSurvey(SurveyModel model) {
        try {
            return SurveyService.saveSurvey(model);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void deleteSurvey(Id surveyId) {
        try {
            SurveyService.deleteSurvey(surveyId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static PageModel getPage(Id pageId) {
        try {
            return PageService.getPage(pageId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static PageModel savePage(PageModel pageModel) {
        try {
            return PageService.savePage(pageModel);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void deletePage(Id pageId) {
        try {
            PageService.deletePage(pageId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<PageModel> getVersionPages(Id versionId) {
        try {
            List<Page__c> pages = PageService.getVersionPages(versionId);
            List<PageModel> pageModels = new List<PageModel>();
            for(Page__c page : pages) {
                pageModels.add(PageModel.toJson(page));
            }
            return pageModels;
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static ElementModel getElement(Id elementId) {
        try {
            return ElementService.getElement(elementId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static ElementModel saveElement(ElementModel elementModel) {
        try {
            return ElementService.saveElement(elementModel);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void deleteElement(Id elementId) {
        try {
            ElementService.deleteElement(elementId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
} 