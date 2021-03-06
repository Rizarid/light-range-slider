import { expect } from "chai"
import { Handle } from '../handle'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { Observer } from "../../../observer/observer"

describe("Handle", function(): void {
  let handle: Handle
  let state = {
    handleEventObject: undefined,
    margin: 0
  }

  let calculator = { 
    getElementMargin: (target: HTMLElement): number => 250,
    pxToPercentages: (value: number):number => value / 500 * 100,
    getAdjustedMarginToSize: (target: HTMLElement, margin: number): number => margin - 5,
    getNotAdjustedMarginToSize: (target: HTMLElement, margin: number): number => margin + 5,
    getCursorLocation: (event: { pageX: number, pageY: number }): number => event.pageX - 50,
    setElementsMargin: (target: HTMLElement, margin: number): void => { state.margin = margin },    
  }

  let observer = {
    notify: (event): void => state.handleEventObject = event,
  }

  beforeEach(function(): void {
    state.handleEventObject = undefined,
    state.margin = 0;

    handle = new Handle({ 
      index: 0, 
      calculator: (calculator as HorizontalCalculator),
      observer: (observer as Observer)
    })
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__handle"', function() { 
    expect(handle.getBody().tagName).to.equal('DIV');
    expect(handle.getBody().className).to.equal('light-range-slider__handle');
  })

  it('Should update margin', function() {
    handle.update(250);
    expect(state.margin).to.equal(245);
  })

  it('Should active pointerdown event', function() {

    const eventObject = {
      eventName: 'pointerDown',
      eventBody: { index: 0 },
    };

    const body = document.querySelector('body');
    body.appendChild(handle.getBody());

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 327,
      clientY: 20,
      pointerId: 1
    }))

    expect(Math.round(handle.cursorOffsetRelativeHandleAtStartDragging * 100) / 100).to.equal(0.4);
    expect(state.handleEventObject).to.deep.equal(eventObject);
  })

  it('Should active pointermove event', function() {
    const eventObject = {
      eventName: 'pointerMove',
      eventBody: { index: 0, newValue: 75 },
    };

    const body = document.querySelector('body');
    body.appendChild(handle.getBody());

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 327, 
      clientY: 20, 
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointermove', {
      clientX: 427, 
      clientY: 20, 
      pointerId: 1
    }))

    expect(state.handleEventObject).to.deep.equal(eventObject);
  })

  it('Should active pointerup event', function() {
    const eventObject = {
      eventName: 'pointerUp',
      eventBody: { index: 0 },
    };
    
    const body = document.querySelector('body');
    body.appendChild(handle.getBody());

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 302,
      clientY: 20,
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointerup', {
      pointerId: 1
    }))

    expect(handle.cursorOffsetRelativeHandleAtStartDragging).to.equal(0);
    expect(state.handleEventObject).to.deep.equal(eventObject);
  })


})