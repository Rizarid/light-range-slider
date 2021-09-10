/* eslint-disable no-console */
import {
  IModel, IUpdateCallback, IFullUpdate, IValuesUpdate, IScaleUpdate,
} from '../interfaces/interfaces';
import { ChangeObserver } from '../observers/change-observer';
import { ValueChecker } from './value-checker/value-checker';

class Model {
  private extremeValues: number[];

  private currentValues: number[];

  private callbacks: ((updateObject: IModel) => void)[] = [];

  private collection: string[] | number[] | HTMLElement[] = [];

  private step: number;

  private scaleStep: number;

  private isVertical: boolean;

  private isInterval: boolean;

  private haveProgressBar: boolean;

  private haveScale: boolean;

  private haveLabel: boolean;

  private isCollection: boolean;

  private changeObserver: ChangeObserver = new ChangeObserver();

  private isInit = true;

  private valueChecker: ValueChecker = new ValueChecker();

  constructor(options: IModel) {
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveLabel, haveScale, callbacks, collection, isCollection,
    } = options;

    this.setExtremeValues(extremeValues);
    this.setCurrentValues(currentValues);
    this.setStep(step);
    this.setScaleStep(scaleStep);
    this.setIsVertical(isVertical);
    this.setIsInterval(isInterval);
    this.setHaveProgressBar(haveProgressBar);
    this.setHaveLabel(haveLabel);
    this.setHaveScale(haveScale);
    this.setCallbacks(callbacks);
    this.setCollection(collection);
    this.setIsCollection(isCollection);

    this.correctCurrentValueToInterval();
    this.adjustQuantityOfCurrentValues();

    this.isInit = false;
  }

  public subscribe(callback: IUpdateCallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: IUpdateCallback): void {
    this.changeObserver.subscribe(callback);
  }

  public getExtremeValues = (): number[] => this.extremeValues;

  public setExtremeValues = (newValue: number[]): void => {
    if (this.valueChecker.checkExtremeValues(newValue)) {
      this.extremeValues = newValue;

      if (!this.isInit) {
        this.correctCurrentValueToInterval();
        this.sendUpdate();
      }
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

  public setCurrentValues = (newValue: number[]): void => {
    if (this.valueChecker.checkCurrentValues(newValue)) {
      this.currentValues = newValue;

      if (!this.isInit) {
        this.correctCurrentValueToInterval();
        this.adjustQuantityOfCurrentValues();
        this.sendUpdate('valuesUpdate');
      }
    }
  };

  public setCurrentValueBeIndex = (options: { index: number, newValue: number }): void => {
    const { currentValues } = this;
    const [minCurrentValue, maxCurrentValue] = currentValues;
    const { index, newValue } = options;

    if (index === 0) {
      currentValues[0] = (newValue > maxCurrentValue) ? maxCurrentValue : newValue;
    } else {
      currentValues[1] = (newValue < minCurrentValue) ? minCurrentValue : newValue;
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
    if (this.valueChecker.checkStepAndScaleStep(newValue, this.extremeValues, this.isCollection)) {
      this.step = newValue;
      this.sendUpdate();
    }
  };

  public getScaleStep = (): number => this.scaleStep;

  public setScaleStep = (newValue: number): void => {
    if (this.valueChecker.checkStepAndScaleStep(newValue, this.extremeValues, this.isCollection)) {
      this.scaleStep = newValue;
      this.sendUpdate();
    }
  };

  public getIsVertical = (): boolean => this.isVertical;

  public setIsVertical = (newValue: boolean): void => {
    if (this.valueChecker.checkBoolean(newValue)) {
      this.isVertical = newValue;
      this.sendUpdate();
    }
  };

  public getIsInterval = (): boolean => this.isInterval;

  public setIsInterval = (newValue: boolean): void => {
    if (this.valueChecker.checkBoolean(newValue)) {
      this.isInterval = newValue;
      this.adjustQuantityOfCurrentValues();
      this.sendUpdate();
    }
  };

  public getHaveProgressBar = (): boolean => this.haveProgressBar;

  public setHaveProgressBar = (newValue: boolean): void => {
    if (this.valueChecker.checkBoolean(newValue)) {
      this.haveProgressBar = newValue;
      this.adjustQuantityOfCurrentValues();
      this.sendUpdate();
    }
  };

  public getHaveLabel = (): boolean => this.haveLabel;

  public setHaveLabel = (newValue: boolean): void => {
    if (this.valueChecker.checkBoolean(newValue)) {
      this.haveLabel = newValue;
      this.sendUpdate();
    }
  };

  public getHaveScale = (): boolean => this.haveScale;

  public setHaveScale = (newValue: boolean): void => {
    if (this.valueChecker.checkBoolean(newValue)) {
      this.haveScale = newValue;
      this.sendUpdate();
    }
  };

  public getCallbacks = (): ((updateObject: IModel) => void)[] => this.callbacks;

  public setCallbacks = (newValue: ((updateObject: IModel) => void)[]): void => {
    if (this.valueChecker.checkCallbacks(newValue)) this.callbacks = newValue;
  };

  public getCollection = (): string[] | number[] | HTMLElement[] => this.collection;

  public setCollection = (newValue: string[] | number[] | HTMLElement[]): void => {
    if (this.valueChecker.checkCollection(newValue)) this.collection = newValue;
  };

  public getIsCollection = (): boolean => this.isCollection;

  public setIsCollection = (newValue: boolean): void => {
    if (this.valueChecker.checkIsCollection(newValue, this.collection)) {
      if (!newValue) {
        this.isCollection = newValue;
        this.sendUpdate();
      } else {
        this.step = 1;
        this.scaleStep = 1;
        this.currentValues = this.currentValues.map((item) => Math.round(item));
        this.isCollection = newValue;
        this.setExtremeValues([0, this.collection.length - 1]);
      }
    }
  };

  public valueToPercent = (value: number): number => {
    const [minValue, maxValue] = this.extremeValues;
    const range = maxValue - minValue;
    const valueInRange = value - minValue;
    return (valueInRange / range) * 100;
  };

  public percentToValue = (percentValue: number): number => {
    const valueInAdjustedRange = this.percentToAdjustedRangeToStep(percentValue);
    const value = this.valueInAdjustedRangeToValue(valueInAdjustedRange);

    const accuracy = 10 ** this.getNumberOfDecimalPlaces(this.step);

    return Math.round(value * accuracy) / accuracy;
  };

  public sendOutsideUpdate = (): void => this.notifyCallbacks(this.getOutsideUpdate());

  public sendUpdate = (eventName?: string): void => {
    let eventObject: IValuesUpdate | IFullUpdate | IScaleUpdate;

    if (eventName === 'valuesUpdate') eventObject = this.getValuesUpdate();
    else if (eventName === 'scaleUpdate') eventObject = this.getScaleUpdate();
    else eventObject = this.getFullUpdate();

    this.sendOutsideUpdate();
    this.changeObserver.notify(eventObject);
  };

  private getNumberOfDecimalPlaces = (value: number): number => {
    const str = value.toString();
    return str.includes('.', 0) ? str.split('.').pop().length : 0;
  };

  private getAdjustedRangeToStep = () => {
    const [minValue, maxValue] = this.extremeValues;
    const range = maxValue - minValue;
    return range / this.step;
  };

  private percentToAdjustedRangeToStep = (percentValue: number): number => {
    const adjustedRange = this.getAdjustedRangeToStep();
    return adjustedRange * (percentValue / 100);
  };

  private checkForExceedingTheLastStep = (valueInAdjustedRange: number): boolean => {
    const adjustedRange = this.getAdjustedRangeToStep();
    return (Math.round(valueInAdjustedRange * 10) / 10 > Math.round(adjustedRange));
  };

  private valueInAdjustedRangeToValue = (valueInAdjustedRange: number): number => {
    const [minValue] = this.extremeValues;
    const adjustedRange = this.getAdjustedRangeToStep();

    const valueInRange = this.checkForExceedingTheLastStep(valueInAdjustedRange)
      ? adjustedRange * this.step
      : Math.round(valueInAdjustedRange) * this.step;

    return valueInRange + minValue;
  };

  private correctCurrentValueToInterval = (): void => {
    const [minValue, maxValue] = this.extremeValues;
    this.currentValues = this.currentValues.map((item) => ((item < minValue) ? minValue : item));
    this.currentValues = this.currentValues.map((item) => ((item > maxValue) ? maxValue : item));
  };

  private adjustQuantityOfCurrentValues(): void {
    const [minCurrentValue] = this.currentValues;
    const maxValue = this.extremeValues[1];

    if (this.isInterval && (this.currentValues.length === 1)) {
      this.currentValues = [minCurrentValue, maxValue];
    }

    if (!this.isInterval && (this.currentValues.length === 2)) {
      this.currentValues = [minCurrentValue];
    }
  }

  private getValuesUpdate = (): IValuesUpdate => ({
    eventName: 'valuesUpdate',
    eventBody: {
      currentValues: this.currentValues,
      margins: this.currentValues.map((item) => this.valueToPercent(item)),
      collection: this.collection,
    },
  });

  private getScaleUpdate = (): IScaleUpdate => ({
    eventName: 'scaleUpdate',
    eventBody: {
      extremeValues: this.extremeValues,
      scaleStep: this.scaleStep,
      haveScale: this.haveScale,
      isCollection: this.isCollection,
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
      haveProgressBar: this.haveProgressBar,
      haveScale: this.haveScale,
      haveLabel: this.haveLabel,
      isCollection: this.isCollection,
      collection: this.collection,
    },
  });

  private getOutsideUpdate = (): IModel => {
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveLabel, haveScale, callbacks, collection, isCollection,
    } = this;

    return {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveLabel, haveScale, callbacks, collection, isCollection,
    };
  } ;

  private notifyCallbacks = (updateObject: IModel): void => {
    try {
      if (this.callbacks.length) this.callbacks.map((item) => item(updateObject));
    } catch (error) {
      console.error(error);
    }
  };

 
}

export { Model };
