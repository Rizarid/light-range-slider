import { expect } from "chai"
import { ProgressBar } from '../progress-bar'
import { HorizontalCalculator } from '../../orientation-calculator/horizontal-calculator'
import { VerticalCalculator } from '../../orientation-calculator/vertical-calculator'

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

  it('Should return size of progressBar', function() {
    expect(progressBar.getProgressBarSize([200])).to.equal(200);
    expect(progressBar.getProgressBarSize([200, 300])).to.equal(100);
  })

  it('Should return margin of progressBar', function() {
    expect(progressBar.getProgressBarMargin([200])).to.equal(0);
    expect(progressBar.getProgressBarMargin([200, 300])).to.equal(200);
  })

  it('Should update size and margin of progressBar', function() {
    progressBar.update([200, 300])
    expect(state.size).to.equal(100);
    expect(state.margin).to.equal(200);
  })
})