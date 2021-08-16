import "chai"
import { View } from '../view'

describe("View", function(): void {
  let view: View

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");

    body.innerHTML = `
      <style> 
        body{ margin: 0; padding: 0 }
        .light-range-slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative }
        .light-range-slider .light-range-slider__line{ width: 100%; height: 6px; position: relative }
        .light-range-slider .light-range-slider__handle{ width: 10px; height: 10px; position: absolute }
        .light-range-slider .light-range-slider__label{ width: 24px; height: 10px; position: absolute }
        .light-range-slider .light-range-slider__progress-bar{ height: 100%; position: absolute }
        .light-range-slider .light-range-slider__scale{ width: 100%; height: 20px; position: relative }
        .light-range-slider .light-range-slider__scale-item{ width: fit-content; height: fit-content; position: absolute }

        .light-range-slider.light-range-slider_vertical{ width: 20px; height: 700px; position: relative}
        .light-range-slider.light-range-slider_vertical .light-range-slider__line{ width: 6px; height: 100%; position: relative }
        .light-range-slider.light-range-slider_vertical .light-range-slider__handle{ width: 10px; height: 10px; position: absolute }
        .light-range-slider.light-range-slider_vertical .light-range-slider__label{ width: 24px; height: 10px; position: absolute }
        .light-range-slider.light-range-slider_vertical .light-range-slider__progress-bar{ width: 100%; position: absolute }
        .light-range-slider.light-range-slider_vertical .light-range-slider__scale{ width: 20px; height: 100%; position: relative }
        .light-range-slider.light-range-slider_vertical .light-range-slider__scale-item{ width: fit-content; height: fit-content; position: absolute }
      </style>`

    body.appendChild(slider);
    slider.className = "slider";

    view = new View({
      slider,
      extremeValues: [300, 400],
      currentValues: [350],
      margins: [250],
      scaleStep: 10,
      isVertical: false,
      isInterval: false,
      haveScale: true,
      haveLabel: true
    })
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should create div with class "light-range-slider__line"', function() {
    expect(document.querySelector('.light-range-slider__line').tagName).to.equal('DIV');
  })

  it('Should create div with class "light-range-slider__handle"', function() {
    expect(document.querySelector('.light-range-slider__handle').tagName).to.equal('DIV');
  })

  it('Should create div with class "light-range-slider__label"', function() {
    expect(document.querySelector('.light-range-slider__label').tagName).to.equal('DIV');
  })

  it('Should create div with class "light-range-slider__progress-bar"', function() {
    expect(document.querySelector('.light-range-slider__progress-bar').tagName).to.equal('DIV');
  })

  it('Should create div with class "light-range-slider__scale"', function() {
    expect(document.querySelector('.light-range-slider__scale').tagName).to.equal('DIV');
  })

  it('Should create 11 div elements with class "light-range-slider__scale-item"', function() {
    expect(document.querySelectorAll('.light-range-slider__scale-item').length).to.equal(11);
  })

  it('Should set size for line during initialization (horizontal)', function() {
    expect(document.querySelector('.light-range-slider__line').offsetWidth).to.equal(500);
  })

  it('Should set size for line during initialization (vertical)', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
      slider,
      extremeValues: [300, 400],
      currentValues: [350],
      margins: [250],
      scaleStep: 10,
      isVertical: true,
      isInterval: false,
      haveScale: true,
      haveLabel: true
    })
    expect(document.querySelector('.light-range-slider__line').offsetHeight).to.equal(700);
  })

  it('Should set margin for handle during initialization (horizontal)', function() {
    expect(document.querySelector('.light-range-slider__handle').offsetLeft).to.equal(245);
  })

  it('Should set margin for handle during initialization (vertical)', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
        slider,
        extremeValues: [300, 400],
        currentValues: [350],
        margins: [350],
        scaleStep: 10,
        isVertical: true,
        isInterval: false,
        haveScale: true,
        haveLabel: true
    })

    expect(document.querySelector('.light-range-slider__handle').offsetTop).to.equal(345);
  })

  it('Should set value and margin for label during initialization (horizontal)', function() {
    expect(document.querySelector('.light-range-slider__label').offsetLeft).to.equal(238);
    expect(document.querySelector('.light-range-slider__label').innerHTML).to.equal('350');
  })

  it('Should set value and margin for label during initialization (vertical)', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
        slider,
        extremeValues: [300, 400],
        currentValues: [350],
        margins: [350],
        scaleStep: 10,
        isVertical: true,
        isInterval: false,
        haveScale: true,
        haveLabel: true
    })
    expect(document.querySelector('.light-range-slider__label').offsetTop).to.equal(345);
    expect(document.querySelector('.light-range-slider__label').innerHTML).to.equal('350');
  })

  it('Should set size and margin for progressBar during initialization (horizontal)', function() {
    expect(document.querySelector('.light-range-slider__progress-bar').offsetLeft).to.equal(0);
    expect(document.querySelector('.light-range-slider__progress-bar').offsetWidth).to.equal(250);
  })

  it('Should set size and margin for progressBar during initialization (vertical)', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
        slider,
        extremeValues: [300, 400],
        currentValues: [350],
        margins: [350],
        scaleStep: 10,
        isVertical: true,
        isInterval: false,
        haveScale: true,
        haveLabel: true
    })
    expect(document.querySelector('.light-range-slider__progress-bar').offsetTop).to.equal(350);
    expect(document.querySelector('.light-range-slider__progress-bar').offsetHeight).to.equal(350);
  })

  it('Should set value and margin for scale items during initialization', function() {
    const scaleItem5 = document.querySelectorAll('.light-range-slider__scale-item')[5]
    expect(scaleItem5.offsetLeft).to.equal(238);
    expect(scaleItem5.innerHTML).to.equal('350');
  })

  it('Should set value and margin for scale items during initialization', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
        slider,
        extremeValues: [300, 400],
        currentValues: [350],
        margins: [350],
        scaleStep: 10,
        isVertical: true,
        isInterval: false,
        haveScale: true,
        haveLabel: true
    })
    const scaleItem5 = document.querySelectorAll('.light-range-slider__scale-item')[5]
    expect(scaleItem5.offsetTop).to.equal(341);
    expect(scaleItem5.innerHTML).to.equal('350');
  })

  it('Should update handles', function() {
    view.update({ margins: [300], currentValues: [360]})
    const handle = document.querySelector('.light-range-slider__handle')
    expect(handle.offsetLeft).to.equal(295);
  })

  it('Should update labels', function() {
    view.update({ margins: [300], currentValues: [360]})
    const label = document.querySelector('.light-range-slider__label')
    expect(label.offsetLeft).to.equal(288);
    expect(label.innerHTML).to.equal('360');
  })

  it('Should update progress bar', function() {
    view.update({ margins: [300], currentValues: [360]})
    const progressBar = document.querySelector('.light-range-slider__progress-bar')
    expect(progressBar.offsetLeft).to.equal(0);
    expect(progressBar.offsetWidth).to.equal(300);
  })

  it('Should create interval version', function() {
    const slider: HTMLElement = document.querySelector('.slider');
    slider.classList.remove('light-range-slider');
    slider.innerHTML = '';

    view = new View({
      slider,
      extremeValues: [300, 400],
      currentValues: [330, 370],
      margins: [150, 350],
      scaleStep: 10,
      isVertical: false,
      isInterval: true,
      haveScale: true,
      haveLabel: true
    })

    const labels = document.querySelectorAll('.light-range-slider__label')
    const handles = document.querySelectorAll('.light-range-slider__handle')
    expect(labels.length).to.equal(2);
    expect(handles.length).to.equal(2);
  })



})