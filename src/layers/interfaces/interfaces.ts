interface IChangeParameter {
  changeParameter: (changeParameterObject: IChangeParameterObject) => JQuery
}

interface JQuery {
  rangeSlider?(options: ISliderOptions): JQuery,
  changeParameter?: (changeParameterObject: IChangeParameterObject) => JQuery
}

interface IObserver {
  subscribe: (callback: ICallback) => void,
  unsubscribe: (callback: ICallback) => void,
  notify: (eventObject: IUpdate | ISliderEvent) => void,
}

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
  observer: IObserver
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

interface ISliderEvent {
  eventName: SliderEventName,
  eventBody: ISliderEventBody,
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
  increaseScaleStep = 'increaseScaleStep',
}

interface ISliderEventBody {
  index?: number,
  newValue?: number | string,
  increaseCoeff?: number,
}

interface IViewEvent {
  eventName: string,
  eventBody: {
    index: number,
    newValue: number
  }
}

interface IOutsideUpdate { currentValues: number[] }

interface ILine {
  calculator: IOrientationCalculator,
  observer: IObserver,
}

interface IHandle {
  index: number,
  calculator: IOrientationCalculator,
  observer: IObserver,
}

interface ICallback {
  eventName: UpdateEvantName | SliderEventName | 'test',
  function: ((eventBody: IUpdateBody | ISliderEventBody) => void),
}

interface ILabel {
  index: number,
  observer: IObserver,
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
  observer: IObserver,
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

type IChangeParameterObject = IChangeArrayOfNumberParameterObject
| IChangeArrayOfNumberOrStringParameterObject
| IChangeNumberParameterObject
| IChangeBooleanParameterObject
| IChangeFunctionParameterObject;

enum Parameters {
  extremeValues = 'extremeValues',
  min = 'min',
  max = 'max',
  currentValues = 'currentValues',
  currentMin = 'currentMin',
  currentMax = 'currentMax',
  step = 'step',
  scaleStep = 'scaleStep',
  isVertical = 'isVertical',
  isInterval = 'isInterval',
  haveProgressBar = 'haveProgressBar',
  haveLabel = 'haveLabel',
  haveScale = 'haveScale',
  isCollection = 'isCollection',
  collection = 'collection',
  callbacks = 'callbacks',
}

interface IChangeArrayOfNumberParameterObject {
  parameter: Parameters.extremeValues | Parameters.currentValues,
  value: number[],
}

interface IChangeArrayOfNumberOrStringParameterObject {
  parameter: Parameters.collection,
  value: number[] | string[],
}

interface IChangeNumberParameterObject {
  parameter: Parameters.min
  | Parameters.max
  | Parameters.currentMin
  | Parameters.currentMax
  | Parameters.step
  | Parameters.scaleStep,
  value: number,
}

interface IChangeBooleanParameterObject {
  parameter: Parameters.isVertical
  | Parameters.isInterval
  | Parameters.isCollection
  | Parameters.haveLabel
  | Parameters.haveProgressBar
  | Parameters.haveScale,
  value: boolean
}

interface IChangeFunctionParameterObject {
  parameter: Parameters.callbacks
  value: ((updateObject: IUpdateBody) => void)[],
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

interface IViewUpdateData {
  margins: number[],
  currentValues: number[],
  collection: string[] | number[],
  indexOfLastChangedHandle: number,
  haveScale: boolean,
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
  isConverted?: boolean,
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

  segmentSize: (numberOfSegments: number) => number;

  getIncreaseCoeff: (items: HTMLElement[]) => number;
}

interface IOrientationCalculatorProps {
  getLineSize: () => number,
  getLineLocation: () => number
}

type CustomEventType = {
  parameter: string,
  value: number | string[] | number[]
};

interface IParameterHandlers {
  extremeValues: (newValue: number[]) => void,
  min: (newValue: number) => void,
  max: (newValue: number) => void,
  currentValues: (newValue: number[]) => void,
  currentMin: (currentMin: number) => void,
  currentMax: (newValue: number) => void,
  step: (newValue: number) => void,
  scaleStep: (newValue: number) => void,
  isVertical: (newValue: boolean) => void,
  isInterval: (newValue: boolean) => void,
  haveProgressBar: (newValue: boolean) => void,
  haveLabel: (newValue: boolean) => void,
  haveScale: (newValue: boolean) => void,
  isCollection: (newValue: boolean) => void,
  collection: (newValue: number[] | string[]) => void,
  callbacks: (newValue: ((updateObject: IUpdateBody) => void)[]) => void,
}

export {
  IModel, IUpdateCallback, IUpdate, IUpdateBody, IViewEvent, IOutsideUpdate,
  IHandle, ICallback, ILabel, ILabelAddContent, ILabelUpdate, IScale, ICreateScaleItems,
  IScaleAddContent, IGetScaleItem, IClickEventObject, IProgressBar, IPresenter,
  IChangeParameterObject, ISliderOptions, IView, ICreateElements, ISetCurrentValueByIndex,
  IViewUpdate, IScaleUpdate, IScaleUpdateBody, ILine, IParameters, UpdateEvantName,
  SliderEventName, IOrientationCalculator, IOrientationCalculatorProps, CustomEventType,
  ISliderEvent, ISliderEventBody, IViewUpdateData, IObserver, IChangeParameter, JQuery,
  IParameterHandlers, Parameters, IChangeNumberParameterObject, IChangeArrayOfNumberParameterObject,
  IChangeArrayOfNumberOrStringParameterObject, IChangeBooleanParameterObject,
  IChangeFunctionParameterObject,
};
