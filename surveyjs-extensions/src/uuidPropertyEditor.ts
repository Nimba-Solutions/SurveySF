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

                        // Create the display container
                        const container = document.createElement('div');
                        container.className = 'slds-form-element';

                        // Create the text display element
                        const valueDisplay = document.createElement('div');
                        valueDisplay.className = 'slds-input slds-text-color_weak slds-truncate';
                        valueDisplay.style.display = 'inline-block';
                        valueDisplay.style.width = 'calc(100% - 40px)';
                        valueDisplay.style.marginRight = '8px';
                        valueDisplay.style.verticalAlign = 'middle';
                        valueDisplay.innerText = editor.koValue() || '';

                        // Create copy button
                        const copyBtn = document.createElement('button');
                        copyBtn.className = 'slds-button slds-button_icon';
                        copyBtn.title = 'Copy to clipboard';
                        copyBtn.style.verticalAlign = 'middle';

                        // Copy icon (simple text for reliability)
                        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>`;

                        // Add click handler for copy
                        copyBtn.onclick = (e: MouseEvent): void => {
                            e.preventDefault();
                            e.stopPropagation();

                            // Get the current value
                            const valueToCopy = editor.koValue();
                            if (!valueToCopy) return;

                            // Copy to clipboard
                            UuidPropertyEditor.copyToClipboard(valueToCopy, copyBtn);
                        };

                        // Assemble the UI
                        container.appendChild(valueDisplay);
                        container.appendChild(copyBtn);
                        el.appendChild(container);

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
    }
} 