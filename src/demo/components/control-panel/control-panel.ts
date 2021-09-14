/* eslint-disable @typescript-eslint/dot-notation */
import { IUpdateBody } from '../../../layers/interfaces/interfaces';
import { Toggle } from '../toggle/toggle';
import '../text-field/text-field';
import './control-panel.sass';

class ControlPanel {
  private body: HTMLElement;

  private slider: JQuery;

  private min: HTMLInputElement;

  private max: HTMLInputElement;

  private currentMin: HTMLInputElement;

  private currentMax: HTMLInputElement;

  private step: HTMLInputElement;

  private scaleStep: HTMLInputElement;

  private collection: HTMLInputElement;

  private isVertical: Toggle;

  private isInterval: Toggle;

  private isCollection: Toggle;

  private haveProgressBar: Toggle;

  private haveLabel: Toggle;

  private haveScale: Toggle;

  private fields: string[];

  private toggles: string[];

  private fieldsHandlers: string[];

  private togglesHandlers: string[];

  constructor(target: HTMLElement, slider: JQuery) {
    this.body = target;
    this.slider = slider;
    this.createGroups();
    this.getFields();
    this.getToggles();
    this.createHandlersLists();
    this.addListeners();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.slider['changeCallbacks']([this.handleSliderUpdate]);
  }

  private createGroups = (): void => {
    this.fields = ['min', 'max', 'currentMin', 'currentMax', 'step', 'scaleStep', 'collection'];
    this.toggles = ['isVertical', 'isInterval', 'isCollection', 'haveProgressBar', 'haveLabel', 'haveScale'];
  };

  private getFields = (): void => {
    const fieldsClasses = ['min', 'max', 'current-min', 'current-max', 'step', 'scale-step', 'collection'];
    this.fields.map((item, index) => {
      (this[item] as HTMLElement) = this.body.querySelector(`.js-text-field.${fieldsClasses[index]} .text-field__field`);
      return null;
    });
  };

  private getToggles = (): void => {
    const togglesClasses = ['vertical', 'interval', 'is-collection', 'progress-bar', 'label', 'scale'];
    this.toggles.map((item, index) => {
      this[item] = new Toggle(this.body.querySelector(`.js-toggle.${togglesClasses[index]}`));
      return null;
    });
  };

  private createHandlersLists = () => {
    this.fieldsHandlers = [
      'handleMinInput', 'handleMaxInput', 'handleCurrentMinInput', 'handleCurrentMaxInput',
      'handleStepInput', 'handleScaleStepInput', 'handleCollectionChange',
    ];
    this.togglesHandlers = [
      'handleIsVerticalChange', 'handleIsIntervalChange', 'handleIsCollectionChange',
      'handleHaveProgressBarChange', 'handleHaveLabelChange', 'handleHaveScaleChange',
    ];
  };

  private addListeners = () => {
    this.fields.map((item, index) => (
      (this[item] as HTMLElement).addEventListener('change', this[this.fieldsHandlers[index]])
    ));
    this.toggles.map((item, index) => (
      (this[item] as Toggle).getCheckbox().addEventListener('change', this[this.togglesHandlers[index]])
    ));
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
    (this.slider['changeIsVertical'] as (arg: boolean) => JQuery)(this.isVertical.getCheckbox().checked);
  };

  private handleIsIntervalChange = (): void => {
    (this.slider['changeIsInterval'] as (arg: boolean) => JQuery)(this.isInterval.getCheckbox().checked);
  };

  private handleIsCollectionChange = (): void => {
    (this.slider['changeIsCollection'] as (arg: boolean) => JQuery)(this.isCollection.getCheckbox().checked);
  };

  private handleHaveLabelChange = (): void => {
    (this.slider['changeHaveLabel'] as (arg: boolean) => JQuery)(this.haveLabel.getCheckbox().checked);
  };

  private handleHaveScaleChange = (): void => {
    (this.slider['changeHaveScale'] as (arg: boolean) => JQuery)(this.haveScale.getCheckbox().checked);
  };

  private handleHaveProgressBarChange = (): void => {
    (this.slider['changeHaveProgressBar'] as (arg: boolean) => JQuery)(this.haveProgressBar.getCheckbox().checked);
  };

  private handleCollectionChange = (): void => {
    (this.slider['changeCollection'] as (arg: string[] | number[]) => JQuery)(
      this.collection.value.split(', '),
    );
  };

  private handleSliderUpdate = (event: IUpdateBody) => {
    const {
      extremeValues, currentValues, step, scaleStep, isVertical, isInterval, haveProgressBar,
      haveLabel, haveScale, collection, isCollection,
    } = event;

    const [min, max] = extremeValues;
    const [currentMin, currentMax] = currentValues;

    const fieldsValues = [min, max, currentMin, currentMax, step, scaleStep];
    const togglesValues = [
      isVertical, isInterval, isCollection, haveProgressBar, haveLabel, haveScale,
    ];

    fieldsValues.map((item, index) => {
      if (item) (this[this.fields[index]] as HTMLInputElement).value = item.toString();
      return null;
    });

    this.collection.value = collection.join(', ');

    togglesValues.map((item, index) => {
      if (item) (this[this.toggles[index]] as Toggle).changeChecked(item);
      return null;
    });
  };
}

export { ControlPanel };
