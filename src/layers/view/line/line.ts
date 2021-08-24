import { ChangeObserver } from '../../observers/change-observer';
import { ICallback, ILine } from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class Line {
  private body: HTMLElement;

  private isResizeBlocked = true;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver;

  private resizeObserver: ResizeObserver = new ResizeObserver(() => {
    if (!this.isResizeBlocked) {
      const eventObject = {
        eventName: 'lineResize',
        eventBody: {},
      };

      this.changeObserver.notify(eventObject);
    }
  });

  constructor(options: ILine) {
    const { calculator, changeObserver } = options;

    this.calculator = calculator;
    this.changeObserver = changeObserver;

    this.createLine();
    this.addListeners();

    this.resizeObserver.observe(this.body);
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.unsubscribe(callback);
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
    let newValue = this.calculator.getCursorLocation(event);
    newValue = this.calculator.pxToPercentages(newValue);

    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue },
    };

    this.changeObserver.notify(eventObject);
  };
}

export { Line };
