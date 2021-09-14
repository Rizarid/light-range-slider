/* eslint-disable no-console */
import {
  IModel, IUpdate, IUpdateBody, ICallback,
} from '../interfaces/interfaces';
import { ChangeObserver } from '../observers/change-observer';
import { ValueChecker } from './value-checker/value-checker';

class Model {
  private extremeValues: number[];

  private currentValues: number[];

  private callbacks: ((updateObject: IUpdateBody) => void)[] = [];

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

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public getExtremeValues = (): number[] => {
    const [min, max] = this.extremeValues;
    return [min, max];
  };

  public setExtremeValues = (newValue: number[]): void => {
    if (this.valueChecker.checkExtremeValues(newValue)) {
      this.extremeValues = newValue;

      if (!this.isInit) {
        this.correctCurrentValueToInterval();
        this.sendUpdate();
      }
    }
  };

  public getCurrentValues = (): number[] => {
    const [min, max] = this.currentValues;
    return this.isInterval ? [min, max] : [min];
  };

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

  public sendUpdate = (eventName?: string): void => {
    let eventObject: IUpdate;

    if (eventName === 'valuesUpdate') eventObject = this.getUpdate('valuesUpdate');
    else if (eventName === 'scaleUpdate') eventObject = this.getUpdate('scaleUpdate');
    else eventObject = this.getUpdate('fullUpdate');

    this.notifyCallbacks(eventObject.eventBody);
    this.changeObserver.notify(eventObject);
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

  public getUpdate = (eventName: string): IUpdate => ({
    eventName,
    eventBody: {
      extremeValues: this.extremeValues,
      currentValues: this.currentValues,
      step: this.step,
      scaleStep: this.scaleStep,
      isVertical: this.isVertical,
      isInterval: this.isInterval,
      haveProgressBar: this.haveProgressBar,
      haveScale: this.haveScale,
      haveLabel: this.haveLabel,
      isCollection: this.isCollection,
      collection: this.collection,
    },
  });

  private notifyCallbacks = (updateObject: IUpdateBody): void => {
    try {
      if (this.callbacks.length) this.callbacks.map((item) => item(updateObject));
    } catch (error) {
      console.error(error);
    }
  };
}

export { Model };
