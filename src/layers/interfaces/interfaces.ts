import { HorizontalCalculator } from '../view/orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../view/orientation-calculator/vertical-calculator';

interface IModel {
  extremeValues: number[],
  currentValues: number[],
  callbacks: ((updateObject: IOutsideUpdate) => void)[],
  collection: string[] | number[] | HTMLElement[]
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  isCollection: boolean,
}

interface IUpdateCallback { function: (eventObject: IFullUpdate) => void }

interface IFullUpdate {
  eventName: string,
  eventBody: {
    extremeValues: number[],
    currentValues: number[],
    margins: number[],
    scaleStep: number,
    isVertical: boolean,
    haveScale: boolean,
    haveLabel: boolean,
    collection: string[] | number[] | HTMLElement[],
    isCollection: boolean
  }
}

interface IValuesUpdate {
  eventName: string,
  eventBody: {
    currentValues: number[],
    margins: number[],
    collection: string[] | number[] | HTMLElement[]
  }
}

interface IEventObject { eventName: string, eventBody }

interface IViewEvent {
  eventName: string,
  eventBody: {
    handlesIndex: number,
    newValue: number
  }
}

interface IOutsideUpdate { currentValues: number[] }

interface IHandle {
  index: number,
  calculator: HorizontalCalculator | VerticalCalculator,
  cleanWasActiveClass: () => void,
}

interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

interface ILabel {
  value: number,
  calculator: HorizontalCalculator | VerticalCalculator,
  isCollection: boolean
}

interface ILabelAddContent { value: number, collection: string[] | number[] | HTMLElement[] }

interface ILabelUpdate {
  margin: number,
  value: number,
  collection: string[] | number[] | HTMLElement[],
}

interface IScale {
  scaleStep: number,
  extremeValues: number[],
  calculator: HorizontalCalculator | VerticalCalculator,
  isCollection: boolean,
  collection: string[] | number[] | HTMLElement[],
}

interface ICreateScaleItems{
  scaleStep: number,
  extremeValues: number[],
  collection: string[] | number[] | HTMLElement[],
}

interface IScaleAddContent {
  target: HTMLElement,
  value: number,
  collection: string[] | number[] | HTMLElement[],
}

interface IGetScaleItem {
  value: number,
  extremeValues: number[],
  collection: string[] | number[] | HTMLElement[],
}

interface IClickEventObject { pageX: number, pageY: number }

interface IProgressBar { calculator: HorizontalCalculator | VerticalCalculator }

interface IController {
  slider: HTMLElement,
  extremeValues: number[],
  currentValues: number[],
  step: number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  callbacks: ((updateObject: IOutsideUpdate) => void)[]
  collection: string[] | number[] | HTMLElement[],
  isCollection: boolean
}

interface IChangeParameterObject {
  eventName: string,
  eventBody: {
    extremeValues: number[],
    min: number,
    max: number,
    currentValues: number[],
    currentMinValue: number,
    currentMaxValue: number,
    step: number,
    scaleStep: number,
    isVertical: boolean,
    isInterval: boolean,
    haveScale: boolean,
    haveLabel: boolean,
    isCollection: boolean,
    collection: string[] | number[] | HTMLElement[]
  }
}

export {
  IModel, IUpdateCallback, IFullUpdate, IValuesUpdate, IEventObject, IViewEvent, IOutsideUpdate,
  IHandle, ICallback, ILabel, ILabelAddContent, ILabelUpdate, IScale, ICreateScaleItems,
  IScaleAddContent, IGetScaleItem, IClickEventObject, IProgressBar, IController,
  IChangeParameterObject,
};
