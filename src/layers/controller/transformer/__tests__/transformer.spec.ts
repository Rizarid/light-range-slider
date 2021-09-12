import { expect } from "chai";

import { Transformer } from "../transformer";

const Model = function() {
  this.step = 1;
  this.checkExtremeValues = [300, 400];
  this.currentValues = [350];
  this.isInterval = false;
  this.getStep = () => this.step;
  this.getExtremeValues = () => this.extremeValues;
  this.getCurrentValues = () => this.currentValues;
  this.getIsInterval = () => this.isInterval;
}

describe("Transformer", function (): void{

  let transformer: Transformer;
  let model = new Model();
  
  beforeEach( function () :void{
    transformer = new Transformer(model);
    model.step = 1;
    model.extremeValues = [300, 400];
    model.currentValues = [350];
    model.isInterval = false;
  })

  it("Should return near index" , function() {
    expect(transformer.getNearIndex(320)).to.equal(0);

    model.currentValues = [330, 370];
    model.isInterval = true;

    expect(transformer.getNearIndex(320)).to.equal(0);
    expect(transformer.getNearIndex(340)).to.equal(0);
    expect(transformer.getNearIndex(360)).to.equal(1);
    expect(transformer.getNearIndex(390)).to.equal(1);
  })

  it("Should take value and return new currentValue" , function() {
    expect(transformer.currentValueWithoutIndexToCurrentValues(320)).to.deep.equal([320]);

    model.currentValues = [330, 370];
    model.isInterval = true;

    expect(transformer.currentValueWithoutIndexToCurrentValues(320)).to.deep.equal([320, 370]);
    expect(transformer.currentValueWithoutIndexToCurrentValues(340)).to.deep.equal([340, 370]);
    expect(transformer.currentValueWithoutIndexToCurrentValues(360)).to.deep.equal([330, 360]);
    expect(transformer.currentValueWithoutIndexToCurrentValues(380)).to.deep.equal([330, 380]);
  });

  it("Should take value and index, and return new currentValue" , function() {
    expect(transformer.currentValueWithIndexToCurrentValues(0, 320)).to.deep.equal([320]);

    model.currentValues = [330, 370];
    model.isInterval = true;

    expect(transformer.currentValueWithIndexToCurrentValues(0, 320)).to.deep.equal([320, 370]);
    expect(transformer.currentValueWithIndexToCurrentValues(0, 380)).to.deep.equal([370, 370]);
    expect(transformer.currentValueWithIndexToCurrentValues(1, 360)).to.deep.equal([330, 360]);
    expect(transformer.currentValueWithIndexToCurrentValues(1, 320)).to.deep.equal([330, 330]);
  })

  it("Should take new minCurrentValue, and return new currentValues" , function() {
    expect(transformer.newMinCurrentValueToCurrentValues(320)).to.deep.equal([320]);

    model.currentValues = [330, 370];
    model.isInterval = true;

    expect(transformer.newMinCurrentValueToCurrentValues(320)).to.deep.equal([320, 370]);
    expect(transformer.newMinCurrentValueToCurrentValues(380)).to.deep.equal([370, 370]);
  })

  it("Should take new maxCurrentValue, and return new currentValues" , function() {
    model.currentValues = [330, 370];
    model.isInterval = true;

    expect(transformer.newMaxCurrentValueToCurrentValues(350)).to.deep.equal([330, 350]);
    expect(transformer.newMaxCurrentValueToCurrentValues(310)).to.deep.equal([330, 330]);
  })

  it("Should take new minValue, and return new extremeValues" , function() {
    expect(transformer.minValueToExtremeValues(310)).to.deep.equal([310, 400]);
    expect(transformer.minValueToExtremeValues(380)).to.deep.equal([380, 400]);
  })

  it("Should take new maxValue, and return new extremeValues" , function() {
    expect(transformer.maxValueToExtremeValues(370)).to.deep.equal([300, 370]);
    expect(transformer.maxValueToExtremeValues(340)).to.deep.equal([300, 340]);
  })


})