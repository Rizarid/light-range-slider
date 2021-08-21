import "chai";
import {Model} from "../model.ts"

describe("Model", function (): void{

  let model: Model;

  beforeEach( function () :void{
    model = new Model({
      extremeValues: [300, 400],
      currentValues: [350],
      step: 1,
      scaleStep: 10,
      isVertical: false,
      isInterval: false,
      haveScale: true,
      haveLabel: true,
      callbacks: [],
      isCollection: false,
      collection: []
    });

  })

  it("Should init parameters" , function() {
    expect(model.getExtremeValues()).to.deep.equal([300, 400]);
    expect(model.getCurrentValues()).to.deep.equal([350]);
    expect(model.getStep()).to.equal(1);
    expect(model.getScaleStep()).to.equal(10);
    expect(model.getIsVertical()).to.be.false;
    expect(model.getIsInterval()).to.be.false;
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
    expect(model.getCurrentValues()).to.deep.equal([350]);

    model.setExtremeValues([200, 300]);

    expect(model.getExtremeValues()).to.deep.equal([200, 300]);
    expect(model.getCurrentValues()).to.deep.equal([300]);
  })

  it("Should return and set parameter currentValues" , function() {
    expect(model.getCurrentValues()).to.deep.equal([350]);
    model.setCurrentValues([320])
    expect(model.getCurrentValues()).to.deep.equal([320]);
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
    expect(model.getIsInterval()).to.be.false;
    model.setIsInterval(true)
    expect(model.getIsInterval()).to.be.true;
  })

  it("Should correct quantity currentValues after change parameter isInterval" , function() {
    expect(model.getIsInterval()).to.be.false;
    expect(model.getCurrentValues().length).to.equal(1)

    model.setIsInterval(true);

    expect(model.getIsInterval()).to.be.true;
    expect(model.getCurrentValues().length).to.equal(2)

    model.setIsInterval(false);

    expect(model.getIsInterval()).to.be.false;
    expect(model.getCurrentValues().length).to.equal(1)
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

  it("Should take the value return percent" , function() {
    expect(model.valueToPercent(320)).to.equal(20);
  })

  it("Should take the percent return value" , function() {
    expect(model.percentToValue(20)).to.equal(320);
  })

  it("Should send updates" , function() {
    const valuesUpdate = {
      eventName: 'valuesUpdate',
      eventBody: {
        currentValues: [320],
        margins: [20],
        collection: []
      }
    }

    const fullUpdate = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320, 320],
        margins: [20, 20],
        scaleStep: 10,
        isVertical: false,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: []
      }
    }

    let testValue: { eventName: string, eventBody };
    const callback = (event: { eventName: string, eventBody }):void => { testValue = event };
    model.subscribe({ function: callback });

    model.setCurrentValues([320]);

    expect(testValue).to.deep.equal(valuesUpdate);

    model.setIsInterval(true);

    expect(testValue).to.deep.equal(fullUpdate);
  })


})