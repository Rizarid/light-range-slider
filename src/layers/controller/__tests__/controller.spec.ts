import { expect } from 'chai';
import { Controller } from '../controller';
import { View } from '../../view/view'
import { Calculator } from '../calculator/calculator';
import { Transformer } from '../transformer/transformer';

describe('Controller', function() {
  let controller: Controller;

  const FakeModel = function(){
    this.updatedValue = '';
    this.updateMethod = '';
    this.extremeValues = [0, 100];
    this.currentValues = [30, 70];
    this.isInterval = true;
    this.step = 1;
    this.isCollection = false;
    this.collection = ['one', 'two', 'three'];
    this.getExtremeValues = () => this.extremeValues;
    this.getCurrentValues = () => this.currentValues;
    this.getStep = () => this.step;
    this.getIsInterval = () => this.isInterval;
    this.getCollection = () => this.collection;
    this.getIsCollection = () => this.isCollection;
    this.setExtremeValues = (value) => { this.updatedValue = value; this.updateMethod = 'setExtremeValues' }
    this.setMinValue = (value) => { this.updatedValue = value; this.updateMethod = 'setExtremeValues' }
    this.setMaxValue = (value) => { this.updatedValue = value; this.updateMethod = 'setExtremeValues' }
    this.setCurrentValues = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.setMinCurrentValue = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.setMaxCurrentValue = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.setStep = (value) => { this.updatedValue = value; this.updateMethod = 'setStep' }
    this.setScaleStep = (value) => { this.updatedValue = value; this.updateMethod = 'setScaleStep' }
    this.setIsVertical = (value) => { this.updatedValue = value; this.updateMethod = 'setIsVertical' }
    this.setIsInterval = (value) => { this.updatedValue = value; this.updateMethod = 'setIsInterval' }
    this.setHaveProgressBar = (value) => { this.updatedValue = value; this.updateMethod = 'setHaveProgressBar' }
    this.setHaveLabel = (value) => { this.updatedValue = value; this.updateMethod = 'setHaveLabel' }
    this.setHaveScale = (value) => { this.updatedValue = value; this.updateMethod = 'setHaveScale' }
    this.setIsCollection = (value) => { this.updatedValue = value; this.updateMethod = 'setIsCollection' }
    this.setCollection = (value) => { this.updatedValue = value; this.updateMethod = 'setCollection' }
    
    this.valueToPercent = (value) => value * 100
    this.percentToValue = (value) => value / 100;
    this.setCurrentValueBeIndex = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.setNearestValue = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.sendUpdate = (value) => { this.updatedValue = value; this.updateMethod = 'sendUpdate' }
  }

  const FakeView = function() {
    this.body = document.createElement('div')
    this.getBody = () => this.body;
    this.eventBody = {}
    this.update = (eventBody) => { this.eventBody = eventBody }
    this.scaleUpdate = (eventBody) => { this.eventBody = eventBody }
  }

  beforeEach(function(){
    controller = new Controller({
      slider: document.createElement('div'),
      extremeValues: [0, 100],
      currentValues: [30, 70],
      step: 1,
      scaleStep: 10,
      isVertical: false,
      isInterval: true,
      haveProgressBar: true,
      haveScale: true,
      haveLabel: true,
      isCollection: false,
      callbacks: [],
      collection: [],
    })

    controller.model = new FakeModel();
    controller.calculator = new Calculator(controller.model);
    controller.transformer = new Transformer(controller.model);
    controller.view = new FakeView();


  })

  it('should call method setExtremeValues from model', function() {
    const eventObject = {
      eventName: 'extremeValues',
      eventBody: { extremeValues: [500, 600] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([500, 600]);
    expect(controller.model.updateMethod).to.equal('setExtremeValues');
  })

  it('should calculate value call method extremeValues from model', function() {
    const eventObject = {
      eventName: 'min',
      eventBody: { min: 50 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([50, 100]);
    expect(controller.model.updateMethod).to.equal('setExtremeValues');
  })

  it('should calculate value call method extremeValues from model', function() {
    const eventObject = {
      eventName: 'max',
      eventBody: { max: 500 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([0, 500]);
    expect(controller.model.updateMethod).to.equal('setExtremeValues');
  })

  it('should call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'currentValues',
      eventBody: { currentValues: [40, 60] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([40, 60]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'currentMin',
      eventBody: { currentMin: 50 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([50, 70]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'currentMax',
      eventBody: { currentMax: 50 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([30, 50]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should call method setStep from model', function() {
    const eventObject = {
      eventName: 'step',
      eventBody: { step: 5 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(5);
    expect(controller.model.updateMethod).to.equal('setStep');
  })

  it('should call method setScaleStep from model', function() {
    const eventObject = {
      eventName: 'scaleStep',
      eventBody: { scaleStep: 10 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(10);
    expect(controller.model.updateMethod).to.equal('setScaleStep');
  })

  it('should call method setIsVertical from model', function() {
    const eventObject = {
      eventName: 'isVertical',
      eventBody: { isVertical: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsVertical');
  })

  it('should call method setIsInterval from model', function() {
    const eventObject = {
      eventName: 'isInterval',
      eventBody: { isInterval: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsInterval');
  })

  it('should call method setHaveProgressBar from model', function() {
    const eventObject = {
      eventName: 'haveProgressBar',
      eventBody: { haveProgressBar: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveProgressBar');
  })

  it('should call method setHaveLabel from model', function() {
    const eventObject = {
      eventName: 'haveLabel',
      eventBody: { haveLabel: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveLabel');
  })

  it('should call method setHaveScale from model', function() {
    const eventObject = {
      eventName: 'haveScale',
      eventBody: { haveScale: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveScale');
  })

  it('should call method setIsCollection from model', function() {
    const eventObject = {
      eventName: 'isCollection',
      eventBody: { isCollection: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsCollection');
  })

  it('should call method setCollection from model', function() {
    const eventObject = {
      eventName: 'collection',
      eventBody: { collection: ['one', 'two', 'three'] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal(['one', 'two', 'three']);
    expect(controller.model.updateMethod).to.equal('setCollection');
  })

  it('should calculate value and call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'handleMove',
      eventBody: { newValue: 60, handlesIndex: 0 },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([60, 70]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value and call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue: 60 },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([30, 60]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value and call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: '60' },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([30, 60]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value and call method setNearestValue from model by isCollection = true', function() {
    controller.model.isCollection = true;

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: 'two' },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([1, 70]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should calculate value and call method setNearestValue from model', function() {
    const eventObject = {
      eventName: 'lineResize',
      eventBody: { },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.equal('scaleUpdate');
    expect(controller.model.updateMethod).to.equal('sendUpdate');
  })

  it('should recreate view', function() {
    const eventObject = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [0, 100],
        currentValues: [30, 70],
        step: 1,
        scaleStep: 10,
        isVertical:false,
        haveScale: true,
        isCollection: false,
        isInterval: false,
        haveProgressBar: true,
        haveLabel: true,
        collection: [],
      },
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view instanceof View).to.be.true;

  })

  it('should update view', function() {
    const eventObject = {
      eventName: 'valuesUpdate',
      eventBody: {
        extremeValues: [0, 100],
        currentValues: [30, 70],
        margins: [30, 70],
        step: 1,
        scaleStep: 10,
        isVertical:false,
        haveScale: true,
        isCollection: false,
        isInterval: true,
        haveProgressBar: true,
        haveLabel: true,
        collection: [],
      },
    };

    const eventBody = {
      extremeValues: [0, 100],
      currentValues: [30, 70],
      margins: [30, 70],
      step: 1,
      scaleStep: 10,
      isVertical:false,
      haveScale: true,
      isCollection: false,
      isInterval: true,
      haveProgressBar: true,
      haveLabel: true,
      collection: [],
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view.eventBody).to.deep.equal(eventBody);

  })

  it('should update scale', function() {
    const eventObject = {
      eventName: 'scaleUpdate',
    eventBody: {
      extremeValues: [0, 100],
      currentValues: [30, 70],
      margins: [30, 70],
      step: 1,
      scaleStep: 10,
      isVertical:false,
      haveScale: true,
      isCollection: false,
      isInterval: true,
      haveProgressBar: true,
      haveLabel: true,
      collection: [],
    },
    };

    const eventBody = {
      extremeValues: [0, 100],
      currentValues: [30, 70],
      margins: [30, 70],
      step: 1,
      scaleStep: 10,
      isVertical:false,
      haveScale: true,
      isCollection: false,
      isInterval: true,
      haveProgressBar: true,
      haveLabel: true,
      collection: [],
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view.eventBody).to.deep.equal(eventBody);

  })
})