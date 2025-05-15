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
                        
                        // Create the display container - Using inline styles instead of SLDS classes
                        const container = document.createElement("div");
                        container.style.margin = "4px 0";
                        container.style.display = "flex";
                        container.style.alignItems = "center";
                        
                        // Create the text display element
                        const valueDisplay = document.createElement("div");
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
                        valueDisplay.innerText = editor.koValue() || "";
                        
                        // Create copy button with inline styles
                        const copyBtn = document.createElement("button");
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
                        copyBtn.title = "Copy to clipboard";
                        
                        // Copy icon (SVG with inline styles)
                        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" style="fill: currentColor;">
                            <path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"></path>
                        </svg>`;
                        
                        // Add click handler for copy - using inline function for reliability
                        copyBtn.addEventListener('click', function(e) {
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
                                        this.style.color = "#2e844a";
                                        setTimeout(() => {
                                            this.style.color = "";
                                        }, 1000);
                                        console.log("UUID copied to clipboard:", valueToCopy);
                                    })
                                    .catch(err => {
                                        console.error("Clipboard copy failed:", err);
                                        fallbackCopy();
                                    });
                            } catch (err) {
                                console.error("Clipboard API error:", err);
                                fallbackCopy();
                            }
                            
                            // Fallback copy method
                            function fallbackCopy() {
                                try {
                                    const textArea = document.createElement("textarea");
                                    textArea.value = valueToCopy;
                                    textArea.style.position = "fixed";
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
                        });
                        
                        // Explicitly append to ensure DOM hierarchy
                        container.appendChild(valueDisplay);
                        container.appendChild(copyBtn);
                        el.appendChild(container);
                        
                        // Additional logging for debugging
                        console.log("UUID Display editor rendered", editor.koValue());
                        
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