import * as $ from 'jquery';

import { Presenter } from '../layers/presenter/presenter';
import { ISliderOptions, IChangeParameterObject } from '../layers/interfaces/interfaces';
import './lite-range-slider.sass';

$.fn.extend({
  rangeSlider(this: JQuery, options: ISliderOptions = {}): JQuery {
    const defaults = {
      slider: this[0],
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

    this.extend({
      changeParameter: (cangeParameterObject: IChangeParameterObject) => {
        slider.changeParameter(cangeParameterObject);
        return this;
      },
    });

    return this;
  },
});

export { $ };
