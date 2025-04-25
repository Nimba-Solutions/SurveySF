```mermaid
sequenceDiagram
    title LWC_surveyBuilder: save()
    
    User->>LWC_surveyBuilder: click "Save"
    LWC_surveyBuilder->>SurveyBuilderController: OverwriteSurveyVersion(surveyModel)
    SurveyBuilderController->>SurveyVersionService: UpdateSurveyVersion(surveyModel)
    SurveyVersionService-->>SurveyBuilderController: success/failure response
    SurveyBuilderController-->>LWC_surveyBuilder: confirmation message
    LWC_surveyBuilder->>User: display success message
``` 