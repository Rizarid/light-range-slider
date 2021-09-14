/* eslint-disable @typescript-eslint/dot-notation */

import * as $ from 'jquery';

import { Controller } from '../layers/controller/controller';
import { ISliderOptions, IOutsideUpdate } from '../layers/interfaces/interfaces';
import './lite-range-slider.sass';

$.fn['rangeSlider'] = function (options: ISliderOptions = {}): JQuery {
  const This = (this as JQuery);
  const parameters = {
    slider: This[0],
    extremeValues: [0, 100],
    currentValues: [50],
    step: 1,
    scaleStep: 10,
    isVertical: false,
    isInterval: false,
    haveProgressBar: true,
    haveScale: true,
    haveLabel: true,
    isCollection: false,
    callbacks: [],
    collection: [],
  };

  if (options.extremeValues) parameters.extremeValues = options.extremeValues;
  if (options.currentValues) parameters.currentValues = options.currentValues;
  if (options.step) parameters.step = options.step;
  if (options.scaleStep) parameters.scaleStep = options.scaleStep;
  if (options.isVertical) parameters.isVertical = options.isVertical;
  if (options.isInterval) parameters.isInterval = options.isInterval;
  if (options.haveProgressBar) parameters.haveProgressBar = options.haveProgressBar;
  if (options.haveScale) parameters.haveScale = options.haveScale;
  if (options.haveScale) parameters.haveScale = options.haveScale;
  if (options.callbacks) parameters.callbacks = options.callbacks;
  if (options.collection) parameters.collection = options.collection;
  if (options.isCollection) parameters.isCollection = options.isCollection;

  const slider = new Controller(parameters);

  This['changeExtremeValues'] = (newExtremeValues: [number, number]): JQuery => {
    const eventObject = {
      eventName: 'extremeValues',
      eventBody: { extremeValues: newExtremeValues },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeMinValue'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'min',
      eventBody: { min: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeMaxValue'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'max',
      eventBody: { max: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeCurrentValues'] = (newValue: [number, number]): JQuery => {
    const eventObject = {
      eventName: 'currentValues',
      eventBody: { currentValues: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeMinCurrentValue'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'currentMin',
      eventBody: { currentMin: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeMaxCurrentValue'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'currentMax',
      eventBody: { currentMax: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeStep'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'step',
      eventBody: { step: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeScaleStep'] = (newValue: number): JQuery => {
    const eventObject = {
      eventName: 'scaleStep',
      eventBody: { scaleStep: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeIsVertical'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'isVertical',
      eventBody: { isVertical: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeIsInterval'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'isInterval',
      eventBody: { isInterval: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeHaveProgressBar'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'haveProgressBar',
      eventBody: { haveProgressBar: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeHaveLabel'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'haveLabel',
      eventBody: { haveLabel: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeHaveScale'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'haveScale',
      eventBody: { haveScale: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeCallbacks'] = (newValue: ((updateObject: IOutsideUpdate) => void)[]): JQuery => {
    const eventObject = {
      eventName: 'callbacks',
      eventBody: { callbacks: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeIsCollection'] = (newValue: boolean): JQuery => {
    const eventObject = {
      eventName: 'isCollection',
      eventBody: { isCollection: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  This['changeCollection'] = (newValue: number[] | string[] | HTMLElement[]): JQuery => {
    const eventObject = {
      eventName: 'collection',
      eventBody: { collection: newValue },
    };
    slider.changeParameter(eventObject);

    return This;
  };

  return This;
};
