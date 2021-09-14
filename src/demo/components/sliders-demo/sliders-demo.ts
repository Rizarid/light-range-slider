/* eslint-disable @typescript-eslint/dot-notation */
import * as $ from 'jquery';

import { ISliderOptions } from '../../../layers/interfaces/interfaces';
import { ControlPanel } from '../control-panel/control-panel';
import './sliders-demo.sass';

class SlidersDemo {
  private body: HTMLElement;

  private $slider: JQuery;

  private controlPanel: ControlPanel;

  constructor(target: HTMLElement, slidersOptions: ISliderOptions = {}) {
    this.body = target;
    this.createSlider(slidersOptions);
    this.createControlPanel();
  }

  private createSlider = (slidersOptions: ISliderOptions) => {
    this.$slider = $(this.body).find('.slider');
    (this.$slider['rangeSlider'] as (slidersOptions: ISliderOptions) => JQuery)(slidersOptions);
  };

  private createControlPanel = () => {
    const controlPanel: HTMLElement = this.body.querySelector('.js-control-panel');
    this.controlPanel = new ControlPanel(controlPanel, this.$slider);
  };
}

export { SlidersDemo };
