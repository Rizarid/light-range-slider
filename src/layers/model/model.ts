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
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveLabel,
      haveScale, callbacks, collection, isCollection,
    } = options;

    this.setExtremeValues(extremeValues);
    this.setCurrentValues(currentValues);
    this.setStep(step);
    this.setScaleStep(scaleStep);
    this.setIsVertical(isVertical);
    this.setIsInterval(isInterval);
    this.setHaveLabel(haveLabel);
    this.setHaveScale(haveScale);
    this.setCallbacks(callbacks);
    this.setCollection(collection);
    this.setIsCollection(isCollection);

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

  public setExtremeValues = (newValue: number[]): void => {
    if (this.checkExtremeValuesNewValue(newValue)) {
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
    if (this.checkCurrentValuesNewValue(newValue)) {
      this.currentValues = newValue;

      if (!this.isInit) {
        this.correctCurrentValueToInterval();
        this.correctQuantityCurrentValues();
        this.sendUpdate('valuesUpdate');
      }
    }
  };

  public setCurrentValueBeIndex = (options: { index: number, newValue: number }): void => {
    const { currentValues } = this;
    const { index, newValue } = options;

    if (index === 0) {
      currentValues[0] = (newValue > this.currentValues[1]) ? this.currentValues[1] : newValue;
    } else {
      currentValues[1] = (newValue < this.currentValues[0]) ? this.currentValues[0] : newValue;
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
    if (this.checkStepAndScaleStepNewValue(newValue)) {
      this.step = newValue;
      this.sendUpdate();
    }
  };

  public getScaleStep = (): number => this.scaleStep;

  public setScaleStep = (newValue: number): void => {
    if (this.checkStepAndScaleStepNewValue(newValue)) {
      this.scaleStep = newValue;
      this.sendUpdate();
    }
  };

  public getIsVertical = (): boolean => this.isVertical;

  public setIsVertical = (newValue: boolean): void => {
    if (this.checkBooleanNewValue(newValue)) {
      this.isVertical = newValue;
      this.sendUpdate();
    }
  };

  public getIsInterval = (): boolean => this.isInterval;

  public setIsInterval = (newValue: boolean): void => {
    if (this.checkBooleanNewValue(newValue)) {
      this.isInterval = newValue;
      this.correctQuantityCurrentValues();
      this.sendUpdate();
    }
  };

  public getHaveLabel = (): boolean => this.haveLabel;

  public setHaveLabel = (newValue: boolean): void => {
    if (this.checkBooleanNewValue(newValue)) {
      this.haveLabel = newValue;
      this.sendUpdate();
    }
  };

  public getHaveScale = (): boolean => this.haveScale;

  public setHaveScale = (newValue: boolean): void => {
    if (this.checkBooleanNewValue(newValue)) {
      this.haveScale = newValue;
      this.sendUpdate();
    }
  };

  public getCallbacks = (): ((updateObject: IOutsideUpdate) => void)[] => this.callbacks;

  public setCallbacks = (newValue: ((updateObject: IOutsideUpdate) => void)[]): void => {
    if (this.checkCallbacksNewValue(newValue)) this.callbacks = newValue;
  };

  public getCollection = (): string[] | number[] | HTMLElement[] => this.collection;

  public setCollection = (newValue: string[] | number[] | HTMLElement[]): void => {
    if (this.checkCollectionNewValue(newValue)) this.collection = newValue;
  };

  public getIsCollection = (): boolean => this.isCollection;

  public setIsCollection = (newValue: boolean): void => {
    if (this.checkIsCollectionNewValue(newValue)) {
      if (!newValue) {
        this.isCollection = newValue;
        this.sendUpdate();
      } else {
        this.step = 1;
        this.scaleStep = 1;
        this.isCollection = newValue;
        this.setExtremeValues([0, this.collection.length - 1]);
      }
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

  private checkExtremeValuesNewValue = (newValue: number[]):boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array of number, passed argument is ${typeof newValue}`);
      }

      if (newValue.length !== 2) {
        throw new Error(`Expected length of array 2, length of passed array is ${newValue.length}`);
      }

      newValue.map((item) => {
        if (typeof item !== 'number') throw new Error(`Expected array of number, passed array contain ${typeof item} element`);
        return null;
      });

      if (newValue[0] >= newValue[1]) throw new Error('The maximum must be greater than the minimum');

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkCurrentValuesNewValue = (newValue: number[]): boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array of number, passed argument is ${typeof newValue}`);
      }

      if (newValue.length > 0 && newValue.length <= 2) {
        throw new Error(`Expected length of array 2, length of passed array is ${newValue.length}`);
      }

      newValue.map((item) => {
        if (typeof item !== 'number') {
          throw new Error(`Expected array of number, passed array contain ${typeof item} element`);
        }
        return null;
      });

      if (newValue.length === 2) {
        if (newValue[0] > newValue[1]) {
          throw new Error('The maximum must be greater or equal than the minimum');
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkStepAndScaleStepNewValue = (newValue: number): boolean => {
    try {
      const halfOfInterval = (this.extremeValues[1] - this.extremeValues[0]) / 2;

      if (typeof newValue !== 'number') {
        throw new Error(`Expected number type, passed ${typeof newValue} type`);
      }

      if (newValue <= 0) { throw new Error('Step must by greater than zero'); }

      if (newValue > halfOfInterval) {
        throw new Error('Step must by less than half of the interval of slider');
      }

      if (this.isCollection) {
        throw new Error('You cannot change the step if the flag is activated');
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkBooleanNewValue = (newValue: boolean): boolean => {
    try {
      if (typeof newValue !== 'boolean') {
        throw new Error(`Expected boolean type, passed ${typeof newValue} type`);
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkIsCollectionNewValue = (newValue: boolean): boolean => {
    try {
      if (typeof newValue !== 'boolean') {
        throw new Error(`Expected boolean type, passed ${typeof newValue} type`);
      }

      if (this.collection.length < 2) {
        throw new Error('You cannot activate the isCollection mode if the array collection length is less than 2');
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkCallbacksNewValue = (
    newValue: ((updateObject: IOutsideUpdate) => void)[],
  ): boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array of number, passed argument is ${typeof newValue}`);
      }

      if (newValue.length) {
        newValue.map((item) => {
          if (typeof item !== 'function') {
            throw new Error(`Expected array of functions, passed array contain ${typeof item} element`);
          }
          return null;
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  private checkCollectionNewValue = (newValue: number[] | string[] | HTMLElement[]): boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array, passed argument is ${typeof newValue}`);
      }

      if (newValue.length) {
        newValue.map((item) => {
          if (typeof item !== 'number' || typeof item !== 'string' || typeof item !== 'object') {
            throw new Error(`Expected array of numbers or strings or objects, passed array contain ${typeof item} element`);
          }
          return null;
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}

export { Model };
