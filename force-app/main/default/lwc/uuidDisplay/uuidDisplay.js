import { LightningElement, api } from "lwc";

/**
 * LWC component that adds UUID display functionality to SurveyJS
 * Provides a custom property editor for displaying and copying UUIDs
 */
export default class UuidDisplay extends LightningElement {
  @api surveyCreator;

  connectedCallback() {
    // If Survey is already loaded, register with it
    if (window.Survey) {
      this.registerWithSurvey(window.Survey);
    }
  }

  /**
   * Registers the UUID property editor with SurveyJS
   * @param {object} Survey - The SurveyJS core library reference
   */
  registerWithSurvey(Survey) {
    if (!Survey) {
      console.error(
        "Cannot register UUID Property Editor: Survey object not provided"
      );
      return;
    }

    console.log("Registering UUID Property Editor with Survey...");

    const propertyType = "uuidDisplay";

    // Only register if not already registered
    if (!Survey.Serializer.findProperty("", propertyType)) {
      Survey.Serializer.addProperty("", {
        name: propertyType,
        type: "string",
        isSerializable: false,
        editor: {
          render: this.createUuidEditorRenderer(),
        },
      });

      console.log(`Registered custom property editor: ${propertyType}`);
    }

    // Add the uuid property to questions
    Survey.Serializer.addProperty("question", {
      name: "uuid",
      displayName: "Question Id",
      category: "general",
      visibleIndex: 0,
      type: "uuidDisplay",
      readOnly: true,
    });

    console.log(
      "Added uuid property to questions using uuidDisplay editor type"
    );
  }

  /**
   * Creates the render function for the UUID property editor UI
   * @returns {Function} A function that SurveyJS will call to render the property editor
   */
  createUuidEditorRenderer() {
    // Using arrow function to preserve 'this' context
    return (editor, el) => {
      // Clear existing content
      el.innerHTML = "";

      // Create the display container with inline styles
      const container = document.createElement("div");
      container.style.margin = "4px 0";
      container.style.display = "flex";
      container.style.alignItems = "center";

      // Create the text display element with inline styles
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

      // Copy icon with inline styles
      copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" style="fill: currentColor;">
        <path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"></path>
      </svg>`;

      // Add click handler for copy using arrow function to preserve 'this'
      copyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the current value
        const valueToCopy = editor.koValue();
        if (!valueToCopy) return;

        // Copy to clipboard
        this.copyToClipboard(valueToCopy, copyBtn);
      });

      // Assemble the UI
      container.appendChild(valueDisplay);
      container.appendChild(copyBtn);
      el.appendChild(container);

      console.log("UUID Display editor rendered", editor.koValue());

      return el;
    };
  }

  /**
   * Copies text to clipboard
   * @param {string} text - Text to copy
   * @param {HTMLElement} button - Button element for visual feedback
   */
  copyToClipboard(text, button) {
    try {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Visual feedback
          button.style.color = "#2e844a";
          setTimeout(() => {
            button.style.color = "";
          }, 1000);
          console.log("UUID copied to clipboard:", text);
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
          this.fallbackCopyToClipboard(text, button);
        });
    } catch (err) {
      console.error("Clipboard API error:", err);
      this.fallbackCopyToClipboard(text, button);
    }
  }

  /**
   * Fallback method for copying to clipboard in browsers without clipboard API
   * @param {string} text - Text to copy
   * @param {HTMLElement} button - Button element for visual feedback
   */
  fallbackCopyToClipboard(text, button) {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
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

  /**
   * Returns the name of the property this component handles
   * @returns {string} The property name
   */
  @api
  getPropertyName() {
    return "uuid";
  }

  /**
   * Registers the property with SurveyJS
   * This is a wrapper method to support the customPropertyRegistrar interface
   * @param {object} Survey - The SurveyJS core library reference
   * @param {object} surveyCreator - The SurveyJS Creator instance
   * @returns {Promise} A promise that resolves when registration is complete
   */
  @api
  registerProperty(Survey, surveyCreator) {
    if (Survey) {
      this.registerWithSurvey(Survey);
    }
    return Promise.resolve();
  }
}
