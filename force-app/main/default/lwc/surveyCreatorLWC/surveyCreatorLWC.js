import { LightningElement } from "lwc";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import SURVEY_CORE from "@salesforce/resourceUrl/surveycore"; //JS
import SURVEY_JS_UI from "@salesforce/resourceUrl/surveyjsui"; //JS
import SURVEY_CORE_CSS from "@salesforce/resourceUrl/surveycoremin"; //CSS (renamed from DEFAULTV2)
import SURVEY_CREATOR_CORE_CSS from "@salesforce/resourceUrl/surveycreatorcorecss"; //CSS
import SURVEY_CREATOR_CORE_JS from "@salesforce/resourceUrl/surveycreatorcorejs"; //JS
import SURVEY_CREATOR_JS from "@salesforce/resourceUrl/surveycreatormin"; //JS

export default class SurveyCreatorLWC extends LightningElement {
  surveyInitialized = false;
  loaded = false;
  creatorInstance = null;

  renderedCallback() {
    if (this.surveyInitialized) {
      return;
    }
    this.surveyInitialized = true;
    loadStyle(this, SURVEY_CORE_CSS)
      .then(() => {
        console.log("SurveyJS CSS loaded.");
        loadScript(this, SURVEY_CORE)
          .then(() => {
            loadScript(this, SURVEY_JS_UI)
              .then(() => {
                loadStyle(this, SURVEY_CREATOR_CORE_CSS)
                  .then(() => {
                    loadScript(this, SURVEY_CREATOR_CORE_JS)
                      .then(() => {
                        loadScript(this, SURVEY_CREATOR_JS)
                          .then(() => {
                            this.initializeSurvey();
                          })
                          .catch((error) => {
                            console.error(
                              "Error loading SURVEY_CREATOR_JS resources:",
                              error
                            );
                          });
                      })
                      .catch((error) => {
                        console.error(
                          "Error loading SURVEY_CREATOR_CORE_JS resources:",
                          error
                        );
                      });
                  })
                  .catch((error) => {
                    console.error(
                      "Error loading SURVEY_CREATOR_CORE_CSS resources:",
                      error
                    );
                  });
                console.log("SurveyJS JS UI loaded.");
              })
              .catch((error) => {
                console.error("Error loading SURVEY JS UI resources:", error);
              });
          })
          .catch((error) => {
            console.error("Error loading SURVEY CORE resources:", error);
          })
          .finally((result) => {
            console.log("loadScript result:", result);
          });
      })
      .catch((error) => {
        console.error("Error loading resources:", error);
      });
  }

  initializeSurvey() {
    console.log("Initializing Survey...");

    if (window.Survey) {
      const creatorOptions = {
        showLogicTab: true,
        isAutoSave: true,
      };

      const defaultJson = {
        pages: [
          {
            name: "Name",
            elements: [
              {
                name: "FirstName",
                title: "Enter your first name:",
                type: "text",
              },
              {
                name: "LastName",
                title: "Enter your last name:",
                type: "text",
              },
            ],
          },
        ],
      };

      // setLicenseKey("VkFMSURfUFJFRklYOzA9MjAyNS0xMi0zMQ==");

      const creator = new SurveyCreator.SurveyCreator(creatorOptions);
      this.creatorInstance = creator;

      creator.text =
        window.localStorage.getItem("survey-json") ||
        JSON.stringify(defaultJson);
      creator.saveSurveyFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-json", creator.text);
        callback(saveNo, true);
      };

      const container = this.template.querySelector(".surveyContainer");

      // Patch SurveyJS's drag-drop system to work with LWS
      if (creator.dragDropSurveyElements) {
        const originalFindDropTargetElement =
          creator.dragDropSurveyElements.findDropTargetElement;
        creator.dragDropSurveyElements.findDropTargetElement = (event) => {
          // Get all elements at the current mouse position
          const elements = document.elementsFromPoint(
            event.clientX,
            event.clientY
          );

          // Log all potential drop targets for debugging
          console.log("=== Potential Drop Targets ===");
          elements.forEach((el) => {
            const attrs = el
              .getAttributeNames()
              .filter((attr) => attr.startsWith("data-sv"));
            if (attrs.length > 0) {
              console.log("Element:", {
                tag: el.tagName,
                class: el.className,
                attributes: attrs.reduce((acc, attr) => {
                  acc[attr] = el.getAttribute(attr);
                  return acc;
                }, {}),
              });
            }
          });

          // Find the first element with any survey drop target attribute
          const dropTarget = elements.find((el) => {
            // Check for all possible drop target attributes
            const hasDropTarget = [
              "data-sv-drop-target-survey-element",
              "data-sv-drop-target-page",
              "data-sv-drop-target-survey-page",
              "data-sv-drop-target-item-value",
            ].some((attr) => el.hasAttribute(attr));

            // Also check if it matches any of the selectors
            const matchesSelector = [
              "[data-sv-drop-target-survey-element]",
              "[data-sv-drop-target-page]",
              "[data-sv-drop-target-survey-page]",
              "[data-sv-drop-target-item-value]",
            ].some((selector) => el.matches(selector));

            return hasDropTarget || matchesSelector;
          });

          if (dropTarget) {
            // Log what we found for debugging
            console.log("Selected drop target:", {
              element: dropTarget.tagName,
              class: dropTarget.className,
              attributes: Object.fromEntries(
                dropTarget
                  .getAttributeNames()
                  .filter((attr) => attr.startsWith("data-sv"))
                  .map((attr) => [attr, dropTarget.getAttribute(attr)])
              ),
              rect: dropTarget.getBoundingClientRect(),
            });

            // If we found a drop target, use SurveyJS's original logic
            return originalFindDropTargetElement.call(
              creator.dragDropSurveyElements,
              {
                ...event,
                target: dropTarget,
              }
            );
          }

          console.log("No valid drop target found");
          return null;
        };

        // Also patch the allowDropHere check
        const originalAllowDropHere =
          creator.dragDropSurveyElements.allowDropHere;
        creator.dragDropSurveyElements.allowDropHere = function (
          draggedElement,
          dropTarget
        ) {
          if (!dropTarget) {
            console.log("Drop rejected: No drop target");
            return false;
          }

          // Get all drop target attributes
          const dropTargetAttrs = dropTarget
            .getAttributeNames()
            .filter((attr) => attr.startsWith("data-sv-drop-target-"))
            .reduce((acc, attr) => {
              acc[attr] = dropTarget.getAttribute(attr);
              return acc;
            }, {});

          console.log("Checking drop allowed:", {
            draggedElement: {
              type: draggedElement?.getType?.(),
              name: draggedElement?.name,
              title: draggedElement?.title,
            },
            dropTarget: {
              tag: dropTarget.tagName,
              class: dropTarget.className,
              attributes: dropTargetAttrs,
            },
          });

          const allowed = originalAllowDropHere.call(
            this,
            draggedElement,
            dropTarget
          );
          console.log("Drop " + (allowed ? "allowed" : "rejected"));
          return allowed;
        };

        // Add diagnostic logging for ghost element
        const originalUpdateGhostPosition =
          creator.dragDropSurveyElements.updateGhostPosition;
        creator.dragDropSurveyElements.updateGhostPosition = function (point) {
          console.log("Ghost position update:", {
            point,
            ghostElement: this.ghostElement
              ? {
                  style: {
                    left: this.ghostElement.style.left,
                    top: this.ghostElement.style.top,
                    position: this.ghostElement.style.position,
                  },
                  rect: this.ghostElement.getBoundingClientRect(),
                }
              : null,
          });
          return originalUpdateGhostPosition.call(this, point);
        };
      }

      creator.render(container);

      // Add diagnostic logging
      creator.onDragStart.add((sender, options) => {
        // Log all elements with survey-related data attributes
        const allElements = container.querySelectorAll("*");
        console.log("=== DOM STRUCTURE DURING DRAG ===");
        allElements.forEach((el) => {
          const attrs = el.getAttributeNames();
          const surveyAttrs = attrs.filter((attr) => attr.includes("data-sv"));
          if (surveyAttrs.length > 0) {
            console.log("Element:", el.tagName, "Class:", el.className);
            surveyAttrs.forEach((attr) => {
              console.log(`  ${attr}:`, el.getAttribute(attr));
            });
          }
        });
      });

      // Make the creator instance available globally for debugging
      window.surveyCreator = creator;

      // Update the event debugger with the creator instance
      setTimeout(() => {
        const debuggerElement = this.template.querySelector(
          "c-survey-js-event-debugger"
        );
        if (debuggerElement) {
          debuggerElement.creator = this.creatorInstance;
        }
      }, 500);

      console.log("SurveyJS Creator initialized");
      this.loaded = true;
    } else {
      console.error("SurveyJS library not loaded.");
    }
  }
}
