import {
  IEventObject, IFullUpdate, IViewEvent, IController, IChangeParameterObject,
} from '../interfaces/interfaces';
import { Model } from '../model/model';
import { View } from '../view/view';

class Controller {
  private model: Model;

  private view: View;

  constructor(options: IController) {
    const { slider } = options;
    this.createModel(options);
    this.createView(slider, this.model.getFullUpdate());
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
      this.model.setMinValue(min);
    }

    if (eventName === 'maxChanged') {
      const { max } = eventObject.eventBody;
      this.model.setMaxValue(max);
    }

    if (eventName === 'currentValuesChanged') {
      const { currentValues } = eventObject.eventBody;
      this.model.setCurrentValues(currentValues);
    }

    if (eventName === 'currentMinChanged') {
      const { currentMinValue } = eventObject.eventBody;
      this.model.setMinCurrentValue(currentMinValue);
    }

    if (eventName === 'currentMaxChanged') {
      const { currentMaxValue } = eventObject.eventBody;
      this.model.setMaxCurrentValue(currentMaxValue);
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

  private handleModelEvents = (event: IEventObject): void => {
    const { eventName } = event;

    if (eventName === 'fullUpdate') {
      const slider = this.view.getBody();
      slider.innerHTML = '';
      this.createView(slider, event);
      this.view.subscribe({ function: this.handleViewEvents });
    }

    if (eventName === 'valuesUpdate') this.view.update(event.eventBody);

    if (eventName === 'scaleUpdate') this.view.scaleUpdate(event.eventBody);
  };

  private handleViewEvents = (event: IViewEvent): void => {
    const { eventName } = event;

    if (eventName === 'handleMove') {
      const { newValue: newValueInPercent, handlesIndex } = event.eventBody;

      const newValue = this.model.percentToValue(newValueInPercent);
      this.model.setCurrentValueBeIndex({ index: handlesIndex, newValue });
    }

    if (eventName === 'lineClick') {
      let { newValue } = event.eventBody;
      newValue = this.model.percentToValue(newValue);
      this.model.setNearestValue(newValue);
    }

    if (eventName === 'scaleItemClick') {
      let { newValue } = event.eventBody;
      const isCollection = this.model.getIsCollection();

      if (isCollection) {
        // eslint-disable-next-line eqeqeq
        newValue = this.model.getCollection().findIndex((item) => item == newValue);
      } else {
        newValue = this.model.valueToPercent(Number(newValue));
        newValue = this.model.percentToValue(newValue);
      }

      this.model.setNearestValue(newValue);
    }

    if (eventName === 'lineResize') {
      this.model.sendUpdate('scaleUpdate');
    }
  };

  private createModel(options: IController): void {
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveScale,
      haveProgressBar, haveLabel, callbacks, collection, isCollection,
    } = options;

    this.model = new Model({
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveScale, haveLabel, callbacks, collection, isCollection,
    });
  }

  private createView(slider: HTMLElement, eventObject: IFullUpdate): void {
    const {
      extremeValues, currentValues, scaleStep, isVertical, haveScale, haveLabel,
      collection, isCollection, margins, haveProgressBar,
    } = eventObject.eventBody;

    this.view = new View({
      slider, extremeValues, currentValues, margins, scaleStep, isVertical, haveProgressBar,
      haveScale, haveLabel, isCollection, collection,
    });
  }
}

export { Controller };
