/* eslint-disable @typescript-eslint/dot-notation */

import * as $ from 'jquery';

import { ISliderOptions, IUpdateBody, IChangeParameterObject } from '../../../layers/interfaces/interfaces';
import '../toggle/toggle-init';
import '../text-field/text-field-init';
import './sliders-demo.sass';

class SlidersDemo {
  private body: HTMLElement;

  private $slider: JQuery;

  private controlPanel: HTMLFormElement;

  private onUpdate: CustomEvent;

  constructor(target: HTMLElement, slidersOptions: ISliderOptions = {}) {
    this.body = target;
    this.controlPanel = this.getControlPanel();
    this.createUpdateEvent();
    this.addListeners();
    this.createSlider(slidersOptions);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$slider['changeParameter']('callbacks', [this.handleSliderUpdate]);
  }

  private getControlPanel = (): HTMLFormElement => this.body.querySelector('.js-sliders-demo__control-panel');

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$slider['changeParameter'](parameter, value);
  };

  private handleSliderUpdate = (event: IUpdateBody) => {
    const { extremeValues, currentValues, ...options } = event;
    const [min, max] = extremeValues;
    const [currentMin, currentMax] = currentValues;
    const elements = [['min', min], ['max', max], ['currentMin', currentMin], ['currentMax', currentMax], ...Object.entries(options)];

    elements.map((item) => {
      const [name, value] = (item as [string, (number | boolean | string[])]);
      const UpdateEvent = new CustomEvent('update', { detail: { value } });
      if (this.controlPanel[name]) {
        (this.controlPanel[name] as HTMLInputElement).dispatchEvent(UpdateEvent);
      }
      return null;
    });
  };
}

export { SlidersDemo };
