import { ICallback, IUpdate, ISliderEvent, IObserver } from '../interfaces/interfaces';

class Observer implements IObserver {
  private subscribers: ICallback[] = [];

  public subscribe(callback: ICallback): void {
    const isCallbackEqual = this.subscribers.some((item) => (
      (item.function === callback.function) && (item.eventName === callback.eventName)
    ));
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

  public notify = (eventObject: IUpdate | ISliderEvent): void => {
    const { eventName, eventBody } = eventObject;
    this.subscribers.forEach((item) => {
      if (item.eventName === eventName) item.function(eventBody);
    });
  };
}

export { Observer };
