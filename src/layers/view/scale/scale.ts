import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IScale {
  scaleStep: number,
  extremeValues: number[],
  calculator: HorizontalCalculator | VerticalCalculator,
  isCollection: boolean,
  collection: string[] | number[] | HTMLElement[]
}
interface ICreateScaleItems{
  scaleStep: number,
  extremeValues: number[],
  collection: string[] | number[] | HTMLElement[]
}
interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }
interface IAddContent {
  target: HTMLElement,
  value: number,
  collection: string[] | number[] | HTMLElement[]
}
interface IGetScaleItem {
  value: number,
  extremeValues: number[],
  collection: string[] | number[] | HTMLElement[]
}

class Scale {
  private body: HTMLElement;

  private items: HTMLElement[];

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  private addContent: (options: IAddContent) => void;

  constructor(options: IScale) {
    const {
      scaleStep, extremeValues, collection, calculator, isCollection,
    } = options;
    console.log(calculator);
    this.calculator = calculator;

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
      let margin = this.calculator.getElementMargin(item);
      margin = this.calculator.pxToPercentages(margin);
      const adjustMargin = this.calculator.getScaleItemAdjustMarginToSize(item, margin);
      this.calculator.setScaleItemMarginAfterAdjust(item, adjustMargin);
      return null;
    });
  };

  private createScale(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__scale';
  }

  private getScaleItem = (options: IGetScaleItem): HTMLElement => {
    const { value, extremeValues, collection } = options;

    const item = document.createElement('div');
    item.className = 'light-range-slider__scale-item';
    this.addContent({ target: item, value, collection });

    const margin = ((value - extremeValues[0]) / (extremeValues[1] - extremeValues[0])) * 100;
    this.calculator.setElementsMargin(item, margin);

    return item;
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
    let newValue = this.calculator.getElementMargin(target);
    newValue = this.calculator.pxToPercentages(newValue);
    newValue = this.calculator.getScaleItemNotAdjustMarginToSize(target, newValue);

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue },
    };

    this.changeObserver.notify(eventObject);
  };

  private addContentByIsCollection = (options: IAddContent): void => {
    const { target } = options;
    target.innerHTML = options.collection[options.value].toString();
  };

  private addContentByNotIsCollection = (options: IAddContent): void => {
    const { target } = options;
    target.innerHTML = options.value.toString();
  };
}

export { Scale };
