// Import types from SurveyJS libraries but use globals for runtime
import * as SurveyCore from 'survey-core';

export class UuidPropertyEditor {
    static register(): void {
        console.log('Registering UUID property editor');

        // Make sure we have access to the Survey object
        if (typeof window.Survey === 'undefined') {
            console.error('Survey global object not found');
            return;
        }

        const Survey = window.Survey;
        const propertyType = 'uuidDisplay';

        // Only register if not already registered
        if (!Survey.Serializer.findProperty('', propertyType)) {
            Survey.Serializer.addProperty('', {
                name: propertyType,
                type: 'string',
                isSerializable: false,
                editor: {
                    render: (editor: any, el: HTMLElement): HTMLElement => {
                        // Clear existing content
                        el.innerHTML = '';

                        // Create the display container with inline styles
                        const container = document.createElement('div');
                        container.style.margin = "4px 0";
                        container.style.display = "flex";
                        container.style.alignItems = "center";

                        // Create the text display element with inline styles
                        const valueDisplay = document.createElement('div');
                        valueDisplay.style.display = "inline-block";
                        valueDisplay.style.width = "calc(100% - 40px)";
                        valueDisplay.style.marginRight = "8px";
                        valueDisplay.style.padding = "0.25rem 0.5rem";
                        valueDisplay.style.border = "1px solid #dddbda";
                        valueDisplay.style.borderRadius = "4px";
                        valueDisplay.style.fontSize = "0.875rem";
                        valueDisplay.style.color = "#706e6b";
                        valueDisplay.style.overflow = "hidden";
                        valueDisplay.style.textOverflow = "ellipsis";
                        valueDisplay.style.whiteSpace = "nowrap";
                        valueDisplay.innerText = editor.koValue() || '';

                        // Create copy button with inline styles
                        const copyBtn = document.createElement('button');
                        copyBtn.style.minWidth = "32px";
                        copyBtn.style.height = "32px";
                        copyBtn.style.border = "none";
                        copyBtn.style.borderRadius = "4px";
                        copyBtn.style.backgroundColor = "transparent";
                        copyBtn.style.cursor = "pointer";
                        copyBtn.style.padding = "4px";
                        copyBtn.style.display = "flex";
                        copyBtn.style.alignItems = "center";
                        copyBtn.style.justifyContent = "center";
                        copyBtn.title = 'Copy to clipboard';

                        // Copy icon with inline styles
                        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" style="fill: currentColor;">
                <path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>`;

                        // Add click handler for copy using function for proper 'this' binding
                        copyBtn.addEventListener('click', function (e: MouseEvent): void {
                            e.preventDefault();
                            e.stopPropagation();

                            // Get the current value
                            const valueToCopy = editor.koValue();
                            if (!valueToCopy) return;

                            // Copy to clipboard using the static method
                            UuidPropertyEditor.copyToClipboard(valueToCopy, this as HTMLElement);
                        });

                        // Assemble the UI
                        container.appendChild(valueDisplay);
                        container.appendChild(copyBtn);
                        el.appendChild(container);

                        console.log("UUID Display editor rendered", editor.koValue());

                        return el;
                    }
                }
            });

            console.log(`Registered custom property editor: ${propertyType}`);
        }

        // Add the actual uuid property to all questions
        this.registerUuidProperty(Survey);
    }

    static registerUuidProperty(Survey: any): void {
        // Add the uuid property to questions
        Survey.Serializer.addProperty("question", {
            name: "uuid",
            displayName: "Question Id",
            category: "general",
            visibleIndex: 0,
            type: "uuidDisplay",
            readOnly: true
        });

        console.log('Added uuid property to questions using uuidDisplay editor type');
    }

    static copyToClipboard(text: string, button: HTMLElement): void {
        try {
            navigator.clipboard.writeText(text)
                .then(() => {
                    // Visual feedback
                    button.style.color = "#2e844a";
                    setTimeout(() => {
                        button.style.color = "";
                    }, 1000);
                    console.log("UUID copied to clipboard:", text);
                })
                .catch(err => {
                    console.error("Clipboard copy failed:", err);
                    this.fallbackCopyToClipboard(text, button);
                });
        } catch (err) {
            console.error("Clipboard API error:", err);
            this.fallbackCopyToClipboard(text, button);
        }
    }

    private static fallbackCopyToClipboard(text: string, button: HTMLElement): void {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";  // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);

            if (successful) {
                console.log("UUID copied via fallback method");

                // Visual feedback
                button.style.color = "#2e844a";
                setTimeout(() => {
                    button.style.color = "";
                }, 1000);
            } else {
                console.error("Fallback clipboard copy failed");
            }
        } catch (e) {
            console.error("Fallback clipboard copy also failed:", e);
        }
    }
}

// Add global window declaration for Survey
declare global {
    interface Window {
        Survey: typeof SurveyCore & any;
        SurveyCreator: any;
        UuidPropertyEditor: typeof UuidPropertyEditor;
    }
}

// Export to window for LWC access
(window as any).UuidPropertyEditor = UuidPropertyEditor; 