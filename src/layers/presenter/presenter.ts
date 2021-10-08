import {
  IUpdate, IViewEvent, IPresenter, IChangeParameterObject, IUpdateBody, IView,
} from '../interfaces/interfaces';
import { Model } from '../model/model';
import { View } from '../view/view';

class Presenter {
  private model: Model;

  private view: View;

  private transformer: Transformer;

  constructor(options: IPresenter) {
    const { slider, ...modelOptions } = options;
    this.model = new Model(modelOptions);
    this.createView(slider, this.model.parameters.getUpdate('').eventBody);
    this.model.subscribe({ function: this.handleModelEvents });
    this.view.subscribe({ function: this.handleViewEvents });
    this.view.setIsResizeBlocked(false);
  }

  public changeParameter = (eventObject: IChangeParameterObject): void => {
    const { parameter, value } = eventObject;
    const parameterHandlers = {
      extremeValues: this.model.parameters.setExtremeValues,
      min: this.model.customSetters.setMinValue,
      max: this.model.customSetters.setMaxValue,
      currentValues: this.model.parameters.setCurrentValues,
      currentMin: this.handleCurrentMim,
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

  public handleModelEvents = (event: IUpdate): void => {
    const { eventName, eventBody } = event;

    if (eventName === 'fullUpdate') this.handleFullUpdateEvent(eventBody);
    if (eventName === 'valuesUpdate') this.view.update(eventBody);
    if (eventName === 'scaleUpdate') this.view.scaleUpdate(eventBody);
  };

  public handleViewEvents = (event: IViewEvent): void => {
    const { eventName } = event;

    if (eventName === 'handleMove') this.handleHandleMove(event);
    if (eventName === 'handleIncrement') this.handleHandleIncrement(event);
    if (eventName === 'handleDecrement') this.handleHandleDecrement(event);
    if (eventName === 'lineClick') this.handleLineClick(event);
    if (eventName === 'scaleItemClick') this.handleScaleItemClick(event);
    if (eventName === 'lineResize') this.model.parameters.sendUpdate('scaleUpdate');
  };

  private handleCurrentMim = (currentMin: number): void => {
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
    this.view.subscribe({ function: this.handleViewEvents });
  };

  private createView = (slider: HTMLElement, eventBody: IUpdateBody): void => {
    this.view = new View(({ slider, ...eventBody } as IView));
  };

  private handleHandleMove = (event: IViewEvent): void => {
    const { newValue, handlesIndex: index } = event.eventBody;
    this.model.customSetters.setCurrentValueByIndex({ index, newValue });
  };

  private handleHandleIncrement = (event: IViewEvent): void => {
    const { handlesIndex: index } = event.eventBody;
    this.model.customSetters.incrementCurrentValueByIndex(index);
  };

  private handleHandleDecrement = (event: IViewEvent): void => {
    const { handlesIndex: index } = event.eventBody;
    this.model.customSetters.decrementCurrentValueByIndex(index);
  };

  private handleLineClick = (event: IViewEvent): void => {
    const { newValue } = event.eventBody;
    this.model.customSetters.setNearestCurrentValue(newValue);
  };

  private handleScaleItemClick = (event: IViewEvent): void => {
    let { newValue } = event.eventBody;
    const isCollection = this.model.parameters.getIsCollection();

    if (isCollection) {
      newValue = this.model.parameters.getCollection().findIndex((item) => item === newValue);
    }
    this.model.customSetters.setNearestCurrentValue(Number(newValue), false);
  };
}

export { Presenter };
