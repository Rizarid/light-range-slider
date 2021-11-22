import * as $ from 'jquery';

import { ISliderOptions, IUpdateBody, IChangeParameterObject } from '../../../layers/interfaces/interfaces';
import './sliders-demo.sass';
import TextField from '../text-field/text-field';
import Toggle from '../toggle/toggle';

class SlidersDemo {
  private body: HTMLElement;

  private $slider: JQuery;

  private controlPanel: HTMLFormElement;

  private onUpdate: CustomEvent;

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
    this.controlPanel = this.getControlPanel();
    this.createControllers();
    this.addListeners();
    this.createSlider(slidersOptions);
    this.$slider['changeParameter']('callbacks', [this.handleSliderUpdate]);
  }

  private getTarget = (targetSelector: string): HTMLElement => (
    this.body.querySelector(targetSelector)
  );

  private getControlPanel = (): HTMLFormElement => this.body.querySelector('.js-sliders-demo__control-panel');

  private createControllers = ():void => {
    this.min = new TextField(this.getTarget('.js-sliders-demo__min-container'));
    this.max = new TextField(this.getTarget('.js-sliders-demo__max-container'));
    this.currentMin = new TextField(this.getTarget('.js-sliders-demo__current-min-container'));
    this.currentMax = new TextField(this.getTarget('.js-sliders-demo__current-max-container'));
    this.step = new TextField(this.getTarget('.js-sliders-demo__step-container'));
    this.scaleStep = new TextField(this.getTarget('.js-sliders-demo__scale-step-container'));
    this.collection = new TextField(this.getTarget('.js-sliders-demo__collection-container'));

    this.isVertical = new Toggle(this.getTarget('.js-sliders-demo__is-vertical-container'));
    this.isInterval = new Toggle(this.getTarget('.js-sliders-demo__is-interval-container'));
    this.isCollection = new Toggle(this.getTarget('.js-sliders-demo__is-collection-container'));
    this.haveProgressBar = new Toggle(this.getTarget('.js-sliders-demo__have-progress-bar-container'));
    this.haveLabel = new Toggle(this.getTarget('.js-sliders-demo__have-label-container'));
    this.haveScale = new Toggle(this.getTarget('.js-sliders-demo__have-scale-container'));
  };

  private createSlider = (slidersOptions: ISliderOptions) => {
    this.$slider = $(this.body).find('.js-sliders-demo__slider');
    (this.$slider['rangeSlider'] as (slidersOptions: ISliderOptions) => JQuery)(slidersOptions);
  };

  private createUpdateEvent = () => {
    this.onUpdate = new CustomEvent('update');
  };

  private addListeners = () => {
    this.controlPanel.addEventListener('parameterChanged', this.handleParameterChanged);
  };

  private handleParameterChanged = (event: CustomEvent) => {
    const { parameter, value } = (event.detail as IChangeParameterObject);
    this.$slider.changeParameter(parameter, value);
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
    this.collection.update((collection as string[]));

    this.isVertical.update(isVertical);
    this.isInterval.update(isInterval);
    this.isCollection.update(isCollection);
    this.haveProgressBar.update(haveProgressBar);
    this.haveLabel.update(haveLabel);
    this.haveScale.update(haveScale);
  };
}

export default SlidersDemo;
