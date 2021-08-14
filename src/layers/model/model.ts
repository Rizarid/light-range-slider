import { ChangeObserver } from '../controller/change-observer';

interface IModel {
  extremeValues: number[],
  currentValues: number[];
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean
}

interface ICallback {
  function: (
    eventObject: {
      eventName: string,
      eventBody
    }
  ) => void
}

class Model {
  private extremeValues: number[];

  private currentValues: number[];

  private step: number;

  private scaleStep: number;

  private isVertical: boolean;

  private isInterval: boolean;

  private haveScale: boolean;

  private haveLabel: boolean;

  private changeObserver: ChangeObserver = new ChangeObserver();

  constructor(options: IModel) {
    this.extremeValues = options.extremeValues;
    this.currentValues = options.currentValues;
    this.step = options.step;
    this.scaleStep = options.scaleStep;
    this.isVertical = options.isVertical;
    this.isInterval = options.isInterval;
    this.haveLabel = options.haveLabel;
    this.haveScale = options.haveScale;
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public getExtremeValues = (): number[] => this.extremeValues;

  public setExtremeValues = (newValues: number[]): void => {
    this.extremeValues = newValues;
    this.correctCurrentValueToInterval();
    this.sendFullUpdate();
  };

  public getCurrentValues = (): number[] => this.currentValues;

  public setCurrentValues = (newValues: number[]): void => {
    this.currentValues = newValues;
    this.correctCurrentValueToInterval();
    this.correctQuantityCurrentValues();
    this.sendValuesUpdate();
  };

  public setCurrentValue = (options: { index: number, newValue: number }): void => {
    if (options.index === 0) {
      this.currentValues[0] = this.currentValues[1] < options.newValue
        ? this.currentValues[1]
        : options.newValue;
    } else {
      this.currentValues[1] = this.currentValues[0] > options.newValue
        ? this.currentValues[0]
        : options.newValue;
    }

    this.correctCurrentValueToInterval();
    this.correctQuantityCurrentValues();
    this.sendValuesUpdate();
  };

  public getStep = (): number => this.step;

  public setStep = (newValue: number): void => {
    this.step = newValue;
    this.sendFullUpdate();
  };

  public getScaleStep = (): number => this.scaleStep;

  public setScaleStep = (newValue: number): void => {
    this.scaleStep = newValue;
    this.sendFullUpdate();
  };

  public getIsVertical = (): boolean => this.isVertical;

  public setIsVertical = (newValue: boolean): void => {
    this.isVertical = newValue;
    this.sendFullUpdate();
  };

  public getIsInterval = (): boolean => this.isInterval;

  public setIsInterval = (newValue: boolean): void => {
    this.isInterval = newValue;
    this.correctQuantityCurrentValues();
    this.sendFullUpdate();
  };

  public getHaveLabel = (): boolean => this.haveLabel;

  public setHaveLabel = (newValue: boolean): void => {
    this.haveLabel = newValue;
    this.sendFullUpdate();
  };

  public getHaveScale = (): boolean => this.haveScale;

  public setHaveScale = (newValue: boolean): void => {
    this.haveScale = newValue;
    this.sendFullUpdate();
  };

  private correctCurrentValueToInterval(): void {
    this.currentValues = this.currentValues.map((item) => (
      (this.extremeValues[0] > item) ? this.extremeValues[0] : item
    ));

    this.currentValues = this.currentValues.map((item) => (
      (this.extremeValues[1] < item) ? this.extremeValues[1] : item
    ));
  }

  private correctQuantityCurrentValues(): void {
    if (this.isInterval && (this.currentValues.length === 1)) {
      this.currentValues = [this.currentValues[0], this.currentValues[0]];
    }

    if (!this.isInterval && (this.currentValues.length === 2)) {
      this.currentValues = [this.currentValues[0]];
    }
  }

  private sendFullUpdate(): void {
    const eventObject = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: this.extremeValues,
        currentValues: this.currentValues,
        step: this.step,
        scaleStep: this.scaleStep,
        isVertical: this.isVertical,
        isInterval: this.isInterval,
        haveScale: this.haveScale,
        haveLabel: this.haveLabel,
      },
    };

    this.changeObserver.notify(eventObject);
  }

  private sendValuesUpdate(): void {
    const eventObject = {
      eventName: 'valuesUpdate',
      eventBody: {
        currentValues: this.currentValues,
      },
    };

    this.changeObserver.notify(eventObject);
  }
}

export { Model };
