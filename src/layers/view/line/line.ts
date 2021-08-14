import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IEventObject { pageX: number, pageY: number }
interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

class Line {
  private body: HTMLElement;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  private resizeObserver: ResizeObserver = new ResizeObserver(() => {
    const eventObject = {
      eventName: 'lineResize',
      eventBody: { lineSize: this.calculator.getElementsSize(this.body) },
    };

    this.changeObserver.notify(eventObject);
  });

  constructor(calculator: HorizontalCalculator | VerticalCalculator) {
    this.calculator = calculator;
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

  private createLine(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__line';
  }

  private addListeners(): void {
    this.body.addEventListener('click', this.handleLineClick);
  }

  private handleLineClick = (event: IEventObject): void => {
    const cursorLocation = this.calculator.getCursorLocation(event);
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { cursorLocation },
    };

    this.changeObserver.notify(eventObject);
  };
}

export { Line };
