import { Parameters } from '../parameters/parameters';

class Calculator {
  private parameters: Parameters;

  constructor(parameters: Parameters) {
    this.parameters = parameters;
  }

  public valueToPercent = (value: number): number => {
    const range = this.getRange();
    const valueInRange = this.valueToValueInRange(value);
    return (valueInRange / range) * 100;
  };

  public percentToValue = (percentValue: number): number => {
    const valueInRange = this.percentToValueInRange(percentValue);
    return this.valueInRangeToValue(valueInRange);
  };

  public adjustByStep = (value: number): number => {
    const step = this.parameters.getStep();
    const valueInRange = this.valueToValueInRange(value);
    if (this.checkForExceedingTheLastStep(valueInRange)) {
      return this.valueInRangeToValue(this.getRange());
    }
    const adjustedValueInRange = Math.round(valueInRange / step) * step;
    return this.valueInRangeToValue(adjustedValueInRange);
  };

  public adjustByAccuracy = (value: number): number => {
    const accuracy = 10 ** this.getNumberOfDecimalPlaces(this.parameters.getStep());
    return Math.round(value * accuracy) / accuracy;
  };

  private percentToValueInRange = (percentValue: number): number => (
    this.getRange() * (percentValue / 100)
  );

  private getNumberOfDecimalPlaces = (value: number): number => {
    const str = value.toString();
    if (str.includes('.', 0)) {
      const lastElementOfSplitedStr = str.split('.').pop();
      if (lastElementOfSplitedStr !== undefined) return lastElementOfSplitedStr.length;
    }
    return 0;
  };

  private checkForExceedingTheLastStep = (valueInRange: number): boolean => {
    const range = this.getRange();
    const step = this.parameters.getStep();
    return (Math.round((valueInRange / step) * 10) / 10 > Math.round(range / step));
  };

  private getRange = (): number => {
    const [minValue, maxValue] = this.parameters.getExtremeValues();
    return maxValue - minValue;
  };

  private valueToValueInRange = (value: number): number => {
    const [minValue] = this.parameters.getExtremeValues();
    return value - minValue;
  };

  private valueInRangeToValue = (value: number): number => {
    const [minValue] = this.parameters.getExtremeValues();
    return value + minValue;
  };
}

export { Calculator };
