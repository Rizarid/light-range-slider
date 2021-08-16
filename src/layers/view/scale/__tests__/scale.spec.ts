import "chai"
import { Scale } from '../scale'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

describe("Scale", function(): void {
  let scale: Scale
  let calculator: HorizontalCalculator | VerticalCalculator;

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");

    body.innerHTML = `
      <style> 
        body{ margin: 0; padding: 0 }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative }
        .slider .light-range-slider__scale{ width: 100%; height: 20px; position: relative }
        .slider .light-range-slider__scale .light-range-slider__scale-item{ width: fit-content; height: fit-content; position: absolute}

        .slider.slider_vertical{ width: 20px; height: 700px; position: relative}
        .slider.slider_vertical .light-range-slider__scale{ width: 20px; height: 100%; position: relative }
        .slider.slider_vertical .light-range-slider__scale .light-range-slider__scale-item{ width: fit-content; height: fit-content; position: absolute}
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

    scale = new Scale({ scaleStep: 10, extremeValues: [200, 300], calculator })
    slider.appendChild(scale.getBody());
    scale.adjustMarginToSize();
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__scale"', function() {
    expect(document.querySelector('.light-range-slider__scale').tagName).to.equal('DIV');
  })

  it('Should contain 11 div items with class "light-range-slider__scale-item"', function() {
    expect(document.querySelectorAll('.light-range-slider__scale-item').length).to.equal(11);
  })

  it('Should set margin and value for scale-item', function() { 
    const item5: HTMLElement = document.querySelectorAll('.light-range-slider__scale-item')[5];

    expect(item5.offsetLeft).to.equal(238);
    expect(item5.innerText).to.equal('250');
  })

})