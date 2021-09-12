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

  it("Should return number of decimal places" , function() {
    expect(calculator.getNumberOfDecimalPlaces(0.345)).to.equal(3);
    expect(calculator.getNumberOfDecimalPlaces(2)).to.equal(0);
    expect(calculator.getNumberOfDecimalPlaces(0.3)).to.equal(1);
  })

  it("Should return range of slider" , function() {
    expect(calculator.getRange()).to.equal(100);
    model.extremeValues = [225, 510];
    expect(calculator.getRange()).to.equal(285);
  })

  it("Should take value and return valueInRange" , function() {
    expect(calculator.valueToValueInRange(320)).to.equal(20);
    expect(calculator.valueToValueInRange(363)).to.equal(63);
    expect(calculator.valueToValueInRange(308)).to.equal(8);
  })

  it("Should take valueInRange and return value" , function() {
    expect(calculator.valueInRangeToValue(20)).to.equal(320);
    expect(calculator.valueInRangeToValue(94)).to.equal(394);
    expect(calculator.valueInRangeToValue(42)).to.equal(342);
  })

  it("Should take percent and return valueInRange" , function() {
    expect(calculator.percentToValueInRange(20)).to.equal(20);
    expect(calculator.percentToValueInRange(15)).to.equal(15);
    expect(calculator.percentToValueInRange(73)).to.equal(73);
  })

  it("Should take value and return valueAdjustedByAccuracy" , function() {
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320);
    model.step = 0.1
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320.5);
    model.step = 0.01
    expect(calculator.adjustByAccuracy(320.463)).to.equal(320.46);
  })

  it("Should return true if value more then last step of slider" , function() {
    model.step = 5;
    model.extremeValues = [300, 397];

    expect(calculator.checkForExceedingTheLastStep(50)).to.be.false;
    expect(calculator.checkForExceedingTheLastStep(95)).to.be.false;
    expect(calculator.checkForExceedingTheLastStep(96)).to.be.true;
  })
})