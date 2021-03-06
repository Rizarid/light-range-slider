import { IUpdateBody } from '../../interfaces/interfaces';

class ValueChecker {
  public checkExtremeValues = (newValue: number[]):boolean => {
    try {
      this.checkIsArray(newValue);
      if (newValue.length !== 2) {
        throw new Error(`Expected length of array 2, length of passed array is ${newValue.length}`);
      }

      newValue.map((item) => this.checkType(item, 'number'));
      newValue.map((item) => this.checkIsNaN(item));
      if (newValue[0] >= newValue[1]) throw new Error('The maximum must be greater than the minimum');

      return true;
    } catch {
      return false;
    }
  };

  public checkCurrentValues = (newValue: number[]): boolean => {
    try {
      this.checkIsArray(newValue);
      if (newValue.length < 1 || newValue.length > 2) {
        throw new Error(`Expected length of array 1 or 2, length of passed array is ${newValue.length}`);
      }

      newValue.map((item) => this.checkType(item, 'number'));
      newValue.map((item) => this.checkIsNaN(item));
      if (newValue.length === 2) {
        if (newValue[0] > newValue[1]) {
          throw new Error('The maximum must be greater or equal than the minimum');
        }
      }

      return true;
    } catch {
      return false;
    }
  };

  public checkStepAndScaleStep = (
    newValue: number, extremeValues: number[], isCollection: boolean,
  ): boolean => {
    try {
      this.checkType(newValue, 'number');
      this.checkIsNaN(newValue);

      if (newValue <= 0) { throw new Error('Step must by greater than zero'); }
      if (isCollection) throw new Error('You cannot change the step if the flag is activated');

      return true;
    } catch {
      return false;
    }
  };

  public checkBoolean = (newValue: boolean): boolean => {
    try {
      this.checkType(newValue, 'boolean');
      return true;
    } catch {
      return false;
    }
  };

  public checkIsCollection = (
    newValue: boolean,
    collection: number[] | string[],
  ): boolean => {
    try {
      this.checkType(newValue, 'boolean');
      if (newValue && (collection.length < 2)) {
        throw new Error('You cannot activate the isCollection mode if the array collection length is less than 2');
      }

      return true;
    } catch {
      return false;
    }
  };

  public checkCallbacks = (newValue: ((updateObject: IUpdateBody) => void)[]): boolean => {
    try {
      this.checkIsArray(newValue);
      if (newValue.length) newValue.map((item) => this.checkType(item, 'function'));

      return true;
    } catch {
      return false;
    }
  };

  public checkCollection = (
    newValue: number[] | string[] | HTMLElement[],
    isCollection: boolean,
  ): boolean => {
    try {
      this.checkIsArray(newValue);
      if ((newValue.length < 2) && isCollection) {
        throw new Error('The length of the array collection must not be less than 2');
      }
      newValue.forEach((item) => {
        const isNumber = typeof item === 'number';
        const isString = typeof item === 'string';
        const isObject = typeof item === 'object';
        if (!(isNumber || isString || isObject)) {
          throw new Error(`Expected array of numbers or strings or objects, passed array contain ${typeof item} element`);
        }
      });

      return true;
    } catch {
      return false;
    }
  };

  private checkIsArray = (
    newValue: number[] | string[] | HTMLElement[] | ((updateObject: IUpdateBody) => void)[],
  ): void => {
    if (!Array.isArray(newValue)) {
      throw new Error(`Expected array, but passed argument is ${typeof newValue}`);
    }
  };

  private checkType = (
    newValue: boolean | number | string | ((updateObject: IUpdateBody) => void),
    type: string,
  ): void => {
    if (typeof newValue !== type) {
      throw new Error(`Expected ${type} type, passed ${typeof newValue} type`);
    }
  };

  private checkIsNaN = (newValue: number): void => {
    if (Number.isNaN(newValue)) throw new Error('Expected array of number, passed array contain NaN');
  };
}

export { ValueChecker };
