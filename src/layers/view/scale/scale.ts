import {
  IScale,
  ICreateScaleItems,
  IScaleAddContent,
  IGetScaleItem,
  SliderEventName,
  IOrientationCalculator,
  IObserver,
} from '../../interfaces/interfaces';

class Scale {
  private body: HTMLElement;

  private items: HTMLElement[];

  private calculator:IOrientationCalculator;

  private observer: IObserver;

  private addContent: (options: IScaleAddContent) => void;

  constructor(options: IScale) {
    const {
      scaleStep, extremeValues, collection, calculator, isCollection, observer,
    } = options;

    this.calculator = calculator;
    this.observer = observer;

    this.addContent = isCollection
      ? this.addContentByIsCollection
      : this.addContentByNotIsCollection;

    this.createScale();
    this.createScaleItems({ scaleStep, extremeValues, collection });
    this.items.map((item) => this.body.appendChild(item));
    this.addListeners();
  }

  public getBody = (): HTMLElement => this.body;

  public adjustMarginToSize = (): void => {
    this.items.forEach((item) => {
      const margin = this.calculator.getElementMargin(item);
      const marginInPercent = this.calculator.pxToPercentages(margin);
      const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(
        item, marginInPercent,
      );

      this.calculator.setElementsMargin(item, adjustedMarginToSize);
    });
  };

  private createScale(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__scale';
  }

  private getScaleItem = (options: IGetScaleItem): HTMLElement => {
    const {
      value,
      extremeValues,
      collection,
      scaleStep,
      endsOfInterval = 'none',
    } = options;
    const [minValue, maxValue] = extremeValues;

    const item = document.createElement('div');
    if (endsOfInterval !== 'none') {
      if (endsOfInterval === 'start') {
        item.className = 'light-range-slider__scale-item light-range-slider__scale-item_interval-start';
      } else {
        item.className = 'light-range-slider__scale-item light-range-slider__scale-item_interval-end';
      }
    } else {
      item.className = 'light-range-slider__scale-item';
    }

    item.tabIndex = 0;

    this.addContent({ target: item, value, collection, scaleStep, endsOfInterval });
    const marginInPercent = this.calcMarginOfScaleItem(value, minValue, maxValue);
    this.calculator.setElementsMargin(item, marginInPercent);

    return item;
  };

  private calcMarginOfScaleItem = (value: number, minValue: number, maxValue: number): number => {
    const range = maxValue - minValue;
    const valueInRange = value - minValue;
    return (valueInRange / range) * 100;
  };

  private getNumberOfDecimalPlaces = (value: number): number => {
    const str = value.toString();
    if (str.includes('.', 0)) {
      const lastElementOfSplitedStr = str.split('.').pop();
      if (lastElementOfSplitedStr !== undefined) return lastElementOfSplitedStr.length;
    }
    return 0;
  };

  private createScaleItems = (options: ICreateScaleItems): void => {
    const { extremeValues, scaleStep, collection } = options;
    this.items = [];

    this.items.push(this.getScaleItem({
      value: extremeValues[0],
      extremeValues,
      collection,
      scaleStep,
      endsOfInterval: 'start',
    }));

    for (let i = extremeValues[0] + scaleStep; i < extremeValues[1]; i += scaleStep) {
      this.items.push(this.getScaleItem({
        value: i,
        extremeValues,
        collection,
        scaleStep,
        endsOfInterval: 'none',
      }));
    }

    this.items.push(this.getScaleItem({
      value: extremeValues[1],
      extremeValues,
      collection,
      scaleStep,
      endsOfInterval: 'end',
    }));
  };

  private addListeners = (): void => {
    this.items.forEach((item) => {
      item.addEventListener('click', this.handleScaleItemClick);
      item.addEventListener('keydown', this.handleScaleItemKeyDown);
    });
  };

  private handleScaleItemClick = (event: MouseEvent): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      this.observer.notify({
        eventName: SliderEventName.scaleItemClick,
        eventBody: { newValue: target.innerHTML },
      });
    }
  };

  private handleScaleItemKeyDown = (event: KeyboardEvent): void => {
    if ((event.code === 'Enter' && (event.target !== null))) {
      event.target.dispatchEvent(new Event('click'));
    }
  };

  private addContentByIsCollection = (options: IScaleAddContent): void => {
    const { target, collection, value } = options;
    target.innerHTML = collection[value].toString();
  };

  private addContentByNotIsCollection = (options: IScaleAddContent): void => {
    const { target, value, scaleStep, endsOfInterval } = options;
    const accuracy = 10 ** this.getNumberOfDecimalPlaces(scaleStep);
    target.innerHTML = (endsOfInterval === 'none')
      ? (Math.round(value * accuracy) / accuracy).toString()
      : value.toString();
  };
}

export { Scale };
