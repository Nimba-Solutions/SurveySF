import * as SurveyCore from 'survey-core';
export declare class UuidPropertyEditor {
    static register(): void;
    static registerUuidProperty(Survey: any): void;
    static copyToClipboard(text: string, button: HTMLElement): void;
    private static fallbackCopyToClipboard;
}
declare global {
    interface Window {
        Survey: typeof SurveyCore & any;
        SurveyCreator: any;
    }
}
