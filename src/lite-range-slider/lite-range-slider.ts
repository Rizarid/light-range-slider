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

  const slider = new Presenter($.extend(defaults, options));

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
