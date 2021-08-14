import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IHandle {
  index: number, margin: number, calculator: HorizontalCalculator | VerticalCalculator
}
interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

class Handle {
  private body: HTMLElement;

  private index: number;

  private cursorOffsetRelativeHandleAtStartDragging: number;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  constructor(options: IHandle) {
    this.calculator = options.calculator;
    this.index = options.index;
    this.createHandle();
    this.update(options.margin);
    this.addListeners();
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.unsubscribe(callback);
  }

  public getBody = (): HTMLElement => this.body;

  public update = (margin: number): void => {
    const correctMargin = this.calculator.getAdjustMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, correctMargin);
  };

  private createHandle(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__handle';
  }

  private addListeners = (): void => {
    this.body.addEventListener('pointerdown', this.handleHandlePointerDown);
    this.body.addEventListener('pointerdown', this.handleHandlePointerUp);
  };

  private handleHandlePointerDown = (event: PointerEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.target.setPointerCapture(event.pointerId);
    const cursorLocation = this.calculator.getCursorLocation(event);

    let handleMargin = this.calculator.getElementMargin(this.body);
    handleMargin = this.calculator.getNotAdjustMarginToSize(this.body, handleMargin);
    this.cursorOffsetRelativeHandleAtStartDragging = cursorLocation - handleMargin;

    event.target.addEventListener('pointermove', this.handleHandlePointerMove);
  };

  private handleHandlePointerUp = (event: PointerEvent): void => {
    this.cursorOffsetRelativeHandleAtStartDragging = 0;
    event.target.removeEventListener('pointermove', this.handleHandlePointerMove);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.target.releasePointerCapture(event.pointerId);
  };

  private handleHandlePointerMove = (event: PointerEvent): void => {
    const cursorLocation = this.calculator.getCursorLocation(event);
    const newValue = cursorLocation - this.cursorOffsetRelativeHandleAtStartDragging;

    const eventObject = {
      eventName: 'handleMove',
      eventBody: { handlesIndex: this.index, newValue },
    };

    this.changeObserver.notify(eventObject);
  };
}

export { Handle };
