import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

interface IHandle { index: number, calculator: HorizontalCalculator | VerticalCalculator }
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
    this.body.addEventListener('pointerup', this.handleHandlePointerUp);
  };

  private handleHandlePointerDown = (event: PointerEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.target.setPointerCapture(event.pointerId);

    let cursorLocation = this.calculator.getCursorLocation(event);
    cursorLocation = this.calculator.pxToPercentages(cursorLocation);

    let handleMargin = this.calculator.getElementMargin(this.body);
    handleMargin = this.calculator.pxToPercentages(handleMargin);
    handleMargin = this.calculator.getNotAdjustMarginToSize(this.body, handleMargin);

    this.cursorOffsetRelativeHandleAtStartDragging = (
      Math.round((cursorLocation - handleMargin) * 100) / 100
    );

    event.target.addEventListener('pointermove', this.handleHandlePointerMove);
  };

  private handleHandlePointerUp = (event: PointerEvent): void => {
    this.cursorOffsetRelativeHandleAtStartDragging = 0;
    event.target.removeEventListener('pointermove', this.handleHandlePointerMove);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.target.releasePointerCapture(event.pointerId);
  };

  private handleHandlePointerMove = (event: PointerEvent): void => {
    let cursorLocation = this.calculator.getCursorLocation(event);
    cursorLocation = this.calculator.pxToPercentages(cursorLocation);

    const newValue = cursorLocation - this.cursorOffsetRelativeHandleAtStartDragging;

    const eventObject = {
      eventName: 'handleMove',
      eventBody: { handlesIndex: this.index, newValue: Math.round(newValue * 100) / 100 },
    };

    this.changeObserver.notify(eventObject);
  };
}

export { Handle };
