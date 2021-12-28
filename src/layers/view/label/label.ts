import {
  ILabel,
  ILabelAddContent,
  ILabelUpdate,
  IOrientationCalculator
} from '../../interfaces/interfaces';

class Label {
  private body: HTMLElement;

  private calculator: IOrientationCalculator;

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

  public addWasActive = (): void => this.body.classList.add('light-range-slider__label_was-active');

  public removeWasActive = (): void => this.body.classList.remove('light-range-slider__label_was-active');

  public activate = ():void => this.body.classList.add('light-range-slider__label_active');

  public deactivate = ():void => this.body.classList.remove('light-range-slider__label_active');

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
