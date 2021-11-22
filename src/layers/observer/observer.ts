interface IEventObject { eventName: string, eventBody: any }
interface ICallback {
  eventName: string,
  function: (eventBody: any) => void
}

class Observer {
  private subscribers: ICallback[] = [];

  public subscribe(callback: ICallback): void {
    if (typeof (callback.function) !== 'function') {
      throw new Error('callback must be a function');
    }

    this.subscribers.forEach((item) => {
      const isFunctionsEqual = item.function === callback.function;
      const isNamesEqual = item.eventName === callback.eventName;
      if (isFunctionsEqual && isNamesEqual) throw new Error('observer already in the list');
    });

    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.subscribers = this.subscribers.filter((item) => {
      const isFunctionsEqual = item.function === callback.function;
      const isNamesEqual = item.eventName === callback.eventName;
      return !isFunctionsEqual || !isNamesEqual;
    });
  }

  public notify = (eventObject: IEventObject): void => {
    const { eventName, eventBody } = eventObject;
    this.subscribers.forEach((item) => {
      if (item.eventName === eventName) item.function(eventBody);
    });
  };
}

export { Observer };
