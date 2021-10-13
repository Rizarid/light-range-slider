/* eslint-disable no-console */
import {
  IModel, ICallback,
} from '../interfaces/interfaces';
import { Observer } from '../observer/observer';
import { Calculator } from './calculator/calculator';
import { CustomSetters } from './custom-setters/custom-setters';
import { Parameters } from './parameters/parameters';

class Model {
  public parameters: Parameters;

  public customSetters: CustomSetters;

  private calculator: Calculator;

  private observer: Observer = new Observer();

  constructor(options: IModel) {
    const { observer } = this;
    this.parameters = new Parameters({ ...options, observer });
    this.calculator = new Calculator(this.parameters);
    this.customSetters = new CustomSetters(this.parameters, this.calculator);
  }

  public subscribe(callback: ICallback): void {
    this.observer.subscribe(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.observer.subscribe(callback);
  }
}

export { Model };
