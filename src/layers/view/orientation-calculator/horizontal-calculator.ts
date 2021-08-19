/* eslint-disable no-param-reassign */
interface IHorizontalCalculator { getLineSize: () => number, getLineLocation: () => number }
interface IEventObject { pageX: number, pageY: number }

class HorizontalCalculator {
  private getLineSize: () => number;

  private getLineLocation: () => number;

  constructor(options: IHorizontalCalculator) {
    this.getLineLocation = options.getLineLocation;
    this.getLineSize = options.getLineSize;
  }

  public getElementsSize = (target: HTMLElement | EventTarget): number => target.offsetWidth;

  public getCursorLocation = (eventObject: IEventObject): number => {
    const adjustedPageX: number = eventObject.pageX - this.getLineLocation();
    return adjustedPageX;
  };

  public getElementsLocation = (target: HTMLElement | EventTarget): number => (
    target.getBoundingClientRect().left + pageXOffset
  );

  public getElementMargin = (target: HTMLElement | EventTarget): number => target.offsetLeft;

  public getHandleMargin = (target: HTMLElement | EventTarget): number => target.offsetLeft;

  public setElementsMargin = (target: HTMLElement | EventTarget, newValue: number): void => {
    target.style.left = `${newValue}%`;
  };

  public setProgressBarMargin = (target: HTMLElement | EventTarget, newValue: number): void => {
    target.style.left = `${newValue}%`;
  };

  public setScaleItemMarginAfterAdjust = (target: HTMLElement | EventTarget, newValue: number): void => {
    target.style.left = `${newValue}%`;
  };

  public setElementsSize = (target: HTMLElement | EventTarget, newValue: number): void => {
    target.style.width = `${newValue}%`;
  };

  public getAdjustMarginToSize = (target: HTMLElement | EventTarget, margin: number): number => (
    margin - (this.getElementsSize(target) / this.getLineSize() / 2) * 100
  );

  public getNotAdjustMarginToSize = (target: HTMLElement | EventTarget, adjustMargin: number): number => (
    adjustMargin + (this.getElementsSize(target) / this.getLineSize() / 2) * 100
  );

  public getScaleItemAdjustMarginToSize = (target: HTMLElement | EventTarget, margin: number): number => (
    margin - (this.getElementsSize(target) / this.getLineSize() / 2) * 100
  );

  public getScaleItemNotAdjustMarginToSize = (
    target: HTMLElement | EventTarget, adjustMargin: number,
  ): number => (
    adjustMargin + (this.getElementsSize(target) / this.getLineSize() / 2) * 100
  );

  public getScaleMarginRatio = (quantityItems: number): number => (
    ((this.getLineSize() / (quantityItems - 1)) / this.getLineSize()) * 100
  );

  public pxToPercentages(value: number): number {
    return (value / this.getLineSize()) * 100;
  }

  public percentagesToPx(value: number): number {
    return (value / 100) * this.getLineSize();
  }
}

export { HorizontalCalculator };
