public class SurveyJsonParser {
    public class ParsedSurvey {
        public String surveyBody;
        public List<ParsedPage> pages;
    }
    
    public class ParsedPage {
        public String pageBody;
        public List<ParsedElement> elements;
    }
    
    public class ParsedElement {
        public String elementBody;
        public Decimal index;
    }
    
    public static ParsedSurvey parseSurveyJSON(String jsonString) {
        ParsedSurvey parsedSurvey = new ParsedSurvey();
        Map<String, Object> surveyMap = (Map<String, Object>)JSON.deserializeUntyped(jsonString);
        
        // Parse survey-level data
        Map<String, Object> surveyData = new Map<String, Object>();
        for (String key : surveyMap.keySet()) {
            if (key != 'pages') {
                surveyData.put(key, surveyMap.get(key));
            }
        }
        parsedSurvey.surveyBody = JSON.serialize(surveyData);
        
        // Parse pages and elements
        parsedSurvey.pages = new List<ParsedPage>();
        List<Object> pagesJson = (List<Object>)surveyMap.get('pages');
        for (Object pageObj : pagesJson) {
            ParsedPage parsedPage = new ParsedPage();
            Map<String, Object> pageMap = (Map<String, Object>)pageObj;
            
            // Parse page-level data
            Map<String, Object> pageData = new Map<String, Object>();
            for (String key : pageMap.keySet()) {
                if (key != 'elements') {
                    pageData.put(key, pageMap.get(key));
                }
            }
            parsedPage.pageBody = JSON.serialize(pageData);
            
            // Parse elements
            parsedPage.elements = new List<ParsedElement>();
            List<Object> elementsJson = (List<Object>)pageMap.get('elements');
            for (Integer i = 0; i < elementsJson.size(); i++) {
                ParsedElement parsedElement = new ParsedElement();
                parsedElement.elementBody = JSON.serialize(elementsJson[i]);
                parsedElement.index = i;
                parsedPage.elements.add(parsedElement);
            }
            
            parsedSurvey.pages.add(parsedPage);
        }
        
        return parsedSurvey;
    }
}