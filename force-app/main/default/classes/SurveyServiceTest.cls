@IsTest
private class SurveyServiceTest {
    @TestSetup
    static void setupTestData() {
        // Create test survey
        Survey__c survey = new Survey__c(
            Title__c = 'Test Survey',
            Description__c = 'Test Description',
            WidthMode__c = 'static',
            Width__c = '1000px'
        );
        insert survey;
        
        // Create test version
        SurveyVersion__c version = new SurveyVersion__c(
            Survey__c = survey.Id,
            VersionNumber__c = 1,
            IsActive__c = true
        );
        insert version;
        
        // Create test page
        Page__c page = new Page__c(
            SurveyVersion__c = version.Id,
            Name__c = 'Test Page',
            Order__c = 1
        );
        insert page;
        
        // Create test element
        Element__c element = new Element__c(
            Page__c = page.Id,
            Type__c = 'rating',
            Name__c = 'test_rating',
            Title__c = 'Test Rating',
            Order__c = 1,
            IsRequired__c = true
        );
        insert element;
    }
    
    @IsTest
    static void testCreateFromJson() {
        String jsonString = '{"title":"Test Survey","description":"Test Description","widthMode":"static","width":"1000px","versions":[]}';
        SurveyModel model = SurveyService.createFromJson(jsonString);
        System.assertEquals('Test Survey', model.title);
        System.assertEquals('Test Description', model.description);
    }
    
    @IsTest
    static void testToJson() {
        SurveyModel model = new SurveyModel();
        model.title = 'Test Survey';
        model.description = 'Test Description';
        String jsonString = SurveyService.toJson(model);
        System.assert(jsonString.contains('Test Survey'));
        System.assert(jsonString.contains('Test Description'));
    }
    
    @IsTest
    static void testSaveSurvey() {
        SurveyModel model = new SurveyModel();
        model.title = 'New Survey';
        model.description = 'New Description';
        model.widthMode = 'static';
        model.width = '1000px';
        
        SurveyVersionModel version = new SurveyVersionModel();
        version.versionNumber = 1;
        version.isActive = true;
        
        PageModel page = new PageModel();
        page.name = 'New Page';
        page.order = 1;
        
        ElementModel element = new ElementModel();
        element.type = 'rating';
        element.name = 'new_rating';
        element.title = 'New Rating';
        element.order = 1;
        element.isRequired = true;
        
        page.elements.add(element);
        version.pages.add(page);
        model.versions.add(version);
        
        Test.startTest();
        Survey__c survey = SurveyService.saveSurvey(model);
        Test.stopTest();
        
        System.assertNotEquals(null, survey.Id);
        System.assertEquals('New Survey', survey.Title__c);
    }
    
    @IsTest
    static void testGetSurvey() {
        Survey__c survey = [SELECT Id FROM Survey__c LIMIT 1];
        SurveyModel model = SurveyService.getSurvey(survey.Id);
        System.assertEquals('Test Survey', model.title);
        System.assertEquals('Test Description', model.description);
    }
} 