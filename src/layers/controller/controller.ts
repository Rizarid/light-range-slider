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
    const { eventName } = eventObject;

    if (eventName === 'extremeValuesChanged') {
      const { extremeValues } = eventObject.eventBody;
      this.model.setExtremeValues(extremeValues);
    }

    if (eventName === 'minChanged') {
      const { min } = eventObject.eventBody;
      const newValue = this.transformer.minValueToExtremeValues(min);
      this.model.setExtremeValues(newValue);
    }

    if (eventName === 'maxChanged') {
      const { max } = eventObject.eventBody;
      const newValue = this.transformer.maxValueToExtremeValues(max);
      this.model.setExtremeValues(newValue);
    }

    if (eventName === 'currentValuesChanged') {
      const { currentValues } = eventObject.eventBody;
      this.model.setCurrentValues(currentValues);
    }

    if (eventName === 'currentMinChanged') {
      const { currentMinValue } = eventObject.eventBody;
      const newValue = this.transformer.newMinCurrentValueToCurrentValues(currentMinValue);
      this.model.setCurrentValues(newValue);
    }

    if (eventName === 'currentMaxChanged') {
      const { currentMaxValue } = eventObject.eventBody;
      const newValue = this.transformer.newMaxCurrentValueToCurrentValues(currentMaxValue);
      this.model.setCurrentValues(newValue);
    }

    if (eventName === 'stepChanged') {
      const { step } = eventObject.eventBody;
      this.model.setStep(step);
    }

    if (eventName === 'scaleStepChanged') {
      const { scaleStep } = eventObject.eventBody;
      this.model.setScaleStep(scaleStep);
    }

    if (eventName === 'isVerticalChanged') {
      const { isVertical } = eventObject.eventBody;
      this.model.setIsVertical(isVertical);
    }

    if (eventName === 'isIntervalChanged') {
      const { isInterval } = eventObject.eventBody;
      this.model.setIsInterval(isInterval);
    }

    if (eventName === 'haveProgressBarChanged') {
      const { haveProgressBar } = eventObject.eventBody;
      this.model.setHaveProgressBar(haveProgressBar);
    }

    if (eventName === 'haveLabelChanged') {
      const { haveLabel } = eventObject.eventBody;
      this.model.setHaveLabel(haveLabel);
    }

    if (eventName === 'haveScaleChanged') {
      const { haveScale } = eventObject.eventBody;
      this.model.setHaveScale(haveScale);
    }

    if (eventName === 'isCollectionChanged') {
      const { isCollection } = eventObject.eventBody;
      this.model.setIsCollection(isCollection);
    }

    if (eventName === 'collectionChanged') {
      const { collection } = eventObject.eventBody;
      this.model.setCollection(collection);
    }
  }

  private handleModelEvents = (event: IUpdate): void => {
    const { eventName, eventBody } = event;
    eventBody.margins = eventBody.currentValues.map(
      (item) => this.calculator.valueToPercent(item)
    );

    if (eventName === 'fullUpdate') {
      const slider = this.view.getBody();
      slider.innerHTML = '';
      this.createView(slider, eventBody);
      this.view.subscribe({ function: this.handleViewEvents });
    }

    if (eventName === 'valuesUpdate') this.view.update(eventBody);

    if (eventName === 'scaleUpdate') this.view.scaleUpdate(eventBody);
  };

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
