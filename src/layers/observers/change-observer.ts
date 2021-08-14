class ChangeObserver {
  private subscribers: {
    function(eventObject: { eventName: string, eventBody }): void
  }[] = [];

  public subscribe(
    callback: { function(eventObject: { eventName: string, eventBody }): void },
  ): void {
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

  public unsubscribe(
    callback: { function(eventObject: { eventName: string, eventBody }): void },
  ): void {
    this.subscribers = this.subscribers.filter((item) => item.function !== callback.function);
  }

  public notify = (eventObject: { eventName: string, eventBody }): void => {
    this.subscribers.map((item) => item.function(eventObject));
  };
}

export { ChangeObserver };
