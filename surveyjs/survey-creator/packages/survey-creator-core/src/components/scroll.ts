import {
  Base,
  SurveyModel,
  SurveyTemplateRendererTemplateData,
  QuestionRowModel,
  DragTypeOverMeEnum,
  property
} from "survey-core";
import { SurveyCreatorModel } from "../creator-base";
require("./row.scss");

export class ScrollViewModel {
  private _containerElementValue: HTMLElement;
  private _rootElementValue: HTMLElement;
  private _scrollbarElement: HTMLElement;
  private _containerBodyElement: HTMLElement;
  private _scrollbarSizerElement: HTMLElement;
  private _containerBodyResizeObserver: ResizeObserver;

  private _lockScroll = false;

  constructor() {
    //this.dragTypeOverMe = this.row.dragTypeOverMe;
  }

  public setRootElement(element: HTMLElement) {
    this._containerElementValue = element?.querySelector(".svc-scroll__scroller");
    this._scrollbarElement = element?.querySelector(".svc-scroll__scrollbar");
    this._scrollbarSizerElement = element?.querySelector(".svc-scroll__scrollbar-sizer");
    this._containerBodyElement = element?.querySelector(".svc-scroll__container");
    if (!element) return;
    this._containerBodyResizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const height = entry.contentBoxSize
          ? entry.contentBoxSize[0].blockSize
          : entry.contentRect.width;
        this._scrollbarSizerElement.style.height = height + "px";
        this._scrollbarElement.style.visibility = this._scrollbarElement.clientHeight >= height ? "hidden" : "";
      }
    });
    this._containerBodyResizeObserver.observe(this._containerBodyElement);
  }

  public onScrollContainer() {
    this._lockScroll = true;
    this._scrollbarElement.scrollTop = this._containerElementValue.scrollTop;
  }

  public onScrollScrollbar() {
    if (this._lockScroll) {
      this._lockScroll = false;
      return;
    }
    this._containerElementValue.scrollTop = this._scrollbarElement.scrollTop;
  }

  public unsubscribeRootElement() {
    if (!!this._containerBodyResizeObserver) {
      this._containerBodyResizeObserver.disconnect();
      this._containerBodyResizeObserver = undefined;
    }
  }
}