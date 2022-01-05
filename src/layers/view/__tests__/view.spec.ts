import { expect } from 'chai';
import { ISliderEvent, Parameters, SliderEventName } from '../../interfaces/interfaces';
import { HorizontalCalculator } from '../orientation-calculator/horizontal-calculator';
import { VerticalCalculator } from '../orientation-calculator/vertical-calculator';
import { View } from '../view'

describe("View", function(): void {
  let view: View

  const Element = function() {
    this.body = document.createElement('div');
    this.body.className = 'element'
    this.getBody = (): HTMLElement => this.body;
    this.getSize = (): number =>  500;
    this.getLocation = (): number => 50;
    this.updated = false;
    this.update = () => this.updated = true; 
    this.addWasActive = (): void => this.body.classList.add('light-range-slider__handle_was-active');
    this.removeWasActive = (): void => this.body.classList.remove('light-range-slider__handle_was-active');
    this.activate = ():void => this.body.classList.add('light-range-slider__handle_active');
    this.deactivate = ():void => this.body.classList.remove('light-range-slider__handle_active');
  }

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");
    body.appendChild(slider)

    view = new View({
      slider,
      extremeValues: [300, 400],
      currentValues: [350],
      margins: [50],
      scaleStep: 10,
      isVertical: false,
      isCollection: false,
      haveProgressBar: true,
      haveScale: true,
      haveLabel: true,
      collection: [],
      indexOfLastChangedHandle: 0
    })

    view.line = new Element();
    view.handles = [new Element()];
    view.labels = [new Element()];
    view.progressBar = new Element();
    view.scale = new Element();
    
    slider.innerHTML = "";
  })

  afterEach(function() {
    body.innerHTML = ''
  })

  it('Should return line size', function() {
    expect(view.getLineSize()).to.equal(500);
  })

  it('Should return line location', function() {
    expect(view.getLineLocation()).to.equal(50);
  })

  it('Should update elements', function() {
    view.update({
      margins: [60],
      currentValues: [360],
      collection: [],
      indexOfLastChangedHandle: 0,
    })
    
    expect(view.handles[0].updated).to.be.true;
    expect(view.labels[0].updated).to.be.true;
    expect(view.progressBar.updated).to.be.true;
  })

  it('Should change classes of handles and labels after events pointerdown and pointerup', function() {
    let eventObject: ISliderEvent = {
      eventName: SliderEventName.pointerDown,
      eventBody: { index: 0 },
    };

    view.observer.notify(eventObject);

    expect(view.handles[0].getBody().className).to.equal('element light-range-slider__handle_active');
    expect(view.labels[0].getBody().className).to.equal('element light-range-slider__handle_active');

    eventObject = {
      eventName: SliderEventName.pointerUp,
      eventBody: { index: 0 },
    };

    view.observer.notify(eventObject);

    expect(view.handles[0].getBody().className).to.equal('element light-range-slider__handle_was-active');
    expect(view.labels[0].getBody().className).to.equal('element light-range-slider__handle_was-active');

  })
})