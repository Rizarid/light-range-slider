import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IHandle {
  margin: number,
  value: number,
  calculator: HorizontalCalculator | VerticalCalculator
}

class Label {
  private body: HTMLElement;

  private calculator: HorizontalCalculator | VerticalCalculator;

  constructor(options: IHandle) {
    this.calculator = options.calculator;
    this.createLabel();
    this.update(options.margin, options.value);
  }

  public getBody = (): HTMLElement => this.body;

  public update = (margin: number, value: number): void => {
    const correctMargin = this.calculator.getAdjustMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, correctMargin);
    this.body.innerHTML = value.toString();
  };

  public adjustMarginToSize = (): void => {
    const margin = this.calculator.getElementMargin(this.body);
    const adjustMargin = this.calculator.getAdjustMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, adjustMargin);
  };

  private createLabel(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__label';
  }
}

export { Label };
