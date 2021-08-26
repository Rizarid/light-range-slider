import { IProgressBar } from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class ProgressBar {
  private body: HTMLElement;

  private index: number;

  private calculator: HorizontalCalculator | VerticalCalculator;

  constructor(options: IProgressBar) {
    const { calculator } = options;
    this.calculator = calculator;
    this.createProgressBar();
    this.body.style.transition = '0s';
  }

  public getBody = (): HTMLElement => this.body;

  public update = (margins: number[]): void => {
    const size = this.getProgressBarSize(margins);
    const margin = this.getProgressBarMargin(margins);

    this.calculator.setElementsSize(this.body, size);
    this.calculator.setProgressBarMargin(this.body, margin);
  };

  public activateTransition = (): void => {
    this.body.style.transition = '';
  };

  private createProgressBar(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__progress-bar';
  }

  private getProgressBarSize = (margins: number[]): number => {
    if (margins.length === 1) return margins[0];
    return margins[1] - margins[0];
  };

  private getProgressBarMargin = (margins: number[]): number => {
    if (margins.length === 1) return 0;
    return margins[0];
  };
}

export { ProgressBar };
