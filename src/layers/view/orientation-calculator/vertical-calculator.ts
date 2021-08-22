/* eslint-disable no-param-reassign */

interface IVerticalCalculator { getLineSize: () => number, getLineLocation: () => number }
interface IEventObject { pageX: number, pageY: number }

class VerticalCalculator {
  private getLineSize: () => number;

  private getLineLocation: () => number;

  constructor(options: IVerticalCalculator) {
    const { getLineLocation, getLineSize } = options;
    this.getLineLocation = getLineLocation;
    this.getLineSize = getLineSize;
  }

  public getElementsSize = (target: HTMLElement): number => target.offsetHeight;

  public getCursorLocation = (eventObject: IEventObject): number => {
    const cursorLocationRelativeSlider = eventObject.pageY - this.getLineLocation();
    return this.getReverseValueRelativeLine(cursorLocationRelativeSlider);
  };

  public getElementsLocation = (target: HTMLElement): number => {
    const topMarginFromWindow = target.getBoundingClientRect().top;
    return topMarginFromWindow + window.scrollY;
  };

  public getElementMargin = (target: HTMLElement): number => (
    this.getReverseValueRelativeLine(target.offsetTop)
  );

  public setElementsMargin = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    const reverseNewValue: number = 100 - newValueInPercent;
    style.top = `${reverseNewValue}%`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    const heightInPercent = parseFloat(style.height);
    const reverseNewValue: number = 100 - newValueInPercent;
    const adjustedNewValueToElementHeight = reverseNewValue - heightInPercent;
    style.top = `${adjustedNewValueToElementHeight}%`;
  };

  public setElementsSize = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    style.height = `${newValueInPercent}%`;
  };

  public getAdjustedMarginToSize = (target: HTMLElement, marginInPercent: number): number => {
    const halfElementSize = this.getElementsSize(target) / 2;
    return marginInPercent + this.pxToPercentages(halfElementSize);
  };

  public getNotAdjustedMarginToSize = (
    target: HTMLElement, adjustedMarginInPercent: number,
  ): number => {
    const halfElementSize = this.getElementsSize(target) / 2;
    return adjustedMarginInPercent - this.pxToPercentages(halfElementSize);
  };

  public pxToPercentages(value: number): number {
    return (value / this.getLineSize()) * 100;
  }

  public percentagesToPx(value: number): number {
    return (value / 100) * this.getLineSize();
  }

  private getReverseValueRelativeLine = (value: number): number => this.getLineSize() - value;
}

export { VerticalCalculator };
