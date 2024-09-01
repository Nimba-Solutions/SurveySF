public class SurveyDevUtilities {
    public static void createSurveyFromJsonDebug() {
        // The full JSON string you provided
        String testJson = '{ "title": "NPS Survey Question", "completedHtml": "<h3>Thank you for your feedback</h3>", "completedHtmlOnCondition": [ { "expression": "{nps_score} >= 9", "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>" }, { "expression": "{nps_score} >= 6 and {nps_score} <= 8", "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>" } ], "pages": [ { "name": "page1", "elements": [ { "type": "rating", "name": "nps_score", "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?", "isRequired": true, "rateCount": 11, "rateMin": 0, "rateMax": 10, "minRateDescription": "(Most unlikely)", "maxRateDescription": "(Most likely)" }, { "type": "checkbox", "name": "promoter_features", "visibleIf": "{nps_score} >= 9", "title": "Which of the following features do you value the most?", "description": "Please select no more than three features.", "isRequired": true, "validators": [ { "type": "answercount", "text": "Please select no more than three features.", "maxCount": 3 } ], "choices": [ "Performance", "Stability", "User interface", "Complete functionality", "Learning materials (documentation, demos, code examples)", "Quality support" ], "showOtherItem": true, "otherText": "Other features:", "colCount": 2 }, { "type": "comment", "name": "passive_experience", "visibleIf": "{nps_score} >= 7 and {nps_score} <= 8", "title": "What can we do to make your experience more satisfying?" }, { "type": "comment", "name": "disappointing_experience", "visibleIf": "{nps_score} <= 6", "title": "Please let us know why you had such a disappointing experience with our product" } ] } ], "showQuestionNumbers": "off" }';

        // Create a new survey from JSON
        String surveyName = 'Full NPS Survey ' + DateTime.now().format('yyyy-MM-dd HH:mm:ss');
        SurveyController.createSurveyFromJSON(surveyName, testJson);

        // Retrieve all surveys and find the one we just created
        List<SurveyDTO> allSurveys = SurveyController.getAllSurveys();
        SurveyDTO createdSurvey;
        for (SurveyDTO survey : allSurveys) {
            if (survey.title == surveyName) {
                createdSurvey = survey;
                break;
            }
        }

        // Print details of the created survey
        if (createdSurvey != null) {
            System.debug('Created Survey: ' + createdSurvey.title);
            System.debug('Survey ID: ' + createdSurvey.id);
            System.debug('Latest Version ID: ' + createdSurvey.latestVersionId);
            System.debug('Latest Version Body: ' + createdSurvey.latestVersionBody);
            
            // Retrieve pages for the survey
            List<PageDTO> pages = SurveyController.getPagesBySurveyVersionId(createdSurvey.latestVersionId);
            System.debug('Number of pages: ' + pages.size());
            for (PageDTO page : pages) {
                System.debug('Page Body: ' + page.body);
                System.debug('Number of elements: ' + page.pageElements.size());
                for (PageElementDTO element : page.pageElements) {
                    System.debug('Element ID: ' + element.elementId + ', Index: ' + element.index);
                }
            }
            
            // Create a new version of the survey with a small change
            String updatedJson = testJson.replace('NPS Survey Question', 'Updated NPS Survey Question');
            SurveyController.updateSurveyVersion(createdSurvey.id, updatedJson);
            
            // Retrieve the updated survey
            SurveyDTO updatedSurvey = SurveyController.getSurveyWithLatestVersion(createdSurvey.id);
            System.debug('Updated Survey Latest Version Body: ' + updatedSurvey.latestVersionBody);
        } else {
            System.debug('Failed to create survey');
        }

        // Retrieve all elements
        List<ElementDTO> allElements = SurveyController.getAllElements();
        System.debug('Total number of elements: ' + allElements.size());
        for (ElementDTO element : allElements) {
            System.debug('Element Name: ' + element.name + ', Latest Version Body: ' + element.latestVersionBody);
        }
    }
    
    public static void createJsonFromSurveyDebug(String recordId) {
    String testJson = '{ "title": "NPS Survey Question", "completedHtml": "<h3>Thank you for your feedback</h3>", "completedHtmlOnCondition": [ { "expression": "{nps_score} >= 9", "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>" }, { "expression": "{nps_score} >= 6 and {nps_score} <= 8", "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>" } ], "pages": [ { "name": "page1", "elements": [ { "type": "rating", "name": "nps_score", "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?", "isRequired": true, "rateCount": 11, "rateMin": 0, "rateMax": 10, "minRateDescription": "(Most unlikely)", "maxRateDescription": "(Most likely)" }, { "type": "checkbox", "name": "promoter_features", "visibleIf": "{nps_score} >= 9", "title": "Which of the following features do you value the most?", "description": "Please select no more than three features.", "isRequired": true, "validators": [ { "type": "answercount", "text": "Please select no more than three features.", "maxCount": 3 } ], "choices": [ "Performance", "Stability", "User interface", "Complete functionality", "Learning materials (documentation, demos, code examples)", "Quality support" ], "showOtherItem": true, "otherText": "Other features:", "colCount": 2 }, { "type": "comment", "name": "passive_experience", "visibleIf": "{nps_score} >= 7 and {nps_score} <= 8", "title": "What can we do to make your experience more satisfying?" }, { "type": "comment", "name": "disappointing_experience", "visibleIf": "{nps_score} <= 6", "title": "Please let us know why you had such a disappointing experience with our product" } ] } ], "showQuestionNumbers": "off" }';

    // Fetch a survey by id
    SurveyDTO surveyDTO = SurveyController.getSurveyWithLatestVersion(recordId);
    
    if (surveyDTO == null) {
        System.debug('Survey not found for ID: ' + recordId);
        return;
    }
    
    // Run SurveyController.createJsonFromSurvey(recordId)
    String generatedJson = SurveyController.createJsonFromSurvey(recordId);
    
    // Debug the generated JSON
    System.debug('Generated JSON: ' + generatedJson);
    
    // Normalize JSON strings by deserializing and then re-serializing them
    Map<String, Object> testJsonMap = (Map<String, Object>) JSON.deserializeUntyped(testJson);
    Map<String, Object> generatedJsonMap = (Map<String, Object>) JSON.deserializeUntyped(generatedJson);

    String normalizedTestJson = JSON.serialize(testJsonMap);
    String normalizedGeneratedJson = JSON.serialize(generatedJsonMap);
    System.debug('normalizedTestJson:');
    System.debug(normalizedTestJson);
        
    System.debug('normalizedGeneratedJson:');
    System.debug(normalizedGeneratedJson);  
        
    // Compare normalized JSON strings
    if (normalizedTestJson == normalizedGeneratedJson) {
        System.debug('The generated JSON matches the test JSON.');
    } else {
        System.debug('The generated JSON does NOT match the test JSON.');
    }
}

}