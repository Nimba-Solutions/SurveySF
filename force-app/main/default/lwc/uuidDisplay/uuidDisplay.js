import { LightningElement, api, track } from 'lwc';

export default class UuidDisplay extends LightningElement {
    @api 
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    
    _value = '';
    @api propertyName = 'uuid';
    @api displayName = 'Question Id';
    
    @track error;

    connectedCallback() {
        console.log('UuidDisplay component connected');
    }
    
    // Copy UUID to clipboard
    copyToClipboard() {
        if (navigator.clipboard && this._value) {
            navigator.clipboard.writeText(this._value)
                .then(() => {
                    console.log('UUID copied to clipboard');
                })
                .catch(err => {
                    console.error('Error copying to clipboard:', err);
                    this.error = 'Failed to copy UUID';
                });
        }
    }
    
    // Methods for the Custom Property Registrar
    @api
    registerProperty(Survey, surveyCreator) {
        if (!Survey || !Survey.Serializer) {
            console.error('Survey.Serializer is not available');
            return;
        }
        
        // Create a custom editor for UUID display with copy functionality
        const customPropertyType = "uuidDisplay";
        
        // Define the custom property editor
        if (!Survey.Serializer.findProperty("", customPropertyType)) {
            Survey.Serializer.addProperty("", {
                name: customPropertyType,
                type: "string",
                isSerializable: false,
                editor: {
                    render: (editor, el) => {
                        // Clear existing content
                        el.innerHTML = "";
                        
                        // Create the display container
                        const container = document.createElement("div");
                        container.className = "slds-form-element";
                        
                        // Create the text display element
                        const valueDisplay = document.createElement("div");
                        valueDisplay.className = "slds-input slds-text-color_weak slds-truncate";
                        valueDisplay.style.display = "inline-block";
                        valueDisplay.style.width = "calc(100% - 40px)";
                        valueDisplay.style.marginRight = "8px";
                        valueDisplay.style.verticalAlign = "middle";
                        valueDisplay.innerText = editor.koValue() || "";
                        
                        // Create copy button
                        const copyBtn = document.createElement("button");
                        copyBtn.className = "slds-button slds-button_icon";
                        copyBtn.title = "Copy to clipboard";
                        copyBtn.style.verticalAlign = "middle";
                        
                        // Copy icon (simple text for reliability)
                        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"></path>
                        </svg>`;
                        
                        // Add click handler for copy
                        copyBtn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Get the current value
                            const valueToCopy = editor.koValue();
                            if (!valueToCopy) return;
                            
                            // Copy to clipboard
                            try {
                                navigator.clipboard.writeText(valueToCopy)
                                    .then(() => {
                                        // Visual feedback
                                        copyBtn.style.color = "#2e844a";
                                        setTimeout(() => {
                                            copyBtn.style.color = "";
                                        }, 1000);
                                        console.log("UUID copied to clipboard:", valueToCopy);
                                    })
                                    .catch(err => {
                                        console.error("Clipboard copy failed:", err);
                                    });
                            } catch (err) {
                                console.error("Clipboard API error:", err);
                                
                                // Fallback method
                                try {
                                    const textArea = document.createElement("textarea");
                                    textArea.value = valueToCopy;
                                    document.body.appendChild(textArea);
                                    textArea.select();
                                    document.execCommand("copy");
                                    document.body.removeChild(textArea);
                                    console.log("UUID copied via fallback method");
                                    
                                    // Visual feedback
                                    copyBtn.style.color = "#2e844a";
                                    setTimeout(() => {
                                        copyBtn.style.color = "";
                                    }, 1000);
                                } catch (e) {
                                    console.error("Fallback clipboard copy also failed:", e);
                                }
                            }
                        };
                        
                        // Assemble the UI
                        container.appendChild(valueDisplay);
                        container.appendChild(copyBtn);
                        el.appendChild(container);
                        
                        return el;
                    }
                }
            });
            console.log(`Registered custom property editor: ${customPropertyType}`);
        }
        
        // Add the custom property to all questions
        Survey.Serializer.addProperty("question", {
            name: this.propertyName,
            displayName: this.displayName,
            category: "general",
            visibleIndex: 0,
            type: customPropertyType,
            readOnly: true
        });
        
        console.log(`Registered display-only property: ${this.propertyName}`);
    }
    
    @api
    getPropertyName() {
        return this.propertyName;
    }
}