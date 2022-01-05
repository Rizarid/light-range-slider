import { expect } from "chai";

import { ValueChecker } from "../value-checker";

describe("ValueChecker", function (): void{

  let valueChecker: ValueChecker;
  
  beforeEach( function () :void{
    valueChecker = new ValueChecker();
  })


  it("Should check new values for extremeValues" , function() {
    expect(valueChecker.checkExtremeValues(300)).to.be.false;
    expect(valueChecker.checkExtremeValues([300])).to.be.false;
    expect(valueChecker.checkExtremeValues(['300', '400'])).to.be.false;
    expect(valueChecker.checkExtremeValues([400, 300])).to.be.false;

    expect(valueChecker.checkExtremeValues([200, 500])).to.be.true;
  })

  it("Should check new values for currentValues" , function() {
    expect(valueChecker.checkCurrentValues(320)).to.be.false;
    expect(valueChecker.checkCurrentValues([330, 360, 370])).to.be.false;
    expect(valueChecker.checkCurrentValues(['320', '400'])).to.be.false;
    expect(valueChecker.checkCurrentValues([380, 330])).to.be.false;

    expect(valueChecker.checkCurrentValues([350])).to.be.true;
    expect(valueChecker.checkCurrentValues([320, 370])).to.be.true;
  })

  it("Should check new values step and scaleStep" , function() {
    expect(valueChecker.checkStepAndScaleStep('10', [0, 100], false)).to.be.false;
    expect(valueChecker.checkStepAndScaleStep(0, [0, 100], false)).to.be.false;
    expect(valueChecker.checkStepAndScaleStep(-5, [0, 100], false)).to.be.false;
    expect(valueChecker.checkStepAndScaleStep(5, [0, 10], true)).to.be.false;

    expect(valueChecker.checkStepAndScaleStep(5, [0, 100], false)).to.be.true;
    expect(valueChecker.checkStepAndScaleStep(50, [0, 100], false)).to.be.true;
    expect(valueChecker.checkStepAndScaleStep(1, [0, 100], false)).to.be.true;
  })

  it("Should check new values for  boolean params" , function() {
    expect(valueChecker.checkBoolean(300)).to.be.false;
    expect(valueChecker.checkBoolean(['300'])).to.be.false;
    expect(valueChecker.checkBoolean('true')).to.be.false;

    expect(valueChecker.checkBoolean(false)).to.be.true;
  })

  it("Should check new values for isCollections" , function() {
    expect(valueChecker.checkIsCollection('false', ['1', '2', '3', '4', '5'])).to.be.false;
    expect(valueChecker.checkIsCollection(1, ['1', '2', '3', '4', '5'])).to.be.false;
    expect(valueChecker.checkIsCollection(true, [])).to.be.false;

    expect(valueChecker.checkIsCollection(true, ['1', '2', '3', '4', '5'])).to.be.true;
    expect(valueChecker.checkIsCollection(false, ['1', '2', '3', '4', '5'])).to.be.true;
  })

  it("Should check new values for callbacks" , function() {
    expect(valueChecker.checkCallbacks(()=> console.log(123))).to.be.false;
    expect(valueChecker.checkCallbacks(['123'])).to.be.false;
    expect(valueChecker.checkCallbacks([123])).to.be.false;

    expect(valueChecker.checkCallbacks([()=> console.log(123)])).to.be.true;
  })

  it("Should check new values for collection" , function() {
    expect(valueChecker.checkCollection('one', true)).to.be.false;
    expect(valueChecker.checkCollection([true, false, true], true)).to.be.false;

    expect(valueChecker.checkCollection(['one', 'two', 'three'], true)).to.be.true;
    expect(valueChecker.checkCollection([10, 20, 30], true)).to.be.true; 
  })
})