import { expect } from "chai";
import { Calculator } from "../../calculator/calculator";

import { CustomSetters } from "../custom-setters";

const Parameters = function() {
  this.checkValue = [];
  this.step = 1;
  this.checkExtremeValues = [300, 400];
  this.currentValues = [350];
  this.isInterval = false;
  this.indexOfLastChangedHandle = undefined;
  this.getStep = () => this.step;
  this.getExtremeValues = () => this.extremeValues;
  this.getCurrentValues = () => this.currentValues;
  this.getIsInterval = () => this.isInterval;
  this.setCurrentValues = (value: number[]) => this.checkValue = value;
  this.setExtremeValues = (value: number[]) => this.checkValue = value;
  this.setIndexOfLastChangedHandle = (index: number) => this.indexOfLastChangedHandle = index;
}

describe("CustomSetters", function (): void{

  let customSetters: CustomSetters;
  let parameters = new Parameters();
  let calculator = new Calculator(parameters);
  
  beforeEach( function () :void{
    customSetters = new CustomSetters(parameters, calculator);
    parameters.step = 1;
    parameters.extremeValues = [300, 400];
    parameters.currentValues = [350];
    parameters.isInterval = false;
  })

  it("Should return near index" , function() {
    expect(customSetters.getNearIndex(320)).to.equal(0);

    parameters.currentValues = [330, 370];
    parameters.isInterval = true;

    expect(customSetters.getNearIndex(320)).to.equal(0);
    expect(customSetters.getNearIndex(340)).to.equal(0);
    expect(customSetters.getNearIndex(360)).to.equal(1);
    expect(customSetters.getNearIndex(390)).to.equal(1);
  })

  it("Should take value and set currentValue" , function() {
    customSetters.setNearestCurrentValue(320, false)
    expect(parameters.checkValue).to.deep.equal([320]);

    customSetters.setNearestCurrentValue(40, true)
    expect(parameters.checkValue).to.deep.equal([340]);

    parameters.currentValues = [330, 370];
    parameters.isInterval = true;

    customSetters.setNearestCurrentValue(320, false);
    expect(parameters.checkValue).to.deep.equal([320, 370]);

    customSetters.setNearestCurrentValue(340, false);
    expect(parameters.checkValue).to.deep.equal([340, 370]);

    customSetters.setNearestCurrentValue(360, false);
    expect(parameters.checkValue).to.deep.equal([330, 360]);

    customSetters.setNearestCurrentValue(380, false);
    expect(parameters.checkValue).to.deep.equal([330, 380]);
  });

  it("Should take value and index, and set currentValue" , function() {
    customSetters.setCurrentValueByIndex({ index: 0, newValue: 320, isPercent: false })
    expect(parameters.checkValue).to.deep.equal([320]);

    customSetters.setCurrentValueByIndex({ index: 0, newValue: 40, isPercent: true })
    expect(parameters.checkValue).to.deep.equal([340]);

    parameters.currentValues = [330, 370];
    parameters.isInterval = true;

    customSetters.setCurrentValueByIndex({ index: 0, newValue: 320, isPercent: false })
    expect(parameters.checkValue).to.deep.equal([320, 370]);

    customSetters.setCurrentValueByIndex({ index: 0, newValue: 380, isPercent: false })
    expect(parameters.checkValue).to.deep.equal([370, 370]);

    customSetters.setCurrentValueByIndex({ index: 1, newValue: 360, isPercent: false })
    expect(parameters.checkValue).to.deep.equal([330, 360]);

    customSetters.setCurrentValueByIndex({ index: 1, newValue: 320, isPercent: false })
    expect(parameters.checkValue).to.deep.equal([330, 330]);

  })


  it("Should take new minValue, and set extremeValues" , function() {
    customSetters.setMinValue(310)
    expect(parameters.checkValue).to.deep.equal([310, 400]);

    customSetters.setMinValue(380)
    expect(parameters.checkValue).to.deep.equal([380, 400]);
  })

  it("Should take new maxValue, and set extremeValues" , function() {
    customSetters.setMaxValue(370)
    expect(parameters.checkValue).to.deep.equal([300, 370]);
    
    customSetters.setMaxValue(340);
    expect(parameters.checkValue).to.deep.equal([300, 340]);
  })


})