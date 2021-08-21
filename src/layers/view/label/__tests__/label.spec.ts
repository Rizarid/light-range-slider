import "chai"
import { Label } from '../label'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

describe("Label", function(): void {
  let label: Label
  let calculator: HorizontalCalculator | VerticalCalculator;

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");

    body.innerHTML = `
      <style> 
        body{ margin: 0; padding: 0 }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative }
        .light-range-slider__label{ width: fit-content; height: fit-content; position: absolute }

        .slider.slider_vertical{ width: 20px; height: 700px; position: relative}
        .slider.slider_vertical .light-range-slider__label{ width: fit-content; height: fit-content; position: absolute }
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

    label = new Label({ value: 50, calculator })
    slider.appendChild(label.getBody());
    label.update({ margin: 50, value: 50, collection: []})
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__label"', function() {
    expect(document.querySelector('.light-range-slider__label').tagName).to.equal('DIV');
  })

  it('Should update margin', function() {

    expect(label.getBody().offsetLeft).to.equal(242);
    expect(label.getBody().innerText).to.equal('50');

    label.update({ margin: 60, value: 60, collection: []});

    expect(label.getBody().offsetLeft).to.equal(292);
    expect(label.getBody().innerText).to.equal('60');
  })

})