var ObjectFieldMapper = /** @class */ (function () {
    function ObjectFieldMapper() {
    }
    // Register the property editor type only
    ObjectFieldMapper.registerPropertyEditorType = function (Survey) {
        console.log('Registering ObjectFieldMapper property editor type');
        if (!Survey.Serializer.findProperty('', this.PropertyType)) {
            Survey.Serializer.addProperty('', {
                name: this.PropertyType,
                type: 'string',
                isSerializable: true,
                editor: {
                    render: this.renderEditor
                }
            });
            console.log("Registered custom property editor type: ".concat(this.PropertyType));
        }
    };
    ObjectFieldMapper.renderEditor = function (editor, el) {
        // Clear existing content
        el.innerHTML = '';
        // Create the container with SLDS styling
        var container = document.createElement('div');
        container.className = 'slds-form-element';
        // Create a button to open the object/field selector
        var button = document.createElement('button');
        button.className = 'slds-button slds-button_neutral';
        button.innerText = 'Select Object & Field';
        button.dataset.action = 'select-field';
        // Show the current value if any
        var valueDisplay = document.createElement('div');
        valueDisplay.className = 'slds-text-body_regular slds-p-top_x-small';
        // Parse and display the current value if it exists
        var currentValue = editor.koValue();
        ObjectFieldMapper.updateValueDisplay(valueDisplay, currentValue);
        // Add click handler to button to trigger the LWC bridge
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // Create callback function to update the editor value
            var callback = function (objectApiName, fieldApiName) {
                // This callback will be called by the LWC bridge when the user selects a field
                var mappingData = JSON.stringify({
                    objectApiName: objectApiName,
                    fieldApiName: fieldApiName
                });
                // Update the editor value
                editor.koValue(mappingData);
                // Update the display
                ObjectFieldMapper.updateValueDisplay(valueDisplay, mappingData);
                console.log("Field mapping set to: ".concat(objectApiName, ".").concat(fieldApiName));
            };
            // Dispatch a custom event that the LWC bridge will listen for
            ObjectFieldMapper.dispatchSelectionEvent(currentValue, el, callback);
        };
        // Assemble the UI
        container.appendChild(button);
        container.appendChild(valueDisplay);
        el.appendChild(container);
        return el;
    };
    ObjectFieldMapper.updateValueDisplay = function (displayElement, value) {
        if (value) {
            try {
                var parsed = JSON.parse(value);
                if (parsed.objectApiName && parsed.fieldApiName) {
                    displayElement.innerText = "".concat(parsed.objectApiName, ".").concat(parsed.fieldApiName);
                    return;
                }
            }
            catch (e) {
                console.error('Error parsing object field mapping:', e);
            }
        }
        displayElement.innerText = 'No mapping selected';
    };
    ObjectFieldMapper.dispatchSelectionEvent = function (currentValue, element, callback) {
        var customEvent = new CustomEvent('objectfieldmapper:open', {
            bubbles: true,
            composed: true,
            detail: {
                currentValue: currentValue,
                element: element,
                callback: callback
            }
        });
        document.dispatchEvent(customEvent);
        console.log('Dispatched objectfieldmapper:open event');
    };
    // Define the property type name for external reference
    ObjectFieldMapper.PropertyType = 'objectFieldMapper';
    return ObjectFieldMapper;
}());
export { ObjectFieldMapper };
