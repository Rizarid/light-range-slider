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
})