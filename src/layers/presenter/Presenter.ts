import {
  IPresenter,
  IChangeParameterObject,
  IUpdateBody,
  ISliderEventBody,
  UpdateEvantName,
  SliderEventName,
  Parameters,
} from '../interfaces/interfaces';
import { Model } from '../model/Model';
import { View } from '../view/View';

class Presenter {
  private model: Model;

  private view: View;

  constructor(options: IPresenter) {
    const { slider, ...modelOptions } = options;
    this.model = new Model(modelOptions);
    this.createView(
      slider,
      this.model.parameters.getUpdateObject(UpdateEvantName.fullUpdate).eventBody,
    );
    this.subscribeToModel();
    this.subscribeToView();
    setTimeout(() => { this.view.setIsResizeBlocked(false); }, 1);
  }

  public changeParameter = (eventObject: IChangeParameterObject): void => {
    if (eventObject.parameter === Parameters.extremeValues) {
      this.model.parameters.setExtremeValues(eventObject.value);
    }
    if (eventObject.parameter === Parameters.min) {
      this.model.customSetters.setMinValue(eventObject.value);
    }
    if (eventObject.parameter === Parameters.max) {
      this.model.customSetters.setMaxValue(eventObject.value);
    }
    if (eventObject.parameter === Parameters.currentValues) {
      this.model.parameters.setCurrentValues(eventObject.value);
    }
    if (eventObject.parameter === Parameters.currentMin) {
      this.handleCurrentMin(eventObject.value);
    }
    if (eventObject.parameter === Parameters.currentMax) {
      this.handleCurrentMax(eventObject.value);
    }
    if (eventObject.parameter === Parameters.step) {
      this.model.customSetters.setStep(eventObject.value);
    }
    if (eventObject.parameter === Parameters.scaleStep) {
      this.model.parameters.setScaleStep(eventObject.value);
    }
    if (eventObject.parameter === Parameters.isVertical) {
      this.model.parameters.setIsVertical(eventObject.value);
    }
    if (eventObject.parameter === Parameters.isInterval) {
      this.model.parameters.setIsInterval(eventObject.value);
    }
    if (eventObject.parameter === Parameters.isCollection) {
      this.model.parameters.setIsCollection(eventObject.value);
    }
    if (eventObject.parameter === Parameters.haveLabel) {
      this.model.parameters.setHaveLabel(eventObject.value);
    }
    if (eventObject.parameter === Parameters.haveProgressBar) {
      this.model.parameters.setHaveProgressBar(eventObject.value);
    }
    if (eventObject.parameter === Parameters.haveScale) {
      this.model.parameters.setHaveScale(eventObject.value);
    }
    if (eventObject.parameter === Parameters.collection) {
      this.model.parameters.setCollection(eventObject.value);
    }
    if (eventObject.parameter === Parameters.callbacks) {
      this.model.parameters.setCallbacks(eventObject.value);
    }
  };

  private subscribeToModel = () => {
    this.model.subscribe({
      eventName: UpdateEvantName.fullUpdate,
      function: this.handleFullUpdateEvent,
    });
    this.model.subscribe({
      eventName: UpdateEvantName.valuesUpdate,
      function: this.handleUpdate,
    });
  };

  private subscribeToView = () => {
    this.view.subscribe({
      eventName: SliderEventName.pointerMove,
      function: this.handlePointerMove,
    });
    this.view.subscribe({
      eventName: SliderEventName.increment,
      function: this.handleIncrement,
    });
    this.view.subscribe({
      eventName: SliderEventName.decrement,
      function: this.handleDecrement,
    });
    this.view.subscribe({
      eventName: SliderEventName.lineClick,
      function: this.handleLineClick,
    });
    this.view.subscribe({
      eventName: SliderEventName.scaleItemClick,
      function: this.handleScaleItemClick,
    });
    this.view.subscribe({
      eventName: SliderEventName.lineResize,
      function: this.handleLineResize,
    });
    this.view.subscribe({
      eventName: SliderEventName.increaseScaleStep,
      function: this.handleIncreaseScaleStep,
    });
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
    if (eventBody.haveScale) this.view.checkScaleStep();
  };

  private handleUpdate = (eventBody: IUpdateBody) => {
    this.view.update(eventBody);
  };

  private createView = (slider: HTMLElement, eventBody: IUpdateBody): void => {
    this.view = new View(({ slider, ...eventBody }));
  };

  private handlePointerMove = (eventBody: ISliderEventBody): void => {
    const { newValue, index } = eventBody;
    if ((typeof index === 'number') && (typeof newValue === 'number')) {
      this.model.customSetters.setCurrentValueByIndex({ index, newValue });
    } else {
      throw new Error(
        `received a parameter with the ${typeof newValue} type instead of a number`,
      );
    }
  };

  private handleIncrement = (eventBody: ISliderEventBody): void => {
    const { index } = eventBody;
    if (typeof index === 'number') {
      this.model.customSetters.incrementCurrentValueByIndex(index);
    }
  };

  private handleDecrement = (eventBody: ISliderEventBody): void => {
    const { index } = eventBody;
    if (typeof index === 'number') {
      this.model.customSetters.decrementCurrentValueByIndex(index);
    }
  };

  private handleLineClick = (eventBody: ISliderEventBody): void => {
    const { newValue } = eventBody;
    if (typeof newValue === 'number') {
      this.model.customSetters.setNearestCurrentValue(newValue);
    } else {
      throw new Error(
        `received a parameter with the ${typeof newValue} type instead of a number`,
      );
    }
  };

  private handleScaleItemClick = (eventBody: ISliderEventBody): void => {
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

  private handleIncreaseScaleStep = (eventBody: ISliderEventBody) => {
    const { increaseCoeff } = eventBody;
    increaseCoeff && this.model.customSetters.increaseScaleStep(increaseCoeff);
  };
}

export { Presenter };
