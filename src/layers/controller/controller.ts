import {
  IEventObject, IFullUpdate, IViewEvent, IOutsideUpdate,
} from '../interfaces/interfaces';
import { Model } from '../model/model';
import { View } from '../view/view';

interface IController {
  slider: HTMLElement,
  extremeValues: number[],
  currentValues: number[],
  step: number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  callbacks: ((updateObject: IOutsideUpdate) => void)[]
  collection: string[] | number[] | HTMLElement[],
  isCollection: boolean
}

interface IChangeParameterObject {
  eventName: string,
  eventBody: {
    extremeValues: number[],
    currentValues: number[],
    step: number,
    scaleStep: number,
    isVertical: boolean,
    isInterval: boolean,
    haveScale: boolean,
    haveLabel: boolean
  }
}

class Controller {
  private model: Model;

  private view: View;

  constructor(options: IController) {
    this.createModel(options);
    this.createView(options.slider, this.model.getFullUpdate());
    this.model.subscribe({ function: this.handleModelEvents });
    this.view.subscribe({ function: this.handleViewEvents });
  }

  public changeParameter(eventObject: IChangeParameterObject): void {
    if (eventObject.eventName === 'extremeValuesChanged') {
      const { extremeValues } = eventObject.eventBody;
      this.model.setExtremeValues(extremeValues);
    }

    if (eventObject.eventName === 'minChanged') {
      const { min } = eventObject.eventBody;
      this.model.setMinValue(min);
    }

    if (eventObject.eventName === 'maxChanged') {
      const { max } = eventObject.eventBody;
      this.model.setMaxValue(max);
    }

    if (eventObject.eventName === 'currentValuesChanged') {
      const { currentValues } = eventObject.eventBody;
      this.model.setCurrentValues(currentValues);
    }

    if (eventObject.eventName === 'currentMinChanged') {
      const { currentMinValue } = eventObject.eventBody;
      this.model.setMinCurrentValue(currentMinValue);
    }

    if (eventObject.eventName === 'currentMaxChanged') {
      const { currentMaxValue } = eventObject.eventBody;
      this.model.setMaxCurrentValue(currentMaxValue);
    }

    if (eventObject.eventName === 'stepChanged') {
      const { step } = eventObject.eventBody;
      this.model.setStep(step);
    }

    if (eventObject.eventName === 'scaleStepChanged') {
      const { scaleStep } = eventObject.eventBody;
      this.model.setScaleStep(scaleStep);
    }

    if (eventObject.eventName === 'isVerticalChanged') {
      const { isVertical } = eventObject.eventBody;
      this.model.setIsVertical(isVertical);
    }

    if (eventObject.eventName === 'isIntervalChanged') {
      const { isInterval } = eventObject.eventBody;
      this.model.setIsInterval(isInterval);
    }

    if (eventObject.eventName === 'haveLabelChanged') {
      const { haveLabel } = eventObject.eventBody;
      this.model.setHaveLabel(haveLabel);
    }

    if (eventObject.eventName === 'haveScaleChanged') {
      const { haveScale } = eventObject.eventBody;
      this.model.setHaveScale(haveScale);
    }

    if (eventObject.eventName === 'isCollectionChanged') {
      const { isCollection } = eventObject.eventBody;
      this.model.setIsCollection(isCollection);
    }

    if (eventObject.eventName === 'collectionChanged') {
      const { collection } = eventObject.eventBody;
      this.model.setCollection(collection);
    }
  }

  private handleModelEvents = (event: IEventObject): void => {
    if (event.eventName === 'fullUpdate') {
      const slider = this.view.getBody();
      slider.innerHTML = '';
      this.createView(slider, event);
      this.view.subscribe({ function: this.handleViewEvents });
    }

    if (event.eventName === 'valuesUpdate') this.view.update(event.eventBody);
  };

  private handleViewEvents = (event: IViewEvent): void => {
    if (event.eventName === 'handleMove') {
      let { newValue } = event.eventBody;
      const { handlesIndex } = event.eventBody;

      newValue = this.model.percentToValue(newValue);
      this.model.setCurrentValueBeIndex({ index: handlesIndex, newValue });
    }

    if (event.eventName === 'lineClick') {
      let { newValue } = event.eventBody;
      newValue = this.model.percentToValue(newValue);
      this.model.setNearestValue(newValue);
    }

    if (event.eventName === 'scaleItemClick') {
      let { newValue } = event.eventBody;
      newValue = this.model.percentToValue(newValue);
      this.model.setNearestValue(newValue);
    }
  };

  private createModel(options: IController): void {
    this.model = new Model({
      extremeValues: options.extremeValues,
      currentValues: options.currentValues,
      step: options.step,
      scaleStep: options.scaleStep,
      isVertical: options.isVertical,
      isInterval: options.isInterval,
      haveScale: options.haveScale,
      haveLabel: options.haveLabel,
      callbacks: options.callbacks,
      collection: options.collection,
      isCollection: options.isCollection,
    });
  }

  private createView(slider: HTMLElement, eventObject: IFullUpdate): void {
    this.view = new View({
      slider,
      extremeValues: eventObject.eventBody.extremeValues,
      currentValues: eventObject.eventBody.currentValues,
      margins: eventObject.eventBody.margins,
      scaleStep: eventObject.eventBody.scaleStep,
      isVertical: eventObject.eventBody.isVertical,
      haveScale: eventObject.eventBody.haveScale,
      haveLabel: eventObject.eventBody.haveLabel,
      isCollection: eventObject.eventBody.isCollection,
      collection: eventObject.eventBody.collection,
    });
  }
}

export { Controller };
