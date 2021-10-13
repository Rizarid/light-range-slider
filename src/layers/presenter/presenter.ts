import {
  IPresenter, IChangeParameterObject, IUpdateBody, IView,
} from '../interfaces/interfaces';
import { Model } from '../model/model';
import { View } from '../view/view';

class Presenter {
  private model: Model;

  private view: View;

  constructor(options: IPresenter) {
    const { slider, ...modelOptions } = options;
    this.model = new Model(modelOptions);
    this.createView(slider, this.model.parameters.getUpdateObject('').eventBody);
    this.subscribeToModel();
    this.subscribeToView();
    setTimeout(() => { this.view.setIsResizeBlocked(false); }, 1);
  }

  public changeParameter = (eventObject: IChangeParameterObject): void => {
    const { parameter, value } = eventObject;
    const parameterHandlers = {
      extremeValues: this.model.parameters.setExtremeValues,
      min: this.model.customSetters.setMinValue,
      max: this.model.customSetters.setMaxValue,
      currentValues: this.model.parameters.setCurrentValues,
      currentMin: this.handleCurrentMin,
      currentMax: this.handleCurrentMax,
      step: this.model.parameters.setStep,
      scaleStep: this.model.parameters.setScaleStep,
      isVertical: this.model.parameters.setIsVertical,
      isInterval: this.model.parameters.setIsInterval,
      haveProgressBar: this.model.parameters.setHaveProgressBar,
      haveLabel: this.model.parameters.setHaveLabel,
      haveScale: this.model.parameters.setHaveScale,
      isCollection: this.model.parameters.setIsCollection,
      collection: this.model.parameters.setCollection,
      callbacks: this.model.parameters.setCallbacks,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    parameterHandlers[parameter](value);
  };

  private subscribeToModel = () => {
    this.model.subscribe({ eventName: 'fullUpdate', function: this.handleFullUpdateEvent });
    this.model.subscribe({ eventName: 'valuesUpdate', function: this.handleUpdate });
    this.model.subscribe({ eventName: 'scaleUpdate', function: this.handleScaleUpdate });
  };

  private subscribeToView = () => {
    this.view.subscribe({ eventName: 'handleMove', function: this.handlePointerMove });
    this.view.subscribe({ eventName: 'handleIncrement', function: this.handleIncrement });
    this.view.subscribe({ eventName: 'handleDecrement', function: this.handleDecrement });
    this.view.subscribe({ eventName: 'lineClick', function: this.handleLineClick });
    this.view.subscribe({ eventName: 'scaleItemClick', function: this.handleScaleItemClick });
    this.view.subscribe({ eventName: 'lineResize', function: this.handleLineResize });
  };

  private handleCurrentMin = (currentMin: number): void => {
    this.model.customSetters.setCurrentValueByIndex({
      index: 0, newValue: currentMin, isPercent: false,
    });
  };

  private handleCurrentMax = (currentMax: number): void => {
    this.model.customSetters.setCurrentValueByIndex({
      index: 1, newValue: currentMax, isPercent: false,
    });
  };

  private handleFullUpdateEvent = (eventBody: IUpdateBody) => {
    const slider = this.view.getBody();
    slider.innerHTML = '';
    this.createView(slider, eventBody);
    this.subscribeToView();
    setTimeout(() => { this.view.setIsResizeBlocked(false); }, 1);
  };

  private handleUpdate = (eventBody: IUpdateBody) => {
    this.view.update(eventBody);
  };

  private handleScaleUpdate = (eventBody: IUpdateBody) => {
    this.view.scaleUpdate(eventBody);
  };

  private createView = (slider: HTMLElement, eventBody: IUpdateBody): void => {
    this.view = new View(({ slider, ...eventBody } as IView));
  };

  private handlePointerMove = (eventBody: { index: number, newValue: number }): void => {
    const { newValue, index } = eventBody;
    this.model.customSetters.setCurrentValueByIndex({ index, newValue });
  };

  private handleIncrement = (eventBody: { index: number }): void => {
    const { index } = eventBody;
    this.model.customSetters.incrementCurrentValueByIndex(index);
  };

  private handleDecrement = (eventBody: { index: number }): void => {
    const { index } = eventBody;
    this.model.customSetters.decrementCurrentValueByIndex(index);
  };

  private handleLineClick = (eventBody: { newValue: number }): void => {
    const { newValue } = eventBody;
    this.model.customSetters.setNearestCurrentValue(newValue);
  };

  private handleScaleItemClick = (eventBody: { newValue: number }): void => {
    const { newValue } = eventBody;
    const isCollection = this.model.parameters.getIsCollection();

    if (isCollection) {
      const index = this.model.parameters.getCollection().findIndex((item) => item === newValue);
      this.model.customSetters.setNearestCurrentValue(Number(index), false);
    } else this.model.customSetters.setNearestCurrentValue(Number(newValue), false);
  };

  private handleLineResize = () => {
    this.model.parameters.sendUpdate();
  };
}

export { Presenter };
