/* eslint-disable @typescript-eslint/dot-notation */

import * as $ from 'jquery';

import { Presenter } from '../layers/presenter/presenter';
import { ISliderOptions, IOutsideUpdate } from '../layers/interfaces/interfaces';
import './lite-range-slider.sass';

$.fn['rangeSlider'] = function (options: ISliderOptions = {}): JQuery {
  const This = (this as JQuery);
  const defaults = {
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

  if (options.extremeValues) defaults.extremeValues = options.extremeValues;
  if (options.currentValues) defaults.currentValues = options.currentValues;
  if (options.step) defaults.step = options.step;
  if (options.scaleStep) defaults.scaleStep = options.scaleStep;
  if (options.isVertical) defaults.isVertical = options.isVertical;
  if (options.isInterval) defaults.isInterval = options.isInterval;
  if (options.haveProgressBar) defaults.haveProgressBar = options.haveProgressBar;
  if (options.haveScale) defaults.haveScale = options.haveScale;
  if (options.haveScale) defaults.haveScale = options.haveScale;
  if (options.callbacks) defaults.callbacks = options.callbacks;
  if (options.collection) defaults.collection = options.collection;
  if (options.isCollection) defaults.isCollection = options.isCollection;

  const slider = new Presenter(defaults);

  This['changeParameter'] = (
    parameter: string,
    value: (number[] | number | boolean | string[] | HTMLElement[] |
    ((updateObject: IOutsideUpdate) => void)[]),
  ): JQuery => {
    const eventObject = { parameter, value };
    slider.changeParameter(eventObject);
    return This;
  };

  return This;
};
