import {
  IOrientationCalculator,
  IOrientationCalculatorProps,
} from '../../interfaces/interfaces';

interface IClickEventObject { pageX: number, pageY: number }

class HorizontalCalculator implements IOrientationCalculator {
  private getLineSize: () => number;

  private getLineLocation: () => number;

  constructor(options: IOrientationCalculatorProps) {
    const { getLineLocation, getLineSize } = options;
    this.getLineLocation = getLineLocation;
    this.getLineSize = getLineSize;
  }

  public getElementsSize = (target: HTMLElement): number => target.offsetWidth;

  public getCursorLocation = (eventObject: IClickEventObject): number => (
    eventObject.pageX - this.getLineLocation()
  );

  public getElementsLocation = (target: HTMLElement): number => {
    const leftMarginFromWindow = target.getBoundingClientRect().left;
    return leftMarginFromWindow + window.scrollX;
  };

  public getElementMargin = (target: HTMLElement): number => target.offsetLeft;

  public setElementsMargin = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    style.left = `${newValueInPercent}%`;
  };

  public setProgressBarMargin = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    style.left = `${newValueInPercent}%`;
  };

  public setElementsSize = (target: HTMLElement, newValueInPercent: number): void => {
    const { style } = target;
    style.width = `${newValueInPercent}%`;
  };

  public getAdjustedMarginToSize = (target: HTMLElement, marginInPercent: number): number => {
    const halfElementSize = this.getElementsSize(target) / 2;
    return marginInPercent - this.pxToPercentages(halfElementSize);
  };

  public getNotAdjustedMarginToSize = (
    target: HTMLElement, adjustedMarginInPercent: number,
  ): number => {
    const halfElementSize = this.getElementsSize(target) / 2;
    return adjustedMarginInPercent + this.pxToPercentages(halfElementSize);
  };

  public pxToPercentages(value: number): number {
    return (value / this.getLineSize()) * 100;
  }

  public percentagesToPx(value: number): number {
    return (value / 100) * this.getLineSize();
  }

  public segmentSize = (numberOfSegments: number): number => (
    this.getLineSize() / numberOfSegments
  );

  public getIncreaseCoeff = (items: HTMLElement[]): number => {
    const scaleSize = items.reduce((sum, item) => sum + this.getElementsSize(item), 0);
    return (scaleSize * 1.2) / this.getLineSize();
  };
}

export { HorizontalCalculator };
