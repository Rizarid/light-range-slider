import {
  IView,
  ICreateElements,
  ICallback,
  IScale,
  SliderEventName,
  IOrientationCalculator,
  IViewUpdateData,
  IObserver,
  ISliderEventBody,
} from '../interfaces/interfaces';
import { Observer } from '../observer/Observer';
import { Handle } from './handle/Handle';
import { Label } from './label/Label';
import { Line } from './line/Line';
import { HorizontalCalculator } from './orientation-calculator/HorizontalCalculator';
import { VerticalCalculator } from './orientation-calculator/VerticalCalculator';
import { ProgressBar } from './progress-bar/ProgressBar';
import { Scale } from './scale/Scale';

class View {
  private body: HTMLElement;

  private line: Line;

  private handles: Handle[];

  private labels: Label[];

  private progressBar: ProgressBar;

  private scale: Scale;

  private calculator: IOrientationCalculator;

  private observer: IObserver = new Observer();

  constructor(options: IView) {
    const {
      slider, extremeValues, currentValues, margins, scaleStep, isVertical, haveScale,
      haveLabel, collection, isCollection, haveProgressBar, indexOfLastChangedHandle,
    } = options;

    this.body = slider;
    this.modifySlidersClass(isVertical);
    this.switchCalculator(isVertical);

    this.createElements({
      margins,
      currentValues,
      haveLabel,
      isCollection,
      haveProgressBar,
    });

    this.appendElements(haveLabel, haveProgressBar);

    if (haveScale) {
      this.createScale({
        scaleStep,
        extremeValues,
        calculator: this.calculator,
        isCollection,
        collection,
        observer: this.observer,
      });
    }

    this.update({ margins, currentValues, collection, indexOfLastChangedHandle, haveScale });
    this.observer.subscribe({
      eventName: SliderEventName.pointerDown,
      function: this.handlePointerDown,
    });
    this.observer.subscribe({
      eventName: SliderEventName.pointerUp,
      function: this.handlePointerUp,
    });
    if (indexOfLastChangedHandle) {
      this.handlePointerDown({ index: indexOfLastChangedHandle });
      this.handlePointerUp({ index: indexOfLastChangedHandle });
    }
    this.activateTransitions();

    if (haveScale) {
      this.scale.checkScaleStep();
    }
  }

  public checkScaleStep = (): void => this.scale.checkScaleStep();

  public subscribe(callback: ICallback): void {
    this.observer.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.observer.unsubscribe(callback);
  }

  public getBody = (): HTMLElement => this.body;

  public getLineSize = (): number => this.line.getSize();

  public getLineLocation = (): number => this.line.getLocation();

  public update = (options: IViewUpdateData): void => {
    const {
      margins,
      currentValues,
      collection,
      indexOfLastChangedHandle,
    } = options;

    this.handles.forEach((item, index) => item.update(margins[index]));
    if (this.progressBar) this.progressBar.update(margins);

    if (this.labels) {
      this.labels.forEach((item, index) => {
        const oldValue = Number(item.getBody().textContent);
        const isOldValueEquelZero = oldValue === 0;
        const isOldValueEquelCurentValue = oldValue === currentValues[index];

        if (isOldValueEquelZero || !isOldValueEquelCurentValue) {
          item.update({
            margin: margins[index],
            value: currentValues[index],
            collection,
          });
        }
      });
    }

    if (indexOfLastChangedHandle !== undefined) {
      this.handlePointerDown({ index: indexOfLastChangedHandle });
      this.handlePointerUp({ index: indexOfLastChangedHandle });
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
    const { margins, currentValues, haveLabel, isCollection, haveProgressBar } = options;

    this.line = new Line({ calculator: this.calculator, observer: this.observer });

    this.handles = margins.map((item, index) => (
      new Handle({ index, calculator: this.calculator, observer: this.observer })
    ));

    if (haveProgressBar) {
      this.progressBar = new ProgressBar({
        calculator: this.calculator,
      });
    }

    if (haveLabel) {
      this.labels = currentValues.map((item, index) => new Label({
        index,
        observer: this.observer,
        calculator: this.calculator,
        isCollection,
      }));
    }
  }

  private appendElements(haveLabel: boolean, haveProgressBar: boolean): void {
    this.handles.map((item) => this.line.getBody().appendChild(item.getBody()));
    if (haveProgressBar) this.line.getBody().appendChild(this.progressBar.getBody());

    if (haveLabel) {
      this.labels.map((item) => this.line.getBody().appendChild(item.getBody()));
    }

    this.body.appendChild(this.line.getBody());
  }

  private switchCalculator(isVertical: boolean): void {
    this.calculator = isVertical
      ? new VerticalCalculator({
        getLineSize: this.getLineSize,
        getLineLocation: this.getLineLocation,
      })
      : new HorizontalCalculator({
        getLineSize: this.getLineSize,
        getLineLocation: this.getLineLocation,
      });
  }

  private handlePointerDown = (eventBody: ISliderEventBody):void => {
    const { index } = eventBody;
    if (typeof index === 'number') {
      this.handles.map((item) => item.removeWasActive());
      this.handles[index].activate();

      if (this.labels) {
        this.labels.map((item) => item.removeWasActive());
        this.labels[index].activate();
      }
    }
  };

  private handlePointerUp = (eventBody: ISliderEventBody):void => {
    const { index } = eventBody;
    if (typeof index === 'number') {
      this.handles.map((item) => item.deactivate());
      this.handles[index].addWasActive();

      if (this.labels) {
        this.labels.map((item) => item.deactivate());
        this.labels[index].addWasActive();
      }
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
