interface IModel {
  extremeValues: number[],
  currentValues: number[],
  callbacks: ((updateObject: IOutsideUpdate) => void)[],
  collection: string[] | number[] | HTMLElement[]
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  isCollection: boolean,
}

interface IUpdateCallback { function: (eventObject: IUpdateObject) => void }

interface IFullUpdate {
  eventName: string,
  eventBody: {
    extremeValues: number[],
    currentValues: number[],
    margins: number[],
    scaleStep: number,
    isVertical: boolean,
    haveScale: boolean,
    haveLabel: boolean,
    collection: string[] | number[] | HTMLElement[],
    isCollection: boolean
  }
}

interface IValuesUpdate {
  eventName: string,
  eventBody: {
    currentValues: number[],
    margins: number[],
    collection: string[] | number[] | HTMLElement[]
  }
}

interface IEventObject { eventName: string, eventBody }

interface IViewEvent {
  eventName: string,
  eventBody: {
    handlesIndex: number,
    newValue: number
  }
}

interface IOutsideUpdate {
  currentValues: number[];
}

export {
  IModel, IUpdateCallback, IFullUpdate, IValuesUpdate, IEventObject, IViewEvent, IOutsideUpdate,
};
