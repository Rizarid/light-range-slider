import { expect } from "chai";
import { Observer } from "../../../observer/observer";
import { Parameters } from "../parameters";

describe("Parameters", function (): void{

  let parameters: Parameters;

  beforeEach( function () :void{
    parameters = new Parameters({
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
      collection: [],
      observer: new Observer()
    });

  })

  it("Should init parameters" , function() {
    expect(parameters.getExtremeValues()).to.deep.equal([300, 400]);
    expect(parameters.getCurrentValues()).to.deep.equal([330, 370]);
    expect(parameters.getStep()).to.equal(1);
    expect(parameters.getScaleStep()).to.equal(10);
    expect(parameters.getIsVertical()).to.be.false;
    expect(parameters.getIsInterval()).to.be.true;
    expect(parameters.getHaveLabel()).to.be.true;
    expect(parameters.getHaveScale()).to.be.true;
  })

  it("Should return and set parameter extremeValues" , function() {
    expect(parameters.getExtremeValues()).to.deep.equal([300, 400]);
    parameters.setExtremeValues([200, 400])
    expect(parameters.getExtremeValues()).to.deep.equal([200, 400]);
  })

  it("Should change parameter currentValues if when changing parameter extremeValues currentValues went out of range" , function() {
    expect(parameters.getExtremeValues()).to.deep.equal([300, 400]);
    expect(parameters.getCurrentValues()).to.deep.equal([330, 370]);

    parameters.setExtremeValues([200, 300]);

    expect(parameters.getExtremeValues()).to.deep.equal([200, 300]);
    expect(parameters.getCurrentValues()).to.deep.equal([300, 300]);
  })

  it("Should return and set parameter currentValues" , function() {
    expect(parameters.getCurrentValues()).to.deep.equal([330, 370]);
    parameters.setCurrentValues([310, 360])
    expect(parameters.getCurrentValues()).to.deep.equal([310, 360]);
  })

  it("Should return and set parameter step" , function() {
    expect(parameters.getStep()).to.equal(1);
    parameters.setStep(5)
    expect(parameters.getStep()).to.equal(5);
  })

  it("Should return and set parameter scaleStep" , function() {
    expect(parameters.getScaleStep()).to.equal(10);
    parameters.setScaleStep(15)
    expect(parameters.getScaleStep()).to.equal(15);
  })

  it("Should return and set parameter isVertical" , function() {
    expect(parameters.getIsVertical()).to.be.false;
    parameters.setIsVertical(true)
    expect(parameters.getIsVertical()).to.be.true;
  })

  it("Should return and set parameter isInterval" , function() {
    expect(parameters.getIsInterval()).to.be.true;
    parameters.setIsInterval(false)
    expect(parameters.getIsInterval()).to.be.false;
  })

  it("Should correct quantity currentValues after change parameter isInterval" , function() {
    expect(parameters.getIsInterval()).to.be.true;
    expect(parameters.getCurrentValues().length).to.equal(2)

    parameters.setIsInterval(false);

    expect(parameters.getIsInterval()).to.be.false;
    expect(parameters.getCurrentValues().length).to.equal(1)

    parameters.setIsInterval(true);

    expect(parameters.getIsInterval()).to.be.true;
    expect(parameters.getCurrentValues().length).to.equal(2)
  })

  it("Should return and set parameter haveLabel" , function() {
    expect(parameters.getHaveLabel()).to.be.true;
    parameters.setHaveLabel(false)
    expect(parameters.getHaveLabel()).to.be.false;
  })

  it("Should return and set parameter haveScale" , function() {
    expect(parameters.getHaveScale()).to.be.true;
    parameters.setHaveScale(false)
    expect(parameters.getHaveScale()).to.be.false;
  })

  it("Should return and set parameter haveProgressBar" , function() {
    expect(parameters.getHaveProgressBar()).to.be.true;
    parameters.setHaveProgressBar(false)
    expect(parameters.getHaveProgressBar()).to.be.false;
  })

  it("Should return and set parameter collection" , function() {
    expect(parameters.getCollection()).to.deep.equal([]);
    parameters.setCollection(['one', 'two', 'three']);
    expect(parameters.getCollection()).to.deep.equal(['one', 'two', 'three']);
  })

  it("Should return and set parameter isCollection" , function() {
    expect(parameters.getIsCollection()).to.be.false;
    parameters.setCollection(['one', 'two', 'three'])
    parameters.setIsCollection(true)
    expect(parameters.getIsCollection()).to.be.true;
    expect(parameters.getStep()).to.equal(1);
    expect(parameters.getScaleStep()).to.equal(1);
    expect(parameters.getCurrentValues()).to.deep.equal([2, 2]);
    expect(parameters.getExtremeValues()).to.deep.equal([0, 2]);
  })

  it("Should send updates after change parameters" , function() {
    const valuesUpdate = {
      eventName: 'valuesUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320, 370],
        margins: [20, 70],
        step: 1,
        scaleStep: 10,
        isVertical: false,
        isInterval: true,
        haveProgressBar: true,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: [],
        indexOfLastChangedHandle: undefined
      }
    }

    const fullUpdate = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [300, 400],
        currentValues: [320],
        margins: [20],
        step: 1,
        scaleStep: 10,
        isVertical: false,
        isInterval: false,
        haveProgressBar: true,             
        haveScale: true,     
        haveLabel: true,
        isCollection: false,
        collection: [],
        indexOfLastChangedHandle: undefined
      }
    }

    let testValue: { eventBody };
    const callback = (event: { eventName: string, eventBody }):void => { testValue = event };
    parameters.subscribe({ eventName: 'valuesUpdate', function: callback });
    parameters.subscribe({ eventName: 'fullUpdate', function: callback });

    parameters.setCurrentValues([320, 370]);
    expect(testValue).to.deep.equal(valuesUpdate.eventBody);

    parameters.setIsInterval(false);
    expect(testValue).to.deep.equal(fullUpdate.eventBody);
  })
})