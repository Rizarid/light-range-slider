import "chai"
import { ProgressBar } from '../progress-bar'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

describe("ProgressBar", function(): void {
  let progressBar: ProgressBar
  let calculator: HorizontalCalculator | VerticalCalculator;

  let body: HTMLElement = document.querySelector("body");

  beforeEach(function(): void {

    let slider: HTMLElement = document.createElement("div");

    body.innerHTML = `
      <style> 
        html{ margin: 0; padding: 0 }
        body{ margin: 0; padding: 0 }
        .slider{ width: 500px; height: 20px; margin: 20px 0 0 50px; padding: 0; position: relative }
        .light-range-slider__progress-bar{ height: 100%; position: absolute }

        .slider.slider_vertical{ width: 20px; height: 700px; position: relative}
        .slider.slider_vertical .light-range-slider__progress-bar{ width: 100%; position: absolute }
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

    progressBar = new ProgressBar({ calculator })
    slider.appendChild(progressBar.getBody());
  })

  afterEach( function (): void {
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it('Should return div with class "light-range-slider__progress-bar"', function() {
    expect(document.querySelector('.light-range-slider__progress-bar').tagName).to.equal('DIV');
  })

  it('Should update margin in case of not interval', function() {
    progressBar.update([60]);

    expect(progressBar.getBody().offsetLeft).to.equal(0);
    expect(progressBar.getBody().offsetWidth).to.equal(300);
  })

  it('Should update margin in case of interval', function() {
    const slider = document.querySelector('.slider')
    slider.appendChild(progressBar.getBody());

    progressBar.update([20, 60]);

    expect(progressBar.getBody().offsetLeft).to.equal(100);
    expect(progressBar.getBody().offsetWidth).to.equal(200);
  })

})