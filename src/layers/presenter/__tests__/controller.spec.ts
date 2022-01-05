import { expect } from 'chai';
import { Presenter } from '../presenter';
import {
  Parameters,
  IChangeNumberParameterObject,
  IChangeArrayOfNumberParameterObject,
  IChangeArrayOfNumberOrStringParameterObject,
  IChangeBooleanParameterObject,
  IChangeFunctionParameterObject,
} from '../../interfaces/interfaces';
import { View } from '../../view/view'

describe('Presenter', function() {
  let presenter: Presenter;

  const ModelParameters = function(){
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
    this.parameters = new ModelParameters();
    this.customSetters = new CustomSetters();
  }

  const FakeView = function() {
    this.body = document.createElement('div')
    this.getBody = () => this.body;
    this.eventBody = {}
    this.update = (eventBody) => { this.eventBody = eventBody }
    this.scaleUpdate = (eventBody) => { this.eventBody = eventBody }
    this.setIsResizeBlocked = () => {}
  }

  beforeEach(function(){
    presenter = new Presenter({
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

    presenter.model = new FakeModel();
    presenter.view = new FakeView();


  })

  it('should call method setExtremeValues from parameters', function() {
    const eventObject: IChangeArrayOfNumberParameterObject = {
      parameter: Parameters.extremeValues,
      value: [500, 600],
    };

    presenter.changeParameter(eventObject);

    expect(presenter.model.parameters.updateMethod).to.equal('setExtremeValues');
  })

  it('should call method setMinValue from customSetters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.min,
      value: 50 ,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.customSetters.updateMethod).to.equal('setMinValue');
  })

  it('should call method setMaxValue from customSetters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.max,
      value: 500,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.customSetters.updateMethod).to.equal('setMaxValue');
  })

  it('should call method setCurrentValues from parameters', function() {
    const eventObject: IChangeArrayOfNumberParameterObject = {
      parameter: Parameters.currentValues,
      value: [40, 60],
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setCurrentValues');
  })

  it('should call method setCurrentValueByIndex from customSetters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.currentMin,
      value: 50,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.customSetters.updateMethod).to.equal('setCurrentValueByIndex');
  })

  it('should call method setCurrentValueByIndex from customSetters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.currentMax,
      value: 50,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.customSetters.updateMethod).to.equal('setCurrentValueByIndex');
  })

  it('should call method setStep from parameters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.step,
      value: 5,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setStep');
  })

  it('should call method setScaleStep from parameters', function() {
    const eventObject: IChangeNumberParameterObject = {
      parameter: Parameters.scaleStep,
      value: 10,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setScaleStep');
  })

  it('should call method setIsVertical from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.isVertical,
      value: false,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setIsVertical');
  })

  it('should call method setIsInterval from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.isInterval,
      value: false,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setIsInterval');
  })

  it('should call method setHaveProgressBar from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.haveProgressBar,
      value: true,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setHaveProgressBar');
  })

  it('should call method setHaveLabel from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.haveLabel,
      value:true,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setHaveLabel');
  })

  it('should call method setHaveScale from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.haveScale,
      value: true,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setHaveScale');
  })

  it('should call method setIsCollection from parameters', function() {
    const eventObject: IChangeBooleanParameterObject = {
      parameter: Parameters.isCollection,
      value: false ,
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setIsCollection');
  })

  it('should call method setCollection from parameters', function() {
    const eventObject: IChangeArrayOfNumberOrStringParameterObject = {
      parameter: Parameters.collection,
      value: ['one', 'two', 'three'],
    };

    presenter.changeParameter(eventObject);
    expect(presenter.model.parameters.updateMethod).to.equal('setCollection');
  })
})
