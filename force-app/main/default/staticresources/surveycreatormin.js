/*! For license information please see survey-creator-js.min.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(
        require("survey-core"),
        require("survey-creator-core"),
        require("survey-js-ui")
      ))
    : "function" == typeof define && define.amd
    ? define(
        "survey-creator-js",
        ["survey-core", "survey-creator-core", "survey-js-ui"],
        t
      )
    : "object" == typeof exports
    ? (exports["survey-creator-js"] = t(
        require("survey-core"),
        require("survey-creator-core"),
        require("survey-js-ui")
      ))
    : (e.SurveyCreator = t(e.Survey, e.SurveyCreatorCore, e.SurveyUI));
})(this, (e, t, n) =>
  (() => {
    "use strict";
    var o = {
        156: (t) => {
          t.exports = e;
        },
        982: (e) => {
          e.exports = t;
        },
        675: (e) => {
          e.exports = n;
        },
      },
      r = {};
    function i(e) {
      var t = r[e];
      if (void 0 !== t) return t.exports;
      var n = (r[e] = { exports: {} });
      return o[e](n, n.exports, i), n.exports;
    }
    (i.d = (e, t) => {
      for (var n in t)
        i.o(t, n) &&
          !i.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (i.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var a = {};
    i.r(a),
      i.d(a, {
        ActionButton: () => M,
        AdaptiveToolbox: () => je,
        CellQuestionAdornerComponent: () => K,
        CellQuestionDropdownAdornerComponent: () => z,
        CreatorSurveyPageComponent: () => G,
        IPropertyGridEditor: () => l.IPropertyGridEditor,
        ISurveyCreatorOptions: () => l.ISurveyCreatorOptions,
        ImageItemValueAdornerComponent: () => le,
        ItemValueAdornerComponent: () => se,
        LogoImageComponent: () => $,
        MatrixCellAdornerComponent: () => pe,
        PanelAdornerComponent: () => Y,
        PropertyGridComponent: () => vt,
        PropertyGridEditorCollection: () => l.PropertyGridEditorCollection,
        QuestionAdornerComponent: () => N,
        QuestionBanner: () => R,
        QuestionDropdownAdornerComponent: () => D,
        QuestionEditorContentComponent: () => ie,
        QuestionErrorComponent: () => Ve,
        QuestionImageAdornerComponent: () => B,
        QuestionRatingAdornerComponent: () => U,
        QuestionWidgetAdornerComponent: () => V,
        QuestionWrapperFooter: () => q,
        QuestionWrapperHeader: () => x,
        ReactDragEvent: () => O,
        ReactMouseEvent: () => C,
        RowWrapper: () => _,
        SearchComponent: () => Pe,
        SidebarComponent: () => Te,
        StylesManager: () => l.StylesManager,
        SurveyCreator: () => v,
        SurveyCreatorComponent: () => y,
        SurveyCreatorToolboxCategory: () => _e,
        SurveyCreatorToolboxItem: () => ve,
        SurveyCreatorToolboxItemGroup: () => Ee,
        SurveyCreatorToolboxTool: () => ye,
        SurveyElementEmbeddedSurvey: () => oe,
        SurveyLocStringEditor: () => Ue,
        SurveyLogic: () => l.SurveyLogic,
        SurveyLogicOpertor: () => Ke,
        SurveyLogicUI: () => l.SurveyLogicUI,
        SurveyNavigation: () => Ie,
        SurveyQuestionColor: () => Pt,
        SurveyQuestionEditorDefinition: () => l.SurveyQuestionEditorDefinition,
        SurveyQuestionFileEditor: () => jt,
        SurveyQuestionLinkValue: () => te,
        SurveyQuestionSpinEditor: () => Ct,
        SurveyQuestionTextWithReset: () => Mt,
        SurveyResults: () => de,
        SurveyResultsByRow: () => fe,
        SurveySimulator: () => at,
        SwitcherComponent: () => Et,
        TabDesignerComponent: () => Xe,
        TabJsonEditorAceComponent: () => tt,
        TabJsonEditorErrorsComponent: () => Ze,
        TabJsonEditorTextareaComponent: () => $e,
        TabLogicAddButtonComponent: () => ot,
        TabLogicComponent: () => rt,
        TabPreviewSurveyComponent: () => lt,
        TabPreviewTestSurveyAgainComponent: () => ct,
        TabThemeSurveyComponent: () => pt,
        TabTranslationComponent: () => dt,
        TabbedMenuComponent: () => m,
        TabbedMenuItemComponent: () => f,
        Toolbox: () => Ce,
        ToolboxList: () => Se,
        ToolboxToolViewModel: () => l.ToolboxToolViewModel,
        TranslateFromAction: () => Be,
        TranslationLineSkeleton: () => De,
        Version: () => qt,
        editorLocalization: () => l.editorLocalization,
        localization: () => l.localization,
        renderSurveyCreator: () => Ft,
        settings: () => l.settings,
        svgBundle: () => l.svgBundle,
      });
    var s,
      c = i(675),
      l = i(982),
      u = i(156),
      p =
        ((s = function (e, t) {
          return (
            (s =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            s(e, t)
          );
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null"
            );
          function n() {
            this.constructor = e;
          }
          s(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        }),
      m = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootRef = c.createRef()), n;
        }
        return (
          p(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this.model.renderedActions.map(function (e) {
              return c.createElement(d, { item: e, key: e.id });
            });
            return c.createElement(
              "div",
              { ref: this.rootRef, className: "svc-tabbed-menu" },
              e
            );
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this);
            var t = this.rootRef.current;
            t &&
              (this.manager = new u.ResponsivityManager(
                t,
                this.model,
                ".svc-tabbed-menu-item-container:not(.sv-dots)>.sv-action__content"
              ));
          }),
          (t.prototype.componentWillUnmount = function () {
            this.manager && this.manager.dispose(),
              e.prototype.componentWillUnmount.call(this);
          }),
          t
        );
      })(c.SurveyElementBase),
      d = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          p(t, e),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.renderElement = function () {
            var e = "svc-tabbed-menu-item-container";
            this.item.css && (e += " " + this.item.css),
              (e += this.item.isVisible ? "" : " sv-action--hidden");
            var t = c.ReactElementFactory.Instance.createElement(
              this.item.component || "svc-tabbed-menu-item",
              { item: this.item }
            );
            return c.createElement(
              "span",
              { key: this.item.id, className: e },
              c.createElement("div", { className: "sv-action__content" }, t)
            );
          }),
          t
        );
      })(c.SurveyElementBase),
      f = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          p(t, e),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.render = function () {
            var e = this.item,
              t = "svc-tabbed-menu-item";
            e.active && (t += " svc-tabbed-menu-item--selected"),
              void 0 === e.enabled ||
                e.enabled ||
                (t += " svc-tabbed-menu-item--disabled");
            var n = "svc-text svc-tabbed-menu-item__text svc-text--normal";
            return (
              e.active && (n += " svc-text--bold"),
              (0, c.attachKey2click)(
                c.createElement(
                  "div",
                  {
                    className: t,
                    onClick: function () {
                      return e.action(e);
                    },
                  },
                  c.createElement("span", { className: n }, e.title)
                )
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tabbed-menu-item",
      function (e) {
        return c.createElement(f, e);
      }
    );
    var h = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      y = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootNode = c.createRef()), n;
        }
        return (
          h(t, e),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.creator;
          }),
          Object.defineProperty(t.prototype, "style", {
            get: function () {
              return this.props.style;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidUpdate = function (t, n) {
            e.prototype.componentDidUpdate.call(this, t, n),
              this.creator !== t.creator &&
                (t.creator && t.creator.unsubscribeRootElement(),
                this.creator &&
                  this.rootNode.current &&
                  this.creator.setRootElement(this.rootNode.current));
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this),
              this.creator.setRootElement(this.rootNode.current);
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              this.creator.unsubscribeRootElement();
          }),
          (t.prototype.renderElement = function () {
            var e = this.props.creator;
            if (e.isCreatorDisposed) return null;
            var t =
                "svc-creator" +
                (this.props.creator.isMobileView
                  ? " svc-creator--mobile"
                  : "") +
                (this.props.creator.isTouch ? " svc-creator--touch" : ""),
              n =
                "svc-full-container svc-creator__area svc-flex-column",
              o =
                "svc-creator__content-wrapper svc-flex-row" +
                (this.props.creator.isMobileView
                  ? " svc-creator__content-wrapper--footer-toolbar"
                  : ""),
              r =
                "svc-flex-row svc-full-container svc-creator__side-bar--" +
                this.creator.sidebarLocation,
              i = null;
            // if (!this.props.creator.haveCommercialLicense) {
            //   var a = { __html: this.props.creator.licenseText };
            //   i = c.createElement(
            //     "div",
            //     { className: "svc-creator__banner" },
            //     c.createElement("span", {
            //       className: "svc-creator__non-commercial-text",
            //       dangerouslySetInnerHTML: a,
            //     })
            //   );
            // }
            return c.createElement(
              "div",
              { className: t, ref: this.rootNode, style: this.style },
              c.createElement(c.SvgBundleComponent, null),
              c.createElement(
                "div",
                { className: n },
                c.createElement(
                  "div",
                  { className: r },
                  c.createElement(
                    "div",
                    {
                      className:
                        "svc-flex-column svc-flex-row__element svc-flex-row__element--growing",
                    },
                    c.createElement(
                      "div",
                      { className: "svc-top-bar" },
                      e.showTabs
                        ? c.createElement(
                            "div",
                            { className: "svc-tabbed-menu-wrapper" },
                            c.createElement(m, { model: e.tabbedMenu })
                          )
                        : null,
                      e.showToolbar
                        ? c.createElement(
                            "div",
                            { className: "svc-toolbar-wrapper" },
                            c.createElement(c.SurveyActionBar, {
                              model: e.toolbar,
                            })
                          )
                        : null
                    ),
                    c.createElement(
                      "div",
                      { className: o },
                      c.createElement(
                        "div",
                        {
                          className:
                            "svc-creator__content-holder svc-flex-column",
                        },
                        this.renderActiveTab()
                      )
                    ),
                    c.createElement(
                      "div",
                      { className: "svc-footer-bar" },
                      e.isMobileView
                        ? c.createElement(
                            "div",
                            { className: "svc-toolbar-wrapper" },
                            c.createElement(c.SurveyActionBar, {
                              model: e.footerToolbar,
                            })
                          )
                        : null
                    )
                  ),
                  this.renderSidebar()
                ),
                i,
                c.createElement(c.NotifierComponent, { notifier: e.notifier })
              )
            );
          }),
          (t.prototype.renderActiveTab = function () {
            for (var e = this.props.creator, t = 0; t < e.tabs.length; t++)
              if (e.tabs[t].id === e.activeTab)
                return this.renderCreatorTab(e.tabs[t]);
            return null;
          }),
          (t.prototype.renderCreatorTab = function (e) {
            if (!1 === e.visible) return null;
            var t = this.props.creator,
              n = e.renderTab
                ? e.renderTab()
                : c.ReactElementFactory.Instance.createElement(
                    e.componentContent,
                    { creator: t, survey: t.survey, data: e.data.model }
                  ),
              o =
                "svc-creator-tab" +
                ("right" == t.toolboxLocation
                  ? " svc-creator__toolbox--right"
                  : "");
            return c.createElement(
              "div",
              { key: e.id, id: "scrollableDiv-" + e.id, className: o },
              n
            );
          }),
          (t.prototype.renderSidebar = function () {
            if (this.creator.sidebar) {
              var e = this.creator.isMobileView ? "sv-mobile-side-bar" : "";
              return c.createElement(
                "div",
                { className: e },
                c.ReactElementFactory.Instance.createElement("svc-side-bar", {
                  model: this.creator.sidebar,
                })
              );
            }
            return null;
          }),
          t
        );
      })(c.SurveyElementBase),
      v = (function (e) {
        function t(t, n) {
          return void 0 === t && (t = {}), e.call(this, t, n) || this;
        }
        return (
          h(t, e),
          (t.prototype.render = function (e) {
            var t = e;
            "string" == typeof e && (t = document.getElementById(e)),
              c.unmountComponentAtNode(t),
              c.render(
                c.createElement(
                  c.StrictMode,
                  null,
                  c.createElement(y, { creator: this })
                ),
                t
              );
          }),
          (t.prototype.createQuestionElement = function (e) {
            return c.ReactQuestionFactory.Instance.createQuestion(
              e.isDefaultRendering() ? e.getTemplate() : e.getComponentName(),
              { question: e, isDisplayMode: e.isReadOnly, creator: this }
            );
          }),
          (t.prototype.renderError = function (e, t, n) {
            return c.createElement(
              "div",
              { key: e },
              c.createElement("span", {
                className: n.error.icon,
                "aria-hidden": "true",
              }),
              c.createElement(
                "span",
                { className: n.error.item },
                c.createElement(c.SurveyLocStringViewer, { locStr: t.locText })
              )
            );
          }),
          (t.prototype.questionTitleLocation = function () {
            return this.survey.questionTitleLocation;
          }),
          (t.prototype.questionErrorLocation = function () {
            return this.survey.questionErrorLocation;
          }),
          t
        );
      })(l.SurveyCreatorModel);
    c.ReactElementFactory.Instance.registerElement(
      "survey-widget",
      function (e) {
        return c.createElement(c.Survey, e);
      }
    );
    var g = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      E = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return n.createModel(t), n;
        }
        return (
          g(t, e),
          (t.prototype.shouldComponentUpdate = function (t, n) {
            var o = e.prototype.shouldComponentUpdate.call(this, t, n);
            return o && this.needUpdateModel(t) && this.createModel(t), o;
          }),
          (t.prototype.createModel = function (e) {}),
          (t.prototype.needUpdateModel = function (e) {
            var t = this.getUpdatedModelProps();
            if (!Array.isArray(t)) return !0;
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              if (this.props[o] !== e[o]) return !0;
            }
            return !1;
          }),
          (t.prototype.getUpdatedModelProps = function () {}),
          t
        );
      })(c.SurveyElementBase),
      b = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      _ = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          b(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.RowViewModel(
              e.componentData.creator,
              e.row,
              null
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["row", "componentData"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            return c.createElement(
              "div",
              {
                key: "svc-row-" + this.props.row.id,
                className: this.model.cssClasses,
              },
              this.props.element
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement("svc-row", function (e) {
      return c.createElement(_, e);
    });
    var w = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      C = (function () {
        function e(e) {
          this.event = e;
        }
        return (
          (e.prototype.stopPropagation = function () {
            this.event.stopPropagation();
          }),
          (e.prototype.preventDefault = function () {
            this.event.preventDefault();
          }),
          Object.defineProperty(e.prototype, "cancelBubble", {
            get: function () {
              return !1;
            },
            set: function (e) {},
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "target", {
            get: function () {
              return this.event.target;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "currentTarget", {
            get: function () {
              return this.event.currentTarget;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "clientX", {
            get: function () {
              return this.event.clientX;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "clientY", {
            get: function () {
              return this.event.clientY;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "offsetX", {
            get: function () {
              return this.event.nativeEvent.offsetX;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "offsetY", {
            get: function () {
              return this.event.nativeEvent.offsetY;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })(),
      O = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.event = t), n;
        }
        return (
          w(t, e),
          Object.defineProperty(t.prototype, "dataTransfer", {
            get: function () {
              return this.event.dataTransfer;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })(C),
      S = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      N = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          S(t, e),
          (t.prototype.createModel = function (e) {
            this.modelValue && this.modelValue.dispose(),
              (this.modelValue = this.createQuestionViewModel(e));
          }),
          (t.prototype.createQuestionViewModel = function (e) {
            return new l.QuestionAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "componentData"];
          }),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.modelValue;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.canRender = function () {
            return e.prototype.canRender.call(this) && !this.model.isDragged;
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = this.model.element.isInteractiveDesignElement,
              n = this.renderContent(t);
            return c.createElement(
              "div",
              {
                ref: this.rootRef,
                "data-sv-drop-target-survey-element":
                  this.model.element.name || null,
                className: "svc-question__adorner " + this.model.rootCss(),
                onDoubleClick: function (n) {
                  t && e.model.dblclick(n.nativeEvent), n.stopPropagation();
                },
                onMouseOut: function (n) {
                  return t && e.model.hover(n.nativeEvent, n.currentTarget);
                },
                onMouseOver: function (n) {
                  return t && e.model.hover(n.nativeEvent, n.currentTarget);
                },
              },
              n
            );
          }),
          (t.prototype.disableTabStop = function () {
            return !0;
          }),
          (t.prototype.renderContent = function (e) {
            var t = this,
              n = this.renderElementContent();
            return (0, c.attachKey2click)(
              c.createElement(
                "div",
                {
                  className: this.model.css(),
                  onClick: function (e) {
                    return t.model.select(t.model, new C(e));
                  },
                },
                e ? this.renderHeader() : null,
                n,
                this.renderFooter()
              ),
              void 0,
              { disableTabStop: this.disableTabStop() }
            );
          }),
          (t.prototype.renderHeader = function () {
            return c.ReactElementFactory.Instance.createElement(
              "svc-question-header",
              { model: this.model }
            );
          }),
          (t.prototype.renderFooter = function () {
            return this.model.element.isInteractiveDesignElement
              ? c.ReactElementFactory.Instance.createElement(
                  "svc-question-footer",
                  {
                    className: "svc-question__content-actions",
                    model: this.model,
                  }
                )
              : null;
          }),
          (t.prototype.renderCarryForwardBanner = function () {
            return this.model.isBannerShowing
              ? c.ReactElementFactory.Instance.createElement(
                  "svc-question-banner",
                  this.model.createBannerParams()
                )
              : null;
          }),
          (t.prototype.renderElementContent = function () {
            return c.createElement(
              c.Fragment,
              null,
              this.props.element,
              this.renderElementPlaceholder(),
              this.renderCarryForwardBanner()
            );
          }),
          (t.prototype.renderElementPlaceholder = function () {
            return this.model.isEmptyElement
              ? c.createElement(
                  "div",
                  { className: "svc-panel__placeholder_frame-wrapper" },
                  c.createElement(
                    "div",
                    { className: "svc-panel__placeholder_frame" },
                    c.createElement(
                      "div",
                      { className: "svc-panel__placeholder" },
                      this.model.placeholderText
                    )
                  )
                )
              : null;
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question",
      function (e) {
        return c.createElement(N, e);
      }
    );
    var P = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      x = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          P(t, e),
          (t.prototype.render = function () {
            var e = this;
            return this.props.model.allowDragging
              ? c.createElement(
                  "div",
                  {
                    className: "svc-question__drag-area",
                    onPointerDown: function (t) {
                      return e.props.model.onPointerDown(t);
                    },
                  },
                  c.createElement(c.SvgIcon, {
                    className: "svc-question__drag-element",
                    size: 24,
                    iconName: "icon-drag-area-indicator_24x16",
                  }),
                  c.createElement(
                    "div",
                    { className: "svc-question__top-actions" },
                    c.createElement(c.SurveyActionBar, {
                      model: this.props.model.topActionContainer,
                      handleClick: !1,
                    })
                  )
                )
              : null;
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question-header",
      function (e) {
        return c.createElement(x, e);
      }
    );
    var j = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      q = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          j(t, e),
          (t.prototype.render = function () {
            var e = this;
            return c.createElement(
              "div",
              {
                className: this.props.className,
                onFocus: function (t) {
                  return e.props.model.select(e.props.model, new C(t));
                },
              },
              c.createElement(c.SurveyActionBar, {
                model: this.props.model.actionContainer,
                handleClick: !1,
              })
            );
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question-footer",
      function (e) {
        return c.createElement(q, e);
      }
    );
    var I = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      M = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          I(t, e),
          (t.prototype.renderElement = function () {
            var e = this,
              t = this.props.classes + " svc-action-button";
            return (
              this.props.selected && (t += " svc-action-button--selected"),
              this.props.disabled
                ? ((t += " svc-action-button--disabled"),
                  c.createElement("span", { className: t }, this.props.text))
                : c.createElement(
                    c.Fragment,
                    null,
                    (0, c.attachKey2click)(
                      c.createElement(
                        "span",
                        {
                          role: "button",
                          className: t,
                          onClick: function (t) {
                            e.props.allowBubble || t.stopPropagation(),
                              e.props.click();
                          },
                          title: this.props.title,
                        },
                        this.props.text
                      )
                    )
                  )
            );
          }),
          t
        );
      })(c.SurveyElementBase),
      T = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      R = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          T(t, e),
          (t.prototype.render = function () {
            var e = this;
            return c.createElement(
              "div",
              { className: "svc-carry-forward-panel-wrapper" },
              c.createElement(
                "div",
                { className: "svc-carry-forward-panel" },
                c.createElement("span", null, this.props.text, " "),
                c.createElement(
                  "span",
                  { className: "svc-carry-forward-panel__link" },
                  c.createElement(M, {
                    click: function () {
                      return e.props.onClick();
                    },
                    text: this.props.actionText,
                  })
                )
              )
            );
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question-banner",
      function (e) {
        return c.createElement(R, e);
      }
    );
    var F = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      D = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          F(t, e),
          (t.prototype.createQuestionViewModel = function (e) {
            return new l.QuestionDropdownAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          Object.defineProperty(t.prototype, "dropdownModel", {
            get: function () {
              return this.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.dropdownModel.question;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderElementPlaceholder = function () {
            var e = this,
              t = this.question.textStyle;
            return c.createElement(
              "div",
              { className: "svc-question__dropdown-choices--wrapper" },
              c.createElement(
                "div",
                null,
                c.createElement(
                  "div",
                  { className: "svc-question__dropdown-choices" },
                  (this.dropdownModel.getRenderedItems() || []).map(function (
                    n,
                    o
                  ) {
                    return c.createElement(
                      "div",
                      {
                        className: e.dropdownModel.getChoiceCss(),
                        key: "editable_choice_".concat(o),
                      },
                      c.ReactSurveyElementsWrapper.wrapItemValue(
                        e.question.survey,
                        c.ReactElementFactory.Instance.createElement(
                          e.dropdownModel.itemComponent,
                          {
                            key: n.value,
                            question: e.question,
                            cssClasses: e.question.cssClasses,
                            isDisplayMode: !0,
                            item: n,
                            textStyle: t,
                            index: o,
                            isChecked: e.question.value === n.value,
                          }
                        ),
                        e.question,
                        n
                      )
                    );
                  })
                ),
                this.dropdownModel.needToCollapse
                  ? c.createElement(M, {
                      click: this.dropdownModel.switchCollapse,
                      text: this.dropdownModel.getButtonText(),
                      allowBubble: !0,
                    })
                  : null
              )
            );
          }),
          t
        );
      })(N);
    c.ReactElementFactory.Instance.registerElement(
      "svc-dropdown-question",
      function (e) {
        return c.createElement(D, e);
      }
    );
    var k = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      B = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootRef = c.createRef()), n;
        }
        return (
          k(t, e),
          (t.prototype.createQuestionViewModel = function (e) {
            return new l.QuestionImageAdornerViewModel(
              e.componentData,
              e.question,
              null,
              null
            );
          }),
          Object.defineProperty(t.prototype, "imageModel", {
            get: function () {
              return this.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this),
              (this.imageModel.questionRoot = this.rootRef.current);
          }),
          (t.prototype.renderHeader = function () {
            return c.createElement(
              c.Fragment,
              null,
              c.createElement("input", {
                type: "file",
                "aria-hidden": "true",
                tabIndex: -1,
                accept: this.imageModel.acceptedTypes,
                className: "svc-choose-file-input",
                style: {
                  position: "absolute",
                  opacity: 0,
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                },
              }),
              e.prototype.renderHeader.call(this)
            );
          }),
          (t.prototype.renderLoadingPlaceholder = function () {
            return c.createElement(
              "div",
              { className: "svc-image-question__loading-placeholder" },
              c.createElement(
                "div",
                { className: "svc-image-question__loading" },
                c.createElement(c.LoadingIndicatorComponent, null)
              )
            );
          }),
          (t.prototype.renderChooseButton = function () {
            var e = this;
            return c.createElement(
              "div",
              { className: "svc-image-question-controls" },
              this.model.allowEdit
                ? (0, c.attachKey2click)(
                    c.createElement(
                      "span",
                      {
                        className: "svc-context-button",
                        onClick: function () {
                          return e.imageModel.chooseFile(e.imageModel);
                        },
                      },
                      c.createElement(c.SvgIcon, {
                        size: 24,
                        iconName: "icon-file",
                      })
                    )
                  )
                : null
            );
          }),
          (t.prototype.renderElementPlaceholder = function () {
            return this.imageModel.isUploading
              ? this.renderLoadingPlaceholder()
              : this.renderChooseButton();
          }),
          (t.prototype.getStateElements = function () {
            return [this.model, this.imageModel.filePresentationModel];
          }),
          (t.prototype.renderElementContent = function () {
            return this.imageModel.isEmptyImageLink
              ? c.ReactQuestionFactory.Instance.createQuestion("file", {
                  creator: this.imageModel.question.survey,
                  isDisplayMode: !1,
                  question: this.imageModel.filePresentationModel,
                })
              : c.createElement(
                  c.Fragment,
                  null,
                  this.props.element,
                  this.renderElementPlaceholder()
                );
          }),
          t
        );
      })(N);
    c.ReactElementFactory.Instance.registerElement(
      "svc-image-question",
      function (e) {
        return c.createElement(B, e);
      }
    );
    var A = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      U = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          A(t, e),
          (t.prototype.createModel = function (e) {
            this.modelValue = this.createQuestionViewModel(e);
          }),
          (t.prototype.createQuestionViewModel = function (e) {
            return new l.QuestionRatingAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "componentData"];
          }),
          Object.defineProperty(t.prototype, "ratingModel", {
            get: function () {
              return this.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.modelValue;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this.ratingModel;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(
                "div",
                { className: "svc-rating-question-content" },
                c.createElement(
                  "div",
                  { className: e.controlsClassNames },
                  e.allowRemove
                    ? (0, c.attachKey2click)(
                        c.createElement(
                          "span",
                          {
                            className: e.removeClassNames,
                            "aria-label": e.removeTooltip,
                            onClick: function () {
                              return e.removeItem(e);
                            },
                          },
                          c.createElement(c.SvgIcon, {
                            size: 16,
                            iconName: "icon-remove_16x16",
                            title: e.removeTooltip,
                          })
                        )
                      )
                    : null,
                  e.allowAdd
                    ? (0, c.attachKey2click)(
                        c.createElement(
                          "span",
                          {
                            className: e.addClassNames,
                            "aria-label": e.addTooltip,
                            onClick: function () {
                              return e.addItem(e);
                            },
                          },
                          c.createElement(c.SvgIcon, {
                            size: 16,
                            iconName: "icon-add_16x16",
                            title: e.addTooltip,
                          })
                        )
                      )
                    : null
                ),
                this.props.element
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-rating-question",
      function (e) {
        return c.createElement(U, e);
      }
    ),
      c.ReactElementFactory.Instance.registerElement(
        "svc-rating-question-content",
        function (e) {
          return c.createElement(U, e);
        }
      );
    var Q = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      V = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Q(t, e),
          (t.prototype.createQuestionViewModel = function (e) {
            return new l.QuestionAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          Object.defineProperty(t.prototype, "widgetModel", {
            get: function () {
              return this.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderElementContent = function () {
            return c.createElement(
              "div",
              { className: "svc-widget__content" },
              this.props.element
            );
          }),
          t
        );
      })(N);
    c.ReactElementFactory.Instance.registerElement(
      "svc-widget-question",
      function (e) {
        return c.createElement(V, e);
      }
    );
    var L = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      K = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          L(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.QuestionAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "componentData"];
          }),
          (t.prototype.render = function () {
            return this.model.isDragged
              ? null
              : c.createElement(
                  c.Fragment,
                  null,
                  c.createElement(
                    "div",
                    {
                      "data-sv-drop-target-survey-element":
                        this.model.element.name,
                      className: "svc-question__adorner",
                    },
                    c.createElement(
                      "div",
                      {
                        className:
                          " svc-question__content--in-popup svc-question__content",
                      },
                      this.props.element
                    )
                  )
                );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-cell-question",
      function (e) {
        return c.createElement(K, e);
      }
    );
    var H = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      z = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          H(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.QuestionAdornerViewModel(
              e.componentData,
              e.question,
              null
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "componentData"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            if (this.model.isDragged) return null;
            var e = this.props.question,
              t = this.props.question.textStyle;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(
                "div",
                {
                  "data-sv-drop-target-survey-element": this.model.element.name,
                  className: "svc-question__adorner",
                },
                c.createElement(
                  "div",
                  {
                    className:
                      " svc-question__content--in-popup svc-question__content",
                  },
                  this.props.element,
                  c.createElement(
                    "div",
                    { className: "svc-question__dropdown-choices" },
                    e.visibleChoices.map(function (n, o) {
                      return c.createElement(
                        "div",
                        {
                          className: "svc-question__dropdown-choice",
                          key: "editable_choice_".concat(o),
                        },
                        c.ReactSurveyElementsWrapper.wrapItemValue(
                          e.survey,
                          c.ReactElementFactory.Instance.createElement(
                            "survey-radiogroup-item",
                            {
                              question: e,
                              cssClasses: e.cssClasses,
                              isDisplayMode: !0,
                              item: n,
                              textStyle: t,
                              index: o,
                              isChecked: e.value === n.value,
                            }
                          ),
                          e,
                          n
                        )
                      );
                    })
                  )
                )
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-cell-dropdown-question",
      function (e) {
        return c.createElement(z, e);
      }
    );
    var W = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      G = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootRef = c.createRef()), n;
        }
        return (
          W(t, e),
          (t.prototype.createModel = function (e) {
            this.model && this.model.dispose(),
              (this.model = new l.PageAdorner(e.creator, e.page));
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["creator", "page"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.componentDidMount = function () {
            var t = this;
            e.prototype.componentDidMount.call(this),
              (this.model.onPageSelectedCallback = function () {
                t.rootRef.current &&
                  l.SurveyHelper.scrollIntoViewIfNeeded(t.rootRef.current);
              });
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              (this.model.onPageSelectedCallback = void 0);
          }),
          (t.prototype.canRender = function () {
            return (
              !!this.model &&
              this.model.isPageLive &&
              !!this.model.page &&
              !!this.model.page.survey
            );
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return this.props.page
              ? (0, c.attachKey2click)(
                  c.createElement(
                    "div",
                    {
                      ref: this.rootRef,
                      className: "svc-page__content " + this.model.css,
                      id: this.props.page.id,
                      onClick: function (t) {
                        return e.model.select(e.model, new C(t));
                      },
                      onDoubleClick: function (t) {
                        return e.model.dblclick(t.nativeEvent);
                      },
                      onMouseLeave: function (t) {
                        return e.model.hover(t.nativeEvent, t.currentTarget);
                      },
                      onMouseOver: function (t) {
                        return e.model.hover(t.nativeEvent, t.currentTarget);
                      },
                    },
                    this.renderHeader(),
                    this.renderContent(),
                    this.renderPlaceholder(),
                    this.renderFooter()
                  )
                )
              : null;
          }),
          (t.prototype.renderPlaceholder = function () {
            return this.model.showPlaceholder
              ? c.createElement(
                  "div",
                  { className: "svc-page__placeholder_frame" },
                  c.createElement(
                    "div",
                    { className: "svc-panel__placeholder_frame" },
                    c.createElement(
                      "div",
                      { className: "svc-panel__placeholder" },
                      this.model.placeholderText
                    )
                  )
                )
              : null;
          }),
          (t.prototype.renderContent = function () {
            return c.createElement(c.SurveyPage, {
              page: this.props.page,
              survey: this.props.survey,
              creator: this.props.creator,
              css: this.model.css,
            });
          }),
          (t.prototype.renderHeader = function () {
            return c.createElement(
              "div",
              { className: "svc-page__content-actions" },
              c.createElement(c.SurveyActionBar, {
                model: this.model.actionContainer,
              })
            );
          }),
          (t.prototype.renderFooter = function () {
            return c.createElement(c.SurveyActionBar, {
              model: this.model.footerActionsBar,
            });
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement("svc-page", function (e) {
      return c.createElement(G, e);
    });
    var J = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        W(t, e),
        Object.defineProperty(t.prototype, "model", {
          get: function () {
            return this.props.item.data;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.renderElement = function () {
          var e = this,
            t = this.model.questionTypeSelectorModel;
          return (0, c.attachKey2click)(
            c.createElement(
              "div",
              {
                className: "svc-page__add-new-question svc-btn",
                onClick: function (t) {
                  t.stopPropagation(),
                    e.model.addNewQuestion(e.model, new C(t));
                },
                onMouseOver: function (t) {
                  return e.model.hoverStopper(t.nativeEvent, t.currentTarget);
                },
              },
              c.createElement(
                "span",
                { className: "svc-text svc-text--normal svc-text--bold" },
                this.model.addNewQuestionText
              ),
              (0, c.attachKey2click)(
                c.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: function (e) {
                      e.stopPropagation(), t.action();
                    },
                    className: "svc-page__question-type-selector",
                    title: this.model.addNewQuestionText,
                  },
                  c.createElement(
                    "span",
                    { className: "svc-page__question-type-selector-icon" },
                    c.createElement(c.SvgIcon, {
                      iconName: t.iconName,
                      size: 24,
                      title: this.model.addNewQuestionText,
                    })
                  ),
                  c.createElement(c.Popup, { model: t.popupModel })
                )
              )
            )
          );
        }),
        t
      );
    })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-add-new-question-btn",
      function (e) {
        return c.createElement(J, e);
      }
    );
    var X = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Y = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          X(t, e),
          (t.prototype.renderElementPlaceholder = function () {
            var e = this;
            return this.model.isEmptyElement
              ? c.createElement(
                  "div",
                  { className: "svc-panel__placeholder_frame-wrapper" },
                  c.createElement(
                    "div",
                    { className: "svc-panel__placeholder_frame" },
                    c.createElement(
                      "div",
                      { className: "svc-panel__placeholder" },
                      this.model.placeholderText
                    ),
                    this.model.showAddQuestionButton
                      ? (0, c.attachKey2click)(
                          c.createElement(
                            "div",
                            {
                              className:
                                "svc-panel__add-new-question svc-action-button",
                              onClick: function (t) {
                                t.stopPropagation(), e.model.addNewQuestion();
                              },
                            },
                            c.createElement(c.SvgIcon, {
                              className: "svc-panel__add-new-question-icon",
                              iconName: "icon-add_24x24",
                              size: 24,
                            }),
                            c.createElement(
                              "span",
                              {
                                className:
                                  "svc-text svc-text--normal svc-text--bold",
                              },
                              this.model.addNewQuestionText
                            )
                          )
                        )
                      : null
                  )
                )
              : null;
          }),
          (t.prototype.disableTabStop = function () {
            return !0;
          }),
          (t.prototype.renderFooter = function () {
            var t = this;
            return c.createElement(
              c.Fragment,
              null,
              !this.model.isEmptyElement &&
                this.model.element.isPanel &&
                this.model.showAddQuestionButton
                ? c.createElement(
                    "div",
                    { className: "svc-panel__add-new-question-container" },
                    c.createElement(
                      "div",
                      { className: "svc-panel__question-type-selector-popup" },
                      c.createElement(c.Popup, {
                        model: this.model.questionTypeSelectorModel.popupModel,
                      })
                    ),
                    c.createElement(
                      "div",
                      { className: "svc-panel__add-new-question-wrapper" },
                      (0, c.attachKey2click)(
                        c.createElement(
                          "div",
                          {
                            className:
                              "svc-panel__add-new-question svc-action-button",
                            onClick: function (e) {
                              e.stopPropagation(), t.model.addNewQuestion();
                            },
                          },
                          c.createElement(c.SvgIcon, {
                            className: "svc-panel__add-new-question-icon",
                            iconName: "icon-add_24x24",
                            size: 24,
                          }),
                          c.createElement(
                            "span",
                            {
                              className:
                                "svc-text svc-text--normal svc-text--bold",
                            },
                            this.model.addNewQuestionText
                          )
                        ),
                        void 0
                      ),
                      (0, c.attachKey2click)(
                        c.createElement(
                          "button",
                          {
                            type: "button",
                            onClick: function (e) {
                              e.stopPropagation(),
                                t.model.questionTypeSelectorModel.action();
                            },
                            className: "svc-panel__question-type-selector",
                            title: this.model.addNewQuestionText,
                          },
                          c.createElement(
                            "span",
                            {
                              className:
                                "svc-panel__question-type-selector-icon",
                            },
                            c.createElement(c.SvgIcon, {
                              iconName:
                                this.model.questionTypeSelectorModel.iconName,
                              size: 24,
                            })
                          )
                        )
                      )
                    )
                  )
                : null,
              e.prototype.renderFooter.call(this)
            );
          }),
          t
        );
      })(N);
    c.ReactElementFactory.Instance.registerElement("svc-panel", function (e) {
      return c.createElement(Y, e);
    });
    var Z = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      $ = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootRef = c.createRef()), n;
        }
        return (
          Z(t, e),
          (t.prototype.createModel = function (e) {
            var t = null;
            this.model && (t = this.model.root),
              (this.model = new l.LogoImageViewModel(e.data, t));
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["data"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this),
              (this.model.root = this.rootRef.current);
          }),
          (t.prototype.renderChooseButton = function () {
            var e = this;
            return (0, c.attachKey2click)(
              c.createElement(
                "span",
                {
                  className: "svc-context-button",
                  onClick: function () {
                    return e.model.chooseFile(e.model);
                  },
                },
                c.createElement(c.SvgIcon, { size: 24, iconName: "icon-file" })
              )
            );
          }),
          (t.prototype.renderClearButton = function () {
            var e = this;
            return (0, c.attachKey2click)(
              c.createElement(
                "span",
                {
                  className: "svc-context-button svc-context-button--danger",
                  onClick: function () {
                    return e.model.remove(e.model);
                  },
                },
                c.createElement(c.SvgIcon, { size: 24, iconName: "icon-clear" })
              )
            );
          }),
          (t.prototype.renderButtons = function () {
            return c.createElement(
              "div",
              { className: "svc-context-container svc-logo-image-controls" },
              this.renderChooseButton(),
              this.renderClearButton()
            );
          }),
          (t.prototype.renderImage = function () {
            return c.createElement(
              "div",
              { className: this.model.containerCss },
              this.renderButtons(),
              c.createElement(c.LogoImage, { data: this.props.data.survey })
            );
          }),
          (t.prototype.renderPlaceHolder = function () {
            var e = this;
            return this.model.allowEdit && !this.model.isUploading
              ? (0, c.attachKey2click)(
                  c.createElement(
                    "div",
                    {
                      className: "svc-logo-image-placeholder",
                      onClick: function () {
                        return e.model.chooseFile(e.model);
                      },
                    },
                    c.createElement(
                      "svg",
                      null,
                      c.createElement("use", { xlinkHref: "#icon-logo" })
                    )
                  )
                )
              : null;
          }),
          (t.prototype.renderInput = function () {
            return c.createElement("input", {
              "aria-hidden": "true",
              type: "file",
              tabIndex: -1,
              accept: this.model.acceptedTypes,
              className: "svc-choose-file-input",
            });
          }),
          (t.prototype.renderLoadingIndicator = function () {
            return c.createElement(
              "div",
              { className: "svc-logo-image__loading" },
              c.createElement(c.LoadingIndicatorComponent, null)
            );
          }),
          (t.prototype.render = function () {
            var e;
            return (
              (e =
                this.model.survey.locLogo.renderedHtml &&
                !this.model.isUploading
                  ? this.renderImage()
                  : this.model.isUploading
                  ? this.renderLoadingIndicator()
                  : this.renderPlaceHolder()),
              c.createElement(
                "div",
                { ref: this.rootRef, className: "svc-logo-image" },
                this.renderInput(),
                e
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-logo-image",
      function (e) {
        return c.createElement($, e);
      }
    );
    var ee = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      te = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ee(t, e),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.questionBase;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderClear = function () {
            var e = this,
              t = this.questionBase.showClear;
            return !this.questionBase.isReadOnly && t
              ? c.createElement(M, {
                  classes: this.question.linkClearButtonCssClasses,
                  click: function () {
                    return e.question.doClearClick();
                  },
                  selected: this.question.isSelected,
                  text: l.editorLocalization.getString("pe.clear"),
                })
              : null;
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(M, {
                classes: this.question.linkSetButtonCssClasses,
                click: function () {
                  return e.question.doLinkClick();
                },
                selected: this.question.isSelected,
                disabled: !this.question.isClickable,
                text: this.question.linkValueText,
                title: this.question.tooltip,
              }),
              this.renderClear()
            );
          }),
          t
        );
      })(c.SurveyQuestionElementBase);
    c.ReactQuestionFactory.Instance.registerQuestion("linkvalue", function (e) {
      return c.createElement(te, e);
    });
    var ne = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      oe = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ne(t, e),
          Object.defineProperty(t.prototype, "embeddedSurvey", {
            get: function () {
              return this.props.element || this.props.question;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.render = function () {
            if (!this.embeddedSurvey) return null;
            var e = this.embeddedSurvey.embeddedSurvey;
            return e && e.currentPage
              ? c.createElement(c.SurveyPage, {
                  survey: e,
                  page: e.currentPage,
                  css: e.css,
                  creator: this.creator,
                })
              : null;
          }),
          t
        );
      })(c.SurveyQuestionElementBase);
    c.ReactQuestionFactory.Instance.registerQuestion(
      "embeddedsurvey",
      function (e) {
        return c.createElement(oe, e);
      }
    );
    var re = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ie = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          re(t, e),
          Object.defineProperty(t.prototype, "survey", {
            get: function () {
              return this.props.survey;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.createQuestionElement = function (e) {
            return c.ReactQuestionFactory.Instance.createQuestion(
              !e.isDefaultRendering || e.isDefaultRendering()
                ? e.getTemplate()
                : e.getComponentName(),
              { question: e, isDisplayMode: e.isInputReadOnly, creator: this }
            );
          }),
          (t.prototype.questionTitleLocation = function () {
            return this.survey.questionTitleLocation;
          }),
          (t.prototype.questionErrorLocation = function () {
            return this.survey.questionErrorLocation;
          }),
          (t.prototype.renderError = function (e, t, n) {
            return null;
          }),
          (t.prototype.render = function () {
            var e = this.survey.getAllQuestions()[0];
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(c.SurveyQuestion, { creator: this, element: e })
            );
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question-editor-content",
      function (e) {
        return c.createElement(ie, e);
      }
    );
    var ae = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      se = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return (
            (t.onBlur = function (e) {
              t.model.onFocusOut(e.nativeEvent);
            }),
            t
          );
        }
        return (
          ae(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.ItemValueWrapperViewModel(
              e.componentData.creator,
              e.question,
              e.item
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "item"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            var e = this;
            this.model.item = this.props.item;
            var t = this.model.allowAdd
                ? (0, c.attachKey2click)(
                    c.createElement(
                      "span",
                      {
                        className:
                          "svc-item-value-controls__button svc-item-value-controls__add",
                        "aria-label": this.model.tooltip,
                        onClick: function () {
                          e.model.add(e.model), (e.model.isNew = !1);
                        },
                      },
                      c.createElement(c.SvgIcon, {
                        size: 16,
                        iconName: "icon-add_16x16",
                        title: this.model.tooltip,
                      })
                    )
                  )
                : c.createElement(
                    c.Fragment,
                    null,
                    " ",
                    this.model.isDraggable
                      ? c.createElement(
                          "span",
                          {
                            className:
                              "svc-item-value-controls__button svc-item-value-controls__drag",
                          },
                          c.createElement(c.SvgIcon, {
                            className: "svc-item-value-controls__drag-icon",
                            size: 24,
                            iconName: "icon-drag-area-indicator",
                            title: this.model.dragTooltip,
                          })
                        )
                      : null,
                    this.model.allowRemove
                      ? (0, c.attachKey2click)(
                          c.createElement(
                            "span",
                            {
                              className:
                                "svc-item-value-controls__button svc-item-value-controls__remove",
                              "aria-label": this.model.tooltip,
                              onClick: function () {
                                return e.model.remove(e.model);
                              },
                            },
                            c.createElement(c.SvgIcon, {
                              size: 16,
                              iconName: "icon-remove_16x16",
                              title: this.model.tooltip,
                            })
                          )
                        )
                      : null
                  ),
              n = this.props.element.key + (this.model.allowAdd ? "_new" : "");
            return c.createElement(
              "div",
              {
                className:
                  "svc-item-value-wrapper" +
                  (this.model.allowAdd ? " svc-item-value--new" : "") +
                  (this.model.isDragging ? " svc-item-value--dragging" : "") +
                  (this.model.isDragDropGhost ? " svc-item-value--ghost" : "") +
                  (this.model.isDragDropMoveDown
                    ? " svc-item-value--movedown"
                    : "") +
                  (this.model.isDragDropMoveUp
                    ? " svc-item-value--moveup"
                    : ""),
                key: n,
                "data-sv-drop-target-item-value": this.model.isDraggable
                  ? this.model.item.value
                  : void 0,
                onPointerDown: function (t) {
                  return e.model.onPointerDown(t);
                },
              },
              c.createElement("div", { className: "svc-item-value__ghost" }),
              c.createElement(
                "div",
                { className: "svc-item-value-controls", onBlur: this.onBlur },
                t
              ),
              c.createElement(
                "div",
                {
                  className: "svc-item-value__item",
                  onClick: function (t) {
                    return e.model.select(e.model, t.nativeEvent);
                  },
                },
                this.props.element
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-item-value",
      function (e) {
        return c.createElement(se, e);
      }
    );
    var ce = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      le = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (
            (n.preventDragHandler = function (e) {
              e.preventDefault();
            }),
            (n.rootRef = c.createRef()),
            n
          );
        }
        return (
          ce(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.ImageItemValueWrapperViewModel(
              e.componentData.creator,
              e.question,
              e.item,
              null,
              null
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["question", "item"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.props.question;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this),
              (this.model.itemsRoot = this.rootRef.current);
          }),
          (t.prototype.componentDidUpdate = function (t, n) {
            e.prototype.componentDidUpdate.call(this, t, n),
              (this.model.itemsRoot = this.rootRef.current);
          }),
          (t.prototype.renderLoadingIndicator = function () {
            return c.createElement(
              "div",
              { className: "svc-image-item-value__loading" },
              c.createElement(c.LoadingIndicatorComponent, null)
            );
          }),
          (t.prototype.render = function () {
            var e = this;
            this.model.item = this.props.item;
            var t = !this.props.question.isItemInList(this.props.item);
            this.model.isNew = t;
            var n,
              o = this.model.getIsNewItemSingle()
                ? null
                : {
                    width: this.question.renderedImageWidth,
                    height: this.question.renderedImageHeight,
                  };
            return (
              (n =
                t || this.model.isUploading
                  ? c.createElement(
                      c.Fragment,
                      null,
                      c.createElement(
                        "div",
                        {
                          className: "svc-image-item-value__item",
                          onDrop: this.model.onDrop,
                          onDragOver: this.model.onDragOver,
                          onDragLeave: this.model.onDragLeave,
                        },
                        c.createElement(
                          "div",
                          {
                            className:
                              "sd-imagepicker__item sd-imagepicker__item--inline",
                          },
                          c.createElement(
                            "label",
                            { className: "sd-imagepicker__label" },
                            c.createElement(
                              "div",
                              { style: o, className: "sd-imagepicker__image" },
                              this.model.isUploading
                                ? this.renderLoadingIndicator()
                                : null
                            )
                          )
                        )
                      ),
                      c.createElement(
                        "div",
                        { className: "svc-image-item-value-controls" },
                        this.model.allowAdd && !this.model.isUploading
                          ? (0, c.attachKey2click)(
                              c.createElement(
                                "span",
                                {
                                  className:
                                    "svc-context-button svc-image-item-value-controls__add",
                                  onClick: function () {
                                    return e.model.chooseNewFile(e.model);
                                  },
                                },
                                c.createElement(c.SvgIcon, {
                                  size: 24,
                                  iconName: "icon-add-lg",
                                  title: this.model.addFileTitle,
                                })
                              )
                            )
                          : null
                      )
                    )
                  : c.createElement(
                      c.Fragment,
                      null,
                      c.createElement(
                        "div",
                        { className: "svc-image-item-value__item" },
                        this.props.element
                      ),
                      this.model.isDraggable && this.model.canRenderControls
                        ? c.createElement(
                            "span",
                            {
                              className:
                                "svc-context-button svc-image-item-value-controls__drag-area-indicator",
                              onPointerDown: function (t) {
                                return e.model.onPointerDown(t);
                              },
                            },
                            c.createElement(c.SvgIcon, {
                              size: 24,
                              iconName: "icon-drag-area-indicator",
                            })
                          )
                        : null,
                      this.model.canRenderControls
                        ? c.createElement(
                            "div",
                            {
                              className:
                                "svc-context-container svc-image-item-value-controls",
                            },
                            this.model.allowRemove && !this.model.isUploading
                              ? (0, c.attachKey2click)(
                                  c.createElement(
                                    "span",
                                    {
                                      className: "svc-context-button",
                                      onClick: function () {
                                        return e.model.chooseFile(e.model);
                                      },
                                    },
                                    c.createElement(c.SvgIcon, {
                                      role: "button",
                                      size: 24,
                                      iconName: "icon-file",
                                      title: this.model.selectFileTitle,
                                    })
                                  )
                                )
                              : null,
                            this.model.allowRemove && !this.model.isUploading
                              ? (0, c.attachKey2click)(
                                  c.createElement(
                                    "span",
                                    {
                                      className:
                                        "svc-context-button svc-context-button--danger",
                                      onClick: function () {
                                        return e.model.remove(e.model);
                                      },
                                    },
                                    c.createElement(c.SvgIcon, {
                                      role: "button",
                                      size: 24,
                                      iconName: "icon-delete",
                                      title: this.model.removeFileTitle,
                                    })
                                  )
                                )
                              : null
                          )
                        : null
                    )),
              c.createElement(
                "div",
                {
                  ref: this.rootRef,
                  className: this.model.getRootCss(),
                  key: this.props.element.key,
                  "data-sv-drop-target-item-value": this.model.isDraggable
                    ? this.model.item.value
                    : void 0,
                  onPointerDown: function (t) {
                    return e.model.onPointerDown(t);
                  },
                  onDragStart: this.preventDragHandler,
                },
                c.createElement("div", {
                  className: "svc-image-item-value-wrapper__ghost",
                  style: o,
                }),
                c.createElement(
                  "div",
                  { className: "svc-image-item-value-wrapper__content" },
                  c.createElement("input", {
                    type: "file",
                    "aria-hidden": "true",
                    tabIndex: -1,
                    accept: this.model.acceptedTypes,
                    className: "svc-choose-file-input",
                    style: {
                      position: "absolute",
                      opacity: 0,
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    },
                  }),
                  n
                )
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-image-item-value",
      function (e) {
        return c.createElement(le, e);
      }
    );
    var ue = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      pe = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ue(t, e),
          (t.prototype.createModel = function (e) {
            var t,
              n = e.componentData,
              o = !1;
            this.model && (o = this.model.isSelected),
              (this.model = new l.MatrixCellWrapperViewModel(
                n.creator,
                n.element,
                n.question,
                n.row,
                n.column ||
                  (null === (t = n.element.cell) || void 0 === t
                    ? void 0
                    : t.column)
              )),
              (this.model.isSelected = o);
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["componentData"];
          }),
          (t.prototype.componentDidUpdate = function (t, n) {
            var o, r;
            e.prototype.componentDidUpdate.call(this, t, n);
            var i = this.props.componentData;
            (this.model.templateData = i.element),
              (this.model.row = i.row),
              (this.model.column =
                i.column ||
                (null ===
                  (r =
                    null === (o = i.element) || void 0 === o
                      ? void 0
                      : o.cell) || void 0 === r
                  ? void 0
                  : r.column)),
              (this.model.question = i.question);
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            var e = this,
              t = null;
            return (
              this.model.isSupportCellEditor &&
                (t = c.createElement(
                  "div",
                  { className: "svc-matrix-cell__question-controls" },
                  (0, c.attachKey2click)(
                    c.createElement(
                      "span",
                      {
                        className: "svc-matrix-cell__question-controls-button",
                        onClick: function (t) {
                          return e.model.editQuestion(e.model, t);
                        },
                      },
                      c.createElement(c.SvgIcon, {
                        size: 24,
                        iconName: "icon-edit",
                      })
                    )
                  )
                )),
              c.createElement(
                "div",
                {
                  className: "svc-matrix-cell",
                  tabIndex: -1,
                  key: this.props.element.key,
                  onClick: function (t) {
                    return (
                      !e.props.question && e.model.selectContext(e.model, t)
                    );
                  },
                  onMouseOut: function (t) {
                    return e.model.hover(t.nativeEvent, t.currentTarget);
                  },
                  onMouseOver: function (t) {
                    return e.model.hover(t.nativeEvent, t.currentTarget);
                  },
                },
                c.createElement("div", {
                  className:
                    "svc-matrix-cell--selected" +
                    (this.model.isSelected ? " svc-visible" : ""),
                }),
                this.props.element,
                t
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-matrix-cell",
      function (e) {
        return c.createElement(pe, e);
      }
    );
    var me = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      de = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          me(t, e),
          (t.prototype.createModel = function (e) {
            this.props.survey &&
              (this.model = new l.SurveyResultsModel(e.survey));
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["survey"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            var e = this;
            return this.model
              ? c.createElement(
                  "div",
                  { className: "svd-test-results" },
                  c.createElement(
                    "div",
                    { className: "svd-test-results__header" },
                    c.createElement(
                      "div",
                      { className: "svd-test-results__header-text" },
                      this.model.surveyResultsText
                    ),
                    c.createElement(
                      "div",
                      { className: "svd-test-results__header-types" },
                      c.createElement(M, {
                        click: function () {
                          return e.model.selectTableClick();
                        },
                        text: this.model.surveyResultsTableText,
                        selected: this.model.isTableSelected,
                        disabled: !1,
                      }),
                      c.createElement(M, {
                        click: function () {
                          return e.model.selectJsonClick();
                        },
                        text: this.model.surveyResultsJsonText,
                        selected: this.model.isJsonSelected,
                        disabled: !1,
                      })
                    )
                  ),
                  this.renderResultAsText(),
                  this.renderResultAsTable()
                )
              : null;
          }),
          (t.prototype.renderResultAsText = function () {
            return "text" !== this.model.resultViewType
              ? null
              : c.createElement(
                  "div",
                  { className: "svd-test-results__text svd-light-bg-color" },
                  c.createElement("div", null, this.model.resultText)
                );
          }),
          (t.prototype.renderResultAsTable = function () {
            return "table" !== this.model.resultViewType
              ? null
              : c.createElement(
                  "div",
                  { className: "svd-test-results__table svd-light-bg-color" },
                  c.createElement(
                    "table",
                    null,
                    c.createElement(
                      "thead",
                      null,
                      c.createElement(
                        "tr",
                        { className: "svd-light-background-color" },
                        c.createElement(
                          "th",
                          { key: 1, className: "svd-dark-border-color" },
                          this.model.resultsTitle
                        ),
                        c.createElement(
                          "th",
                          { key: 2, className: "svd-dark-border-color" },
                          this.model.resultsDisplayValue
                        )
                      )
                    ),
                    c.createElement(
                      "tbody",
                      null,
                      t.renderRows(this.model.resultData)
                    )
                  )
                );
          }),
          (t.renderRows = function (e) {
            for (var t = [], n = 0; n < e.length; n++)
              t.push(c.createElement(fe, { key: n + 1, row: e[n] }));
            return t;
          }),
          t
        );
      })(E),
      fe = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          me(t, e),
          Object.defineProperty(t.prototype, "row", {
            get: function () {
              return this.props.row;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.row;
          }),
          (t.prototype.render = function () {
            var e = this;
            return c.createElement(
              c.Fragment,
              null,
              (0, c.attachKey2click)(
                c.createElement(
                  "tr",
                  {
                    onClick: function () {
                      return e.row.toggle();
                    },
                  },
                  c.createElement(
                    "td",
                    {
                      key: 1,
                      style: { paddingLeft: this.row.textMargin },
                      className: "svd-dark-border-color",
                    },
                    this.row.isNode
                      ? c.createElement(
                          "span",
                          {
                            style: { left: this.row.markerMargin },
                            className:
                              "svd-test-results__marker " +
                              (this.row.collapsed
                                ? ""
                                : "svd-test-results__marker--expanded"),
                          },
                          c.createElement(c.SvgIcon, {
                            iconName: "icon-expand_16x16",
                            size: 16,
                          })
                        )
                      : null,
                    this.row.question
                      ? c.createElement(c.SurveyLocStringViewer, {
                          locStr: this.row.question.locTitle,
                        })
                      : c.createElement("span", null, this.row.title)
                  ),
                  c.createElement(
                    "td",
                    {
                      key: 2,
                      className: this.row.isNode
                        ? "svd-test-results__node-value"
                        : "svd-dark-border-color",
                    },
                    this.row.getString(this.row.displayValue)
                  )
                )
              ),
              this.row.isNode && !this.row.collapsed
                ? de.renderRows(this.row.data)
                : null
            );
          }),
          t
        );
      })(E),
      he = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ye = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          he(t, e),
          (t.prototype.createModel = function (e) {
            this.model = new l.ToolboxToolViewModel(
              e.item,
              e.creator,
              e.parentModel
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["creator", "item"];
          }),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "isCompact", {
            get: function () {
              return this.props.isCompact;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.render = function () {
            var e = this,
              t = this.item,
              n = c.ReactElementFactory.Instance.createElement(
                this.model.itemComponent,
                {
                  item: t,
                  creator: this.creator,
                  parentModel: this.creator.toolbox,
                  isCompact: this.isCompact,
                }
              );
            return c.createElement(
              "div",
              { className: t.css, key: t.id },
              t.needSeparator && !this.creator.toolbox.showCategoryTitles
                ? c.createElement("div", {
                    className: "svc-toolbox__category-separator",
                  })
                : null,
              c.createElement(
                "div",
                {
                  className: "sv-action__content",
                  onPointerDown: function (t) {
                    t.persist(), e.model.onPointerDown(t);
                  },
                  onMouseOver: function (n) {
                    e.model.onMouseOver(t, n);
                  },
                  onMouseLeave: function (n) {
                    e.model.onMouseLeave(t, n);
                  },
                },
                n
              )
            );
          }),
          t
        );
      })(E),
      ve = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          he(t, e),
          (t.prototype.createModel = function (e) {
            var t = e.item;
            this.model = new l.ToolboxToolViewModel(
              t,
              e.creator,
              e.parentModel
            );
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["creator", "item"];
          }),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            var e = this;
            return (0, c.attachKey2click)(
              c.createElement(
                "div",
                {
                  className: "svc-toolbox__item " + this.item.className,
                  tabIndex: 0,
                  role: "button",
                  "aria-label": this.item.tooltip,
                  title: this.item.tooltip,
                  onClick: function (t) {
                    t.persist(), e.model.click(t);
                  },
                },
                c.createElement(
                  "span",
                  { className: "svc-toolbox__item-container" },
                  this.item.iconName
                    ? c.createElement(c.SvgIcon, {
                        size: 24,
                        iconName: this.item.iconName,
                        title: this.item.tooltip,
                      })
                    : null
                ),
                this.props.isCompact
                  ? c.createElement(
                      "span",
                      {
                        className: "svc-toolbox__item-banner svc-item__banner",
                      },
                      c.createElement(c.SvgIcon, {
                        size: 24,
                        iconName: this.item.iconName,
                        className: "svc-toolbox__item-icon",
                        title: this.item.tooltip,
                      }),
                      c.createElement(
                        "span",
                        { className: "svc-toolbox__item-title" },
                        this.item.title
                      )
                    )
                  : c.createElement(
                      "span",
                      { className: "svc-toolbox__item-title" },
                      this.item.title
                    )
              )
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-toolbox-item",
      function (e) {
        return (0, c.createElement)(ve, e);
      }
    );
    var ge = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ee = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          ge(t, e),
          (t.prototype.getUpdatedModelProps = function () {
            return ["creator", "item"];
          }),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "isCompact", {
            get: function () {
              return this.props.isCompact;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "parentModel", {
            get: function () {
              return this.props.parentModel;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.render = function () {
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(ve, {
                item: this.item,
                creator: this.creator,
                parentModel: this.parentModel,
                isCompact: this.isCompact,
              }),
              c.createElement(c.Popup, {
                model: this.item.popupModel,
                getArea: this.item.getArea,
              })
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      "svc-toolbox-item-group",
      function (e) {
        return c.createElement(Ee, e);
      }
    );
    var be = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      _e = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          be(t, e),
          Object.defineProperty(t.prototype, "category", {
            get: function () {
              return this.props.category;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "toolbox", {
            get: function () {
              return this.props.toolbox;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "class", {
            get: function () {
              return (
                "svc-toolbox__category" +
                (this.category.collapsed
                  ? " svc-toolbox__category--collapsed"
                  : "") +
                (this.category.empty ? " svc-toolbox__category--empty" : "")
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.category;
          }),
          (t.prototype.render = function () {
            var e = this.renderCategoryHeader(),
              t = this.renderCategoryContent();
            return c.createElement(
              "div",
              { className: this.class, key: this.category.name },
              e,
              t
            );
          }),
          (t.prototype.renderCategoryHeader = function () {
            var e = this,
              t = "svc-toolbox__category-header";
            return (
              this.toolbox.canCollapseCategories &&
                (t += " svc-toolbox__category-header--collapsed"),
              (0, c.attachKey2click)(
                c.createElement(
                  "div",
                  {
                    className: t,
                    onClick: function (t) {
                      return e.category.toggleState();
                    },
                  },
                  c.createElement(
                    "span",
                    { className: "svc-toolbox__category-title" },
                    this.category.title
                  ),
                  this.renderButton()
                )
              )
            );
          }),
          (t.prototype.renderButton = function () {
            if (!this.toolbox.canCollapseCategories) return null;
            var e = this.category.collapsed ? "arrow-down" : "arrow-up",
              t =
                "svc-toolbox__category-header__button svc-string-editor__button--" +
                (this.category.collapsed ? "expand" : "collapse");
            return c.createElement(
              "div",
              { className: "svc-toolbox__category-header__controls" },
              c.createElement(c.SvgIcon, {
                className: t,
                iconName: "icon-" + e,
                size: 24,
              })
            );
          }),
          (t.prototype.renderCategoryContent = function () {
            return this.renderItems(this.category.items);
          }),
          (t.prototype.renderItems = function (e, t) {
            var n = this;
            return (
              void 0 === t && (t = !1),
              e.map(function (e, o) {
                return c.createElement(ye, {
                  item: e,
                  creator: n.toolbox.creator,
                  parentModel: n.toolbox,
                  isCompact: t,
                  key: "item" + o,
                });
              })
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-toolbox-category",
      function (e) {
        return c.createElement(_e, e);
      }
    );
    var we = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ce = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          we(t, e),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "toolbox", {
            get: function () {
              return this.creator.toolbox;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.toolbox;
          }),
          (t.prototype.render = function () {
            return this.toolbox.hasActions
              ? c.createElement(
                  "div",
                  { className: "svc-toolbox" },
                  c.createElement(
                    "div",
                    { className: "svc-toolbox__container" },
                    1 != this.toolbox.categories.length &&
                      this.toolbox.showCategoryTitles
                      ? this.renderCategories()
                      : c.createElement(
                          "div",
                          { className: "svc-toolbox__category" },
                          this.renderItems(this.toolbox.visibleActions)
                        )
                  )
                )
              : null;
          }),
          (t.prototype.renderItems = function (e, t) {
            var n = this;
            void 0 === t && (t = !1);
            var o = [];
            return (
              e.forEach(function (e, r) {
                var i = c.createElement(ye, {
                  item: e,
                  creator: n.creator,
                  parentModel: n.toolbox,
                  isCompact: t,
                  key: "item" + r,
                });
                o.push(i);
              }),
              o
            );
          }),
          (t.prototype.renderCategories = function () {
            var e = this;
            return this.toolbox.categories.map(function (t, n) {
              return c.createElement(_e, {
                category: t,
                toolbox: e.toolbox,
                key: "category" + n,
              });
            });
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement("svc-toolbox", function (e) {
      return c.createElement(Ce, e);
    });
    var Oe = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Se = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          Oe(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.render = function () {
            if (!this.model || !this.model.renderElements) return null;
            var e = this.renderItems();
            return c.createElement(
              "div",
              { className: this.model.cssClasses.root },
              e
            );
          }),
          (t.prototype.renderItems = function () {
            var e = this;
            return this.model.renderedActions.map(function (t, n) {
              return c.createElement(ye, {
                item: t,
                creator: e.creator,
                parentModel: e.model,
                isCompact: !1,
                key: "item" + n,
              });
            });
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-toolbox-list",
      function (e) {
        return c.createElement(Se, e);
      }
    );
    var Ne = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Pe = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.state = { filterString: n.model.filterString || "" }), n;
        }
        return (
          Ne(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return this.model.isVisible
              ? c.createElement(
                  "div",
                  { className: "spg-search-editor_container" },
                  c.createElement(
                    "div",
                    { className: "spg-search-editor_search-icon" },
                    c.createElement(c.SvgIcon, {
                      iconName: "icon-search",
                      size: "auto",
                    })
                  ),
                  c.createElement("input", {
                    type: "text",
                    className: "spg-search-editor_input",
                    "aria-label": this.model.filterStringPlaceholder,
                    placeholder: this.model.filterStringPlaceholder,
                    value: this.state.filterString,
                    onChange: function (t) {
                      var n = u.settings.environment.root;
                      t.target === n.activeElement &&
                        (e.model.filterString = t.target.value);
                    },
                  }),
                  c.createElement(
                    "div",
                    { className: "spg-search-editor_toolbar" },
                    c.createElement(
                      "div",
                      { className: "spg-search-editor_toolbar-counter" },
                      this.model.matchCounterText
                    ),
                    c.createElement(c.SurveyActionBar, {
                      model: this.model.searchActionBar,
                    })
                  )
                )
              : null;
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement("svc-search", function (e) {
      return c.createElement(Pe, e);
    });
    var xe = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      je = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.rootRef = c.createRef()), n;
        }
        return (
          xe(t, e),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this);
            var t = this.rootRef.current;
            this.toolbox.setRootElement(t),
              t &&
                (this.manager = new u.VerticalResponsivityManager(
                  this.toolbox.containerElement,
                  this.toolbox,
                  this.toolbox.itemSelector,
                  null,
                  void 0,
                  function (e) {
                    return setTimeout(e);
                  }
                ));
          }),
          (t.prototype.componentWillUnmount = function () {
            this.manager && this.manager.dispose(),
              e.prototype.componentWillUnmount.call(this);
          }),
          (t.prototype.renderSearch = function () {
            var e = this.toolbox.isCompactRendered
              ? c.createElement(
                  c.Fragment,
                  null,
                  c.createElement(ye, {
                    item: this.toolbox.searchItem,
                    creator: this.creator,
                    parentModel: this.toolbox,
                    isCompact: this.toolbox.isCompactRendered,
                    key: "searchitem",
                  }),
                  c.createElement("div", {
                    className:
                      "svc-toolbox__category-separator svc-toolbox__category-separator--search",
                  })
                )
              : null;
            return c.createElement(
              "div",
              { className: "svc-toolbox__search-container" },
              e,
              c.createElement(Pe, { model: this.toolbox.searchManager })
            );
          }),
          (t.prototype.render = function () {
            var e = this;
            if (!this.toolbox.hasActions) return null;
            var t = this.toolbox.showSearch ? this.renderSearch() : null,
              n = this.toolbox.showPlaceholder
                ? c.createElement(
                    "div",
                    { className: "svc-toolbox__placeholder" },
                    this.toolbox.toolboxNoResultsFound
                  )
                : null;
            return c.createElement(
              "div",
              { ref: this.rootRef, className: this.toolbox.classNames },
              c.createElement(
                "div",
                {
                  onBlur: function (t) {
                    return e.toolbox.focusOut(t);
                  },
                  className: "svc-toolbox__panel",
                },
                c.createElement(
                  "div",
                  {
                    className: "svc-toolbox__scroller",
                    onScroll: function (t) {
                      return e.toolbox.onScroll(e.toolbox, t);
                    },
                  },
                  t,
                  n,
                  c.createElement(
                    "div",
                    { className: "svc-toolbox__container" },
                    this.toolbox.showInSingleCategory
                      ? c.createElement(
                          "div",
                          { className: "svc-toolbox__category" },
                          this.renderItems(
                            this.toolbox.renderedActions,
                            this.toolbox.isCompactRendered
                          )
                        )
                      : this.renderCategories()
                  )
                )
              )
            );
          }),
          t
        );
      })(Ce);
    c.ReactElementFactory.Instance.registerElement(
      "svc-adaptive-toolbox",
      function (e) {
        return c.createElement(je, e);
      }
    );
    var qe = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ie = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return (
            (t.onPropChangedHandler = function (e, n) {
              if (!t.isRendering) {
                var o = [
                  "showProgressBar",
                  "progressBarType",
                  "currentPageValue",
                ];
                if (!(o.indexOf(n.name) < 0)) {
                  for (var r = {}, i = 0; i < o.length; i++) {
                    var a = o[i];
                    r[a] = t.survey[a];
                  }
                  t.setState(r);
                }
              }
            }),
            t
          );
        }
        return (
          qe(t, e),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this), this.setHandler();
          }),
          (t.prototype.componentDidUpdate = function (t, n) {
            e.prototype.componentDidUpdate.call(this, t, n), this.setHandler();
          }),
          (t.prototype.setHandler = function () {
            this.survey &&
              !this.survey.onPropertyChanged.hasFunc(
                this.onPropChangedHandler
              ) &&
              this.survey.onPropertyChanged.add(this.onPropChangedHandler);
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              this.survey &&
                this.survey.onPropertyChanged.remove(this.onPropChangedHandler);
          }),
          Object.defineProperty(t.prototype, "survey", {
            get: function () {
              return this.props.survey;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "location", {
            get: function () {
              return this.props.location;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "isTop", {
            get: function () {
              return "top" == this.location;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.canRender = function () {
            return this.isTop
              ? this.survey.isShowProgressBarOnTop
              : this.survey.isShowProgressBarOnBottom;
          }),
          (t.prototype.renderElement = function () {
            return c.ReactElementFactory.Instance.createElement(
              this.survey.getProgressTypeComponent(),
              { survey: this.survey, css: this.survey.css, isTop: this.isTop }
            );
          }),
          t
        );
      })(c.SurveyElementBase),
      Me = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Te = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.containerRef = c.createRef()), n;
        }
        return (
          Me(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this),
              this.model.initResizeManager(this.containerRef.current);
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              this.model.resetResizeManager();
          }),
          (t.prototype.canRender = function () {
            return !!this.model && e.prototype.canRender.call(this);
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = { display: this.model.visible ? "" : "none" },
              n =
                "svc-side-bar" +
                (this.model.flyoutPanelMode ? " svc-flyout-side-bar" : ""),
              o = this.model.tabs.map(function (e) {
                return c.createElement(Re, { item: e, key: e.id });
              });
            return c.createElement(
              "div",
              {
                className: n,
                style: { display: this.model.hasVisibleTabs ? "" : "none" },
              },
              c.createElement("div", {
                className: "svc-side-bar__shadow",
                onClick: function () {
                  return e.model.collapseSidebar();
                },
              }),
              c.createElement(
                "div",
                { className: "svc-flex-column svc-side-bar__wrapper" },
                c.createElement(
                  "div",
                  {
                    ref: this.containerRef,
                    style: t,
                    className: "svc-side-bar__container",
                  },
                  c.createElement(
                    "div",
                    { className: "svc-side-bar__container-header" },
                    c.createElement(
                      "div",
                      { className: "svc-side-bar__container-actions" },
                      c.createElement(c.SurveyActionBar, {
                        model: this.model.toolbar,
                      })
                    ),
                    this.model.headerText
                      ? c.createElement(
                          "div",
                          { className: "svc-side-bar__container-title" },
                          this.model.headerText
                        )
                      : null
                  ),
                  c.createElement(
                    "div",
                    { className: "svc-side-bar__container-content" },
                    o
                  )
                )
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase),
      Re = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Me(t, e),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.renderElement = function () {
            return this.item.visible
              ? c.ReactElementFactory.Instance.createElement(
                  this.item.componentName,
                  { model: this.item.model }
                )
              : null;
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactQuestionFactory.Instance.registerQuestion(
      "svc-side-bar-tab",
      function (e) {
        return c.createElement(Re, e);
      }
    ),
      c.ReactElementFactory.Instance.registerElement(
        "svc-side-bar",
        function (e) {
          return c.createElement(Te, e);
        }
      );
    var Fe = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      De = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Fe(t, e),
          (t.prototype.render = function () {
            return c.createElement("div", {
              className: "sd-translation-line-skeleton",
            });
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "sd-translation-line-skeleton",
      function (e) {
        return c.createElement(De, e);
      }
    );
    var ke = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Be = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ke(t, e),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.renderElement = function () {
            var e = this.item;
            return c.createElement(
              "div",
              { className: e.data.containerCss },
              c.createElement(
                "span",
                { className: e.data.additionalTitleCss },
                e.data.additionalTitle
              ),
              c.ReactElementFactory.Instance.createElement(
                "sv-action-bar-item-dropdown",
                { item: this.item }
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-translate-from-action",
      function (e) {
        return c.createElement(Be, e);
      }
    );
    var Ae = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ue = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (
            (n.onChangedHandler = function (e, t) {
              n.setState({
                changed: n.state && n.state.changed ? n.state.changed + 1 : 1,
              });
            }),
            (n.onBlur = function (e) {
              return (
                n.svStringEditorRef.current &&
                  (n.svStringEditorRef.current.spellcheck = !1),
                (n.locString.__isEditing = !1),
                (n.justFocused = !1),
                n.baseModel.onBlur(e.nativeEvent),
                n.baseModel.errorText
              );
            }),
            (n.onCompositionStart = function (e) {
              n.baseModel.onCompositionStart(e.nativeEvent);
            }),
            (n.onCompositionEnd = function (e) {
              n.baseModel.onCompositionEnd(e.nativeEvent);
            }),
            (n.onInput = function (e) {
              n.baseModel.onInput(e.nativeEvent);
            }),
            (n.onPaste = function (e) {
              n.baseModel.onPaste(e.nativeEvent);
            }),
            (n.justFocused = !1),
            (n.onFocus = function (e) {
              n.baseModel.onFocus(e.nativeEvent), (n.justFocused = !0);
            }),
            (n.onKeyDown = function (e) {
              return n.baseModel.onKeyDown(e.nativeEvent);
            }),
            (n.onKeyUp = function (e) {
              return n.baseModel.onKeyUp(e.nativeEvent);
            }),
            (n.onMouseUp = function (e) {
              return n.baseModel.onMouseUp(e.nativeEvent);
            }),
            (n.done = function (e) {
              n.baseModel.done(e), (n.locString.__isEditing = !1);
            }),
            (n.edit = function (e) {
              n.svStringEditorRef.current.focus(),
                (n.locString.__isEditing = !0),
                n.baseModel.onClick(e);
            }),
            (n.state = { changed: 0 }),
            (n.svStringEditorRef = c.createRef()),
            n
          );
        }
        return (
          Ae(t, e),
          (t.prototype.createModel = function (e) {
            this.baseModel && this.baseModel.dispose(),
              (this.baseModel = new l.StringEditorViewModelBase(
                this.locString,
                this.creator
              ));
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["creator", "locString"];
          }),
          Object.defineProperty(t.prototype, "locString", {
            get: function () {
              return this.props.locStr.locStr;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.props.locStr.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "style", {
            get: function () {
              return this.props.style;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.baseModel;
          }),
          Object.defineProperty(t.prototype, "errorText", {
            get: function () {
              return this.baseModel.errorText;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            var t = this;
            e.prototype.componentDidMount.call(this),
              this.locString &&
                (this.baseModel.setLocString(this.locString),
                (this.baseModel.getEditorElement = function () {
                  return t.svStringEditorRef.current;
                }),
                (this.baseModel.blurEditor = function () {
                  t.svStringEditorRef.current.blur(),
                    (t.svStringEditorRef.current.spellcheck = !1);
                }),
                this.baseModel.afterRender(),
                this.locString.onStringChanged.add(this.onChangedHandler),
                this.locString.__isEditing &&
                  this.svStringEditorRef.current.focus());
          }),
          (t.prototype.componentDidUpdate = function (t, n) {
            e.prototype.componentDidUpdate.call(this, t, n),
              this.baseModel.setLocString(this.locString),
              this.baseModel.afterRender();
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              this.baseModel.detachFromUI(),
              this.locString &&
                this.locString.onStringChanged.remove(this.onChangedHandler);
          }),
          Object.defineProperty(t.prototype, "placeholder", {
            get: function () {
              return this.baseModel.placeholder;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "contentEditable", {
            get: function () {
              return this.baseModel.contentEditable;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "className", {
            get: function () {
              return this.baseModel.className(this.locString.renderedHtml);
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.render = function () {
            if (!this.locString) return null;
            var e = null;
            if (this.locString.hasHtml) {
              var t = { __html: this.locString.renderedHtml };
              e = c.createElement("span", {
                role: "textbox",
                ref: this.svStringEditorRef,
                className: "sv-string-editor sv-string-editor--html",
                contentEditable: this.contentEditable,
                spellCheck: !1,
                "aria-placeholder": this.placeholder,
                "aria-label": this.placeholder || "content editable",
                suppressContentEditableWarning: !0,
                dangerouslySetInnerHTML: t,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                onKeyDown: this.onKeyDown,
                onMouseUp: this.onMouseUp,
                onClick: this.edit,
              });
            } else
              e = c.createElement(
                "span",
                {
                  role: "textbox",
                  ref: this.svStringEditorRef,
                  className: "sv-string-editor",
                  contentEditable: this.contentEditable,
                  spellCheck: !1,
                  "aria-placeholder": this.placeholder,
                  "aria-label": this.placeholder || "content editable",
                  suppressContentEditableWarning: !0,
                  key: this.locString.renderedHtml,
                  onBlur: this.onBlur,
                  onInput: this.onInput,
                  onPaste: this.onPaste,
                  onCompositionStart: this.onCompositionStart,
                  onCompositionEnd: this.onCompositionEnd,
                  onFocus: this.onFocus,
                  onKeyDown: this.onKeyDown,
                  onKeyUp: this.onKeyUp,
                  onMouseUp: this.onMouseUp,
                  onClick: this.edit,
                },
                this.locString.renderedHtml
              );
            var n = this.baseModel.showCharacterCounter
              ? c.createElement(c.CharacterCounterComponent, {
                  counter: this.baseModel.characterCounter,
                  remainingCharacterCounter:
                    this.baseModel.getCharacterCounterClass,
                })
              : null;
            return c.createElement(
              "span",
              { className: this.className },
              c.createElement(
                "span",
                { className: "svc-string-editor__content" },
                c.createElement(
                  "div",
                  {
                    className: "svc-string-editor__border",
                    onClick: this.edit,
                  },
                  c.createElement(c.SvgIcon, {
                    className:
                      "svc-string-editor__button svc-string-editor__button--edit",
                    size: 16,
                    iconName: "icon-edit",
                  })
                ),
                c.createElement(
                  "span",
                  { className: "svc-string-editor__input" },
                  e,
                  c.createElement("div", {
                    className: "svc-string-editor__controls",
                    onClick: this.edit,
                  }),
                  n
                )
              ),
              this.errorText
                ? c.createElement(
                    "span",
                    { className: "svc-string-editor__error" },
                    this.errorText
                  )
                : ""
            );
          }),
          t
        );
      })(E);
    c.ReactElementFactory.Instance.registerElement(
      l.editableStringRendererName,
      function (e) {
        return c.createElement(Ue, e);
      }
    );
    var Qe = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ve = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Qe(t, e),
          (t.prototype.render = function () {
            return c.createElement(
              "div",
              null,
              c.createElement(c.SvgIcon, {
                "aria-hidden": "true",
                iconName: "icon-alert_24x24",
                size: "24",
                className: this.props.cssClasses.error.icon,
              }),
              c.createElement(
                "span",
                { className: this.props.cssClasses.error.item || void 0 },
                c.createElement(c.SurveyLocStringViewer, {
                  locStr: this.props.error.locText,
                })
              )
            );
          }),
          t
        );
      })(c.Component);
    c.ReactElementFactory.Instance.registerElement(
      "svc-question-error",
      function (e) {
        return c.createElement(Ve, e);
      }
    );
    var Le = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ke = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          Le(t, e),
          (t.prototype.renderInput = function () {
            var e = this.question;
            (0, l.initLogicOperator)(e);
            var t = e.selectedItemLocText
              ? this.renderLocString(e.selectedItemLocText)
              : "";
            return c.createElement(
              "div",
              {
                id: this.question.inputId,
                className: e.getControlClass(),
                tabIndex: this.question.isInputReadOnly ? void 0 : 0,
                disabled: this.question.isInputReadOnly,
                required: this.question.isRequired,
                onChange: this.updateValueOnEvent,
                onInput: this.updateValueOnEvent,
                onKeyUp: this.keyhandler,
                role: this.question.ariaRole,
                "aria-required": this.question.ariaRequired,
                "aria-label": this.question.ariaLabel,
                "aria-invalid": this.question.ariaInvalid,
                "aria-describedby": this.question.ariaDescribedBy,
              },
              c.createElement(
                "div",
                { className: this.question.cssClasses.controlValue },
                t,
                c.createElement("div", null, e.readOnlyText)
              ),
              this.createClearButton()
            );
          }),
          t
        );
      })(c.SurveyQuestionDropdown);
    c.ReactQuestionFactory.Instance.registerQuestion(
      "sv-logic-operator",
      function (e) {
        return c.createElement(Ke, e);
      }
    ),
      u.RendererFactory.Instance.registerRenderer(
        "dropdown",
        "logicoperator",
        "sv-logic-operator"
      );
    var He = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ze = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.containerRef = c.createRef()), n;
        }
        return (
          He(t, e),
          (t.prototype.createModel = function (e) {
            this.model && this.model.dispose(),
              (this.model = new l.PageNavigatorViewModel(
                e.pagesController,
                e.pageEditMode
              ));
          }),
          (t.prototype.getUpdatedModelProps = function () {
            return ["pagesController", "pageEditMode"];
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          Object.defineProperty(t.prototype, "scrollableContainer", {
            get: function () {
              var e = this.containerRef.current;
              return e ? e.parentElement.parentElement.parentElement : e;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            if (
              (e.prototype.componentDidMount.call(this),
              "bypage" !== this.props.pageEditMode)
            ) {
              var t = this.containerRef.current;
              if (t) {
                var n = this;
                (t.parentElement.parentElement.parentElement.onscroll =
                  function (e) {
                    return n.model.onContainerScroll(e.currentTarget);
                  }),
                  n.model.setItemsContainer(t.parentElement),
                  n.model.setScrollableContainer(
                    t.parentElement.parentElement.parentElement
                  );
              }
            }
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this);
            var t = this.containerRef.current;
            t &&
              (t.parentElement.parentElement.parentElement.onscroll = void 0),
              this.model.stopItemsContainerHeightObserver(),
              this.model.setScrollableContainer(void 0);
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = "svc-page-navigator__selector";
            return (
              this.model.isPopupOpened &&
                (t += " svc-page-navigator__selector--opened"),
              c.createElement(
                "div",
                {
                  className: "svc-page-navigator",
                  ref: this.containerRef,
                  style: { display: this.model.visible ? "flex" : "none" },
                },
                (0, c.attachKey2click)(
                  c.createElement(
                    "div",
                    {
                      className: t,
                      onClick: function () {
                        return e.model.togglePageSelector();
                      },
                      title: this.model.pageSelectorCaption,
                    },
                    c.createElement(c.SvgIcon, {
                      className: "svc-page-navigator__navigator-icon",
                      iconName: this.model.icon,
                      size: 24,
                      title: this.model.pageSelectorCaption,
                    }),
                    c.createElement(c.Popup, { model: this.model.popupModel })
                  )
                ),
                c.createElement(
                  "div",
                  null,
                  this.model.visibleItems.map(function (e) {
                    return c.createElement(We, { key: e.id, item: e });
                  })
                )
              )
            );
          }),
          t
        );
      })(E),
      We = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          He(t, e),
          (t.prototype.getStateElement = function () {
            return this.props.item;
          }),
          (t.prototype.renderElement = function () {
            var e = this.props.item,
              t = "svc-page-navigator-item-content";
            return (
              (0, u.unwrap)(e.active) &&
                (t += " svc-page-navigator-item--selected"),
              (0, u.unwrap)(e.disabled) &&
                (t += " svc-page-navigator-item--disabled"),
              c.createElement(
                "div",
                { className: "svc-page-navigator-item" },
                (0, c.attachKey2click)(
                  c.createElement(
                    "div",
                    {
                      className: t,
                      onClick: function (t) {
                        e.action(e), t.stopPropagation();
                      },
                    },
                    c.createElement("div", {
                      className: "svc-page-navigator-item__dot",
                      title: e.title,
                    }),
                    c.createElement(
                      "div",
                      { className: "svc-page-navigator-item__banner" },
                      c.createElement(
                        "span",
                        {
                          className: "svc-text svc-text--small svc-text--bold",
                        },
                        e.title
                      ),
                      c.createElement("span", {
                        className: "svc-page-navigator-item__dot",
                      })
                    )
                  )
                )
              )
            );
          }),
          t
        );
      })(E),
      Ge = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Je = function () {
        return (
          (Je =
            Object.assign ||
            function (e) {
              for (var t, n = 1, o = arguments.length; n < o; n++)
                for (var r in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              return e;
            }),
          Je.apply(this, arguments)
        );
      },
      Xe = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return (
            (t.denyUpdate = function () {
              t.denyComponentUpdate();
            }),
            (t.allowUpdate = function () {
              t.allowComponentUpdate();
            }),
            (t.addDragDropEvents = function () {
              t.creator.onDragStart.add(t.denyUpdate),
                t.creator.onDragEnd.add(t.allowUpdate);
            }),
            (t.clearDragDropEvents = function () {
              t.creator.onDragStart.remove(t.denyUpdate),
                t.creator.onDragEnd.remove(t.allowUpdate);
            }),
            (t.renderedPagesCache = {}),
            t
          );
        }
        return (
          Ge(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "creator", {
            get: function () {
              return this.model.creator;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            e.prototype.componentDidMount.call(this), this.addDragDropEvents();
          }),
          (t.prototype.componentWillUnmount = function () {
            e.prototype.componentWillUnmount.call(this),
              this.clearDragDropEvents(),
              e.prototype.componentWillUnmount.call(this);
          }),
          (t.prototype.getStateElements = function () {
            return [this.model, this.model.survey, this.model.pagesController];
          }),
          (t.prototype.getRenderedPages = function () {
            var e = this;
            "pages" !== this.changedStatePropName &&
              (this.renderedPagesCache = {});
            var t = [];
            if ("bypage" !== this.creator.pageEditMode)
              this.creator.survey.pages.forEach(function (n, o) {
                var r = e.renderedPagesCache[n.id];
                r ||
                  ((r = e.createRenderedPage(n, o)),
                  (e.renderedPagesCache[n.id] = r)),
                  t.push(r);
              }),
                this.model.showNewPage &&
                  t.push(
                    this.renderNewPage(
                      "svc-page",
                      this.model.newPage.id + "-ghost-new-page"
                    )
                  );
            else {
              var n = this.model.pagesController.page2Display;
              if (n) {
                var o = this.renderedPagesCache[n.id];
                o ||
                  ((o = this.createRenderedPage(
                    n,
                    0,
                    this.model.newPage === n
                  )),
                  (this.renderedPagesCache[n.id] = o)),
                  t.push(o);
              }
            }
            return t;
          }),
          (t.prototype.createRenderedPage = function (e, t, n) {
            return c.createElement(
              "div",
              {
                className: "svc-page",
                "data-sv-drop-target-page": e.name,
                "data-sv-drop-target-survey-element": n
                  ? "newGhostPage"
                  : e.name,
                key: e.id + "-" + t,
              },
              this.renderPage(e)
            );
          }),
          (t.prototype.renderNewPage = function (e, t) {
            return (
              void 0 === t && (t = ""),
              c.createElement(
                c.Fragment,
                { key: t },
                c.createElement(
                  "div",
                  {
                    className: e,
                    "data-sv-drop-target-survey-element": "newGhostPage",
                  },
                  this.model.newPage
                    ? this.renderPage(this.model.newPage)
                    : null
                )
              )
            );
          }),
          (t.prototype.renderPage = function (e) {
            return c.ReactElementFactory.Instance.createElement("svc-page", {
              survey: this.creator.survey,
              page: e,
              creator: this.creator,
            });
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = "svc-tab-designer " + this.model.getRootCss();
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(
                "div",
                { className: "svc-flex-column" },
                this.model.isToolboxVisible
                  ? c.ReactElementFactory.Instance.createElement(
                      "svc-adaptive-toolbox",
                      { model: this.creator }
                    )
                  : null
              ),
              c.createElement(
                "div",
                {
                  className: t,
                  onClick: function () {
                    return e.model.clickDesigner();
                  },
                },
                c.createElement(
                  "div",
                  { className: "svc-tab-designer_content" },
                  this.model.showPlaceholder
                    ? this.renderPlaceHolder()
                    : this.renderTabContent()
                )
              )
            );
          }),
          (t.prototype.renderHeader = function (e) {
            if (!e) return null;
            var t = this.creator.survey;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(
                "div",
                { className: "svc-designer-header" },
                c.createElement(c.SurveyHeader, { survey: t })
              )
            );
          }),
          (t.prototype.renderPlaceHolder = function () {
            var e = this.renderHeader(
              this.creator.allowEditSurveyTitle &&
                this.creator.showHeaderInEmptySurvey
            );
            return c.createElement(
              c.Fragment,
              null,
              e,
              c.createElement(
                "div",
                {
                  className: "svc-designer__placeholder-container",
                  "data-sv-drop-target-survey-element": "newGhostPage",
                },
                this.renderPlaceHolderContent(),
                this.renderNewPage("svc-designer-placeholder-page")
              )
            );
          }),
          (t.prototype.renderPlaceHolderContent = function () {
            return c.createElement(
              "span",
              {
                className:
                  "svc-designer-placeholder-text svc-text svc-text--normal",
              },
              this.model.placeholderText
            );
          }),
          (t.prototype.renderTabContent = function () {
            var e = this.creator.survey,
              t = this.renderHeader(this.creator.allowEditSurveyTitle),
              n = Je({}, this.creator.designTabSurveyThemeVariables);
            return (
              e.width && (n.maxWidth = e.renderedWidth),
              c.createElement(
                c.Fragment,
                null,
                c.createElement(
                  "div",
                  { className: this.model.designerCss, style: n },
                  t,
                  this.getRenderedPages()
                ),
                this.creator.showPageNavigator
                  ? c.createElement(
                      "div",
                      { className: "svc-tab-designer__page-navigator" },
                      c.createElement(ze, {
                        pagesController: this.model.pagesController,
                        pageEditMode: this.model.creator.pageEditMode,
                      })
                    )
                  : null
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-designer",
      function (e) {
        return c.createElement(Xe, e);
      }
    );
    var Ye = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ze = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Ye(t, e),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderElement = function () {
            return c.createElement(
              "div",
              {
                className: "svc-json-editor-tab__errros_list",
                style: { display: this.model.hasErrors ? "block" : "none" },
              },
              c.createElement(c.List, { model: this.model.errorList })
            );
          }),
          t
        );
      })(c.SurveyElementBase),
      $e = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          Ye(t, e),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = c.createElement(Ze, { data: this.model });
            return c.createElement(
              "div",
              { className: "svc-creator-tab__content" },
              c.createElement(
                "div",
                { className: "svc-json-editor-tab__content" },
                c.createElement("textarea", {
                  ref: function (t) {
                    return (n = t), void (e.model.textElement = n);
                    var n;
                  },
                  className: "svc-json-editor-tab__content-area",
                  value: this.model.text,
                  onChange: function (t) {
                    return (e.model.text = t.target.value);
                  },
                  onKeyDown: function (t) {
                    return e.model.checkKey(t, t);
                  },
                  disabled: this.model.readOnly,
                  "aria-label": this.model.ariaLabel,
                }),
                t
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-json-editor-textarea",
      function (e) {
        return c.createElement($e, e);
      }
    );
    var et = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      tt = (function (e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (n.aceEditorrRef = c.createRef()), n;
        }
        return (
          et(t, e),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.componentDidMount = function () {
            this.model.init(ace.edit(this.aceEditorrRef.current));
          }),
          (t.prototype.renderElement = function () {
            var e = c.createElement(Ze, { data: this.model });
            return c.createElement(
              "div",
              { className: "svc-creator-tab__content" },
              c.createElement(
                "div",
                { className: "svc-json-editor-tab__content" },
                c.createElement("div", {
                  className: "svc-json-editor-tab__ace-editor",
                  ref: this.aceEditorrRef,
                }),
                e
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-json-editor-ace",
      function (e) {
        return c.createElement(tt, e);
      }
    );
    var nt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ot = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          nt(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.button;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t =
                "svc-logic-tab__content-action svc-btn" +
                (void 0 === this.model.enabled || this.model.enabled
                  ? ""
                  : " svc-logic-tab__content-action--disabled");
            return (0, c.attachKey2click)(
              c.createElement(
                "div",
                {
                  role: "button",
                  onClick: function (t) {
                    t.stopPropagation(), e.model.action();
                  },
                  className: t,
                  title: this.model.title,
                },
                c.createElement(
                  "span",
                  { className: "svc-text svc-text--normal svc-text--bold" },
                  this.model.title
                )
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-logic-add-button",
      function (e) {
        return c.createElement(ot, e);
      }
    );
    var rt = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        nt(t, e),
        Object.defineProperty(t.prototype, "model", {
          get: function () {
            return this.props.data;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getStateElement = function () {
          return this.model;
        }),
        (t.prototype.renderElement = function () {
          this.model;
          var e = this.renderViewContent();
          return c.createElement(
            "div",
            { className: "svc-creator-tab__content" },
            e
          );
        }),
        (t.prototype.renderViewContent = function () {
          var e =
              "svc-plugin-tab__content svc-logic-tab__content " +
              (this.model.hasItems ? "" : "svc-logic-tab__empty"),
            t = this.model.readOnly
              ? void 0
              : c.createElement(ot, { button: this.model.addNewButton });
          return c.createElement(
            c.Fragment,
            null,
            c.createElement(
              "div",
              { className: e },
              c.createElement(c.Survey, { model: this.model.itemsSurvey }),
              this.model.hasItems
                ? null
                : c.createElement(
                    "div",
                    { className: "svc-logic-tab__content-empty" },
                    c.createElement(
                      "span",
                      { className: "svc-text" },
                      this.model.emptyTabPlaceholder
                    )
                  ),
              t
            )
          );
        }),
        t
      );
    })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-logic",
      function (e) {
        return c.createElement(rt, e);
      }
    );
    var it = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      at = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          it(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = this.model.getRootCss();
            return this.model.survey
              ? this.model.hasFrame
                ? c.createElement(
                    "div",
                    {
                      className: t,
                      onKeyDown: function (t) {
                        return e.model.tryToZoom(t, t);
                      },
                      onMouseEnter:
                        "desktop" === this.model.device
                          ? null
                          : this.model.activateZoom,
                      onMouseLeave:
                        "desktop" === this.model.device
                          ? null
                          : this.model.deactivateZoom,
                    },
                    c.createElement(
                      "div",
                      {
                        className: "svd-simulator-wrapper",
                        id: "svd-simulator-wrapper",
                        style: {
                          width: this.model.simulatorFrame.frameWidth + "px",
                          height: this.model.simulatorFrame.frameHeight + "px",
                        },
                      },
                      c.createElement(
                        "div",
                        {
                          className: "svd-simulator",
                          style: {
                            width: this.model.simulatorFrame.deviceWidth + "px",
                            height:
                              this.model.simulatorFrame.deviceHeight + "px",
                            transform:
                              "scale(" +
                              this.model.simulatorFrame.scale +
                              ") translate(-50%, -50%)",
                          },
                        },
                        c.createElement(
                          "div",
                          { className: "svd-simulator-content" },
                          c.createElement(c.Survey, {
                            model: this.model.survey,
                          })
                        )
                      )
                    )
                  )
                : c.createElement(
                    "div",
                    { className: t },
                    c.createElement(
                      "div",
                      { className: "svd-simulator-content" },
                      c.createElement(c.Survey, { model: this.model.survey })
                    )
                  )
              : c.createElement("div", { className: t });
          }),
          t
        );
      })(c.SurveyElementBase),
      st = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ct = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          st(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model.testAgainAction;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return (0, c.attachKey2click)(
              c.createElement(
                "div",
                {
                  role: "button",
                  onClick: function (t) {
                    t.stopPropagation(), e.model.action();
                  },
                  className: "svc-preview__test-again svc-btn",
                  title: this.model.title,
                },
                c.createElement(
                  "span",
                  { className: "svc-text svc-text--normal svc-text--bold" },
                  this.model.title
                )
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-complete-page",
      function (e) {
        return c.createElement(ct, e);
      }
    );
    var lt = (function (e) {
      function t(t) {
        return e.call(this, t) || this;
      }
      return (
        st(t, e),
        Object.defineProperty(t.prototype, "model", {
          get: function () {
            return this.props.data;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getStateElement = function () {
          return this.model;
        }),
        (t.prototype.renderElement = function () {
          var e =
            "svc-creator-tab__content svc-test-tab__content" +
            (this.model.isPageToolbarVisible
              ? " svc-creator-tab__content--with-toolbar"
              : "");
          return c.createElement(
            "div",
            { className: e },
            c.createElement(
              "div",
              { className: "svc-plugin-tab__content" },
              c.createElement(at, { model: this.model.simulator }),
              this.model.showResults
                ? c.createElement(de, { survey: this.model.simulator.survey })
                : null
            ),
            this.getBottomToolbar()
          );
        }),
        (t.prototype.getBottomToolbar = function () {
          return this.model.isPageToolbarVisible
            ? c.createElement(
                "div",
                { className: "svc-test-tab__content-actions" },
                c.createElement(c.SurveyActionBar, { model: this.model.pages })
              )
            : null;
        }),
        t
      );
    })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-test",
      function (e) {
        return c.createElement(lt, e);
      }
    );
    var ut = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      pt = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ut(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            var e =
              "svc-creator-tab__content svc-test-tab__content" +
              (this.model.isPageToolbarVisible
                ? " svc-creator-tab__content--with-toolbar"
                : "");
            return c.createElement(
              "div",
              { className: e },
              c.createElement(
                "div",
                { className: "svc-plugin-tab__content" },
                c.createElement(at, { model: this.model.simulator }),
                this.model.showResults
                  ? c.createElement(de, { survey: this.model.simulator.survey })
                  : null
              ),
              this.getBottomToolbar()
            );
          }),
          (t.prototype.getBottomToolbar = function () {
            return this.model.isPageToolbarVisible
              ? c.createElement(
                  "div",
                  { className: "svc-test-tab__content-actions" },
                  c.createElement(c.SurveyActionBar, {
                    model: this.model.pages,
                  })
                )
              : null;
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-theme",
      function (e) {
        return c.createElement(pt, e);
      }
    );
    var mt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      dt = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          mt(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.data || this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            return this.model
              ? c.createElement(
                  "div",
                  { className: "svc-creator-tab__content svc-translation-tab" },
                  this.renderElementContent()
                )
              : null;
          }),
          (t.prototype.renderElementContent = function () {
            return this.model.isEmpty
              ? c.createElement(
                  "div",
                  { className: "st-no-strings" },
                  c.createElement("span", null, this.model.noStringsText)
                )
              : c.createElement(
                  "div",
                  { className: "st-content" },
                  c.createElement(
                    "div",
                    { className: "svc-flex-column st-strings-wrapper" },
                    c.createElement(
                      "div",
                      { className: "svc-flex-row st-strings-header" },
                      c.createElement(c.Survey, {
                        model: this.model.stringsHeaderSurvey,
                      })
                    ),
                    c.createElement(
                      "div",
                      {
                        className:
                          "svc-flex-row svc-plugin-tab__content st-strings",
                      },
                      c.createElement(c.Survey, {
                        model: this.model.stringsSurvey,
                      })
                    )
                  )
                );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-tab-translation",
      function (e) {
        return c.createElement(dt, e);
      }
    );
    var ft = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      ht = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          ft(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.renderElement = function () {
            return this.model.isVisible
              ? c.createElement(c.List, { model: this.model.list })
              : null;
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-object-selector",
      function (e) {
        return c.createElement(ht, e);
      }
    );
    var yt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      vt = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          yt(t, e),
          Object.defineProperty(t.prototype, "model", {
            get: function () {
              return this.props.model;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.model;
          }),
          (t.prototype.canRender = function () {
            return !!this.model && e.prototype.canRender.call(this);
          }),
          (t.prototype.renderElement = function () {
            var e = this.model.searchEnabled
              ? "spg-container spg-container_search"
              : "spg-container";
            return c.createElement(
              "div",
              { className: e },
              c.createElement(Pe, { model: this.model.searchManager }),
              c.createElement(c.Survey, { model: this.model.survey })
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactQuestionFactory.Instance.registerQuestion(
      "buttongroup",
      function (e) {
        return c.createElement(c.SurveyQuestionButtonGroup, e);
      }
    ),
      c.ReactElementFactory.Instance.registerElement(
        "svc-property-grid",
        function (e) {
          return c.createElement(vt, e);
        }
      );
    var gt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Et = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          gt(t, e),
          Object.defineProperty(t.prototype, "item", {
            get: function () {
              return this.props.item;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getStateElement = function () {
            return this.item;
          }),
          (t.prototype.renderElement = function () {
            var e = this,
              t = this.item.tooltip || this.item.title,
              n = this.item.hasTitle
                ? c.createElement(
                    "span",
                    { className: "svc-switcher__title" },
                    this.item.title
                  )
                : null;
            return (0, c.attachKey2click)(
              c.createElement(
                "button",
                {
                  className: this.item.getActionBarItemCss(),
                  type: "button",
                  disabled: this.item.disabled,
                  onClick: function (t) {
                    return e.item.action(e.item, e.item.getIsTrusted(t));
                  },
                  title: t,
                  "aria-checked": this.item.ariaChecked,
                  "aria-expanded": this.item.ariaExpanded,
                  role: this.item.ariaRole,
                },
                c.createElement(
                  "div",
                  { className: this.item.getSwitcherIconCss() },
                  c.createElement("div", {
                    className: "svc-switcher__icon-thumb",
                  })
                ),
                n
              ),
              this.item,
              { processEsc: !1 }
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "svc-switcher",
      function (e) {
        return c.createElement(Et, e);
      }
    );
    var bt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      _t = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          bt(t, e),
          (t.prototype.render = function () {
            var e = this.props.item;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement(c.SvgIcon, {
                iconName: e.iconName,
                iconSize: e.iconSize,
                className: "svc-json-error__icon",
              }),
              c.createElement(
                "div",
                { className: "svc-json-error__container" },
                c.createElement(
                  "div",
                  { className: "svc-json-error__title" },
                  c.createElement(
                    "span",
                    { key: 2 },
                    this.renderLocString(e.locTitle, void 0, "locString")
                  )
                ),
                this.renderFixButton()
              )
            );
          }),
          (t.prototype.renderFixButton = function () {
            if (!this.props.item.data.showFixButton) return null;
            var e = this.props.item;
            return (0, c.attachKey2click)(
              c.createElement(
                "button",
                {
                  type: "button",
                  onClick: function (t) {
                    t.stopPropagation(), e.data.fixError();
                  },
                  title: e.data.fixButtonTitle,
                  className: "svc-json-error__fix-button",
                },
                c.createElement(c.SvgIcon, {
                  iconName: e.data.fixButtonIcon,
                  size: "auto",
                })
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement(
      "json-error-item",
      function (e) {
        return c.createElement(_t, e);
      }
    );
    var wt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Ct = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          wt(t, e),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.questionBase;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderInput = function () {
            var e = this;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement("input", {
                id: this.question.inputId,
                disabled: this.isDisplayMode,
                className: this.question.cssClasses.control,
                ref: function (t) {
                  return e.setControl(t);
                },
                placeholder: this.question.renderedPlaceholder,
                autoComplete: "off",
                onBlur: function (t) {
                  return e.question.onBlur(t.nativeEvent);
                },
                onFocus: function (t) {
                  return e.question.onFocus(t.nativeEvent);
                },
                onChange: this.question.onChange,
                onBeforeInput: function (t) {
                  return e.question.onBeforeInput(t.nativeEvent);
                },
                onKeyUp: function (t) {
                  return e.question.onKeyUp(t.nativeEvent);
                },
                onKeyDown: function (t) {
                  return e.question.onInputKeyDown(t.nativeEvent);
                },
                "aria-required": this.question.ariaRequired,
                "aria-label": this.question.ariaLabel,
                "aria-invalid": this.question.ariaInvalid,
                "aria-describedby": this.question.ariaDescribedBy,
              })
            );
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return c.createElement(
              "div",
              {
                className: this.question.cssClasses.root,
                onKeyDown: function (t) {
                  return e.question.onKeyDown(t.nativeEvent);
                },
              },
              this.renderInput(),
              this.renderButtons()
            );
          }),
          (t.prototype.getValueCore = function () {
            return this.question.renderedValue;
          }),
          (t.prototype.renderButtons = function () {
            var e = this;
            return c.createElement(
              "span",
              { className: this.question.cssClasses.buttonsContainer },
              c.createElement(
                "button",
                {
                  tabIndex: -1,
                  className: this.question.cssClasses.arrowButton,
                  disabled: this.isDisplayMode,
                  onMouseDown: this.question.onDownButtonMouseDown,
                  onMouseUp: this.question.onButtonMouseUp,
                  onMouseLeave: this.question.onButtonMouseLeave,
                  onBlur: function (t) {
                    return e.question.onBlur(t.nativeEvent);
                  },
                  onFocus: function (t) {
                    return e.question.onFocus(t.nativeEvent);
                  },
                },
                c.createElement(c.SvgIcon, {
                  iconName: this.question.cssClasses.decreaseButtonIcon,
                  size: "auto",
                })
              ),
              c.createElement(
                "button",
                {
                  tabIndex: -1,
                  className: this.question.cssClasses.arrowButton,
                  disabled: this.isDisplayMode,
                  onMouseDown: this.question.onUpButtonMouseDown,
                  onMouseUp: this.question.onButtonMouseUp,
                  onMouseLeave: this.question.onButtonMouseLeave,
                  onBlur: function (t) {
                    return e.question.onBlur(t.nativeEvent);
                  },
                  onFocus: function (t) {
                    return e.question.onFocus(t.nativeEvent);
                  },
                },
                c.createElement(c.SvgIcon, {
                  iconName: this.question.cssClasses.increaseButtonIcon,
                  size: "auto",
                })
              )
            );
          }),
          t
        );
      })(c.SurveyQuestionText);
    c.ReactQuestionFactory.Instance.registerQuestion("spinedit", function (e) {
      return c.createElement(Ct, e);
    });
    var Ot = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      St = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          Ot(t, e),
          (t.prototype.render = function () {
            var e = this.props.item;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement("span", {
                className: "spg-color-editor__color-swatch",
                style: { backgroundColor: e.value },
              }),
              c.createElement(
                "span",
                { key: 2 },
                this.renderLocString(e.locTitle, void 0, "locString")
              )
            );
          }),
          t
        );
      })(c.SurveyElementBase);
    c.ReactElementFactory.Instance.registerElement("color-item", function (e) {
      return c.createElement(St, e);
    });
    var Nt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Pt = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          Nt(t, e),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.questionBase;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderInput = function () {
            var e = this;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement("input", {
                id: this.question.inputId,
                disabled: this.isDisplayMode,
                className: this.question.cssClasses.control,
                ref: function (t) {
                  return e.setControl(t);
                },
                placeholder: this.question.renderedPlaceholder,
                autoComplete: "off",
                onKeyUp: function (t) {
                  return e.question.onKeyUp(t.nativeEvent);
                },
                onBlur: function (t) {
                  return e.question.onBlur(t.nativeEvent);
                },
                onChange: this.question.onChange,
                onBeforeInput: function (t) {
                  return e.question.onBeforeInput(t.nativeEvent);
                },
                "aria-required": this.question.ariaRequired,
                "aria-label": this.question.ariaLabel,
                "aria-invalid": this.question.ariaInvalid,
                "aria-describedby": this.question.ariaDescribedBy,
              })
            );
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return c.createElement(
              "div",
              {
                className: this.question.cssClasses.root,
                onKeyDown: function (t) {
                  return e.question.onKeyDown(t.nativeEvent);
                },
              },
              this.renderColorSwatch(),
              this.renderInput(),
              this.question.showDropdownAction
                ? this.renderDropdownAction()
                : null
            );
          }),
          (t.prototype.getValueCore = function () {
            return this.question.renderedValue;
          }),
          (t.prototype.renderColorSwatch = function () {
            var e = this;
            return c.createElement(
              "label",
              {
                className: this.question.getSwatchCss(),
                style: this.question.getSwatchStyle(),
              },
              c.createElement(c.SvgIcon, {
                iconName: this.question.cssClasses.swatchIcon,
                size: "auto",
              }),
              c.createElement("input", {
                type: "color",
                disabled: this.isDisplayMode,
                value: this.question.renderedColorValue,
                className: this.question.cssClasses.colorInput,
                onChange: function (t) {
                  return e.question.onColorInputChange(t.nativeEvent);
                },
                tabIndex: -1,
              })
            );
          }),
          (t.prototype.renderDropdownAction = function () {
            return c.createElement(
              c.Fragment,
              null,
              c.ReactElementFactory.Instance.createElement(
                "sv-action-bar-item",
                { item: this.question.dropdownAction }
              ),
              this.renderPopup()
            );
          }),
          (t.prototype.renderPopup = function () {
            return c.createElement(c.Popup, {
              model: this.question.dropdownAction.popupModel,
            });
          }),
          t
        );
      })(c.SurveyQuestionText);
    c.ReactQuestionFactory.Instance.registerQuestion("color", function (e) {
      return c.createElement(Pt, e);
    });
    var xt = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      jt = (function (e) {
        function t(t) {
          return e.call(this, t) || this;
        }
        return (
          xt(t, e),
          Object.defineProperty(t.prototype, "questionFile", {
            get: function () {
              return this.questionBase;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.getValueCore = function () {
            return this.question.renderedValue;
          }),
          (t.prototype.renderInput = function () {
            var e = this;
            return c.createElement(
              c.Fragment,
              null,
              c.createElement("input", {
                disabled: this.isDisplayMode,
                className: this.questionFile.cssClasses.control,
                placeholder: this.questionFile.renderedPlaceholder,
                ref: function (t) {
                  return e.setControl(t);
                },
                autoComplete: "off",
                type: "text",
                onBlur: function (t) {
                  return e.questionFile.onInputBlur(t.nativeEvent);
                },
                onChange: function (t) {
                  return e.questionFile.onInputChange(t.nativeEvent);
                },
              })
            );
          }),
          (t.prototype.renderFileInput = function () {
            var e = this;
            return c.createElement("input", {
              type: "file",
              disabled: this.isDisplayMode,
              className: this.questionFile.cssClasses.fileInput,
              id: this.questionFile.inputId,
              "aria-required": this.questionFile.ariaRequired,
              "aria-label": this.questionFile.ariaLabel,
              "aria-invalid": this.questionFile.ariaInvalid,
              "aria-describedby": this.questionFile.ariaDescribedBy,
              multiple: !1,
              title: this.questionFile.inputTitle,
              accept: this.questionFile.acceptedTypes,
              tabIndex: -1,
              onChange: function (t) {
                return e.questionFile.onFileInputChange(t.nativeEvent);
              },
            });
          }),
          (t.prototype.renderButtons = function () {
            return c.createElement(
              "div",
              { className: this.questionFile.cssClasses.buttonsContainer },
              this.renderClearButton(),
              this.renderChooseButton()
            );
          }),
          (t.prototype.renderClearButton = function () {
            return (0, c.attachKey2click)(
              c.createElement(
                "button",
                {
                  type: "button",
                  className: this.questionFile.cssClasses.clearButton,
                  disabled: this.questionFile.getIsClearButtonDisabled(),
                  onClick: this.questionFile.doClean,
                },
                c.createElement(c.SvgIcon, {
                  iconName: this.questionFile.cssClasses.clearButtonIcon,
                  size: "auto",
                  title: this.questionFile.clearButtonCaption,
                })
              )
            );
          }),
          (t.prototype.renderChooseButton = function () {
            var e = this;
            return (0, c.attachKey2click)(
              c.createElement(
                "label",
                {
                  role: "button",
                  onClick: function (t) {
                    return e.questionFile.chooseFiles(t.nativeEvent);
                  },
                  className: this.questionFile.getChooseButtonCss(),
                  htmlFor: this.questionFile.inputId,
                  "aria-label": this.questionFile.chooseButtonCaption,
                },
                c.createElement(c.SvgIcon, {
                  iconName: this.questionFile.cssClasses.chooseButtonIcon,
                  size: "auto",
                  title: this.questionFile.chooseButtonCaption,
                })
              )
            );
          }),
          (t.prototype.renderElement = function () {
            var e = this;
            return c.createElement(
              "div",
              {
                className: this.questionFile.cssClasses.root,
                ref: function (t) {
                  return e.setContent(t);
                },
                onDragEnter: this.questionFile.onDragEnter,
                onDragOver: this.questionFile.onDragOver,
                onDrop: this.questionFile.onDrop,
                onDragLeave: this.questionFile.onDragLeave,
                onKeyDown: function (t) {
                  return e.question.onKeyDown(t.nativeEvent);
                },
              },
              this.renderInput(),
              this.renderFileInput(),
              this.renderButtons()
            );
          }),
          t
        );
      })(c.SurveyQuestionText);
    c.ReactQuestionFactory.Instance.registerQuestion("fileedit", function (e) {
      return c.createElement(jt, e);
    });
    var qt,
      It = (function () {
        var e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        };
        return function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function o() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((o.prototype = n.prototype), new o()));
        };
      })(),
      Mt = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          It(t, e),
          Object.defineProperty(t.prototype, "question", {
            get: function () {
              return this.questionBase;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.renderElement = function () {
            var e = this.renderInput(),
              t = this.renderResetButton();
            return c.createElement(
              "div",
              { className: this.question.getRootClass() },
              e,
              t
            );
          }),
          (t.prototype.renderInput = function () {
            return c.ReactQuestionFactory.Instance.createQuestion(
              this.question.wrappedQuestionTemplate,
              {
                question: this.question,
                isDisplayMode: this.question.isInputReadOnly,
                creator: this,
              }
            );
          }),
          (t.prototype.renderResetButton = function () {
            var e = this;
            return c.createElement(
              "button",
              {
                className: this.question.cssClasses.resetButton,
                disabled: this.question.resetValueAdorner.isDisabled,
                title: this.question.resetValueAdorner.caption,
                onClick: function () {
                  return e.question.resetValueAdorner.resetValue();
                },
              },
              c.createElement(c.SvgIcon, {
                iconName: this.question.cssClasses.resetButtonIcon,
                size: "auto",
              })
            );
          }),
          t
        );
      })(c.SurveyQuestionElementBase);
    c.ReactQuestionFactory.Instance.registerQuestion(
      "textwithreset",
      function (e) {
        return c.createElement(Mt, e);
      }
    ),
      c.ReactQuestionFactory.Instance.registerQuestion(
        "commentwithreset",
        function (e) {
          return c.createElement(Mt, e);
        }
      ),
      (qt = "".concat("1.11.12")),
      (0, u.checkLibraryVersion)("".concat("1.11.12"), "survey-creator-react");
    var Tt = function () {
        return (
          (Tt =
            Object.assign ||
            function (e) {
              for (var t, n = 1, o = arguments.length; n < o; n++)
                for (var r in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              return e;
            }),
          Tt.apply(this, arguments)
        );
      },
      Rt = window.jQuery || window.$;
    function Ft(e, t, n) {
      void 0 === n && (n = {});
      var o = c.preact.createElement(y, Tt({ creator: e }, n));
      c.preact.render(o, t);
    }
    return (
      Rt &&
        Rt.fn.extend({
          SurveyCreator: function (e) {
            return this.each(function () {
              Ft(e.model, this, e);
            });
          },
        }),
      a
    );
  })()
);
