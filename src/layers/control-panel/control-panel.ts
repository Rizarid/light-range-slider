/* eslint-disable @typescript-eslint/dot-notation */
import * as $ from 'jquery';
import { IController, IModel } from '../interfaces/interfaces';
import './control-panel.sass';

class ControlPanel {
  private body: HTMLElement;

  private demoArea: HTMLElement;

  private controlPanel: HTMLElement;

  private min: HTMLInputElement;

  private max: HTMLInputElement;

  private currentMin: HTMLInputElement;

  private currentMax: HTMLInputElement;

  private step: HTMLInputElement;

  private scaleStep: HTMLInputElement;

  private isVertical: HTMLInputElement;

  private isInterval: HTMLInputElement;

  private isCollection: HTMLInputElement;

  private haveProgressBar: HTMLInputElement;

  private haveLabel: HTMLInputElement;

  private haveScale: HTMLInputElement;

  private collection: HTMLInputElement;

  private slider: JQuery;

  constructor(controlPanel: HTMLElement, sliderParams: IController = ({} as IController)) {
    this.body = controlPanel;
    const params = sliderParams;

    this.createBlocs();
    this.createElements();
    this.appendElementsToControlPanel();

    this.slider = $(this.getBlock('slider'));
    this.demoArea.appendChild(this.slider[0]);

    this.body.appendChild(this.demoArea);
    this.body.appendChild(this.controlPanel);

    params.callbacks = [this.handleSliderUpdate];
    (this.slider['rangeSlider'] as (params: IController) => JQuery)(params);

    this.addListeners();
  }

  private createBlocs(): void {
    this.demoArea = this.getBlock('demo-area');
    this.controlPanel = this.getBlock('control-panel');
  }

  private createElements = (): void => {
    this.min = this.getTextInput('min');
    this.max = this.getTextInput('max');

    this.currentMin = this.getTextInput('currentMin');
    this.currentMax = this.getTextInput('currentMax');

    this.step = this.getTextInput('step');
    this.scaleStep = this.getTextInput('scaleStep');

    this.collection = this.getTextInput('collection');

    this.isVertical = this.getCheckBox('isVertical');
    this.isInterval = this.getCheckBox('isInterval');
    this.isCollection = this.getCheckBox('isCollection');

    this.haveProgressBar = this.getCheckBox('haveProgressBar');
    this.haveLabel = this.getCheckBox('haveLabel');
    this.haveScale = this.getCheckBox('haveScale');
  };

  private getBlock = (className: string): HTMLElement => {
    const block = document.createElement('div');
    block.className = className;
    return block;
  };

  private getTextInput = (className: string): HTMLInputElement => {
    const input = document.createElement('input');
    input.className = className;
    return input;
  };

  private getCheckBox = (className: string): HTMLInputElement => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = className;
    return checkbox;
  };

  private appendElementsToControlPanel = (): void => {
    const labelTexts = [
      'min', 'max', 'from', 'to', 'step', 'step of scale', 'collection', 'vertical', 'interval',
      'collection', 'progressBar', 'label', 'scale',
    ];

    const elements = [
      this.min, this.max, this.currentMin, this.currentMax, this.step, this.scaleStep,
      this.collection, this.isVertical, this.isInterval, this.isCollection, this.haveProgressBar,
      this.haveLabel, this.haveScale,
    ];

    elements.map((item, index) => this.appendElement(labelTexts[index], item));
  };

  private appendElement = (textOfLabel: string, element: HTMLInputElement): void => {
    const label = this.getLabel(textOfLabel);
    label.classList.add(element.type);
    label.appendChild(element);
    this.controlPanel.appendChild(label);
  };

  private getLabel = (textOfLabel: string): HTMLLabelElement => {
    const label = document.createElement('label');
    label.innerText = textOfLabel;
    return label;
  };

  private addListeners = (): void => {
    this.min.addEventListener('input', this.handleMinInput);
    this.max.addEventListener('input', this.handleMaxInput);

    this.currentMin.addEventListener('input', this.handleCurrentMinInput);
    this.currentMax.addEventListener('input', this.handleCurrentMaxInput);

    this.step.addEventListener('input', this.handleStepInput);
    this.scaleStep.addEventListener('input', this.handleScaleStepInput);

    this.isVertical.addEventListener('change', this.handleIsVerticalChange);
    this.isInterval.addEventListener('change', this.handleIsIntervalChange);
    this.isCollection.addEventListener('change', this.handleIsCollectionChange);

    this.haveProgressBar.addEventListener('change', this.handleHaveProgressBarChange);
    this.haveLabel.addEventListener('change', this.handleHaveLabelChange);
    this.haveScale.addEventListener('change', this.handleHaveScaleChange);
  };

  private handleMinInput = (): void => {
    (this.slider['changeMinValue'] as (arg: number) => JQuery)(Number(this.min.value));
  };

  private handleMaxInput = (): void => {
    (this.slider['changeMaxValue'] as (arg: number) => JQuery)(Number(this.max.value));
  };

  private handleCurrentMinInput = (): void => {
    (this.slider['changeMinCurrentValue'] as (arg: number) => JQuery)(Number(this.currentMin.value));
  };

  private handleCurrentMaxInput = (): void => {
    (this.slider['changeMaxCurrentValue'] as (arg: number) => JQuery)(Number(this.currentMax.value));
  };

  private handleStepInput = (): void => {
    (this.slider['changeStep'] as (arg: number) => JQuery)(Number(this.step.value));
  };

  private handleScaleStepInput = (): void => {
    (this.slider['changeScaleStep'] as (arg: number) => JQuery)(Number(this.scaleStep.value));
  };

  private handleIsVerticalChange = (): void => {
    (this.slider['changeIsVertical'] as (arg: boolean) => JQuery)(this.isVertical.checked);
  };

  private handleIsIntervalChange = (): void => {
    (this.slider['changeIsInterval'] as (arg: boolean) => JQuery)(this.isInterval.checked);
  };

  private handleIsCollectionChange = (): void => {
    (this.slider['changeIsCollection'] as (arg: boolean) => JQuery)(this.isCollection.checked);
  };

  private handleHaveLabelChange = (): void => {
    (this.slider['changeHaveLabel'] as (arg: boolean) => JQuery)(this.haveLabel.checked);
  };

  private handleHaveScaleChange = (): void => {
    (this.slider['changeHaveScale'] as (arg: boolean) => JQuery)(this.haveScale.checked);
  };

  private handleHaveProgressBarChange = (): void => {
    (this.slider['changeHaveProgressBar'] as (arg: boolean) => JQuery)(this.haveProgressBar.checked);
  };

  private handleSliderUpdate = (event: IModel) => {
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveLabel, haveScale, collection, isCollection,
    } = event;

    const [min, max] = extremeValues;
    const [currentMin, currentMax] = currentValues;

    this.min.value = min.toString();
    this.max.value = max.toString();

    this.currentMin.value = currentMin.toString();
    if (currentMax) this.currentMax.value = currentMax.toString();

    this.step.value = step.toString();
    this.scaleStep.value = scaleStep.toString();

    this.collection.value = collection.join(', ');

    this.isVertical.checked = isVertical;
    this.isInterval.checked = isInterval;
    this.isCollection.checked = isCollection;

    this.haveProgressBar.checked = haveProgressBar;
    this.haveLabel.checked = haveLabel;
    this.haveScale.checked = haveScale;
  };
}

export { ControlPanel };
