import { expect } from 'chai';
import { Controller } from '../controller';
import { View } from '../../view/view'

describe('Controller', function() {
  let controller: Controller;

  const Parameters = function(){
    this.updateMethod = '';
    this.isCollection = false;
    this.collection = ['one', 'two', 'three'];
    this.getCollection = () => this.collection;
    this.getIsCollection = () => this.isCollection;
    this.setExtremeValues = (value) => { this.updateMethod = 'setExtremeValues' }
    this.setMinValue = (value) => { this.updateMethod = 'setExtremeValues' }
    this.setMaxValue = (value) => { this.updateMethod = 'setExtremeValues' }
    this.setCurrentValues = (value) => {  this.updateMethod = 'setCurrentValues' }
    this.setMinCurrentValue = (value) => { this.updateMethod = 'setCurrentValues' }
    this.setMaxCurrentValue = (value) => { this.updateMethod = 'setCurrentValues' }
    this.setStep = (value) => { this.updateMethod = 'setStep' }
    this.setScaleStep = (value) => { this.updateMethod = 'setScaleStep' }
    this.setIsVertical = (value) => { this.updateMethod = 'setIsVertical' }
    this.setIsInterval = (value) => { this.updateMethod = 'setIsInterval' }
    this.setHaveProgressBar = (value) => { this.updateMethod = 'setHaveProgressBar' }
    this.setHaveLabel = (value) => { this.updateMethod = 'setHaveLabel' }
    this.setHaveScale = (value) => { this.updateMethod = 'setHaveScale' }
    this.setIsCollection = (value) => { this.updateMethod = 'setIsCollection' }
    this.setCollection = (value) => { this.updateMethod = 'setCollection' }
    
    this.sendUpdate = (value) => { this.updateMethod = 'sendUpdate' }
  }

  const CustomSetters = function() {
    this.updateMethod = '';
    this.setMinValue = (value) => { this.updateMethod = 'setMinValue' } 
    this.setMaxValue = (value) => { this.updateMethod = 'setMaxValue' }
    this.setCurrentValueByIndex = (value) => { this.updateMethod = 'setCurrentValueByIndex' }
    this.setNearestCurrentValue = (value) => { this.updateMethod = 'setNearestCurrentValue' }
    this.incrementCurrentValueByIndex = (value) => { this.updateMethod = 'incrementCurrentValueByIndex' }
    this.decrementCurrentValueByIndex = (value) => { this.updateMethod = 'decrementCurrentValueByIndex' }
  }

  const FakeModel = function() {
    this.parameters = new Parameters();
    this.customSetters = new CustomSetters();
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
    controller.view = new FakeView();


  })

  it('should call method setExtremeValues from parameters', function() {
    const eventObject = {
      parameter: 'extremeValues',
      value: [500, 600],
    };

    controller.changeParameter(eventObject);

    expect(controller.model.parameters.updateMethod).to.equal('setExtremeValues');
  })

  it('should call method setMinValue from customSetters', function() {
    const eventObject = {
      parameter: 'min',
      value: 50 ,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setMinValue');
  })

  it('should call method setMaxValue from customSetters', function() {
    const eventObject = {
      parameter: 'max',
      value: 500,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setMaxValue');
  })

  it('should call method setCurrentValues from parameters', function() {
    const eventObject = {
      parameter: 'currentValues',
      value: [40, 60],
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setCurrentValues');
  })

  it('should call method setCurrentValueByIndex from customSetters', function() {
    const eventObject = {
      parameter: 'currentMin',
      value: 50,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setCurrentValueByIndex');
  })

  it('should call method setCurrentValueByIndex from customSetters', function() {
    const eventObject = {
      parameter: 'currentMax',
      value: 50,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setCurrentValueByIndex');
  })

  it('should call method setStep from parameters', function() {
    const eventObject = {
      parameter: 'step',
      value: 5,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setStep');
  })

  it('should call method setScaleStep from parameters', function() {
    const eventObject = {
      parameter: 'scaleStep',
      value: 10,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setScaleStep');
  })

  it('should call method setIsVertical from parameters', function() {
    const eventObject = {
      parameter: 'isVertical',
      value: false,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setIsVertical');
  })

  it('should call method setIsInterval from parameters', function() {
    const eventObject = {
      parameter: 'isInterval',
      value: false,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setIsInterval');
  })

  it('should call method setHaveProgressBar from parameters', function() {
    const eventObject = {
      parameter: 'haveProgressBar',
      value: true,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setHaveProgressBar');
  })

  it('should call method setHaveLabel from parameters', function() {
    const eventObject = {
      parameter: 'haveLabel',
      value:true,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setHaveLabel');
  })

  it('should call method setHaveScale from parameters', function() {
    const eventObject = {
      parameter: 'haveScale',
      value: true,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setHaveScale');
  })

  it('should call method setIsCollection from parameters', function() {
    const eventObject = {
      parameter: 'isCollection',
      value: false ,
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setIsCollection');
  })

  it('should call method setCollection from parameters', function() {
    const eventObject = {
      parameter: 'collection',
      value: ['one', 'two', 'three'],
    };

    controller.changeParameter(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('setCollection');
  })

  it('should call method setCurrentValueByIndex from customSetters', function() {
    const eventObject = {
      eventName: 'handleMove',
      eventBody: { newValue: 60, handlesIndex: 0 },
    };

    controller.handleViewEvents(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setCurrentValueByIndex');
  })

  it('should call method setNearestCurrentValue from customSetters', function() {
    const eventObject = {
      eventName: 'lineClick',
      eventBody: { newValue: 60 },
    };

    controller.handleViewEvents(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setNearestCurrentValue');
  })

  it('should call method setNearestCurrentValue from customSetters', function() {
    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: '60' },
    };

    controller.handleViewEvents(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setNearestCurrentValue');
  })

  it('should call method setNearestCurrentValue from customSetters by isCollection = true', function() {
    controller.model.parameters.isCollection = true;

    const eventObject = {
      eventName: 'scaleItemClick',
      eventBody: { newValue: 'two' },
    };

    controller.handleViewEvents(eventObject);
    expect(controller.model.customSetters.updateMethod).to.equal('setNearestCurrentValue');
  })

  it('should call method sendUpdate from parameters', function() {
    const eventObject = {
      eventName: 'lineResize',
      eventBody: { },
    };

    controller.handleViewEvents(eventObject);
    expect(controller.model.parameters.updateMethod).to.equal('sendUpdate');
  })

  it('should recreate view', function() {
    const eventObject = {
      eventName: 'fullUpdate',
      eventBody: {
        extremeValues: [0, 100],
        currentValues: [30, 70],
        margins: [30, 70],
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