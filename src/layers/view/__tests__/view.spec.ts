import "chai"
import { HorizontalCalculator } from "../orientation-calculator/horizontal-calculator"
import { VerticalCalculator } from "../orientation-calculator/vertical-calculator"
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
      collection: []
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

  it('Should create 5 div elements with classes "element"', function() {
    view.appendElements(true, true);
    expect(document.querySelectorAll('.element').length).to.equal(4);
  })

  it('Should return line size', function() {
    expect(view.getLineSize()).to.equal(500);
  })

  it('Should return line location', function() {
    expect(view.getLineLocation()).to.equal(50);
  })

  it('Should update elements', function() {
    view.update({ margins: [60], currentValues: [360], collection: []})
    
    expect(view.handles[0].updated).to.be.true;
    expect(view.labels[0].updated).to.be.true;
    expect(view.progressBar.updated).to.be.true;
  })

  it('Should switch HorizontalCalculator and VerticalCalculator', function() {
    view.switchCalculator(false) 
    expect(view.calculator instanceof HorizontalCalculator).to.be.true;

    view.switchCalculator(true) 
    expect(view.calculator instanceof VerticalCalculator).to.be.true;

  })

  it('Should change classes of handles and labels after events pointerdown and pointerup', function() {
    let eventObject = {
      eventName: 'handlePointerDown',
      eventBody: { index: 0 },
    };

    view.changeObserver.notify(eventObject);

    expect(view.handles[0].getBody().className).to.equal('element light-range-slider__handle_active');
    expect(view.labels[0].getBody().className).to.equal('element light-range-slider__label_active');

    eventObject = {
      eventName: 'handlePointerUp',
      eventBody: { index: 0 },
    };

    view.changeObserver.notify(eventObject);

    expect(view.handles[0].getBody().className).to.equal('element light-range-slider__handle_was-active');
    expect(view.labels[0].getBody().className).to.equal('element light-range-slider__label_was-active');

  })
})