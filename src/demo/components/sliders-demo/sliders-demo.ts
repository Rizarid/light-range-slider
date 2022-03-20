import * as $ from 'jquery';

import {
  ISliderOptions,
  IUpdateBody,
  JQuery,
  IChangeParameterObject,
  Parameters,
} from '../../../layers/interfaces/interfaces';
import './sliders-demo.sass';
import TextField from '../text-field/text-field';
import Toggle from '../toggle/toggle';

class SlidersDemo {
  private body: HTMLElement;

  private $slider: JQuery;

  private controlPanel: HTMLFormElement;

  private min: TextField;

  private max: TextField;

  private currentMin: TextField;

  private currentMax: TextField;

  private step: TextField;

  private scaleStep: TextField;

  private collection: TextField;

  private isVertical: Toggle;

  private isInterval: Toggle;

  private isCollection: Toggle;

  private haveProgressBar: Toggle;

  private haveLabel: Toggle;

  private haveScale: Toggle;

  constructor(target: HTMLElement, slidersOptions: ISliderOptions = {}) {
    this.body = target;
    const controlPanel = this.getControlPanel();
    if (controlPanel) this.controlPanel = controlPanel;
    this.createControllers();
    this.addListeners();
    this.createSlider(slidersOptions);
    if (this.$slider.changeParameter !== undefined) {
      this.$slider.changeParameter({
        parameter: Parameters.callbacks,
        value: [this.handleSliderUpdate],
      });
    }
  }

  private getTarget = (targetSelector: string): HTMLElement | null => (
    this.body.querySelector(targetSelector)
  );

  private getControlPanel = (): HTMLFormElement | null => (
    this.body.querySelector('.js-sliders-demo__control-panel')
  );

  private createControllers = ():void => {
    const min = this.getTarget('.js-sliders-demo__min-container');
    if (min) this.min = new TextField(min);

    const max = this.getTarget('.js-sliders-demo__max-container');
    if (max) this.max = new TextField(max);

    const currentMin = this.getTarget('.js-sliders-demo__current-min-container');
    if (currentMin) this.currentMin = new TextField(currentMin);

    const currentMax = this.getTarget('.js-sliders-demo__current-max-container');
    if (currentMax) this.currentMax = new TextField(currentMax);

    const step = this.getTarget('.js-sliders-demo__step-container');
    if (step) this.step = new TextField(step);

    const scaleStep = this.getTarget('.js-sliders-demo__scale-step-container');
    if (scaleStep) this.scaleStep = new TextField(scaleStep);

    const collection = this.getTarget('.js-sliders-demo__collection-container');
    if (collection) this.collection = new TextField(collection);

    const isVertical = this.getTarget('.js-sliders-demo__is-vertical-container');
    if (isVertical) this.isVertical = new Toggle(isVertical);

    const isInterval = this.getTarget('.js-sliders-demo__is-interval-container');
    if (isInterval) this.isInterval = new Toggle(isInterval);

    const isCollection = this.getTarget('.js-sliders-demo__is-collection-container');
    if (isCollection) this.isCollection = new Toggle(isCollection);

    const haveProgressBar = this.getTarget('.js-sliders-demo__have-progress-bar-container');
    if (haveProgressBar) this.haveProgressBar = new Toggle(haveProgressBar);

    const haveLabel = this.getTarget('.js-sliders-demo__have-label-container');
    if (haveLabel) this.haveLabel = new Toggle(haveLabel);

    const haveScale = this.getTarget('.js-sliders-demo__have-scale-container');
    if (haveScale) this.haveScale = new Toggle(haveScale);
  };

  private createSlider = (slidersOptions: ISliderOptions) => {
    this.$slider = $(this.body).find('.js-sliders-demo__slider') as JQuery;
    if (this.$slider.rangeSlider !== undefined) {
      this.$slider.rangeSlider(slidersOptions);
    }
  };

  private addListeners = () => {
    this.controlPanel.addEventListener('parameterChanged', this.handleParameterChanged);
  };

  private handleParameterChanged = (event: CustomEvent<IChangeParameterObject>) => {
    if (this.$slider.changeParameter) {
      this.$slider.changeParameter(event.detail);
    }
  };

  private handleSliderUpdate = (event: IUpdateBody) => {
    const {
      extremeValues, currentValues, step, scaleStep, collection, isVertical, isInterval,
      isCollection, haveProgressBar, haveLabel, haveScale,
    } = event;

    const [min, max] = extremeValues;
    const [currentMin, currentMax] = currentValues;

    this.min.update(min);
    this.max.update(max);
    this.currentMin.update(currentMin);
    this.currentMax.update(currentMax);
    this.currentMax.disable(!isInterval);
    this.step.update(step);
    this.scaleStep.update(scaleStep);
    this.collection.update((collection));

    this.isVertical.update(isVertical);
    this.isInterval.update(isInterval);
    this.isCollection.update(isCollection);
    this.haveProgressBar.update(haveProgressBar);
    this.haveLabel.update(haveLabel);
    this.haveScale.update(haveScale);
  };
}

export default SlidersDemo;
