/* eslint-disable @typescript-eslint/dot-notation */

import * as $ from 'jquery';

import { Presenter } from '../layers/presenter/presenter';
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

  const slider = new Presenter(parameters);

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
