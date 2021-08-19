import {
  IModel, IUpdateCallback, IFullUpdate, IValuesUpdate, IOutsideUpdate,
} from '../interfaces/interfaces';
import { ChangeObserver } from '../observers/change-observer';

class Model {
  private extremeValues: number[];

  private currentValues: number[];

  private callbacks: ((updateObject: IOutsideUpdate) => void)[] = [];

  private collection: string[] | number[] | HTMLElement[] = [];

  private step: number;

  private scaleStep: number;

  private isVertical: boolean;

  private isInterval: boolean;

  private haveScale: boolean;

  private haveLabel: boolean;

  private isCollection: boolean;

  private changeObserver: ChangeObserver = new ChangeObserver();

  private isInit = true;

  constructor(options: IModel) {
    this.setExtremeValues(options.extremeValues);
    this.setCurrentValues(options.currentValues);
    this.setStep(options.step);
    this.setScaleStep(options.scaleStep);
    this.setIsVertical(options.isVertical);
    this.setIsInterval(options.isInterval);
    this.setHaveLabel(options.haveLabel);
    this.setHaveScale(options.haveScale);
    this.setCallbacks(options.callbacks);
    this.setCollection(options.collection);
    this.setIsCollection(options.isCollection);

    this.correctCurrentValueToInterval();
    this.correctQuantityCurrentValues();

    this.isInit = false;
  }

  public subscribe(callback: IUpdateCallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: IUpdateCallback): void {
    this.changeObserver.subscribe(callback);
  }

  public getExtremeValues = (): number[] => this.extremeValues;

  public setExtremeValues = (newValues: number[]): void => {
    this.extremeValues = newValues;

    if (!this.isInit) {
      this.correctCurrentValueToInterval();
      this.sendUpdate();
    }
  };

  public setMinValue = (newValue: number): void => {
    const { extremeValues } = this;
    extremeValues[0] = newValue;
    this.setExtremeValues(extremeValues);
  };

  public setMaxValue = (newValue: number): void => {
    const { extremeValues } = this;
    extremeValues[1] = newValue;
    this.setExtremeValues(extremeValues);
  };

  public getCurrentValues = (): number[] => this.currentValues;

  public setCurrentValues = (newValues: number[]): void => {
    this.currentValues = newValues;

    if (!this.isInit) {
      this.correctCurrentValueToInterval();
      this.correctQuantityCurrentValues();
      this.sendUpdate('valuesUpdate');
    }
  };

  public setCurrentValueBeIndex = (options: { index: number, newValue: number }): void => {
    const { currentValues } = this;

    if (options.index === 0) {
      currentValues[0] = (this.currentValues[1] < options.newValue)
        ? this.currentValues[1]
        : options.newValue;
    } else {
      currentValues[1] = this.currentValues[0] > options.newValue
        ? this.currentValues[0]
        : options.newValue;
    }

    this.setCurrentValues(currentValues);
  };

  public setNearestValue(newValue: number): void {
    if (!this.isInterval) this.setCurrentValueBeIndex({ index: 0, newValue });
    else {
      const distances = this.currentValues.map((item) => Math.abs(item - newValue));

      if (distances[0] < distances[1]) this.setCurrentValueBeIndex({ index: 0, newValue });
      else if (distances[0] > distances[1]) this.setCurrentValueBeIndex({ index: 1, newValue });
      else if (newValue < this.currentValues[0]) {
        this.setCurrentValueBeIndex({ index: 0, newValue });
      } else this.setCurrentValueBeIndex({ index: 1, newValue });
    }
  }

  public setMinCurrentValue = (newValue: number): void => {
    const { currentValues } = this;
    if (!this.isInterval) currentValues[0] = newValue;
    else {
      currentValues[0] = (newValue > currentValues[1]) ? currentValues[1] : newValue;
    }

    this.setCurrentValues(currentValues);
  };

  public setMaxCurrentValue = (newValue: number): void => {
    if (this.isInterval) {
      const { currentValues } = this;
      currentValues[1] = (newValue < currentValues[0]) ? currentValues[0] : newValue;
      this.setCurrentValues(currentValues);
    }
  };

  public getStep = (): number => this.step;

  public setStep = (newValue: number): void => {
    this.step = newValue;
    this.sendUpdate();
  };

  public getScaleStep = (): number => this.scaleStep;

  public setScaleStep = (newValue: number): void => {
    this.scaleStep = newValue;
    this.sendUpdate();
  };

  public getIsVertical = (): boolean => this.isVertical;

  public setIsVertical = (newValue: boolean): void => {
    this.isVertical = newValue;
    this.sendUpdate();
  };

  public getIsInterval = (): boolean => this.isInterval;

  public setIsInterval = (newValue: boolean): void => {
    this.isInterval = newValue;
    this.correctQuantityCurrentValues();
    this.sendUpdate();
  };

  public getHaveLabel = (): boolean => this.haveLabel;

  public setHaveLabel = (newValue: boolean): void => {
    this.haveLabel = newValue;
    this.sendUpdate();
  };

  public getHaveScale = (): boolean => this.haveScale;

  public setHaveScale = (newValue: boolean): void => {
    this.haveScale = newValue;
    this.sendUpdate();
  };

  public getCallbacks = (): ((updateObject: IOutsideUpdate) => void)[] => this.callbacks;

  public setCallbacks = (newValue: ((updateObject: IOutsideUpdate) => void)[]): void => {
    this.callbacks = newValue;
  };

  public getCollection = (): string[] | number[] | HTMLElement[] => this.collection;

  public setCollection = (newValue: string[] | number[] | HTMLElement[]): void => {
    this.collection = newValue;
  };

  public getIsCollection = (): boolean => this.isCollection;

  public setIsCollection = (newValue: boolean): void => {
    if (!newValue) {
      this.isCollection = newValue;
      this.sendUpdate();
    } else {
      this.step = 1;
      this.scaleStep = 1;
      this.isCollection = newValue;
      this.setExtremeValues([0, this.collection.length - 1]);
    }
  };

  public valueToPercent = (value: number): number => {
    const range = this.extremeValues[1] - this.extremeValues[0];
    const valueInRange = value - this.extremeValues[0];
    return (valueInRange / range) * 100;
  };

  public percentToValue = (percentValue: number): number => {
    const range = (this.extremeValues[1] - this.extremeValues[0]) / this.step;
    const valueInRange = Math.round(range * (percentValue / 100));
    return Math.round((valueInRange * this.step + this.extremeValues[0]) * 1000) / 1000;
  };

  private correctCurrentValueToInterval = (): void => {
    this.currentValues = this.currentValues.map((item) => (
      (item < this.extremeValues[0]) ? this.extremeValues[0] : item
    ));

    this.currentValues = this.currentValues.map((item) => (
      (item > this.extremeValues[1]) ? this.extremeValues[1] : item
    ));
  };

  private correctQuantityCurrentValues(): void {
    if (this.isInterval && (this.currentValues.length === 1)) {
      this.currentValues = [this.currentValues[0], this.currentValues[0]];
    }

    if (!this.isInterval && (this.currentValues.length === 2)) {
      this.currentValues = [this.currentValues[0]];
    }
  }

  private sendUpdate(eventName?: string): void {
    let eventObject: IValuesUpdate | IFullUpdate;
    if (eventName === 'valuesUpdate') {
      eventObject = this.getValuesUpdate();
      this.notifyCallbacks(this.getOutsideUpdate());
    } else {
      eventObject = this.getFullUpdate();
    }
    this.changeObserver.notify(eventObject);
  }

  private getValuesUpdate = (): IValuesUpdate => ({
    eventName: 'valuesUpdate',
    eventBody: {
      currentValues: this.currentValues,
      margins: this.currentValues.map((item) => this.valueToPercent(item)),
      collection: this.collection,
    },
  });

  public getFullUpdate = (): IFullUpdate => ({
    eventName: 'fullUpdate',
    eventBody: {
      extremeValues: this.extremeValues,
      currentValues: this.currentValues,
      margins: this.currentValues.map((item) => this.valueToPercent(item)),
      scaleStep: this.scaleStep,
      isVertical: this.isVertical,
      haveScale: this.haveScale,
      haveLabel: this.haveLabel,
      isCollection: this.isCollection,
      collection: this.collection,
    },
  });

  private getOutsideUpdate = (): IOutsideUpdate => ({ currentValues: this.currentValues });

  private notifyCallbacks = (updateObject: IOutsideUpdate): void => {
    try {
      if (this.callbacks.length) this.callbacks.map((item) => item(updateObject));
    } catch (error) {
      console.error(error);
    }
  };
}

export { Model };
