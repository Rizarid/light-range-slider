import { expect } from "chai";
import { Model } from "../model"

describe("Model", function (): void{

  let model: Model;

  beforeEach( function () :void{
    model = new Model({
      extremeValues: [300, 400],
      currentValues: [330, 370],
      step: 1,
      scaleStep: 10,
      isVertical: false,
      isInterval: true,
      haveProgressBar: true,
      haveScale: true,
      haveLabel: true,
      callbacks: [],
      isCollection: false,
      collection: []
    });

  })

  it("Should init parameters" , function() {
    expect(model.getExtremeValues()).to.deep.equal([300, 400]);
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);
    expect(model.getStep()).to.equal(1);
    expect(model.getScaleStep()).to.equal(10);
    expect(model.getIsVertical()).to.be.false;
    expect(model.getIsInterval()).to.be.true;
    expect(model.getHaveLabel()).to.be.true;
    expect(model.getHaveScale()).to.be.true;
  })

  it("Should return and set parameter extremeValues" , function() {
    expect(model.getExtremeValues()).to.deep.equal([300, 400]);
    model.setExtremeValues([200, 400])
    expect(model.getExtremeValues()).to.deep.equal([200, 400]);
  })

  it("Should change parameter currentValues if when changing parameter extremeValues currentValues went out of range" , function() {
    expect(model.getExtremeValues()).to.deep.equal([300, 400]);
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);

    model.setExtremeValues([200, 300]);

    expect(model.getExtremeValues()).to.deep.equal([200, 300]);
    expect(model.getCurrentValues()).to.deep.equal([300, 300]);
  })

  it("Should return and set parameter currentValues" , function() {
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);
    model.setCurrentValues([310, 360])
    expect(model.getCurrentValues()).to.deep.equal([310, 360]);
  })

  it("Should set parameter currentValues by index" , function() {
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);

    model.setCurrentValueBeIndex({ index: 0, newValue: 320 })
    expect(model.getCurrentValues()).to.deep.equal([320, 370]);

    model.setCurrentValueBeIndex({ index: 1, newValue: 350 })
    expect(model.getCurrentValues()).to.deep.equal([320, 350]);
  })

  it("Should set the current value near to the new value" , function() {
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);
    model.setNearestValue(340)
    expect(model.getCurrentValues()).to.deep.equal([340, 370]);
    model.setNearestValue(360)
    expect(model.getCurrentValues()).to.deep.equal([340, 360]);
  })

  it("Should set min current value" , function() {
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);
    model.setMinCurrentValue(360)
    expect(model.getCurrentValues()).to.deep.equal([360, 370]);
  })

  it("Should set min current value" , function() {
    expect(model.getCurrentValues()).to.deep.equal([330, 370]);
    model.setMaxCurrentValue(340)
    expect(model.getCurrentValues()).to.deep.equal([330, 340]);
  })

  it("Should return and set parameter step" , function() {
    expect(model.getStep()).to.equal(1);
    model.setStep(5)
    expect(model.getStep()).to.equal(5);
  })

  it("Should return and set parameter scaleStep" , function() {
    expect(model.getScaleStep()).to.equal(10);
    model.setScaleStep(15)
    expect(model.getScaleStep()).to.equal(15);
  })

  it("Should return and set parameter isVertical" , function() {
    expect(model.getIsVertical()).to.be.false;
    model.setIsVertical(true)
    expect(model.getIsVertical()).to.be.true;
  })

  it("Should return and set parameter isInterval" , function() {
    expect(model.getIsInterval()).to.be.true;
    model.setIsInterval(false)
    expect(model.getIsInterval()).to.be.false;
  })

  it("Should correct quantity currentValues after change parameter isInterval" , function() {
    expect(model.getIsInterval()).to.be.true;
    expect(model.getCurrentValues().length).to.equal(2)

    model.setIsInterval(false);

    expect(model.getIsInterval()).to.be.false;
    expect(model.getCurrentValues().length).to.equal(1)

    model.setIsInterval(true);

    expect(model.getIsInterval()).to.be.true;
    expect(model.getCurrentValues().length).to.equal(2)
  })

  it("Should return and set parameter haveLabel" , function() {
    expect(model.getHaveLabel()).to.be.true;
    model.setHaveLabel(false)
    expect(model.getHaveLabel()).to.be.false;
  })

  it("Should return and set parameter haveScale" , function() {
    expect(model.getHaveScale()).to.be.true;
    model.setHaveScale(false)
    expect(model.getHaveScale()).to.be.false;
  })

  it("Should return and set parameter haveProgressBar" , function() {
    expect(model.getHaveProgressBar()).to.be.true;
    model.setHaveProgressBar(false)
    expect(model.getHaveProgressBar()).to.be.false;
  })

  it("Should return and set parameter collection" , function() {
    expect(model.getCollection()).to.deep.equal([]);
    model.setCollection(['one', 'two', 'three']);
    expect(model.getCollection()).to.deep.equal(['one', 'two', 'three']);
  })

  it("Should return and set parameter isCollection" , function() {
    expect(model.getIsCollection()).to.be.false;
    model.setCollection(['one', 'two', 'three'])
    model.setIsCollection(true)
    expect(model.getIsCollection()).to.be.true;
    expect(model.getStep()).to.equal(1);
    expect(model.getScaleStep()).to.equal(1);
    expect(model.getCurrentValues()).to.deep.equal([2, 2]);
    expect(model.getExtremeValues()).to.deep.equal([0, 2]);
  })

  it("Should take the value return percent" , function() {
    expect(model.valueToPercent(320)).to.equal(20);
  })

  it("Should take the percent return value" , function() {
    expect(model.percentToValue(20)).to.equal(320);
  })

  it("Should send updates after change parameters" , function() {
    const valuesUpdate = {
      eventName: 'valuesUpdate',
      eventBody: {
        currentValues: [320, 370],
        margins: [20, 70],
        collection: []
      }
    }

    const fullUpdate = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320],
        margins: [20],
        scaleStep: 10,
        isVertical: false,
        haveProgressBar: true,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: []
      }
    }

    let testValue: { eventName: string, eventBody };
    const callback = (event: { eventName: string, eventBody }):void => { testValue = event };
    model.subscribe({ function: callback });

    model.setCurrentValues([320, 370]);

    expect(testValue).to.deep.equal(valuesUpdate);

    model.setIsInterval(false);

    expect(testValue).to.deep.equal(fullUpdate);
  })

  it("Should return values update object" , function() {
    const valuesUpdate = {
      eventName: 'valuesUpdate',
      eventBody: {
        currentValues: [330, 370],
        margins: [30, 70],
        collection: []
      }
    }

    expect(model.getValuesUpdate()).to.deep.equal(valuesUpdate);
  })

  it("Should return full update object" , function() {
    const fullUpdate = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [330, 370],
        margins: [30, 70],
        scaleStep: 10,
        isVertical: false,
        haveProgressBar: true,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: []
      }
    }

    expect(model.getFullUpdate()).to.deep.equal(fullUpdate);
  })

  it("Should return scale update object" , function() {
    const fullUpdate = {
      eventName: 'scaleUpdate',
      eventBody: {
        extremeValues: [300, 400],
        scaleStep: 10,
        haveScale: true,
        isCollection: false,
        collection: [],
      },
    }

    expect(model.getScaleUpdate()).to.deep.equal(fullUpdate);
  })

  it("Should return outside update object" , function() {
    const outsideUpdate = {
      extremeValues: [300, 400], 
      currentValues: [330, 370], 
      step: 1, 
      scaleStep: 10, 
      isVertical: false, 
      isInterval: true, 
      haveProgressBar: true,
      haveLabel: true, 
      haveScale: true, 
      callbacks: [], 
      collection: [], 
      isCollection: false,
    }

    expect(model.getOutsideUpdate()).to.deep.equal(outsideUpdate);
  })

  it("Should return number of decimal places" , function() {
    expect(model.getNumberOfDecimalPlaces(0.345)).to.equal(3);
    expect(model.getNumberOfDecimalPlaces(2)).to.equal(0);
    expect(model.getNumberOfDecimalPlaces(0.3)).to.equal(1);
  })

  it("Should return adjusted range to step" , function() {
    expect(model.getAdjustedRangeToStep()).to.equal(100);
    model.setStep(5);
    expect(model.getAdjustedRangeToStep()).to.equal(20);
    model.setStep(0.1);
    expect(model.getAdjustedRangeToStep()).to.equal(1000);
  })

  it("Should give percent value and return adjusted range to step" , function() {
    expect(model.percentToAdjustedRangeToStep(20)).to.equal(20);
    model.setStep(5);
    expect(model.percentToAdjustedRangeToStep(20)).to.equal(4);
  })

  it("Should check for exceeding the last step" , function() {
    model.setExtremeValues([0, 97]);
    model.setStep(5);
    expect(model.checkForExceedingTheLastStep(4)).to.be.false;
    expect(model.checkForExceedingTheLastStep(25)).to.be.true;
  })

  it("Should give value in adjusted range and return value" , function() {
    expect(model.valueInAdjustedRangeToValue(20)).to.equal(320)
    model.setStep(5);
    expect(model.valueInAdjustedRangeToValue(20)).to.equal(400)
  })

  it("Should check new values for extremeValues" , function() {
    expect(model.checkExtremeValuesNewValue(300)).to.be.false;
    expect(model.checkExtremeValuesNewValue([300])).to.be.false;
    expect(model.checkExtremeValuesNewValue(['300', '400'])).to.be.false;
    expect(model.checkExtremeValuesNewValue([400, 300])).to.be.false;

    expect(model.checkExtremeValuesNewValue([200, 500])).to.be.true;
  })

  it("Should check new values for currentValues" , function() {
    expect(model.checkCurrentValuesNewValue(320)).to.be.false;
    expect(model.checkCurrentValuesNewValue([330, 360, 370])).to.be.false;
    expect(model.checkCurrentValuesNewValue(['320', '400'])).to.be.false;
    expect(model.checkCurrentValuesNewValue([380, 330])).to.be.false;

    expect(model.checkCurrentValuesNewValue([350])).to.be.true;
    expect(model.checkCurrentValuesNewValue([320, 370])).to.be.true;
  })

  it("Should check new values step and scaleStep" , function() {
    expect(model.checkStepAndScaleStepNewValue('10')).to.be.false;
    expect(model.checkStepAndScaleStepNewValue(0)).to.be.false;
    expect(model.checkStepAndScaleStepNewValue(-5)).to.be.false;
    expect(model.checkStepAndScaleStepNewValue(70)).to.be.false;

    model.setCollection(['one', 'two', 'three']);
    model.setIsCollection(true);
    expect(model.checkStepAndScaleStepNewValue(5)).to.be.false;

    model.setIsCollection(false);
    model.setExtremeValues([300, 400]);

    expect(model.checkStepAndScaleStepNewValue(5)).to.be.true;
    expect(model.checkStepAndScaleStepNewValue(50)).to.be.true;
    expect(model.checkStepAndScaleStepNewValue(1)).to.be.true;
  })

  it("Should check new values for  boolean params" , function() {
    expect(model.checkBooleanNewValue(300)).to.be.false;
    expect(model.checkBooleanNewValue(['300'])).to.be.false;
    expect(model.checkBooleanNewValue('true')).to.be.false;

    expect(model.checkBooleanNewValue(false)).to.be.true;
  })

  it("Should check new values for isCollections" , function() {
    expect(model.checkIsCollectionNewValue('false')).to.be.false;
    expect(model.checkIsCollectionNewValue(1)).to.be.false;
    expect(model.checkIsCollectionNewValue(true)).to.be.false;

    model.setCollection(['one', 'two', 'three']);

    expect(model.checkIsCollectionNewValue(true)).to.be.true;
    expect(model.checkIsCollectionNewValue(false)).to.be.true;

  })

  it("Should check new values for callbacks" , function() {
    expect(model.checkCallbacksNewValue(()=> console.log(123))).to.be.false;
    expect(model.checkCallbacksNewValue(['123'])).to.be.false;
    expect(model.checkCallbacksNewValue([123])).to.be.false;

    expect(model.checkCallbacksNewValue([()=> console.log(123)])).to.be.true;
    
  })

  it("Should check new values for callbacks" , function() {
    expect(model.checkCollectionNewValue('one')).to.be.false;
    expect(model.checkCollectionNewValue([true, false, true])).to.be.false;

    expect(model.checkCollectionNewValue(['one', 'two', 'three'])).to.be.true;
    expect(model.checkCollectionNewValue([10, 20, 30])).to.be.true;
    
  })

})