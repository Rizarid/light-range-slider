import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IHandle { value: number, calculator: HorizontalCalculator | VerticalCalculator }

class Label {
  private body: HTMLElement;

  private calculator: HorizontalCalculator | VerticalCalculator;

  constructor(options: IHandle) {
    this.calculator = options.calculator;
    this.createLabel();
  }

  public getBody = (): HTMLElement => this.body;

  public update = (margin: number, value: number): void => {
    const correctMargin = this.calculator.getAdjustMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, correctMargin);
    this.body.innerHTML = value.toString();
  };

  private createLabel(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__label';
  }
}

export { Label };
