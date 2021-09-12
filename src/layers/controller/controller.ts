import {
  IUpdate, IViewEvent, IController, IChangeParameterObject, IUpdateBody,
} from '../interfaces/interfaces';
import { Model } from '../model/model';
import { View } from '../view/view';
import { Calculator } from './calculator/calculator';
import { Transformer } from './transformer/transformer';

class Controller {
  private model: Model;

  private view: View;

  private transformer: Transformer;

  private calculator: Calculator;

  constructor(options: IController) {
    const { slider, ...modelOptions } = options;
    this.model = new Model(modelOptions);
    this.calculator = new Calculator(this.model);
    this.transformer = new Transformer(this.model);
    this.createView(slider, this.model.getUpdate('').eventBody);
    this.model.subscribe({ function: this.handleModelEvents });
    this.view.subscribe({ function: this.handleViewEvents });
    this.view.setIsResizeBlocked(false);
  }

  public changeParameter(eventObject: IChangeParameterObject): void {
    const { eventName, eventBody } = eventObject;
    const parameterHandlers = {
      extremeValues: this.model.setExtremeValues,
      min: this.handleMinLiteral,
      max: this.handleMaxLiteral,
      currentValues: this.model.setCurrentValues,
      currentMin: this.handleCurrentMimLiteral,
      currentMax: this.handleCurrentMaxLiteral,
      step: this.model.setStep,
      scaleStep: this.model.setScaleStep,
      isVertical: this.model.setIsVertical,
      isInterval: this.model.setIsInterval,
      haveProgressBar: this.model.setHaveProgressBar,
      haveLabel: this.model.setHaveLabel,
      haveScale: this.model.setHaveScale,
      isCollection: this.model.setIsCollection,
      collection: this.model.setCollection
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    parameterHandlers[eventName](eventBody[eventName]);
  };

  private handleMinLiteral = (min: number): void => {
    const newValue = this.transformer.minValueToExtremeValues(min);
    this.model.setExtremeValues(newValue);
  };

  private handleMaxLiteral = (max: number): void => {
    const newValue = this.transformer.maxValueToExtremeValues(max);
    this.model.setExtremeValues(newValue);
  };

  private handleCurrentMimLiteral = (currentMin: number): void => {
    const newValue = this.transformer.newMinCurrentValueToCurrentValues(currentMin);
    this.model.setCurrentValues(newValue);
  };

  private handleCurrentMaxLiteral = (currentMax: number): void => {
    const newValue = this.transformer.newMaxCurrentValueToCurrentValues(currentMax);
    this.model.setCurrentValues(newValue);
  };

  private handleModelEvents = (event: IUpdate): void => {
    const { eventName, eventBody } = event;
    eventBody.margins = eventBody.currentValues.map(
      (item) => this.calculator.valueToPercent(item)
    );

    if (eventName === 'fullUpdate') this.handleFullUpdateEvent(eventBody);
    if (eventName === 'valuesUpdate') this.view.update(eventBody);
    if (eventName === 'scaleUpdate') this.view.scaleUpdate(eventBody);
  };

  private handleFullUpdateEvent = (eventBody: IUpdateBody) => {
    const slider = this.view.getBody();
    slider.innerHTML = '';
    this.createView(slider, eventBody);
    this.view.subscribe({ function: this.handleViewEvents });
  }

  private handleViewEvents = (event: IViewEvent): void => {
    const { eventName } = event;

    if (eventName === 'handleMove') this.handleHandleMove(event);
    if (eventName === 'handleIncrement') this.handleHandleIncrement(event);
    if (eventName === 'handleDecrement') this.handleHandleDecrement(event);
    if (eventName === 'lineClick') this.handleLineClick(event);
    if (eventName === 'scaleItemClick') this.handleScaleItemClick(event); 
    if (eventName === 'lineResize') this.model.sendUpdate('scaleUpdate');
  };

  private createView = (slider: HTMLElement, eventBody: IUpdateBody): void => {
    const margins = eventBody.currentValues.map((item) => this.calculator.valueToPercent(item)); 
    this.view = new View({ slider, ...eventBody, margins });
  }

  private handleHandleMove = (event: IViewEvent): void => {
    const { newValue: newValueInPercent, handlesIndex: index } = event.eventBody;
    const newValue = this.calculator.percentToValue(newValueInPercent);
    const valueAdjustedByStep = this.calculator.adjustByStep(newValue);
    const valueAdjustedByAccuracy = this.calculator.adjustByAccuracy(valueAdjustedByStep);

    const newCurrentValues = this.transformer.currentValueWithIndexToCurrentValues(
      index, valueAdjustedByAccuracy,
    );

    this.model.setCurrentValues(newCurrentValues);
  }

  private handleHandleIncrement = (event: IViewEvent): void => {
    const { handlesIndex: index } = event.eventBody;
    const value = this.model.getCurrentValues()[index];
    const step = this.model.getStep();
    const newValue = value + step;

    const valueAdjustedByStep = this.calculator.adjustByStep(newValue);
    const valueAdjustedByAccuracy = this.calculator.adjustByAccuracy(valueAdjustedByStep);

    const newCurrentValues = this.transformer.currentValueWithIndexToCurrentValues(
      index, valueAdjustedByAccuracy
    );

    this.model.setCurrentValues(newCurrentValues);
  }

  private handleHandleDecrement = (event: IViewEvent): void => {
    const { handlesIndex: index } = event.eventBody;
    const value = this.model.getCurrentValues()[index];
    const step = this.model.getStep();
    const newValue = value - step;

    const valueAdjustedByStep = this.calculator.adjustByStep(newValue);
    const valueAdjustedByAccuracy = this.calculator.adjustByAccuracy(valueAdjustedByStep);

    const newCurrentValues = this.transformer.currentValueWithIndexToCurrentValues(
      index, valueAdjustedByAccuracy
    );

    this.model.setCurrentValues(newCurrentValues);
  }

  private handleLineClick = (event: IViewEvent): void => {
    let { newValue } = event.eventBody;

    newValue = this.calculator.percentToValue(newValue);
    const valueAdjustedByStep = this.calculator.adjustByStep(newValue);
    const valueAdjustedByAccuracy = this.calculator.adjustByAccuracy(valueAdjustedByStep);

    const newCurrentValues = this.transformer.currentValueWithoutIndexToCurrentValues(
      valueAdjustedByAccuracy,
    );

    this.model.setCurrentValues(newCurrentValues);
  }

  private handleScaleItemClick = (event: IViewEvent): void => {
    let { newValue } = event.eventBody;
    const isCollection = this.model.getIsCollection();

    if (isCollection) {
      newValue = this.model.getCollection().findIndex((item) => item === newValue);
    } else {
      newValue = this.calculator.adjustByStep(Number(newValue));
      newValue = this.calculator.adjustByAccuracy(newValue);
    }

    const newCurrentValues = this.transformer.currentValueWithoutIndexToCurrentValues(newValue);
    this.model.setCurrentValues(newCurrentValues);
  }

}

export { Controller };
