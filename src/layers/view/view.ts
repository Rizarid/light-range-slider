import { ConsolidatingObserver } from '../observers/consolidating-observer';
import { Handle } from './handle/handle';
import { Label } from './label/label';
import { Line } from './line/line';
import { HorizontalCalculator } from './orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from './orientation-calculator/vertical-calculator';
import { ProgressBar } from './progress-bar/progress-bar';
import { Scale } from './scale/scale';

interface IView {
  slider: HTMLElement;
  extremeValues: number[],
  currentValues: number[],
  margins: number[],
  scaleStep: number,
  isVertical: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  collection: string[] | number[] | HTMLElement[],
  isCollection: boolean
}

interface ICreateElements {
  margins: number[],
  extremeValues: number[],
  currentValues: number[],
  scaleStep: number,
  haveScale: boolean,
  haveLabel: boolean,
  isCollection: boolean
}

interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }
interface IViewUpdate {
  margins: number[],
  currentValues: number[],
  collection: string[] | number[] | HTMLElement[]
}

class View {
  private body: HTMLElement;

  private line: Line;

  private handles: Handle[];

  private labels: Label[];

  private progressBar: ProgressBar;

  private scale: Scale;

  private calculator: HorizontalCalculator | VerticalCalculator;

  private consolidatingObserver: ConsolidatingObserver = new ConsolidatingObserver();

  constructor(options: IView) {
    const {
      slider, extremeValues, currentValues, margins, scaleStep, isVertical, haveScale,
      haveLabel, collection, isCollection,
    } = options;

    this.body = slider;
    this.modifySlidersClass(isVertical);
    this.switchCalculator(isVertical);
    const { calculator } = this;

    this.createElements({
      margins, extremeValues, currentValues, scaleStep, haveScale, haveLabel, isCollection,
    });
    this.appendElements(haveLabel);

    if (haveScale) {
      this.scale = new Scale({
        scaleStep, extremeValues, calculator, isCollection, collection,
      });
      this.body.appendChild(this.scale.getBody());
      this.scale.adjustMarginToSize();
    }

    this.update({ margins, currentValues, collection });

    this.initConsolidatingObserver();
  }

  public subscribe(callback: ICallback): void {
    this.consolidatingObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.consolidatingObserver.unsubscribe(callback);
  }

  public getBody = (): HTMLElement => this.body;

  public getLineSize = (): number => this.line.getSize();

  public getLineLocation = (): number => this.line.getLocation();

  public update = (options: IViewUpdate): void => {
    this.handles.map((item, index) => item.update(options.margins[index]));
    this.progressBar.update(options.margins);
    
    if (this.labels) {
      this.labels.map((item, index) => item.update({
        margin: options.margins[index],
        value: options.currentValues[index],
        collection: options.collection,
      }));
    }
  };

  private modifySlidersClass(isVertical: boolean) :void {
    this.body.classList.add('light-range-slider');
    if (isVertical) this.body.classList.add('light-range-slider_vertical');
    else this.body.classList.remove('light-range-slider_vertical');
  }

  private createElements(options: ICreateElements): void {
    const { calculator, cleanWasActiveClass } = this;
    const {
      margins, currentValues, haveLabel, isCollection,
    } = options;

    this.line = new Line(calculator);

    this.handles = margins.map((item, index) => (
      new Handle({ index, calculator, cleanWasActiveClass })
    ));

    this.progressBar = new ProgressBar({ calculator });
    if (haveLabel) this.createLabels(currentValues, isCollection);
  }

  private appendElements(haveLabel: boolean): void {
    this.handles.map((item) => this.line.getBody().appendChild(item.getBody()));
    this.line.getBody().appendChild(this.progressBar.getBody());

    if (haveLabel) {
      this.labels.map((item) => this.line.getBody().appendChild(item.getBody()));
    }

    this.body.appendChild(this.line.getBody());
  }

  private createLabels(currentValues: number[], isCollection: boolean): void {
    this.labels = currentValues.map((item, index) => new Label({
      value: currentValues[index],
      calculator: this.calculator,
      isCollection,
    }));
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

  private initConsolidatingObserver(): void {
    this.consolidatingObserver.addObserver('line');
    this.line.subscribe(this.consolidatingObserver.getSubscribeFunction('line'));

    this.consolidatingObserver.addObserver('handles');
    this.handles.map((item) => (
      item.subscribe(this.consolidatingObserver.getSubscribeFunction('handles'))
    ));

    if (this.scale) {
      this.consolidatingObserver.addObserver('scale');
      this.scale.subscribe(this.consolidatingObserver.getSubscribeFunction('scale'));
    }
  }

  private cleanWasActiveClass = (): void => {
    this.handles.map((item) => item.getBody().classList.remove('light-range-slider__handle_was-active'));
  };
}

export { View };
