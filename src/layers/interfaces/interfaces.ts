interface IModel {
  extremeValues: number[],
  currentValues: number[];
  step : number,
  scaleStep: number,
  isVertical: boolean,
  isInterval: boolean,
  haveScale: boolean,
  haveLabel: boolean,
  callbacks: ((updateObject: IOutsideUpdate) => void)[]
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
  }
}

interface IValuesUpdate {
  eventName: string,
  eventBody: {
    currentValues: number[],
    margins: number[],
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
