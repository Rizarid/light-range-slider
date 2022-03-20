import {
  ILabel,
  ILabelAddContent,
  ILabelUpdate,
  IOrientationCalculator,
  SliderEventName,
  IObserver
} from '../../interfaces/interfaces';

class Label {
  private body: HTMLElement;

  index: number;

  private calculator: IOrientationCalculator;

  private cursorOffsetRelativeHandleAtStartDragging: number;


  private observer: IObserver;

  private addContent: (options: ILabelAddContent) => void;

  constructor(options: ILabel) {
    const { index, calculator, isCollection, observer } = options;

    this.index = index;
    this.observer = observer;
    this.calculator = calculator;
    this.createLabel();
    this.body.style.transition = '0s';

    this.addContent = isCollection
      ? this.addContentByIsCollection
      : this.addContentByNotIsCollection;

    this.addListeners();
    this.body.style.transition = '0s';
  }

  public getBody = (): HTMLElement => this.body;

  public update = (options: ILabelUpdate): void => {
    const { margin, value, collection } = options;

    this.addContent({ value, collection });
    const adjustedMarginToSize = this.calculator.getAdjustedMarginToSize(this.body, margin);
    this.calculator.setElementsMargin(this.body, adjustedMarginToSize);
  };

  public activateTransition = (): void => {
    this.body.style.transition = '';
  };

  public addWasActive = (): void => this.body.classList.add('light-range-slider__label_was-active');

  public removeWasActive = (): void => this.body.classList.remove('light-range-slider__label_was-active');

  public activate = ():void => this.body.classList.add('light-range-slider__label_active');

  public deactivate = ():void => this.body.classList.remove('light-range-slider__label_active');

  private createLabel(): void {
    this.body = document.createElement('div');
    this.body.className = 'light-range-slider__label';
  }

  private addContentByIsCollection = (options: ILabelAddContent): void => {
    const { value, collection } = options;
    this.body.innerHTML = collection[value].toString();
  };

  private addContentByNotIsCollection = (options: ILabelAddContent): void => {
    const { value } = options;
    this.body.innerHTML = value.toString();
  };

  private handlePointerDown = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    if (target instanceof HTMLElement) target.setPointerCapture(pointerId);
    this.body.classList.add('light-range-slider__label_active');

    const cursorLocationInPercent = this.getCursorLocationInPercent(event);
    const adjustedHandlesMarginToSize = this.getNotAdjustedMargin(this.body);

    this.cursorOffsetRelativeHandleAtStartDragging = (
      cursorLocationInPercent - adjustedHandlesMarginToSize
    );

    if (target instanceof HTMLElement) {
      target.addEventListener('pointermove', this.handlePointerMove);
    }

    this.observer.notify({
      eventName: SliderEventName.pointerDown,
      eventBody: { index: this.index },
    });
  };

  private handlePointerUp = (event: PointerEvent): void => {
    const { target, pointerId } = event;
    if (target instanceof HTMLElement) {
      target.removeEventListener('pointermove', this.handlePointerMove);
    }
    if (target instanceof HTMLElement) target.releasePointerCapture(pointerId);
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

  private handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
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

  private addListeners = (): void => {
    this.body.addEventListener('pointerdown', this.handlePointerDown);
    this.body.addEventListener('pointerup', this.handlePointerUp);
    this.body.addEventListener('click', this.handleClick);
  };
}

export { Label };
