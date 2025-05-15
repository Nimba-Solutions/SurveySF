var UuidPropertyEditor = /** @class */ (function () {
    function UuidPropertyEditor() {
    }
    UuidPropertyEditor.register = function () {
        console.log('Registering UUID property editor');
        // Make sure we have access to the Survey object
        if (typeof window.Survey === 'undefined') {
            console.error('Survey global object not found');
            return;
        }
        var Survey = window.Survey;
        var propertyType = 'uuidDisplay';
        // Only register if not already registered
        if (!Survey.Serializer.findProperty('', propertyType)) {
            Survey.Serializer.addProperty('', {
                name: propertyType,
                type: 'string',
                isSerializable: false,
                editor: {
                    render: function (editor, el) {
                        // Clear existing content
                        el.innerHTML = '';
                        // Create the display container
                        var container = document.createElement('div');
                        container.className = 'slds-form-element';
                        // Create the text display element
                        var valueDisplay = document.createElement('div');
                        valueDisplay.className = 'slds-input slds-text-color_weak slds-truncate';
                        valueDisplay.style.display = 'inline-block';
                        valueDisplay.style.width = 'calc(100% - 40px)';
                        valueDisplay.style.marginRight = '8px';
                        valueDisplay.style.verticalAlign = 'middle';
                        valueDisplay.innerText = editor.koValue() || '';
                        // Create copy button
                        var copyBtn = document.createElement('button');
                        copyBtn.className = 'slds-button slds-button_icon';
                        copyBtn.title = 'Copy to clipboard';
                        copyBtn.style.verticalAlign = 'middle';
                        // Copy icon (simple text for reliability)
                        copyBtn.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\n                <path fill=\"currentColor\" d=\"M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z\"></path>\n            </svg>";
                        // Add click handler for copy
                        copyBtn.onclick = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            // Get the current value
                            var valueToCopy = editor.koValue();
                            if (!valueToCopy)
                                return;
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
            console.log("Registered custom property editor: ".concat(propertyType));
        }
        // Add the actual uuid property to all questions
        this.registerUuidProperty(Survey);
    };
    UuidPropertyEditor.registerUuidProperty = function (Survey) {
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
    };
    UuidPropertyEditor.copyToClipboard = function (text, button) {
        var _this = this;
        try {
            navigator.clipboard.writeText(text)
                .then(function () {
                // Visual feedback
                button.style.color = "#2e844a";
                setTimeout(function () {
                    button.style.color = "";
                }, 1000);
                console.log("UUID copied to clipboard:", text);
            })
                .catch(function (err) {
                console.error("Clipboard copy failed:", err);
                _this.fallbackCopyToClipboard(text, button);
            });
        }
        catch (err) {
            console.error("Clipboard API error:", err);
            this.fallbackCopyToClipboard(text, button);
        }
    };
    UuidPropertyEditor.fallbackCopyToClipboard = function (text, button) {
        try {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            var successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            if (successful) {
                console.log("UUID copied via fallback method");
                // Visual feedback
                button.style.color = "#2e844a";
                setTimeout(function () {
                    button.style.color = "";
                }, 1000);
            }
            else {
                console.error("Fallback clipboard copy failed");
            }
        }
        catch (e) {
            console.error("Fallback clipboard copy also failed:", e);
        }
    };
    return UuidPropertyEditor;
}());
export { UuidPropertyEditor };
