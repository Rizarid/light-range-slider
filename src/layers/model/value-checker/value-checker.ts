import { IModel } from '../../interfaces/interfaces';

class ValueChecker {
   public checkExtremeValues = (newValue: number[]):boolean => {
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

      newValue.map((item) => {
        if (Number.isNaN(item)) throw new Error('Expected array of number, passed array contain NaN');
        return null;
      });

      if (newValue[0] >= newValue[1]) throw new Error('The maximum must be greater than the minimum');

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public checkCurrentValues = (newValue: number[]): boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array of number, passed argument is ${typeof newValue}`);
      }

      if (newValue.length < 1 || newValue.length > 2) {
        throw new Error(`Expected length of array 1 or 2, length of passed array is ${newValue.length}`);
      }

      newValue.map((item) => {
        if (typeof item !== 'number') {
          throw new Error(`Expected array of number, passed array contain ${typeof item} element`);
        }
        return null;
      });

      newValue.map((item) => {
        if (Number.isNaN(item)) throw new Error('Expected array of number, passed array contain NaN');
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

  public checkStepAndScaleStep = (
    newValue: number, extremeValues: number[], isCollection: boolean,
  ): boolean => {
    try {
      const [minValue, maxValue] = extremeValues;
      const halfOfInterval = (maxValue - minValue) / 2;

      if (typeof newValue !== 'number') {
        throw new Error(`Expected number type, passed ${typeof newValue} type`);
      }

      if (Number.isNaN(newValue)) throw new Error('Expected number type, passed NaN');

      if (newValue <= 0) { throw new Error('Step must by greater than zero'); }

      if (newValue > halfOfInterval) {
        throw new Error('Step must by less than half of the interval of slider');
      }

      if (isCollection) {
        throw new Error('You cannot change the step if the flag is activated');
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public checkBoolean = (newValue: boolean): boolean => {
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

  public checkIsCollection = (newValue: boolean, collection: any[]): boolean => {
    try {
      if (typeof newValue !== 'boolean') {
        throw new Error(`Expected boolean type, passed ${typeof newValue} type`);
      }

      if (newValue && (collection.length < 2)) {
        throw new Error('You cannot activate the isCollection mode if the array collection length is less than 2');
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public checkCallbacks = (
    newValue: ((updateObject: IModel) => void)[],
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

  public checkCollection = (newValue: number[] | string[] | HTMLElement[]): boolean => {
    try {
      if (!Array.isArray(newValue)) {
        throw new Error(`Expected array, passed argument is ${typeof newValue}`);
      }

      if (newValue.length) {
        newValue.map((item) => {
          const isNumber = typeof item === 'number';
          const isString = typeof item === 'string';
          const isObject = typeof item === 'object';
          if (!(isNumber || isString || isObject)) {
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

export { ValueChecker };
