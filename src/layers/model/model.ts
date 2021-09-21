/* eslint-disable no-console */
import {
  IModel, ICallback,
} from '../interfaces/interfaces';
import { ChangeObserver } from '../observers/change-observer';
import { Calculator } from './calculator/calculator';
import { CustomSetters } from './custom-setters/custom-setters';
import { Parameters } from './parameters/parameters';

class Model {
  public parameters: Parameters;

  public customSetters: CustomSetters;

  private calculator: Calculator;

  private changeObserver: ChangeObserver = new ChangeObserver();

  constructor(options: IModel) {
    const { changeObserver } = this;
    this.parameters = new Parameters({ ...options, changeObserver });
    this.calculator = new Calculator(this.parameters);
    this.customSetters = new CustomSetters(this.parameters, this.calculator);
  }

  public subscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.changeObserver.subscribe(callback);
  }
}

export { Model };
