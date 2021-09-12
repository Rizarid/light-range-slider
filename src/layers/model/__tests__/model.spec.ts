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

  it("Should send updates after change parameters" , function() {
    const valuesUpdate = {
      eventName: 'valuesUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320, 370],
        step: 1,
        scaleStep: 10,
        isVertical: false,
        isInterval: true,
        haveProgressBar: true,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: []
      }
    }

    const fullUpdate = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320],
        step: 1,
        scaleStep: 10,
        isVertical: false,
        isInterval: false,
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
})