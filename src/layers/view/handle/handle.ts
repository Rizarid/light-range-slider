import { IHandle } from '../../interfaces/interfaces';
import { Observer } from '../../observer/observer';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';

class Handle {
  private body: HTMLElement;

  private index: number;

  private cursorOffsetRelativeHandleAtStartDragging: number;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private observer: Observer;

  constructor(options: IHandle) {
    const { index, calculator, observer } = options;

    this.calculator = calculator;
    this.observer = observer;
    this.index = index;

    this.createHandle();
    this.addListeners();
    this.body.style.transition = '0s';
  }

  public getBody = (): HTMLElement => this.body;

  public update = (margin: number): void => {
    const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, adjustedMarginToSize);
  };

  public activateTransition = (): void => {
    this.body.style.transition = '';
  };

  public addWasActive = (): void => this.body.classList.add('light-range-slider__handle_was-active');

  public removeWasActive = (): void => this.body.classList.remove('light-range-slider__handle_was-active');

  public activate = ():void => this.body.classList.add('light-range-slider__handle_active');

  public deactivate = ():void => this.body.classList.remove('light-range-slider__handle_active');

  private createHandle = (): void => {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__handle';
    this.body.tabIndex = 0;
  };

  private addListeners = (): void => {
    this.body.addEventListener('pointerdown', this.handleHandlePointerDown);
    this.body.addEventListener('pointerup', this.handleHandlePointerUp);
    this.body.addEventListener('click', this.handleHandleClick);
    this.body.addEventListener('keydown', this.handleHandleKeyDown);
  };

  private getCursorLocationInPercent = (event: PointerEvent): number => {
    const cursorLocation = this.calculator.getCursorLocation(event);
    return this.calculator.pxToPercentages(cursorLocation);
  };

  private getNotAdjustedMargin = (target: HTMLElement): number => {
    const handlesMargin = this.calculator.getElementMargin(target);
    const handlesMarginInPercent = this.calculator.pxToPercentages(handlesMargin);
    return this.calculator.getNotAdjustedMarginToSize(this.body, handlesMarginInPercent);
  };

  private handleHandlePointerDown = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    ((target as HTMLElement).setPointerCapture as (pointerId: number) => void)(pointerId);
    this.body.classList.add('light-range-slider__handle_active');

    const cursorLocationInPercent = this.getCursorLocationInPercent(event);
    const adjustedHandlesMarginToSize = this.getNotAdjustedMargin(this.body);

    this.cursorOffsetRelativeHandleAtStartDragging = (
      cursorLocationInPercent - adjustedHandlesMarginToSize
    );

    target.addEventListener('pointermove', this.handleHandlePointerMove);

    const eventObject = {
      eventName: 'handlePointerDown',
      eventBody: { index: this.index },
    };

    this.observer.notify(eventObject);
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

    this.observer.notify(eventObject);
  };

  private handleHandlePointerMove = (event: PointerEvent): void => {
    const cursorLocationInPercent = this.getCursorLocationInPercent(event);
    const newValue = cursorLocationInPercent - this.cursorOffsetRelativeHandleAtStartDragging;

    const eventObject = {
      eventName: 'handleMove',
      eventBody: { index: this.index, newValue },
    };

    this.observer.notify(eventObject);
  };

  private handleHandleKeyDown = (event: KeyboardEvent): void => {
    const { code } = event;
    let eventName: string;

    if (['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'].includes(code, 0)) {
      const isIncrement = (['ArrowRight', 'ArrowUp'].includes(code, 0));
      eventName = isIncrement ? 'handleIncrement' : 'handleDecrement';

      const eventObject = {
        eventName,
        eventBody: { index: this.index },
      };

      this.observer.notify(eventObject);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private handleHandleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };
}

export { Handle };
