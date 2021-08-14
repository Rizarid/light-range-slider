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
    const reverseNewValue: number = this.getLineSize() - newValue;
    target.style.top = `${reverseNewValue}px`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValue: number): void => {
    const reverseNewValue: number = this.getLineSize() - newValue - this.getElementsSize(target);
    target.style.top = `${reverseNewValue}px`;
  };

  public setElementsSize = (target: HTMLElement, newValue: number): void => {
    target.style.height = `${newValue}px`;
  };

  public getAdjustMarginToSize = (target: HTMLElement, margin: number): number => (
    margin + this.getElementsSize(target) / 2
  );

  public getNotAdjustMarginToSize = (target: HTMLElement, adjustMargin: number): number => (
    adjustMargin - this.getElementsSize(target) / 2
  );

  public getScaleMarginRatio = (quantityItems: number): number => (
    this.getLineSize() / (quantityItems - 1)
  );
}

export { VerticalCalculator };
