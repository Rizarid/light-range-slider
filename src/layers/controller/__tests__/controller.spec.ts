import { expect } from 'chai';
import { Controller } from '../controller';
import { View } from '../../view/view'

describe('Controller', function() {
  let controller: Controller;

  const FakeModel = function(){
    this.updatedValue = '';
    this.updateMethod = '';
    this.isCollection = false;
    this.collection = ['one', 'two', 'three'];
    this.getCollection = () => this.collection;
    this.getIsCollection = () => this.isCollection;
    this.setExtremeValues = (value) => { this.updatedValue = value; this.updateMethod = 'setExtremeValues' }
    this.setMinValue = (value) => { this.updatedValue = value; this.updateMethod = 'setMinValue' }
    this.setMaxValue = (value) => { this.updatedValue = value; this.updateMethod = 'setMaxValue' }
    this.setCurrentValues = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValues' }
    this.setMinCurrentValue = (value) => { this.updatedValue = value; this.updateMethod = 'setMinCurrentValue' }
    this.setMaxCurrentValue = (value) => { this.updatedValue = value; this.updateMethod = 'setMaxCurrentValue' }
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
    this.setCurrentValueBeIndex = (value) => { this.updatedValue = value; this.updateMethod = 'setCurrentValueBeIndex' }
    this.setNearestValue = (value) => { this.updatedValue = value; this.updateMethod = 'setNearestValue' }
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
      currentValues: [50],
      step: 1,
      scaleStep: 10,
      isVertical: false,
      isInterval: false,
      haveProgressBar: true,
      haveScale: true,
      haveLabel: true,
      isCollection: false,
      callbacks: [],
      collection: [],
    })

    controller.model = new FakeModel();
    controller.view = new FakeView();

  })

  it('should call method setExtremeValues from model', function() {
    const eventObject = {
      eventName: 'extremeValuesChanged',
      eventBody: { extremeValues: [500, 600] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([500, 600]);
    expect(controller.model.updateMethod).to.equal('setExtremeValues');
  })

  it('should call method setMinValue from model', function() {
    const eventObject = {
      eventName: 'minChanged',
      eventBody: { min: 500 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(500);
    expect(controller.model.updateMethod).to.equal('setMinValue');
  })

  it('should call method setMaxValue from model', function() {
    const eventObject = {
      eventName: 'maxChanged',
      eventBody: { max: 500 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(500);
    expect(controller.model.updateMethod).to.equal('setMaxValue');
  })

  it('should call method setCurrentValues from model', function() {
    const eventObject = {
      eventName: 'currentValuesChanged',
      eventBody: { currentValues: [400, 600] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal([400, 600]);
    expect(controller.model.updateMethod).to.equal('setCurrentValues');
  })

  it('should call method setMinCurrentValue from model', function() {
    const eventObject = {
      eventName: 'currentMinChanged',
      eventBody: { currentMinValue: 500 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(500);
    expect(controller.model.updateMethod).to.equal('setMinCurrentValue');
  })

  it('should call method setMaxCurrentValue from model', function() {
    const eventObject = {
      eventName: 'currentMaxChanged',
      eventBody: { currentMaxValue: 500 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(500);
    expect(controller.model.updateMethod).to.equal('setMaxCurrentValue');
  })

  it('should call method setStep from model', function() {
    const eventObject = {
      eventName: 'stepChanged',
      eventBody: { step: 5 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(5);
    expect(controller.model.updateMethod).to.equal('setStep');
  })

  it('should call method setScaleStep from model', function() {
    const eventObject = {
      eventName: 'scaleStepChanged',
      eventBody: { scaleStep: 10 },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.equal(10);
    expect(controller.model.updateMethod).to.equal('setScaleStep');
  })

  it('should call method setIsVertical from model', function() {
    const eventObject = {
      eventName: 'isVerticalChanged',
      eventBody: { isVertical: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsVertical');
  })

  it('should call method setIsInterval from model', function() {
    const eventObject = {
      eventName: 'isIntervalChanged',
      eventBody: { isInterval: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsInterval');
  })

  it('should call method setHaveProgressBar from model', function() {
    const eventObject = {
      eventName: 'haveProgressBarChanged',
      eventBody: { haveProgressBar: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveProgressBar');
  })

  it('should call method setHaveLabel from model', function() {
    const eventObject = {
      eventName: 'haveLabelChanged',
      eventBody: { haveLabel: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveLabel');
  })

  it('should call method setHaveScale from model', function() {
    const eventObject = {
      eventName: 'haveScaleChanged',
      eventBody: { haveScale: true },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.true;
    expect(controller.model.updateMethod).to.equal('setHaveScale');
  })

  it('should call method setIsCollection from model', function() {
    const eventObject = {
      eventName: 'isCollectionChanged',
      eventBody: { isCollection: false },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.be.false;
    expect(controller.model.updateMethod).to.equal('setIsCollection');
  })

  it('should call method setCollection from model', function() {
    const eventObject = {
      eventName: 'collectionChanged',
      eventBody: { collection: ['one', 'two', 'three'] },
    };

    controller.changeParameter(eventObject);

    expect(controller.model.updatedValue).to.deep.equal(['one', 'two', 'three']);
    expect(controller.model.updateMethod).to.equal('setCollection');
  })

  it('should calculate value and call method setCurrentValueBeIndex from model', function() {
    const eventObject = {
      eventName: 'handleMove',
      eventBody: { newValue: 60, handlesIndex: 0 },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.deep.equal({ newValue: 0.6, index: 0 });
    expect(controller.model.updateMethod).to.equal('setCurrentValueBeIndex');
  })

  it('should calculate value and call method setNearestValue from model', function() {
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue: 60 },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.equal(0.6);
    expect(controller.model.updateMethod).to.equal('setNearestValue');
  })

  it('should calculate value and call method setNearestValue from model', function() {
    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: '0.6' },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.equal(0.6);
    expect(controller.model.updateMethod).to.equal('setNearestValue');
  })

  it('should calculate value and call method setNearestValue from model by isCollection = true', function() {
    controller.model.isCollection = true;

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: 'two' },
    };

    controller.handleViewEvents(eventObject);

    expect(controller.model.updatedValue).to.equal(1);
    expect(controller.model.updateMethod).to.equal('setNearestValue');
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
        extremeValues: [300, 400],
        currentValues: [330, 370],
        margins: [30, 70],
        scaleStep: 5,
        isVertical: 10,
        haveProgressBar: true,
        haveScale: true,
        haveLabel: true,
        isCollection: false,
        collection: [],
      },
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view instanceof View).to.be.true;

  })

  it('should update viev', function() {
    const eventObject = {
      eventName: 'valuesUpdate',
      eventBody: {
        currentValues: [330, 370],
        margins: [30, 70],
        collection: [],
      },
    };

    const eventBody = {
      currentValues: [330, 370],
      margins: [30, 70],
      collection: [],
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view.eventBody).to.deep.equal(eventBody);

  })

  it('should update scale', function() {
    const eventObject = {
      eventName: 'scaleUpdate',
    eventBody: {
      extremeValues: [300, 400],
      scaleStep: 10,
      haveScale: true,
      isCollection: false,
      collection: [],
    },
    };

    const eventBody = {
      extremeValues: [300, 400],
      scaleStep: 10,
      haveScale: true,
      isCollection: false,
      collection: [],
    };

    controller.handleModelEvents(eventObject);
    expect(controller.view.eventBody).to.deep.equal(eventBody);

  })
})