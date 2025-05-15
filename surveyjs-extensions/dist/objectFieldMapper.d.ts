import * as SurveyCore from 'survey-core';
export type FieldSelectionCallback = (objectApiName: string, fieldApiName: string) => void;
export declare class ObjectFieldMapper {
    static readonly PropertyType = "objectFieldMapper";
    static registerPropertyEditorType(Survey: any): void;
    static renderEditor(editor: any, el: HTMLElement): HTMLElement;
    static updateValueDisplay(displayElement: HTMLElement, value: string | null): void;
    static dispatchSelectionEvent(currentValue: string | null, element: HTMLElement, callback: FieldSelectionCallback): void;
}
declare global {
    interface Window {
        Survey: typeof SurveyCore & any;
        SurveyCreator: any;
    }
}
