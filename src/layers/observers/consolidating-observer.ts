import { ChangeObserver } from './change-observer';

interface ICallback { function(eventObject: { eventName: string, eventBody }): void }

class ConsolidatingObserver {
  private observers: { [key: string]: ChangeObserver } = {};

  public addObserver(observerName: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isObserverExists: boolean = Object.prototype.hasOwnProperty.call(
      this.observers, observerName,
    );

    if (!isObserverExists) this.observers[observerName] = new ChangeObserver();
  }

  public removeObserver(observerName: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isObserverExists: boolean = Object.prototype.hasOwnProperty.call(
      this.observers, observerName,
    );

    if (isObserverExists) {
      delete this.observers[observerName];
    }
  }

  public subscribe(callback: ICallback, observerName?: string): void {
    if (observerName) {
      if (Object.prototype.hasOwnProperty.call(this.observers, observerName)) {
        this.observers[observerName].subscribe(callback);
      }
    } else {
      Object.keys(this.observers).map((item) => this.observers[item].subscribe(callback));
    }
  }

  public unsubscribe(callback: ICallback, observerName?: string): void {
    if (observerName) {
      if (Object.prototype.hasOwnProperty.call(this.observers, observerName)) {
        this.observers[observerName].unsubscribe(callback);
      }
    } else {
      Object.keys(this.observers).map((item) => this.observers[item].unsubscribe(callback));
    }
  }

  public getSubscribeFunction = (observerName: string): ICallback => {
    const func = this.observers[observerName].notify;
    return { function: func };
  };
}

export { ConsolidatingObserver };
