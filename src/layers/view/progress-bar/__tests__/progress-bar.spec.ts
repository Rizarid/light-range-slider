import { expect } from "chai";
import { ProgressBar } from '../ProgressBar';
import { HorizontalCalculator } from '../../orientation-calculator/HorizontalCalculator';
import { VerticalCalculator } from '../../orientation-calculator/VerticalCalculator';

describe("ProgressBar", function(): void {
  let progressBar: ProgressBar
  let state = {
    size: 0,
    margin: 0
  }

  let calculator = { 
    setElementsSize: (target: HTMLElement, size: number): void => { state.size = size },
    setProgressBarMargin: (target: HTMLElement, margin: number): void => { state.margin = margin}
  }

  beforeEach(function(): void {
    state.size = 0;
    state.margin = 0;
    
    progressBar = new ProgressBar({ calculator: (calculator as HorizontalCalculator) })
  })

  it('Should return div with class "light-range-slider__progress-bar"', function() {
    expect(progressBar.getBody().tagName).to.equal('DIV');
    expect(progressBar.getBody().className).to.equal('light-range-slider__progress-bar');
  })

  it('Should update size and margin of progressBar', function() {
    progressBar.update([200, 300])
    expect(state.size).to.equal(100);
    expect(state.margin).to.equal(200);
  })
})