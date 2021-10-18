import { expect } from "chai"
import { Scale } from '../scale'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { Observer } from "../../../observer/observer"

describe("Scale", function(): void {
  let scale: Scale
  let state = {
    scaleEventObject: undefined,
    margin: 0
  }

  let calculator = { 
    getElementMargin: (target: HTMLElement): number => 250,
    pxToPercentages: (value: number): number => (value / 500 * 100),
    getAdjustedMarginToSize: (target: HTMLElement, value: number): number => (value - 5) ,
    setElementsMargin: (target: HTMLElement, margin: number): void => { state.margin = margin }
  }

  let observer = {
    notify: (event): void => state.scaleEventObject = event,
  }

  beforeEach(function(): void {
    state.scaleEventObject = undefined;
    state.margin = 0;

    scale = new Scale({ 
      scaleStep: 10, 
      extremeValues: [200, 300], 
      calculator: (calculator as HorizontalCalculator),
      observer: (observer as Observer),
      isCollection: false,
      collection: []
    })
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__scale"', function() {
    expect(scale.getBody().tagName).to.equal('DIV');
    expect(scale.getBody().className).to.equal('light-range-slider__scale');
  })

  it('Should return margin', function() {
    expect(scale.calcMarginOfScaleItem(250, 200, 300)).to.equal(50);
  })

  it('Should return scale item by parameter isCollection = false', function() {
    const item = scale.getScaleItem({ value: 250, extremeValues: [200, 300], collection: [], scaleStep: 10 });

    expect(item.tagName).to.equal('DIV');
    expect(item.className).to.equal('light-range-slider__scale-item');
    expect(item.innerText).to.equal('250');
    expect(state.margin).to.equal(50);
  
  })

  it('Should return scale item by parameter isCollection = true', function() {
    
    scale = new Scale({ 
      scaleStep: 1, 
      extremeValues: [0, 2], 
      calculator: (calculator as HorizontalCalculator),
      observer: (observer as Observer),
      isCollection: true,
      collection: ['one', 'two', 'free']
    })

    const item = scale.getScaleItem({ value: 1, extremeValues: [0, 2], collection: ['one', 'two', 'free'] });

    expect(item.tagName).to.equal('DIV');
    expect(item.className).to.equal('light-range-slider__scale-item');
    expect(item.innerText).to.equal('two');
    expect(state.margin).to.equal(50);
  
  })

  it('Should contain 11 div items in scale.items', function() {
    expect(scale.items.length).to.equal(11);
  })

  it('Should adjust margins of scale items to element size', function() {
    scale.adjustMarginToSize();
    expect(state.margin).to.equal(45);
  })

  it('Should send event object after click on scale item', function() {
    let body = document.querySelector('body');
    body.appendChild(scale.getBody());

    scale.items[1].dispatchEvent(new MouseEvent('click'));

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: '210' },
    };

    expect(state.scaleEventObject).to.deep.equal(eventObject);
  })





})