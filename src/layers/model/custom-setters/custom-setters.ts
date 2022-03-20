import { ISetCurrentValueByIndex } from '../../interfaces/interfaces';
import { Calculator } from '../calculator/Calculator';
import { Parameters } from '../parameters/parameters';

class CustomSetters {
  private parameters: Parameters;

  private calculator: Calculator;

  constructor(parameters: Parameters, calculator: Calculator) {
    this.parameters = parameters;
    this.calculator = calculator;
  }

  public setMinValue = (newValue: number): void => {
    const maxValue = this.parameters.getExtremeValues()[1];
    this.parameters.setExtremeValues([newValue, maxValue]);
  };

  public setMaxValue = (newValue: number): void => {
    const [minValue] = this.parameters.getExtremeValues();
    this.parameters.setExtremeValues([minValue, newValue]);
  };

  public setCurrentValueByIndex = (options: ISetCurrentValueByIndex): void => {
    const { index = 0, newValue = 0, isPercent = true, isConverted = false } = options;
    const value = isConverted ? newValue : this.convertValue(newValue, isPercent);
    const [minCurrentValue, maxCurrentValue] = this.parameters.getCurrentValues();

    if (index === 0) {
      const newMinCurrentValue = (value > maxCurrentValue) ? maxCurrentValue : value;
      const newMaxCurrentValue = maxCurrentValue;

      this.parameters.setIndexOfLastChangedHandle(index);
      this.parameters.setCurrentValues(
        this.parameters.getIsInterval()
          ? [newMinCurrentValue, newMaxCurrentValue]
          : [newMinCurrentValue],
      );
    } else {
      const newMinCurrentValue = minCurrentValue;
      const newMaxCurrentValue = (value < minCurrentValue) ? minCurrentValue : value;

      this.parameters.setIndexOfLastChangedHandle(index);
      this.parameters.setCurrentValues(
        this.parameters.getIsInterval()
          ? [newMinCurrentValue, newMaxCurrentValue]
          : [newMinCurrentValue],
      );
    }
  };

  public setStep = (newValue: number): void => {
    this.parameters.setStep(newValue);
    this.parameters.setCurrentValues(
      this.parameters.getCurrentValues().map((item) => this.convertValue(item, false)),
    );
  };

  public setNearestCurrentValue = (newValue: number, isPercent = true): void => {
    const value = this.convertValue(newValue, isPercent);
    const isInterval = this.parameters.getIsInterval();

    if (!isInterval) {
      this.setCurrentValueByIndex({ index: 0, newValue: value, isConverted: true });
    } else {
      const index = this.getNearIndex(value);
      this.setCurrentValueByIndex({ index, newValue: value, isConverted: true });
    }
  };

  public incrementCurrentValueByIndex = (index: number): void => {
    const currentValue = this.parameters.getCurrentValues()[index];
    const newValue = currentValue + this.parameters.getStep();
    this.setCurrentValueByIndex({ index, newValue, isPercent: false });
  };

  public decrementCurrentValueByIndex = (index: number): void => {
    const currentValue = this.parameters.getCurrentValues()[index];
    const newValue = currentValue - this.parameters.getStep();
    this.setCurrentValueByIndex({ index, newValue, isPercent: false });
  };

  public increaseScaleStep = (): void => {
    const isCollection = this.parameters.getIsCollection();
    if (!isCollection) {
      const scaleStap = this.parameters.getScaleStep();
      this.parameters.setScaleStep(scaleStap * 2);
    } else this.parameters.setIsCollection(false);
  };

  private getNearIndex = (newValue: number): number => {
    const currentValues = this.parameters.getCurrentValues();
    const distances = currentValues.map((item) => Math.abs(item - newValue));
    if (distances[0] < distances[1]) return 0;
    if (distances[0] > distances[1]) return 1;
    if (newValue < currentValues[0]) return 0;
    return 1;
  };

  private convertValue = (newValue: number, isPercent: boolean): number => {
    const value = isPercent ? this.calculator.percentToValue(newValue) : newValue;
    const valueAdjustedByStep = this.calculator.adjustByStep(value);
    return this.calculator.adjustByAccuracy(valueAdjustedByStep);
  };
}

export { CustomSetters };
