```mermaid
sequenceDiagram
    title LWC_surveyBuilder: loadNewSurvey()
    
    User->>LWC_surveyBuilder: click "New Survey"
    LWC_surveyBuilder->>SurveyBuilderController: initialize empty survey
    SurveyBuilderController->>SurveyBuilderService: CreateSurvey(emptyModel)
    SurveyBuilderService-->>SurveyBuilderController: return new surveyId
    SurveyBuilderController-->>LWC_surveyBuilder: return survey metadata
    LWC_surveyBuilder->>User: display empty survey builder
``` 