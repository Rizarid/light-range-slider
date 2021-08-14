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
    target.style.left = `${newValue}px`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValue: number): void => {
    target.style.left = `${newValue}px`;
  };

  public setElementsSize = (target: HTMLElement, newValue: number): void => {
    target.style.width = `${newValue}px`;
  };

  public getAdjustMarginToSize = (target: HTMLElement, margin: number): number => (
    margin - this.getElementsSize(target) / 2
  );

  public getNotAdjustMarginToSize = (target: HTMLElement, adjustMargin: number): number => (
    adjustMargin + this.getElementsSize(target) / 2
  );

  public getScaleMarginRatio = (quantityItems: number): number => (
    this.getLineSize() / (quantityItems - 1)
  );
}

export { HorizontalCalculator };
