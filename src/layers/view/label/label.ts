import { ILabel, ILabelAddContent, ILabelUpdate } from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class Label {
  private body: HTMLElement;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private addContent: (options: ILabelAddContent) => void;

  constructor(options: ILabel) {
    const { calculator, isCollection } = options;

    this.calculator = calculator;
    this.createLabel();
    this.body.style.transition = '0s';

    this.addContent = isCollection
      ? this.addContentByIsCollection
      : this.addContentByNotIsCollection;

    this.body.style.transition = '0s';
  }

  public getBody = (): HTMLElement => this.body;

  public update = (options: ILabelUpdate): void => {
    const { margin, value, collection } = options;

    this.addContent({ value, collection });
    const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, adjustedMarginToSize);
  };

  public activateTransition = (): void => {
    this.body.style.transition = '';
  };

  private createLabel(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__label';
  }

  private addContentByIsCollection = (options: ILabelAddContent): void => {
    const { value, collection } = options;
    this.body.innerHTML = collection[value].toString();
  };

  private addContentByNotIsCollection = (options: ILabelAddContent): void => {
    const { value } = options;
    this.body.innerHTML = value.toString();
  };
}

export { Label };
