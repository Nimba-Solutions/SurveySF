```mermaid
sequenceDiagram
    title Apex Trigger Flow: Extract Survey JSON
    
    Database->>ApexTrigger: after insert/update on SurveyVersion
    ApexTrigger->>SurveyBuilderService: ExtractSurveyJSON(surveySchemaModel)
    SurveyBuilderService-->>Database: update processed records
``` 