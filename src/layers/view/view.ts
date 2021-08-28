import { Handle } from './handle/handle';
import { Label } from './label/label';
import { Line } from './line/line';
import { HorizontalCalculator } from './orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from './orientation-calculator/vertical-calculator';
import { ProgressBar } from './progress-bar/progress-bar';
import { Scale } from './scale/scale';
import {
  IView, ICreateElements, IViewUpdate, ICallback, IScaleUpdateBody, IScale, IEventObject,
} from '../interfaces/interfaces';
import { ChangeObserver } from '../observers/change-observer';

class View {
  private body: HTMLElement;

  private line: Line;

  private handles: Handle[];

  private labels: Label[];

  private progressBar: ProgressBar;

  private scale: Scale;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  constructor(options: IView) {
    const {
      slider, extremeValues, currentValues, margins, scaleStep, isVertical, haveScale,
      haveLabel, collection, isCollection, haveProgressBar,
    } = options;

    this.body = slider;
    this.modifySlidersClass(isVertical);
    this.switchCalculator(isVertical);
    const { calculator } = this;

    this.createElements({
      margins, extremeValues, currentValues, scaleStep, haveScale, haveLabel, isCollection,
      haveProgressBar,
    });
    this.appendElements(haveLabel, haveProgressBar);

    if (haveScale) {
      const { changeObserver } = this;
      this.createScale({
        scaleStep, extremeValues, calculator, isCollection, collection, changeObserver,
      });
    }

    this.update({ margins, currentValues, collection });
    this.changeObserver.subscribe({ function: this.handleHandleEvents });

    this.activateTransitions();
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.unsubscribe(callback);
  }

  public getBody = (): HTMLElement => this.body;

  public getLineSize = (): number => this.line.getSize();

  public getLineLocation = (): number => this.line.getLocation();

  public update = (options: IViewUpdate): void => {
    const { margins, currentValues, collection } = options;
    this.handles.map((item, index) => item.update(margins[index]));
    if (this.progressBar) this.progressBar.update(margins);

    if (this.labels) {
      this.labels.map((item, index) => item.update({
        margin: margins[index],
        value: currentValues[index],
        collection,
      }));
    }
  };

  public scaleUpdate = (options: IScaleUpdateBody): void => {
    const { scaleStep, extremeValues, isCollection, collection, haveScale } = options;
    const { calculator, changeObserver } = this;

    if (haveScale) {
      this.scale.remove();
      this.createScale({
        scaleStep, extremeValues, calculator, isCollection, collection, changeObserver,
      });
    }
  };

  public setIsResizeBlocked = (newValue: boolean): void => {
    this.line.setIsResizeBlocked(newValue);
  };

  private createScale = (options: IScale): void => {
    this.scale = new Scale(options);
    this.body.appendChild(this.scale.getBody());
    this.scale.adjustMarginToSize();
  };

  private modifySlidersClass(isVertical: boolean) :void {
    this.body.classList.add('light-range-slider');
    if (isVertical) this.body.classList.add('light-range-slider_vertical');
    else this.body.classList.remove('light-range-slider_vertical');
  }

  private createElements(options: ICreateElements): void {
    const { calculator, changeObserver } = this;
    const { margins, currentValues, haveLabel, isCollection, haveProgressBar } = options;

    this.line = new Line({ calculator, changeObserver });

    this.handles = margins.map((item, index) => (
      new Handle({ index, calculator, changeObserver })
    ));

    if (haveProgressBar) this.progressBar = new ProgressBar({ calculator });
    if (haveLabel) this.createLabels(currentValues, isCollection);
  }

  private appendElements(haveLabel: boolean, haveProgressBar: boolean): void {
    this.handles.map((item) => this.line.getBody().appendChild(item.getBody()));
    if (haveProgressBar) this.line.getBody().appendChild(this.progressBar.getBody());

    if (haveLabel) {
      this.labels.map((item) => this.line.getBody().appendChild(item.getBody()));
    }

    this.body.appendChild(this.line.getBody());
  }

  private createLabels(currentValues: number[], isCollection: boolean): void {
    this.labels = currentValues.map((item, index) => new Label({
      calculator: this.calculator,
      isCollection,
    }));
  }

  private switchCalculator(isVertical: boolean): void {
    const { getLineSize, getLineLocation } = this;

    this.calculator = isVertical
      ? new VerticalCalculator({ getLineSize, getLineLocation })
      : new HorizontalCalculator({ getLineSize, getLineLocation });
  }

  private handleHandleEvents = (event: IEventObject):void => {
    const { eventName } = event;
    const { index } = (event.eventBody as { index: number });

    if (eventName === 'handlePointerDown') {
      this.handles.map((item) => item.getBody().classList.remove('light-range-slider__handle_was-active'));
      if (this.labels) this.labels.map((item) => item.getBody().classList.remove('light-range-slider__label_was-active'));
      this.handles[index].getBody().classList.add('light-range-slider__handle_active');
      if (this.labels) this.labels[index].getBody().classList.add('light-range-slider__label_active');
    }

    if (eventName === 'handlePointerUp') {
      this.handles.map((item) => item.getBody().classList.remove('light-range-slider__handle_active'));
      if (this.labels) this.labels.map((item) => item.getBody().classList.remove('light-range-slider__label_active'));
      this.handles[index].getBody().classList.add('light-range-slider__handle_was-active');
      if (this.labels) this.labels[index].getBody().classList.add('light-range-slider__label_was-active');
    }
  };

  private activateTransitions = (): void => {
    setTimeout(() => {
      this.handles.map((item) => item.activateTransition());
      if (this.labels) this.labels.map((item) => item.activateTransition());
      if (this.progressBar) this.progressBar.activateTransition();
    }, 500);
  };
}

export { View };
