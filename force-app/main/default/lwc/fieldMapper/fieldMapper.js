import { LightningElement, api, track } from "lwc";

export default class FieldMapper extends LightningElement {
  @api
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.parseInitialValue();
  }

  _value = "";
  @api propertyName = "fieldMapper";
  @api displayName = "Salesforce Field Mapper";
  @api fieldType = "";
  @api sObject = "";

  @track error;
  @track metadataSelector;
  @track currentQuestion;
  tempValue = "";

  connectedCallback() {
    console.log("FieldMapper component connected");
  }

  renderedCallback() {
    if (!this.metadataSelector) {
      this.metadataSelector = this.template.querySelector(
        "c-metadata-selector"
      );
      if (this.metadataSelector) {
        console.log("FieldMapper found the metadata selector");
      }
    }
  }

  parseInitialValue() {
    // This will be handled by the metadataSelector component
    console.log("FieldMapper passing value to metadata selector:", this._value);
  }

  handleValueChange(event) {
    console.log("FieldMapper got value change event:", event.detail);
    // Store in tempValue until save is clicked
    this.tempValue = event.detail.value;
  }

  handleReady(event) {
    console.log("FieldMapper: metadataSelector is ready");
    this.dispatchEvent(
      new CustomEvent("fieldmapper:ready", {
        bubbles: true,
        composed: true,
        detail: {
          componentRef: this,
        },
      })
    );
  }

  // Show the modal
  openModal() {
    console.log("Opening field mapper modal");
    const modal = this.template.querySelector("c-modal");
    if (modal) {
      modal.open();
    } else {
      console.error("Modal component not found");
    }
  }

  // Hide the modal
  closeModal() {
    console.log("Closing field mapper modal");
    const modal = this.template.querySelector("c-modal");
    if (modal) {
      modal.close();
    }

    // Make sure the question property is reset so the button can be clicked again
    if (this.currentQuestion) {
      try {
        // Try a different approach to reset the property for reopening
        if (window.Survey && window.Survey.FieldMapperComponent) {
          // The property name in Survey.js
          const propName = this.propertyName;

          // Get the question object
          const question = this.currentQuestion;

          // Force a change notification in the Survey.js property system
          setTimeout(() => {
            // Clear the value
            question.setPropertyValue(propName, "");

            // Notify Survey.js that the property changed
            if (question.propertyChanged) {
              question.propertyChanged.fire(question, {
                name: propName,
                newValue: "",
              });
            }

            console.log(
              "Reset question property value for reopening with notification"
            );
          }, 100);
        }
      } catch (error) {
        console.error("Error resetting property:", error);
      }
    }
  }

  // Handle the save button click in the modal
  handleSaveMapping() {
    console.log("Saving mapping:", this.tempValue);

    // Update the actual value from the temp value
    this._value = this.tempValue;

    // Close the modal
    this.closeModal();

    // Dispatch a custom event with the new value
    const valueChangeEvent = new CustomEvent("valuechange", {
      detail: this._value,
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(valueChangeEvent);
  }

  // Methods for the Custom Property Registrar
  @api
  registerProperty(Survey, surveyCreator) {
    if (!Survey || !Survey.Serializer) {
      console.error("Survey.Serializer is not available");
      return;
    }

    // Register a custom buttongroup editor if it doesn't exist
    if (!Survey.Serializer.findProperty("", "buttongroup")) {
      Survey.Serializer.addProperty("", {
        name: "buttongroup",
        type: "string",
        isSerializable: false,
        editor: {
          render: (editor, el) => {
            el.innerHTML = "";
            const property = editor.property;
            const choices = property.choices || [];

            choices.forEach((choice) => {
              const btn = document.createElement("button");
              btn.innerText = choice.text;
              btn.className =
                "slds-button slds-button_brand slds-m-right_x-small";
              btn.onclick = (e) => {
                e.preventDefault();
                editor.koValue(choice.value);
              };
              el.appendChild(btn);
            });

            return el;
          },
        },
      });
    }

    // Store reference to this component instance
    if (!Survey.FieldMapperComponent) {
      Survey.FieldMapperComponent = {};
    }
    Survey.FieldMapperComponent[this.propertyName] = this;

    // Add the custom property to all questions
    Survey.Serializer.addProperty("question", {
      name: this.propertyName,
      displayName: this.displayName,
      category: "general",
      visibleIndex: 3,
      type: "buttongroup",
      choices: [{ value: "openModal", text: "Map to Salesforce Field" }],
      onSetValue: (obj, value) => {
        console.log("onSetValue triggered with:", value);
        if (value === "openModal") {
          // Store the current question reference
          this.currentQuestion = obj;
          console.log("Opening modal for question:", obj);

          // Open this component's modal directly
          this.openModal();

          // Reset the value so the button can be clicked again
          obj.setPropertyValue(this.propertyName, "");
        }
      },
    });

    console.log(`Registered custom property: ${this.propertyName}`);
  }

  @api
  getPropertyName() {
    return this.propertyName;
  }

  @api
  reset() {
    if (this.metadataSelector) {
      this.metadataSelector.reset();
    }
  }
}
