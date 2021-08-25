interface IEventObject { eventName: string, eventBody }
interface ICallback { function: (eventObject: { eventName: string, eventBody }) => void }

class ChangeObserver {
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
    this.subscribers.map((item) => item.function(eventObject));
  };
}

export { ChangeObserver };
