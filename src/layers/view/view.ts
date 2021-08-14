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
    this.initConsolidatingObserver();
  }

  public subscribe(callback: ICallback): void {
    this.consolidatingObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.consolidatingObserver.unsubscribe(callback);
  }

  public getLineSize = () => this.line.getSize();

  public getLineLocation = () => this.line.getLocation();

  private createElements(options: ICreateElements): void {
    this.line = new Line(this.calculator);
    this.createHandles(options.margins);
    this.progressBar = new ProgressBar({ margins: options.margins, calculator: this.calculator });
    if (options.haveLabel) this.createLabels(options.margins, options.currentValues);
    if (options.haveLabel) {
      this.createScale({ extremeValues: options.extremeValues, scaleStep: options.scaleStep });
    }
  }

  private appendElements(options: { haveLabel: boolean, haveScale: boolean }): void {
    this.handles.map((item) => this.line.getBody().appendChild(item.getBody()));
    this.line.getBody().appendChild(this.progressBar.getBody());

    if (options.haveLabel) {
      this.labels.map((item) => this.line.getBody().appendChild(item.getBody()));
    }

    this.body.appendChild(this.line.getBody());

    if (options.haveScale) {
      this.body.appendChild(this.scale.getBody());
    }
  }

  private createHandles(margins: number[]): void {
    this.handles = margins.map((item, index) => new Handle({
      index,
      margin: item,
      calculator: this.calculator,
    }));
  }

  private createLabels(margins: number[], currentValues: number[]): void {
    margins.map((item, index) => new Label({
      margin: item,
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
