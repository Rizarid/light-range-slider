import { Model } from '../../model/model';

class Calculator {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
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
    const step = this.model.getStep();
    let valueInRange = this.valueToValueInRange(value);
    if (this.checkForExceedingTheLastStep(valueInRange)) return this.getRange();
    valueInRange = Math.round(valueInRange / step) * step;
    return this.valueInRangeToValue(valueInRange);
  };

  public adjustByAccuracy = (value: number): number => {
    const accuracy = 10 ** this.getNumberOfDecimalPlaces(this.model.getStep());
    return Math.round(value * accuracy) / accuracy;
  };

  private percentToValueInRange = (percentValue: number): number => (
    this.getRange() * (percentValue / 100)
  );

  private getNumberOfDecimalPlaces = (value: number): number => {
    const str = value.toString();
    return str.includes('.', 0) ? str.split('.').pop().length : 0;
  };

  private checkForExceedingTheLastStep = (valueInRange: number): boolean => {
    const range = this.getRange();
    const step = this.model.getStep(); 
    return (Math.round((valueInRange / step) * 10) / 10 > Math.round(range / step));
  };

  private getRange = (): number => {
    const [minValue, maxValue] = this.model.getExtremeValues();
    return maxValue - minValue;
  };

  private valueToValueInRange = (value: number): number => {
    const [minValue] = this.model.getExtremeValues();
    return value - minValue;
  };

  private valueInRangeToValue = (value: number): number => {
    const [minValue] = this.model.getExtremeValues();
    return value + minValue;
  };
}

export { Calculator };
