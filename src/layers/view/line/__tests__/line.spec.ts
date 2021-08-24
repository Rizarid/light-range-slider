import { expect } from "chai"
import { Line } from '../line'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { ChangeObserver } from "../../../observers/change-observer"


describe("Line", function(): void {
  let line: Line
  let state = {
    lineEventObject: undefined
  }

  let calculator = { 
    getElementsSize: (target: HTMLElement): number => 500,
    getElementsLocation: (target: HTMLElement): number => 50,
    getCursorLocation: (event: { pageX: number, pageY:number }): number => event.pageX - 50,
    pxToPercentages: (newValue: number): number => newValue / 500 * 100
  };

  let changeObserver = {
    notify: (event): void => state.lineEventObject = event,
  }

  beforeEach(function(): void {
    state.lineEventObject = undefined;
    line = new Line({ calculator: (calculator as HorizontalCalculator), changeObserver: (changeObserver as ChangeObserver) })
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__line"', function() {
    expect(line.getBody().tagName).to.equal('DIV');
    expect(line.getBody().className).to.equal('light-range-slider__line');
  })

  it('Should return size of line', function() {
    expect(line.getSize()).to.equal(500);
  })

  it('Should return location of line', function() {
    expect(Math.round(line.getLocation())).to.equal(50);
  })

  it('Should set parameter isResizeBlocked', function() {
    expect(line.isResizeBlocked).to.be.true;
    line.setIsResizeBlocked(false);
    expect(line.isResizeBlocked).to.be.false;
  })

  it('Should send event object after click at line', function() {
  
    const body = document.querySelector('body');
    body.appendChild(line.getBody());

    line.getBody().dispatchEvent(new MouseEvent('click', { clientX: 300 })); 

    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue: 50 },
    }; 

    expect(state.lineEventObject).to.deep.equal(eventObject);
  })

})