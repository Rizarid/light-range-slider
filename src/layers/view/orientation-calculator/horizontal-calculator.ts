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

  public getElementsSize = (target: HTMLElement): number => target.offsetWidth;

  public getCursorLocation = (eventObject: IEventObject): number => {
    const adjustedPageX: number = eventObject.pageX - this.getLineLocation();
    return adjustedPageX;
  };

  public getElementsLocation = (target: HTMLElement): number => target.getBoundingClientRect().left;

  public getElementMargin = (target: HTMLElement): number => target.offsetLeft;

  public setElementsMargin = (target: HTMLElement, newValue: number): void => {
    target.style.left = `${newValue}%`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValue: number): void => {
    target.style.left = `${newValue}%`;
  };

  public setElementsSize = (target: HTMLElement, newValue: number): void => {
    target.style.width = `${newValue}%`;
  };

  public getAdjustMarginToSize = (target: HTMLElement, margin: number): number => (
    margin - Math.round((this.getElementsSize(target) / this.getLineSize() / 2) * 100 * 10) / 10
  );

  public getNotAdjustMarginToSize = (target: HTMLElement, adjustMargin: number): number => (
    adjustMargin + Math.round((this.getElementsSize(target) / this.getLineSize() / 2) * 100 * 10) / 10
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
