import { IModel, ICallback, IObserver } from '../interfaces/interfaces';
import { Observer } from '../observer/Observer';
import { Calculator } from './calculator/Calculator';
import { CustomSetters } from './custom-setters/CustomSetters';
import { Parameters } from './parameters/Parameters';

class Model {
  public parameters: Parameters;

  public customSetters: CustomSetters;

  private calculator: Calculator;

  private observer: IObserver = new Observer();

  constructor(options: IModel) {
    this.parameters = new Parameters({ ...options, observer: this.observer });
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
