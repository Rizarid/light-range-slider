import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IHandle {
  value: number,
  calculator: HorizontalCalculator | VerticalCalculator,
  isCollection: boolean
}

interface IAddContent { value: number, collection: string[] | number[] | HTMLElement[] }

interface IUpdate { margin: number, value: number, collection: string[] | number[] | HTMLElement[] }

class Label {
  private body: HTMLElement;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private addContent: (options: IAddContent) => void;

  constructor(options: IHandle) {
    this.calculator = options.calculator;
    this.createLabel();
    this.addContent = options.isCollection
      ? this.addContentByIsCollection
      : this.addContentByNotIsCollection;
  }

  public getBody = (): HTMLElement => this.body;

  public update = (options: IUpdate): void => {
    console.log(options.value, options.collection);
    this.addContent({ value: options.value, collection: options.collection });
    const correctMargin = this.calculator.getAdjustMarginToSize(this.body, options.margin);
    this.calculator.setElementsMargin(this.body, correctMargin);
  };

  private createLabel(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__label';
  }

  private addContentByIsCollection = (options: IAddContent): void => {
    this.body.innerHTML = options.collection[options.value].toString();
  };

  private addContentByNotIsCollection = (options: IAddContent): void => {
    this.body.innerHTML = options.value.toString();
  };
}

export { Label };
