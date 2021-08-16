import "chai"
import { Handle } from '../handle'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

describe("Handle", function(): void {
  let handle: Handle
  let calculator: HorizontalCalculator | VerticalCalculator;

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");

    body.innerHTML = `
      <style> 
        html{ margin: 0; padding: 0; box-sizing: border-box}
        body{ margin: 0; padding: 0; box-sizing: border-box }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative; box-sizing: border-box }
        .light-range-slider__handle{ width: 10px; height: 10px; position: absolute; box-sizing: border-box }

        .slider.slider_vertical{ width: 20px; height: 700px; position: relative}
        .slider.slider_vertical .light-range-slider__handle{ width: 10px; height: 10px; position: absolute }
      </style>`

    body.appendChild(slider);
    slider.className = "slider";

    let view = {
      getLineSize: () => slider.offsetWidth,
      getLineLocation: () => slider.getBoundingClientRect().left
    }

    calculator = new HorizontalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })

    handle = new Handle({ index: 0, calculator })
    slider.appendChild(handle.getBody());
    handle.update(50)
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__handle"', function() { 
    expect(document.querySelector('.light-range-slider__handle').tagName).to.equal('DIV');
  })

  it('Should update margin', function() {

    expect(handle.getBody().offsetLeft).to.equal(245);

    handle.update(70);

    expect(handle.getBody().offsetLeft).to.equal(345);
  })

  it('Should active pointerdown event', function() {

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 302,
      clientY: 20,
      pointerId: 1
    }))

    expect(handle.cursorOffsetRelativeHandleAtStartDragging).to.equal(0.4);
  })

  it('Should active pointermove event', function() {
    const eventObject = {
      eventName: 'handleMove',
      eventBody: { handlesIndex: 0, newValue: 70 },
    };
    
    let testValue: {eventName: string, eventBody: { handlesIndex: number, newValue: number } }

    const callback = (
      event: {eventName: string, eventBody: { handlesIndex: number, newValue: number } }
    ) => testValue = event

    const slider = document.querySelector('.slider');
    slider.appendChild(handle.getBody());

    handle.subscribe({ function: callback });

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 302, 
      clientY: 20, 
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointermove', {
      clientX: 402, 
      clientY: 20, 
      pointerId: 1
    }))

    expect(testValue).to.deep.equal(eventObject);
  })

  it('Should active pointerup event', function() {
    
    const slider = document.querySelector('.slider');
    slider.appendChild(handle.getBody());

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 302,
      clientY: 20,
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointerup', {
      pointerId: 1
    }))

    expect(handle.cursorOffsetRelativeHandleAtStartDragging).to.equal(0);
  })


})