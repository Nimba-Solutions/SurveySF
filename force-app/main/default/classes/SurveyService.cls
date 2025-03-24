public class SurveyService {
    public static SurveyModel createFromJson(String jsonString) {
        return (SurveyModel)JSON.deserialize(jsonString, SurveyModel.class);
    }
    
    public static String toJson(SurveyModel model) {
        return JSON.serialize(model);
    }
    
    public static Survey__c saveSurvey(SurveyModel model) {
        // First save the survey
        Survey__c survey = model.toSObject();
        insert survey;
        
        // Then save each version and its nested records
        if (model.versions != null) {
            for (SurveyVersionModel versionModel : model.versions) {
                SurveyVersion__c version = versionModel.toSObject(survey.Id);
                insert version;
                
                // Save each page and its elements
                if (versionModel.pages != null) {
                    for (PageModel pageModel : versionModel.pages) {
                        Page__c page = pageModel.toSObject(version.Id);
                        insert page;
                        
                        // Save each element
                        if (pageModel.elements != null) {
                            for (ElementModel elementModel : pageModel.elements) {
                                Element__c element = elementModel.toSObject(page.Id);
                                insert element;
                            }
                        }
                    }
                }
            }
        }
        
        return survey;
    }
    
    public static SurveyModel getSurvey(Id surveyId) {
        // Get survey with its versions
        Survey__c survey = [SELECT Id, Title__c, Description__c, WidthMode__c, Width__c,
                          (SELECT Id, VersionNumber__c, IsActive__c
                           FROM SurveyVersions__r
                           ORDER BY VersionNumber__c DESC)
                          FROM Survey__c
                          WHERE Id = :surveyId];
        
        // Get pages for each version
        List<SurveyVersion__c> versions = survey.SurveyVersions__r;
        if (versions != null && !versions.isEmpty()) {
            List<Id> versionIds = new List<Id>();
            for (SurveyVersion__c v : versions) {
                versionIds.add(v.Id);
            }
            
            List<Page__c> pages = [SELECT Id, Name__c, Order__c, SurveyVersion__c
                                 FROM Page__c
                                 WHERE SurveyVersion__c IN :versionIds
                                 ORDER BY Order__c ASC];
            
            // Get elements for each page
            if (!pages.isEmpty()) {
                List<Id> pageIds = new List<Id>();
                for (Page__c p : pages) {
                    pageIds.add(p.Id);
                }
                
                List<Element__c> elements = [SELECT Id, Type__c, Name__c, Title__c, Order__c, IsRequired__c, VisibleIf__c, Page__c
                                          FROM Element__c
                                          WHERE Page__c IN :pageIds
                                          ORDER BY Order__c ASC];
                
                // Build the relationships using models
                Map<Id, List<ElementModel>> elementsByPage = new Map<Id, List<ElementModel>>();
                for (Element__c e : elements) {
                    if (!elementsByPage.containsKey(e.Page__c)) {
                        elementsByPage.put(e.Page__c, new List<ElementModel>());
                    }
                    elementsByPage.get(e.Page__c).add(ElementModel.fromSObject(e));
                }
                
                Map<Id, List<PageModel>> pagesByVersion = new Map<Id, List<PageModel>>();
                for (Page__c p : pages) {
                    if (!pagesByVersion.containsKey(p.SurveyVersion__c)) {
                        pagesByVersion.put(p.SurveyVersion__c, new List<PageModel>());
                    }
                    PageModel pageModel = PageModel.fromSObject(p);
                    pageModel.elements = elementsByPage.get(p.Id);
                    pagesByVersion.get(p.SurveyVersion__c).add(pageModel);
                }
                
                // Build the complete model
                SurveyModel model = SurveyModel.fromSObject(survey);
                for (SurveyVersionModel versionModel : model.versions) {
                    versionModel.pages = pagesByVersion.get(versionModel.recordId);
                }
                return model;
            }
        }
        
        return SurveyModel.fromSObject(survey);
    }
    
    public static String saveAndEnrichJson(String jsonString) {
        // Convert JSON to model
        SurveyModel model = createFromJson(jsonString);
        
        // Save the survey and get the created records
        Survey__c survey = saveSurvey(model);
        
        // Get the complete model with all record IDs
        SurveyModel enrichedModel = getSurvey(survey.Id);
        
        // Convert back to JSON
        return toJson(enrichedModel);
    }
    
    public static String getLatestVersionJson(Id surveyId) {
        // Get survey with its active version
        Survey__c survey = [SELECT Id, Title__c, Description__c, WidthMode__c, Width__c,
                          (SELECT Id, VersionNumber__c, IsActive__c
                           FROM SurveyVersions__r
                           WHERE IsActive__c = true
                           ORDER BY VersionNumber__c DESC
                           LIMIT 1)
                          FROM Survey__c
                          WHERE Id = :surveyId];
        
        if (survey.SurveyVersions__r.isEmpty()) {
            throw new SurveyException('No active version found for this survey');
        }
        
        // Get pages for the version
        SurveyVersion__c version = survey.SurveyVersions__r[0];
        List<Page__c> pages = [SELECT Id, Name__c, Order__c, SurveyVersion__c
                             FROM Page__c
                             WHERE SurveyVersion__c = :version.Id
                             ORDER BY Order__c ASC];
        
        // Get elements for each page
        if (!pages.isEmpty()) {
            List<Id> pageIds = new List<Id>();
            for (Page__c p : pages) {
                pageIds.add(p.Id);
            }
            
            List<Element__c> elements = [SELECT Id, Type__c, Name__c, Title__c, Order__c, IsRequired__c, VisibleIf__c, Page__c
                                      FROM Element__c
                                      WHERE Page__c IN :pageIds
                                      ORDER BY Order__c ASC];
            
            // Build the relationships using models
            Map<Id, List<ElementModel>> elementsByPage = new Map<Id, List<ElementModel>>();
            for (Element__c e : elements) {
                if (!elementsByPage.containsKey(e.Page__c)) {
                    elementsByPage.put(e.Page__c, new List<ElementModel>());
                }
                elementsByPage.get(e.Page__c).add(ElementModel.fromSObject(e));
            }
            
            // Build the complete model
            SurveyModel model = SurveyModel.fromSObject(survey);
            SurveyVersionModel versionModel = model.versions[0];
            versionModel.pages = new List<PageModel>();
            
            for (Page__c p : pages) {
                PageModel pageModel = PageModel.fromSObject(p);
                pageModel.elements = elementsByPage.get(p.Id);
                versionModel.pages.add(pageModel);
            }
            
            return toJson(model);
        }
        
        return toJson(SurveyModel.fromSObject(survey));
    }
    
    public static String getVersionJson(Id versionId) {
        // Get version with its pages
        SurveyVersion__c version = [SELECT Id, Survey__c, VersionNumber__c, IsActive__c,
                                  (SELECT Id, Name__c, Order__c
                                   FROM Pages__r
                                   ORDER BY Order__c ASC)
                                  FROM SurveyVersion__c
                                  WHERE Id = :versionId];
        
        // Get survey
        Survey__c survey = [SELECT Id, Title__c, Description__c, WidthMode__c, Width__c
                          FROM Survey__c
                          WHERE Id = :version.Survey__c];
        
        // Get elements for each page
        if (!version.Pages__r.isEmpty()) {
            List<Id> pageIds = new List<Id>();
            for (Page__c p : version.Pages__r) {
                pageIds.add(p.Id);
            }
            
            List<Element__c> elements = [SELECT Id, Type__c, Name__c, Title__c, Order__c, IsRequired__c, VisibleIf__c, Page__c
                                      FROM Element__c
                                      WHERE Page__c IN :pageIds
                                      ORDER BY Order__c ASC];
            
            // Build the relationships using models
            Map<Id, List<ElementModel>> elementsByPage = new Map<Id, List<ElementModel>>();
            for (Element__c e : elements) {
                if (!elementsByPage.containsKey(e.Page__c)) {
                    elementsByPage.put(e.Page__c, new List<ElementModel>());
                }
                elementsByPage.get(e.Page__c).add(ElementModel.fromSObject(e));
            }
            
            // Build the complete model
            SurveyModel model = SurveyModel.fromSObject(survey);
            SurveyVersionModel versionModel = SurveyVersionModel.fromSObject(version);
            versionModel.pages = new List<PageModel>();
            
            for (Page__c p : version.Pages__r) {
                PageModel pageModel = PageModel.fromSObject(p);
                pageModel.elements = elementsByPage.get(p.Id);
                versionModel.pages.add(pageModel);
            }
            
            model.versions = new List<SurveyVersionModel>{versionModel};
            return toJson(model);
        }
        
        return toJson(SurveyModel.fromSObject(survey));
    }
} 