import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IScale {
  scaleStep: number, extremeValues: number[], calculator: HorizontalCalculator | VerticalCalculator
}
interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

class Scale {
  private body: HTMLElement;

  private items: HTMLElement[];

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  constructor(options: IScale) {
    this.calculator = options.calculator;
    this.createScale();
    this.createScaleItems(options.scaleStep, options.extremeValues);
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
      const adjustMar = this.calculator.getAdjustMarginToSize(item, margin);
      this.calculator.setElementsMargin(item, adjustMar);
      return null;
    });
  };

  private createScale(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__scale';
  }

  private getScaleItem = (value: number): HTMLElement => {
    const item = document.createElement('div');
    item.className = 'light-range-slider__scale-item';
    item.innerHTML = value.toString();
    return item;
  };

  private createScaleItems = (scaleStep: number, extremeValues: number[]): void => {
    this.items = [];

    let i = extremeValues[0];
    for (i; i < extremeValues[1]; i += scaleStep) {
      this.items.push(this.getScaleItem(i));
    }

    this.items.push(this.getScaleItem(extremeValues[1]));

    const marginRatio = this.calculator.getScaleMarginRatio(this.items.length);

    this.items.map((item, index) => {
      this.calculator.setElementsMargin(item, index * marginRatio);
      return null;
    });
  };

  private addListeners = (): void => {
    this.items.map((item) => {
      item.addEventListener('click', this.handleScaleItemClick);
      return null;
    });
  };

  private handleScaleItemClick = (event: PointerEvent): void => {
    const newValue = Number(event.target.textContent!);

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue },
    };

    this.changeObserver.notify(eventObject);
  };
}

export { Scale };
