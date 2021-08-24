import { ChangeObserver } from '../../observers/change-observer';
import {
  IScale, ICreateScaleItems, IScaleAddContent, IGetScaleItem, ICallback,
} from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class Scale {
  private body: HTMLElement;

  private items: HTMLElement[];

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver;

  private addContent: (options: IScaleAddContent) => void;

  constructor(options: IScale) {
    const {
      scaleStep, extremeValues, collection, calculator, isCollection, changeObserver,
    } = options;

    this.calculator = calculator;
    this.changeObserver = changeObserver;

    this.addContent = isCollection
      ? this.addContentByIsCollection
      : this.addContentByNotIsCollection;

    this.createScale();
    this.createScaleItems({ scaleStep, extremeValues, collection });
    this.items.map((item) => this.body.appendChild(item));
    this.addListeners();
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.unsubscribe(callback);
  }

  public getBody = (): HTMLElement => this.body;

  public adjustMarginToSize = (): void => {
    this.items.map((item) => {
      const margin = this.calculator.getElementMargin(item);
      const marginInPercent = this.calculator.pxToPercentages(margin);
      const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(
        item, marginInPercent,
      );

      this.calculator.setElementsMargin(item, adjustedMarginToSize);
      return null;
    });
  };

  public remove = (): void => {
    this.body.remove();
  };

  private createScale(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__scale';
  }

  private getScaleItem = (options: IGetScaleItem): HTMLElement => {
    const { value, extremeValues, collection } = options;
    const [minValue, maxValue] = extremeValues;

    const item = document.createElement('div');
    item.className = 'light-range-slider__scale-item';

    this.addContent({ target: item, value, collection });
    const marginInPercent = this.calcMarginOfScaleItem(value, minValue, maxValue);
    this.calculator.setElementsMargin(item, marginInPercent);

    return item;
  };

  private calcMarginOfScaleItem = (value: number, minValue: number, maxValue: number): number => {
    const range = maxValue - minValue;
    const valueInRange = value - minValue;
    return (valueInRange / range) * 100;
  };

  private createScaleItems = (options: ICreateScaleItems): void => {
    const { extremeValues, scaleStep, collection } = options;
    this.items = [];

    let i = extremeValues[0];
    for (i; i < extremeValues[1]; i += scaleStep) {
      this.items.push(this.getScaleItem({ value: i, extremeValues, collection }));
    }

    this.items.push(this.getScaleItem({ value: extremeValues[1], extremeValues, collection }));
  };

  private addListeners = (): void => {
    this.items.map((item) => {
      item.addEventListener('click', this.handleScaleItemClick);
      return null;
    });
  };

  private handleScaleItemClick = (event: PointerEvent): void => {
    const { target } = event;
    const newValue = (target as HTMLElement).innerHTML;

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue },
    };

    this.changeObserver.notify(eventObject);
  };

  private addContentByIsCollection = (options: IScaleAddContent): void => {
    const { target, collection, value } = options;
    target.innerHTML = collection[value].toString();
  };

  private addContentByNotIsCollection = (options: IScaleAddContent): void => {
    const { target, value } = options;
    target.innerHTML = value.toString();
  };
}

export { Scale };
