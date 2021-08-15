import "chai"
import { Line } from '../line'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

describe("Line", function(): void {
  let line: Line
  let calculator: HorizontalCalculator | VerticalCalculator;

  let view = {
    getLineSize: () => line.getSize(),
    getLineLocation: () => line.getLocation()
  }

  beforeEach(function(): void {

    let div: HTMLElement = document.createElement("div");
    let body: HTMLElement = document.querySelector("body");

    body.innerHTML = `
      <style> 
        body{ margin: 0; padding: 0 }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0 }
        .light-range-slider__line{ width: 100%; height: 6px; }

        .slider.slider_vertical{ width: 20px; height: 700px}
        .slider.slider_vertical .light-range-slider__line{ height: 100%; width: 6px}
      </style>`

    body.appendChild(div);
    div.className = "slider";

    calculator = new HorizontalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })

    line = new Line(calculator)
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__line"', function() {
    const slider = document.querySelector('.slider')
    slider.appendChild(line.getBody());
    expect(document.querySelector('.light-range-slider__line').tagName).to.equal('DIV');
  })

  it('Should return size of line', function() {
    const slider = document.querySelector('.slider');
    slider.appendChild(line.getBody());
    expect(line.getSize()).to.equal(500);
  })

  it('Should return location of line', function() {
    const slider = document.querySelector('.slider');
    slider.appendChild(line.getBody());
    expect(line.getLocation()).to.equal(50);
  })

  it('Should send event object after click at line', function() {
    
    let testValue: {eventName: string, eventBody: { cursorLocation: number } }

    const callback = (
      event: {eventName: string, eventBody: { cursorLocation: number } }
    ) => testValue = event
    
    const slider = document.querySelector('.slider');
    slider.appendChild(line.getBody());

    line.subscribe({ function: callback });
    line.getBody().dispatchEvent(new Event('click')); 

    expect(testValue.eventName).to.equal('lineClick');
  })

  it('Should create event object with horizontal value', function() {
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { cursorLocation: 200 }
    }

    let testValue: {eventName: string, eventBody: { cursorLocation: number } }

    const callback = (
      event: {eventName: string, eventBody: { cursorLocation: number } }
    ) => testValue = event
    
    const slider = document.querySelector('.slider');
    slider.appendChild(line.getBody());

    line.subscribe({ function: callback });
    line.handleLineClick({ pageX: 250, pageY: 200 })

    expect(testValue).to.deep.equal(eventObject);
  })

  it('Should create event object with vertical value', function() {
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { cursorLocation: 520 }
    }

    calculator = new VerticalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })

    line = new Line(calculator)

    let testValue: {eventName: string, eventBody: { cursorLocation: number } }

    const callback = (
      event: {eventName: string, eventBody: { cursorLocation: number } }
    ) => testValue = event
    
    const slider = document.querySelector('.slider');
    slider.appendChild(line.getBody());
    slider.classList.add('slider_vertical');

    line.subscribe({ function: callback });
    line.handleLineClick({ pageX: 250, pageY: 200 })

    expect(testValue).to.deep.equal(eventObject);
  })

  




})