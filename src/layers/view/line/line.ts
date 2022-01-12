import {
  ILine,
  IOrientationCalculator,
  SliderEventName,
  IObserver,
} from '../../interfaces/interfaces';

class Line {
  private body: HTMLElement;

  private isResizeBlocked = true;

  private calculator: IOrientationCalculator;

  private observer: IObserver;

  private resizeObserver: ResizeObserver = new ResizeObserver(() => {
    if (!this.isResizeBlocked) {
      this.observer.notify({
        eventName: SliderEventName.lineResize,
        eventBody: {},
      });
      this.isResizeBlocked = true;
      setTimeout(() => { this.isResizeBlocked = false; }, 100);
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

    this.observer.notify({
      eventName: SliderEventName.lineClick,
      eventBody: { newValue: valueInPercentage },
    });
  };
}

export { Line };
