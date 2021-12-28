import { Observer } from '../observer/observer';

interface IModel {
  extremeValues: number[],
  currentValues: number[],
  callbacks: ((updateObject: IUpdateBody) => void)[],
  collection: string[] | number[]
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveProgressBar: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  isCollection: boolean,
}

interface IParameters {
  extremeValues: number[],
  currentValues: number[],
  callbacks: ((updateObject: IUpdateBody) => void)[],
  collection: string[] | number[]
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveProgressBar: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  isCollection: boolean,
  observer: Observer
}

interface IUpdateCallback { function: (eventObject: IUpdateBody) => void }

interface IUpdate {
  eventName: UpdateEvantName,
  eventBody: IUpdateBody,
}

enum UpdateEvantName {
  valuesUpdate = 'valuesUpdate',
  fullUpdate = 'fullUpdate',
}

enum SliderEventName {
  pointerDown = 'pointerDown',
  pointerMove = 'pointerMove',
  pointerUp = 'pointerUp',
  increment = 'increment',
  decrement = 'decrement',
  lineClick = 'lineClick',
  scaleItemClick = 'scaleItemClick',
  lineResize = 'lineResize',
}

interface IUpdateBody {
  extremeValues: number[],
  currentValues: number[],
  margins: number[],
  step: number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveProgressBar: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  collection: string[] | number[],
  isCollection: boolean,
  indexOfLastChangedHandle: number,
}

interface IEventObject { eventName: string, eventBody }

interface IViewEvent {
  eventName: string,
  eventBody: {
    index: number,
    newValue: number
  }
}

interface IOutsideUpdate { currentValues: number[] }

interface ILine {
  calculator:  IOrientationCalculator,
  observer: Observer,
}

interface IHandle {
  index: number,
  calculator: IOrientationCalculator,
  observer: Observer,
}

interface ICallback {
  eventName: string,
  function: (eventBody: any) => void
}

interface ILabel {
  calculator: IOrientationCalculator,
  isCollection: boolean
}

interface ILabelAddContent { value: number, collection: string[] | number[] }

interface ILabelUpdate {
  margin: number,
  value: number,
  collection: string[] | number[],
}

interface IScale {
  scaleStep: number,
  extremeValues: number[],
  calculator: IOrientationCalculator,
  isCollection: boolean,
  collection: string[] | number[],
  observer: Observer,
}

interface ICreateScaleItems{
  scaleStep: number,
  extremeValues: number[],
  collection: string[] | number[],
}

interface IScaleAddContent {
  target: HTMLElement,
  value: number,
  collection: string[] | number[],
  scaleStep: number,
  endsOfInterval: 'start' | 'end' | 'none', 
}

interface IGetScaleItem {
  value: number,
  extremeValues: number[],
  collection: string[] | number[],
  scaleStep: number,
  endsOfInterval: 'start' | 'end' | 'none',
}

interface IClickEventObject { pageX: number, pageY: number }

interface IProgressBar { calculator: IOrientationCalculator }

interface IPresenter {
  slider: HTMLElement,
  extremeValues: number[],
  currentValues: number[],
  step: number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveProgressBar: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  callbacks: ((updateObject: IUpdateBody) => void)[]
  collection: string[] | number[],
  isCollection: boolean
}

interface IChangeParameterObject {
  parameter: string,
  value: (number[] | number | boolean | string[] |
  ((updateObject: IOutsideUpdate) => void)[]),
}

interface ISliderOptions {
  slider?: HTMLElement,
  extremeValues?: number[],
  currentValues?: number[],
  step?: number,
  scaleStep?: number,
  isVertical?: boolean,
  isInterval?: boolean,
  haveProgressBar?: boolean,
  haveScale?: boolean,
  haveLabel?: boolean,
  callbacks?: ((updateObject: IOutsideUpdate) => void)[]
  collection?: string[] | number[],
  isCollection?: boolean
}

interface IView {
  slider: HTMLElement;
  extremeValues: number[],
  currentValues: number[],
  margins: number[],
  scaleStep: number,
  isVertical: boolean,
  haveProgressBar: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  collection: string[] | number[],
  isCollection: boolean,
  indexOfLastChangedHandle: number,
}

interface ICreateElements {
  margins: number[],
  currentValues: number[],
  haveProgressBar: boolean,
  haveLabel: boolean,
  isCollection: boolean
}

interface IViewUpdate {
  margins: number[],
  currentValues: number[],
  collection: string[] | number[],
}

interface IScaleUpdateBody {
  extremeValues: number[],
  scaleStep: number,
  haveScale: boolean,
  isCollection: boolean,
  collection: string[] | number[],
}
interface IScaleUpdate {
  eventName: string,
  eventBody: IScaleUpdateBody
}

interface ISetCurrentValueByIndex {
  index: number,
  newValue: number,
  isPercent?: boolean,
  isConverted?: boolean
}

interface IOrientationCalculator {
  getElementsSize: (target: HTMLElement) => number;

  getCursorLocation: (eventObject: IClickEventObject) => number;

  getElementsLocation: (target: HTMLElement) => number;

  getElementMargin: (target: HTMLElement) => number ;

  setElementsMargin: (target: HTMLElement, newValueInPercent: number) => void;

  setProgressBarMargin: (target: HTMLElement, newValueInPercent: number) => void;

  setElementsSize: (target: HTMLElement, newValueInPercent: number) => void;

  getAdjustedMarginToSize: (target: HTMLElement, marginInPercent: number) => number;

  getNotAdjustedMarginToSize: (
    target: HTMLElement, 
    adjustedMarginInPercent: number,
  ) => number;

  pxToPercentages(value: number): number;

  percentagesToPx(value: number): number;
}

interface IOrientationCalculatorProps {
  getLineSize: () => number,
  getLineLocation: () => number
}

type CustomEventType = {
  parameter: string,
  value: number | string[] | number[]
}

export {
  IModel, IUpdateCallback, IUpdate, IUpdateBody, IEventObject, IViewEvent, IOutsideUpdate,
  IHandle, ICallback, ILabel, ILabelAddContent, ILabelUpdate, IScale, ICreateScaleItems,
  IScaleAddContent, IGetScaleItem, IClickEventObject, IProgressBar, IPresenter,
  IChangeParameterObject, ISliderOptions, IView, ICreateElements, ISetCurrentValueByIndex,
  IViewUpdate, IScaleUpdate, IScaleUpdateBody, ILine, IParameters, UpdateEvantName,
  SliderEventName, IOrientationCalculator, IOrientationCalculatorProps, CustomEventType
};
