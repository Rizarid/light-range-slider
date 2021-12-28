import { IHandle, IOrientationCalculator, SliderEventName } from '../../interfaces/interfaces';
import { Observer } from '../../observer/observer';

class Handle {
  private body: HTMLElement;

  private index: number;

  private cursorOffsetRelativeHandleAtStartDragging: number;

  private calculator: IOrientationCalculator;

  private observer: Observer;

  private ARROWS_KEYBORD_CODES = ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'];
  private RIGHT_AND_UP_ARROWS_KEYBORD_CODES = ['ArrowRight', 'ArrowUp'];

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
    this.body.addEventListener('pointerdown', this.handlePointerDown);
    this.body.addEventListener('pointerup', this.handlePointerUp);
    this.body.addEventListener('click', this.handleClick);
    this.body.addEventListener('keydown', this.handleKeyDown);
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

  private handlePointerDown = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    ((target as HTMLElement).setPointerCapture as (pointerId: number) => void)(pointerId);
    this.body.classList.add('light-range-slider__handle_active');

    const cursorLocationInPercent = this.getCursorLocationInPercent(event);
    const adjustedHandlesMarginToSize = this.getNotAdjustedMargin(this.body);

    this.cursorOffsetRelativeHandleAtStartDragging = (
      cursorLocationInPercent - adjustedHandlesMarginToSize
    );

    target.addEventListener('pointermove', this.handlePointerMove);

    this.observer.notify({
      eventName: SliderEventName.pointerDown,
      eventBody: { index: this.index },
    });
  };

  private handlePointerUp = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    target.removeEventListener('pointermove', this.handlePointerMove);

    ((target as HTMLElement).releasePointerCapture as (pointerId: number) => void)(pointerId);
    this.cursorOffsetRelativeHandleAtStartDragging = 0;

    this.observer.notify({
      eventName: SliderEventName.pointerUp,
      eventBody: { index: this.index },
    });
  };

  private handlePointerMove = (event: PointerEvent): void => {
    const cursorLocationInPercent = this.getCursorLocationInPercent(event);
    const newValue = cursorLocationInPercent - this.cursorOffsetRelativeHandleAtStartDragging;

    this.observer.notify({
      eventName: SliderEventName.pointerMove,
      eventBody: { index: this.index, newValue },
    });
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    const { code } = event;

    if (this.ARROWS_KEYBORD_CODES.includes(code, 0)) {
      const isIncrement = (this.RIGHT_AND_UP_ARROWS_KEYBORD_CODES.includes(code, 0));
      const eventName = isIncrement 
        ? SliderEventName.increment 
        : SliderEventName.decrement;

      this.observer.notify({
        eventName,
        eventBody: { index: this.index },
      });
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };
}

export { Handle };
