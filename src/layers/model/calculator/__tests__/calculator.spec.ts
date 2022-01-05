import { expect } from "chai";

import { Calculator } from "../calculator";

const Model = function() {
  this.step = 1;
  this.checkExtremeValues = [300, 400];
  this.getStep = () => this.step;
  this.getExtremeValues = () => {
   const [min, max] = this.extremeValues;
   return [min, max];
  }
}

describe("Calculator", function (): void{

  let calculator: Calculator;
  
  let model = new Model();
  
  beforeEach( function () :void{
    calculator = new Calculator(model);
    model.step = 1;
    model.extremeValues = [300, 400];
  })

  it("Should take the value and return percent" , function() {
    expect(Math.round(calculator.valueToPercent(320) * 100) / 100).to.equal(20);
    expect(Math.round(calculator.valueToPercent(380) * 100) / 100).to.equal(80);
    expect(Math.round(calculator.valueToPercent(356) * 100) / 100).to.equal(56);
  })

  it("Should take the percent and return value" , function() {
    expect(calculator.percentToValue(20)).to.equal(320);
    expect(calculator.percentToValue(56)).to.equal(356);
    expect(calculator.percentToValue(12)).to.equal(312);
  })

  it("Should take the value and return valueAdjustedByStep" , function() {
    model.step = 5;
    expect(calculator.adjustByStep(322)).to.equal(320);
    expect(calculator.adjustByStep(323)).to.equal(325);
  })

  it("Should take value and return valueAdjustedByAccuracy" , function() {
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320);
    model.step = 0.1
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320.5);
    model.step = 0.01
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320.46);
  })
})