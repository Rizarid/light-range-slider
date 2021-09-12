import { expect } from "chai"
import { HorizontalCalculator } from "../../orientation-calculator/horizontal-calculator"
import { Label } from '../label'


describe("Label", function(): void {
  let label: Label
  let state = { margin: 0 }

  let calculator = {
    getAdjustedMarginToSize: (target: HTMLElement, marginInPercent: number): number => {
      return marginInPercent - 5.1;
    },
    setElementsMargin: (target: HTMLElement, newValueInPercent: number): void => {
      state.margin = newValueInPercent;
    }
  }
  
  beforeEach(function(): void {
    state.margin = 0;
    label = new Label({ calculator: (calculator as HorizontalCalculator), isCollection: false})
  })

  it('Should return div with class "light-range-slider__label"', function() {
    expect(label.getBody().tagName).to.equal('DIV');
    expect(label.getBody().className).to.equal('light-range-slider__label');
  })

  it('Should update label by isCollection = false', function() {
    label.update({ margin: 60, value: 60, collection: []});
    expect(Math.round(state.margin)).to.equal(55);
    expect(label.getBody().innerText).to.equal('60');
  })

  it('Should update label by isCollection = true', function() {
    label = new Label({ calculator: (calculator as HorizontalCalculator), isCollection: true})
    label.update({ margin: 50, value: 1, collection: ['one', 'two', 'three']});
    expect(Math.round(state.margin)).to.equal(45);
    expect(label.getBody().innerText).to.equal('two');
  })

})