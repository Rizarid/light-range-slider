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
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean
}

interface ICreateElements {
  margins: number[],
  extremeValues: number[],
  currentValues: number[],
  scaleStep: number,
  haveScale: boolean,
  haveLabel: boolean
}

interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

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
    this.body = options.slider;
    this.modifySlidersClass(options.isVertical);
    this.switchCalculator(options.isVertical);

    this.createElements({
      margins: options.margins,
      extremeValues: options.extremeValues,
      currentValues: options.currentValues,
      scaleStep: options.scaleStep,
      haveScale: options.haveScale,
      haveLabel: options.haveLabel,
    });

    this.appendElements({ haveLabel: options.haveLabel, haveScale: options.haveScale });

    if (options.haveScale) {
      this.createScale({ extremeValues: options.extremeValues, scaleStep: options.scaleStep });
      this.body.appendChild(this.scale.getBody());
      this.scale.adjustMarginToSize();
    }

    this.update({ margins: options.margins, currentValues: options.currentValues });

    this.initConsolidatingObserver();
  }

  public subscribe(callback: ICallback): void {
    this.consolidatingObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.consolidatingObserver.unsubscribe(callback);
  }

  public getLineSize = (): number => this.line.getSize();

  public getLineLocation = (): number => this.line.getLocation();

  public update = (options: { margins: number[], currentValues: number[] }): void => {
    this.handles.map((item, index) => item.update(options.margins[index]));
    this.progressBar.update(options.margins);

    this.labels.map((item, index) => item.update(
      options.margins[index],
      options.currentValues[index],
    ));
  };

  private modifySlidersClass(isVertical: boolean) :void {
    this.body.classList.add('light-range-slider');
    if (isVertical) this.body.classList.add('light-range-slider_vertical');
  }

  private createElements(options: ICreateElements): void {
    this.line = new Line(this.calculator);
    this.createHandles(options.margins);
    this.progressBar = new ProgressBar({ calculator: this.calculator });
    if (options.haveLabel) this.createLabels(options.currentValues);
  }

  private appendElements(options: { haveLabel: boolean, haveScale: boolean }): void {
    this.handles.map((item) => this.line.getBody().appendChild(item.getBody()));
    this.line.getBody().appendChild(this.progressBar.getBody());

    if (options.haveLabel) {
      this.labels.map((item) => this.line.getBody().appendChild(item.getBody()));
    }

    this.body.appendChild(this.line.getBody());
  }

  private createHandles(margins: number[]): void {
    this.handles = margins.map((item, index) => new Handle({
      index,
      calculator: this.calculator,
    }));
  }

  private createLabels(currentValues: number[]): void {
    this.labels = currentValues.map((item, index) => new Label({
      value: currentValues[index],
      calculator: this.calculator,
    }));
  }

  private createScale(options: { extremeValues: number[], scaleStep: number }): void {
    this.scale = new Scale({
      scaleStep: options.scaleStep,
      extremeValues: options.extremeValues,
      calculator: this.calculator,
    });
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

    this.consolidatingObserver.addObserver('scale');
    this.scale.subscribe(this.consolidatingObserver.getSubscribeFunction('scale'));
  }
}

export { View };
