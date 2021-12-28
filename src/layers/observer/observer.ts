interface IEventObject { eventName: string, eventBody: any }
interface ICallback {
  eventName: string,
  function: (eventBody: any) => void
}

class Observer {
  private subscribers: ICallback[] = [];

  public subscribe(callback: ICallback): void {
    const isCallbackEqual = this.subscribers.some((item) => (
      (item.function === callback.function) && (item.eventName === callback.eventName)
    ))
    if (isCallbackEqual) throw new Error('observer already in the list');
    else this.subscribers.push(callback);
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
