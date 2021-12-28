import { Observer } from '../observer/observer';
import { HorizontalCalculator } from '../view/orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../view/orientation-calculator/vertical-calculator';

interface IModel {
  extremeValues: number[],
  currentValues: number[],
  callbacks: ((updateObject: IUpdateBody) => void)[],
  collection: string[] | number[] | HTMLElement[]
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
  collection: string[] | number[] | HTMLElement[]
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
  eventName: string,
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
  extremeValues?: number[],
  currentValues?: number[],
  margins?: number[],
  step?: number,
  scaleStep?: number,
  isVertical?: boolean,
  isInterval?: boolean,
  haveProgressBar?: boolean,
  haveScale?: boolean,
  haveLabel?: boolean,
  collection?: string[] | number[] | HTMLElement[],
  isCollection?: boolean,
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
  calculator: HorizontalCalculator | VerticalCalculator,
  observer: Observer,
}

interface IHandle {
  index: number,
  calculator: HorizontalCalculator | VerticalCalculator,
  observer: Observer,
}

interface ICallback {
  eventName: string,
  function: (eventBody: any) => void
}

interface ILabel {
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
  observer: Observer,
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
  scaleStep: number,
  endsOfInterval: 'start' | 'end' | 'none', 
}

interface IGetScaleItem {
  value: number,
  extremeValues: number[],
  collection: string[] | number[] | HTMLElement[],
  scaleStep: number,
  endsOfInterval: 'start' | 'end' | 'none',
}

interface IClickEventObject { pageX: number, pageY: number }

interface IProgressBar { calculator: HorizontalCalculator | VerticalCalculator }

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
  collection: string[] | number[] | HTMLElement[],
  isCollection: boolean
}

interface IChangeParameterObject {
  parameter: string,
  value: (number[] | number | boolean | string[] | HTMLElement[] |
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
  collection?: string[] | number[] | HTMLElement[],
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
  collection: string[] | number[] | HTMLElement[],
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
  collection: string[] | number[] | HTMLElement[]
}

interface IScaleUpdateBody {
  extremeValues: number[],
  scaleStep: number,
  haveScale: boolean,
  isCollection: boolean,
  collection: string[] | number[] | HTMLElement[]
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

export {
  IModel, IUpdateCallback, IUpdate, IUpdateBody, IEventObject, IViewEvent, IOutsideUpdate,
  IHandle, ICallback, ILabel, ILabelAddContent, ILabelUpdate, IScale, ICreateScaleItems,
  IScaleAddContent, IGetScaleItem, IClickEventObject, IProgressBar, IPresenter,
  IChangeParameterObject, ISliderOptions, IView, ICreateElements, ISetCurrentValueByIndex,
  IViewUpdate, IScaleUpdate, IScaleUpdateBody, ILine, IParameters, UpdateEvantName,
  SliderEventName
};
