/* eslint-disable no-param-reassign */

interface IVerticalCalculator { getLineSize: () => number, getLineLocation: () => number }
interface IEventObject { pageX: number, pageY: number }

class VerticalCalculator {
  private getLineSize: () => number;

  private getLineLocation: () => number;

  constructor(options: IVerticalCalculator) {
    this.getLineLocation = options.getLineLocation;
    this.getLineSize = options.getLineSize;
  }

  public getElementsSize = (target: HTMLElement): number => target.offsetHeight;

  public getCursorLocation = (eventObject: IEventObject): number => {
    const adjustedPageY: number = eventObject.pageY - this.getLineSize();
    return this.getLineLocation() - adjustedPageY;
  };

  public getElementsLocation = (target: HTMLElement): number => target.getBoundingClientRect().top;

  public getElementMargin = (target: HTMLElement): number => target.offsetTop;

  public setElementsMargin = (target: HTMLElement, newValue: number): void => {
    const reverseNewValue: number = 100 - newValue;
    target.style.top = `${reverseNewValue}%`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValue: number): void => {
    const reverseNewValue: number = 100 - newValue - this.pxToPercentages(this.getElementsSize(target));
    target.style.top = `${reverseNewValue}%`;
  };

  public setElementsSize = (target: HTMLElement, newValue: number): void => {
    target.style.height = `${newValue}%`;
  };

  public getAdjustMarginToSize = (target: HTMLElement, margin: number): number => (
    margin + (this.getElementsSize(target) / this.getLineSize() / 2) * 100
  );

  public getNotAdjustMarginToSize = (target: HTMLElement, adjustMargin: number): number => (
    adjustMargin - (this.getElementsSize(target) / this.getLineSize() / 2) * 100
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

export { VerticalCalculator };
