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

    this.subscribers.map((item) => {
      if (item.function === callback.function) {
        throw new Error('observer already in the list');
      }
      return null;
    });

    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ICallback): void {
    this.subscribers = this.subscribers.filter((item) => item.function !== callback.function);
  }

  public notify = (eventObject: IEventObject): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { eventName, eventBody } = eventObject;
    this.subscribers.map((item) => {
      if (item.eventName === eventName) item.function(eventBody);
      return null;
    });
  };
}

export { Observer };
