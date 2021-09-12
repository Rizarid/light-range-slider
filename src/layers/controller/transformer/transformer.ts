import { Model } from '../../model/model';

class Transformer {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public minValueToExtremeValues = (newValue: number): number[] => {
    const [minValue, maxValue] = this.model.getExtremeValues();
    return [newValue, maxValue];
  };

  public maxValueToExtremeValues = (newValue: number): number[] => {
    const [minValue] = this.model.getExtremeValues();
    return ([minValue, newValue]);
  };

  public currentValueWithIndexToCurrentValues = (index: number, newValue: number): number[] => {
    let [minCurrentValue, maxCurrentValue] = this.model.getCurrentValues();

    if (index === 0) minCurrentValue = (newValue > maxCurrentValue) ? maxCurrentValue : newValue;
    else maxCurrentValue = (newValue < minCurrentValue) ? minCurrentValue : newValue;

    return this.model.getIsInterval() ? [minCurrentValue, maxCurrentValue] : [minCurrentValue];
  };

  public currentValueWithoutIndexToCurrentValues = (newValue: number): number[] => {
    const isInterval = this.model.getIsInterval();

    if (!isInterval) return this.currentValueWithIndexToCurrentValues(0, newValue);
    const index = this.getNearIndex(newValue);
    return this.currentValueWithIndexToCurrentValues(index, newValue);
  };

  public newMinCurrentValueToCurrentValues = (newValue: number): number[] => {
    const [minCurrentValue, maxCurrentValue] = this.model.getCurrentValues();
    const isInterval = this.model.getIsInterval();

    if (!isInterval) return [newValue];
    return ((newValue > maxCurrentValue)
      ? [maxCurrentValue, maxCurrentValue]
      : [newValue, maxCurrentValue]
    );
  };

  public newMaxCurrentValueToCurrentValues = (newValue: number): number[] => {
    const [minCurrentValue] = this.model.getCurrentValues();
    const isInterval = this.model.getIsInterval();

    if (isInterval) {
      return ((newValue < minCurrentValue)
        ? [minCurrentValue, minCurrentValue] : [minCurrentValue, newValue]
      );
    }

    return this.model.getCurrentValues();
  };

  private getNearIndex = (newValue: number): number => {
    const currentValues = this.model.getCurrentValues();
    const distances = currentValues.map((item) => Math.abs(item - newValue));
    if (distances[0] < distances[1]) return 0;
    if (distances[0] > distances[1]) return 1;
    if (newValue < currentValues[0]) return 0;
    return 1;
  }
}

export { Transformer };
