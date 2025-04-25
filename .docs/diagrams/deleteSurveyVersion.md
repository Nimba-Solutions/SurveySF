```mermaid
sequenceDiagram
    title LWC_surveyDatatable: deleteSurveyVersion()
    
    User->>LWC_surveyDatatable: click "Delete Version"
    LWC_surveyDatatable->>User: confirm deletion dialog
    User->>LWC_surveyDatatable: confirm deletion
    LWC_surveyDatatable->>SurveyBuilderController: DeleteSurveyVersion(surveyVersionId)
    SurveyBuilderController->>SurveyVersionService: DeleteSurveyVersion(surveyVersionId)
    SurveyVersionService-->>SurveyBuilderController: success/failure response
    SurveyBuilderController-->>LWC_surveyDatatable: confirmation message
    LWC_surveyDatatable->>User: display success message
    LWC_surveyDatatable->>LWC_surveyDatatable: refresh versions list
``` 