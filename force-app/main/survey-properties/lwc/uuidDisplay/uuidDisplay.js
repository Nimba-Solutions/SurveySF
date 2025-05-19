import SurveyProperty from 'c/surveyProperty';

/**
 * Simple LWC component that adds a UUID read-only property to SurveyJS questions
 */
export default class UuidDisplay extends SurveyProperty {
    get propertyName() {
        return 'uuid';
    }

    get displayName() {
        return 'UUID';
    }

    get propertyType() {
        return 'string';
    }

    get propertyOptions() {
        return {
            readOnly: true
        };
    }
}
