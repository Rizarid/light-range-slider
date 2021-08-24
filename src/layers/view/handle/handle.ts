import { ChangeObserver } from '../../observers/change-observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';
import { IHandle, ICallback } from '../../interfaces/interfaces';

class Handle {
  private body: HTMLElement;

  private index: number;

  private cursorOffsetRelativeHandleAtStartDragging: number;

  private isPointerMoveBlocked = false;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver;

  constructor(options: IHandle) {
    const { index, calculator, changeObserver } = options;

    this.calculator = calculator;
    this.changeObserver = changeObserver;
    this.index = index;

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
    const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, adjustedMarginToSize);
  };

  private createHandle(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__handle';
  }

  private addListeners = (): void => {
    this.body.addEventListener('pointerdown', this.handleHandlePointerDown);
    this.body.addEventListener('pointerup', this.handleHandlePointerUp);
    this.body.addEventListener('click', this.handleHandleClick);
  };

  private handleHandlePointerDown = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    ((target as HTMLElement).setPointerCapture as (pointerId: number) => void)(pointerId);
    this.body.classList.add('light-range-slider__handle_active');

    const cursorLocation = this.calculator.getCursorLocation(event);
    const cursorLocationInPercent = this.calculator.pxToPercentages(cursorLocation);

    const handlesMargin = this.calculator.getElementMargin(this.body);
    const handlesMarginInPercent = this.calculator.pxToPercentages(handlesMargin);
    const adjustedHandlesMarginToSize = this.calculator.getNotAdjustedMarginToSize(
      this.body, handlesMarginInPercent,
    );

    this.cursorOffsetRelativeHandleAtStartDragging = (
      cursorLocationInPercent - adjustedHandlesMarginToSize
    );

    target.addEventListener('pointermove', this.handleHandlePointerMove);

    const eventObject = {
      eventName: 'handlePointerDown',
      eventBody: { index: this.index },
    };

    this.changeObserver.notify(eventObject);
  };

  private handleHandlePointerUp = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    target.removeEventListener('pointermove', this.handleHandlePointerMove);

    ((target as HTMLElement).releasePointerCapture as (pointerId: number) => void)(pointerId);
    this.cursorOffsetRelativeHandleAtStartDragging = 0;

    const eventObject = {
      eventName: 'handlePointerUp',
      eventBody: { index: this.index },
    };

    this.changeObserver.notify(eventObject);
  };

  private handleHandlePointerMove = (event: PointerEvent): void => {
    if (!this.isPointerMoveBlocked) {
      const cursorLocation = this.calculator.getCursorLocation(event);
      const cursorLocationInPercent = this.calculator.pxToPercentages(cursorLocation);
      const newValue = cursorLocationInPercent - this.cursorOffsetRelativeHandleAtStartDragging;

      const eventObject = {
        eventName: 'handleMove',
        eventBody: { handlesIndex: this.index, newValue },
      };

      this.changeObserver.notify(eventObject);

      this.isPointerMoveBlocked = true;
      setTimeout(() => { this.isPointerMoveBlocked = false; }, 100);
    }
  };

  private handleHandleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };
}

export { Handle };
