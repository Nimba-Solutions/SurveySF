public class SurveyJsService {
    public class SurveyParseResult {
        public Map<String, Object> surveyFields;
        public List<Map<String, Object>> pageFields;
        public List<Map<String, Object>> elementFields;
        public List<Map<String, Object>> surveyPageFields;
        public List<Map<String, Object>> pageElementFields;
    }

    public static SurveyParseResult parseSurveyJson(String jsonString) {
        SurveyParseResult result = new SurveyParseResult();
        result.surveyFields = new Map<String, Object>();
        result.pageFields = new List<Map<String, Object>>();
        result.elementFields = new List<Map<String, Object>>();
        result.surveyPageFields = new List<Map<String, Object>>();
        result.pageElementFields = new List<Map<String, Object>>();

        Map<String, Object> surveyMap = (Map<String, Object>)JSON.deserializeUntyped(jsonString);

        // Parse Survey
        result.surveyFields.put('Name', (String)surveyMap.get('title'));
        result.surveyFields.put('Body__c', jsonString);

        // Parse Pages
        List<Object> pagesJson = (List<Object>)surveyMap.get('pages');
        for (Integer i = 0; i < pagesJson.size(); i++) {
            Map<String, Object> pageMap = (Map<String, Object>)pagesJson[i];
            Map<String, Object> pageFields = new Map<String, Object>();
            pageFields.put('Name', (String)pageMap.get('name'));
            pageFields.put('Body__c', JSON.serialize(pageMap));
            result.pageFields.add(pageFields);

            // Create SurveyPage junction object fields
            Map<String, Object> surveyPageFields = new Map<String, Object>();
            surveyPageFields.put('Index__c', i);
            result.surveyPageFields.add(surveyPageFields);

            // Parse Elements
            List<Object> elementsJson = (List<Object>)pageMap.get('elements');
            for (Integer j = 0; j < elementsJson.size(); j++) {
                Map<String, Object> elementMap = (Map<String, Object>)elementsJson[j];
                Map<String, Object> elementFields = new Map<String, Object>();
                elementFields.put('Name', (String)elementMap.get('name'));
                elementFields.put('Body__c', JSON.serialize(elementMap));
                result.elementFields.add(elementFields);

                // Create PageElement junction object fields
                Map<String, Object> pageElementFields = new Map<String, Object>();
                pageElementFields.put('Index__c', j);
                result.pageElementFields.add(pageElementFields);
            }
        }

        return result;
    }

    public static void createSurveyFromJson(String jsonString) {
        SurveyParseResult parseResult = parseSurveyJson(jsonString);

        // Create Survey
        SurveyDTO.CreateSurveyDTO surveyDTO = new SurveyDTO.CreateSurveyDTO();
        surveyDTO.fields = parseResult.surveyFields;
        SurveyDTO.BaseSurveyDTO createdSurvey = SurveyController.createSurvey(surveyDTO);

        // Create SurveyVersion
        SurveyVersionDTO.CreateSurveyVersionDTO surveyVersionDTO = new SurveyVersionDTO.CreateSurveyVersionDTO();
        surveyVersionDTO.fields.put('Survey__c', createdSurvey.fields.get('Id'));
        // Add any other necessary fields for SurveyVersion
        SurveyVersionDTO.BaseSurveyVersionDTO createdSurveyVersion = SurveyVersionController.createSurveyVersion(surveyVersionDTO);

        // Create Pages
        List<PageDTO.CreatePageDTO> pageDTOs = new List<PageDTO.CreatePageDTO>();
        for (Map<String, Object> pageFields : parseResult.pageFields) {
            PageDTO.CreatePageDTO pageDTO = new PageDTO.CreatePageDTO();
            pageDTO.fields = pageFields;
            pageDTOs.add(pageDTO);
        }
        List<PageDTO.BasePageDTO> createdPages = PageController.createPages(pageDTOs);

        // Create Elements
        List<ElementDTO.CreateElementDTO> elementDTOs = new List<ElementDTO.CreateElementDTO>();
        for (Map<String, Object> elementFields : parseResult.elementFields) {
            ElementDTO.CreateElementDTO elementDTO = new ElementDTO.CreateElementDTO();
            elementDTO.fields = elementFields;
            elementDTOs.add(elementDTO);
        }
        List<ElementDTO.BaseElementDTO> createdElements = ElementController.createElements(elementDTOs);

        // Create SurveyPage junction objects
        List<SurveyPageDTO.CreateSurveyPageDTO> surveyPageDTOs = new List<SurveyPageDTO.CreateSurveyPageDTO>();
        for (Integer i = 0; i < parseResult.surveyPageFields.size(); i++) {
            SurveyPageDTO.CreateSurveyPageDTO spDTO = new SurveyPageDTO.CreateSurveyPageDTO();
            spDTO.fields = parseResult.surveyPageFields[i];
            spDTO.fields.put('Survey__c', createdSurveyVersion.fields.get('Id'));
            spDTO.fields.put('Page__c', createdPages[i].fields.get('Id'));
            surveyPageDTOs.add(spDTO);
        }
        SurveyPageController.createSurveyPages(surveyPageDTOs);

        // Create PageElement junction objects
        List<PageElementDTO.CreatePageElementDTO> pageElementDTOs = new List<PageElementDTO.CreatePageElementDTO>();
        Integer elementIndex = 0;
        Integer pageIndex = 0;
        for (Map<String, Object> pageElementFields : parseResult.pageElementFields) {
            PageElementDTO.CreatePageElementDTO peDTO = new PageElementDTO.CreatePageElementDTO();
            peDTO.fields = pageElementFields;
            peDTO.fields.put('Page__c', createdPages[pageIndex].fields.get('Id'));
            peDTO.fields.put('Element__c', createdElements[elementIndex].fields.get('Id'));
            pageElementDTOs.add(peDTO);
            elementIndex++;
            
            // Check if we need to move to the next page
            if (elementIndex >= parseResult.elementFields.size() || 
                (pageIndex < parseResult.pageFields.size() - 1 && 
                 parseResult.elementFields[elementIndex].get('Name') == parseResult.pageFields[pageIndex + 1].get('Name'))) {
                pageIndex++;
                elementIndex = 0;
            }
        }
        PageElementController.createPageElements(pageElementDTOs);
    }
}