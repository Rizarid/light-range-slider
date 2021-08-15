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
        body{ margin: 0; padding: 0 }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative }
        .light-range-slider__handle{ width: 10px; height: 10px; position: absolute }

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

    handle = new Handle({ index: 0, margin: 50, calculator })
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__handle"', function() {
    const slider = document.querySelector('.slider')
    slider.appendChild(handle.getBody());
    expect(document.querySelector('.light-range-slider__handle').tagName).to.equal('DIV');
  })

  it('Should update margin', function() {
    const slider = document.querySelector('.slider')
    slider.appendChild(handle.getBody());
    handle.adjustMarginToSize();

    expect(handle.getBody().offsetLeft).to.equal(45);

    handle.update(100);

    expect(handle.getBody().offsetLeft).to.equal(95);
  })

  it('Should active pointerdown event', function() {
    
    const slider = document.querySelector('.slider');
    slider.appendChild(handle.getBody());
    handle.adjustMarginToSize();

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 102,
      clientY: 20,
      pointerId: 1
    }))

    expect(handle.cursorOffsetRelativeHandleAtStartDragging).to.equal(2);
  })

  it('Should active pointermove event', function() {
    const eventObject = {
      eventName: 'handleMove',
      eventBody: { handlesIndex: 0, newValue: 250 },
    };
    
    let testValue: {eventName: string, eventBody: { handlesIndex: number, newValue: number } }

    const callback = (
      event: {eventName: string, eventBody: { handlesIndex: number, newValue: number } }
    ) => testValue = event

    const slider = document.querySelector('.slider');
    slider.appendChild(handle.getBody());
    handle.adjustMarginToSize();

    handle.subscribe({ function: callback });

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 102, 
      clientY: 20, 
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointermove', {
      clientX: 302, 
      clientY: 20, 
      pointerId: 1
    }))

    expect(testValue).to.deep.equal(eventObject);
  })

  it('Should active pointerup event', function() {
    
    const slider = document.querySelector('.slider');
    slider.appendChild(handle.getBody());
    handle.adjustMarginToSize();

    handle.getBody().dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 102,
      clientY: 20,
      pointerId: 1
    }))

    handle.getBody().dispatchEvent(new PointerEvent('pointerup', {
      pointerId: 1
    }))

    expect(handle.cursorOffsetRelativeHandleAtStartDragging).to.equal(0);
  })


})