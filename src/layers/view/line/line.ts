import { Observer } from '../../observer/observer';
import { ILine } from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class Line {
  private body: HTMLElement;

  private isResizeBlocked = true;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private observer: Observer;

  private resizeObserver: ResizeObserver = new ResizeObserver(() => {
    if (!this.isResizeBlocked) {
      const eventObject = {
        eventName: 'lineResize',
        eventBody: {},
      };

      this.observer.notify(eventObject);
    }
  });

  constructor(options: ILine) {
    const { calculator, observer } = options;

    this.calculator = calculator;
    this.observer = observer;

    this.createLine();
    this.addListeners();

    this.resizeObserver.observe(this.body);
  }

  public getBody = (): HTMLElement => this.body;

  public getSize = (): number => this.calculator.getElementsSize(this.body);

  public getLocation = (): number => this.calculator.getElementsLocation(this.body);

  public setIsResizeBlocked = (newValue: boolean): void => {
    this.isResizeBlocked = newValue;
  };

  private createLine(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__line';
  }

  private addListeners(): void {
    this.body.addEventListener('click', this.handleLineClick);
  }

  private handleLineClick = (event: MouseEvent): void => {
    const valueInPx = this.calculator.getCursorLocation(event);
    const valueInPercentage = this.calculator.pxToPercentages(valueInPx);

    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue: valueInPercentage },
    };

    this.observer.notify(eventObject);
  };
}

export { Line };
