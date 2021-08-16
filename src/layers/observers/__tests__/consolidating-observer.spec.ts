import "chai";
import { ChangeObserver } from  "../change-observer";
import { ConsolidatingObserver } from  "../consolidating-observer";


describe("ConsolidatingObserver", function (): void{

  let observer: ChangeObserver;
  let consolidatingObserver: ConsolidatingObserver
  let eventObject = {
    eventName: "handleMove",
    eventBody: {
      handleIndex: 0,
      position: 350
    }
  }

  let testValue: {
    eventName: string,
    eventBody
  }

  let testCallback = function(
    eventObject: {
      eventName: string,
      eventBody
    }
  ) {
    testValue = eventObject
  }

  beforeEach(function() {
    
    observer = new ChangeObserver;
    consolidatingObserver = new ConsolidatingObserver;
    testValue = {};

  })

  it("should add new observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    const isObserverExists: boolean = consolidatingObserver.observers.hasOwnProperty("firstObserver");
    expect(isObserverExists).to.be.true;

  })

  it("should remove observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    let isObserverExists: boolean = consolidatingObserver.observers.hasOwnProperty("firstObserver");
    expect(isObserverExists).to.be.true;

    consolidatingObserver.removeObserver("firstObserver");
    isObserverExists = consolidatingObserver.observers.hasOwnProperty("firstObserver");
    expect(isObserverExists).to.be.false;

  })

  it("should subscribe to change observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    observer.subscribe(consolidatingObserver.getSubscribeFunction("firstObserver"));

    expect(observer.subscribers.length).to.equal(1);

  })

  it("should unsubscribe from change observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    observer.subscribe(consolidatingObserver.getSubscribeFunction("firstObserver"));
    expect(observer.subscribers.length).to.equal(1);

    observer.unsubscribe(consolidatingObserver.getSubscribeFunction("firstObserver"));
    expect(observer.subscribers.length).to.equal(0);

  })

  it("should subscribe to consolidating observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    consolidatingObserver.subscribe({function: testCallback },  "firstObserver")
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(1);

  })

  it("should subscribe to all observers from consolidating observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    consolidatingObserver.addObserver("secondObserver");
    consolidatingObserver.subscribe({function: testCallback })
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(1);
    expect(consolidatingObserver.observers.secondObserver.subscribers.length).to.equal(1);

  })

  it("should subscribe to consolidating observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    consolidatingObserver.subscribe({function: testCallback },  "firstObserver")
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(1);

    consolidatingObserver.unsubscribe({function: testCallback },  "firstObserver")
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(0);

  })

  it("should unsubscribe from all observers from the consolidating observer", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    consolidatingObserver.addObserver("secondObserver");
    consolidatingObserver.subscribe({function: testCallback })
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(1);
    expect(consolidatingObserver.observers.secondObserver.subscribers.length).to.equal(1);

    consolidatingObserver.unsubscribe({function: testCallback })
    expect(consolidatingObserver.observers.firstObserver.subscribers.length).to.equal(0);
    expect(consolidatingObserver.observers.secondObserver.subscribers.length).to.equal(0);

  })

  it("should call callback function", function() {
    
    consolidatingObserver.addObserver("firstObserver");
    observer.subscribe(consolidatingObserver.getSubscribeFunction("firstObserver"));
    consolidatingObserver.subscribe({function: testCallback });

    observer.notify(eventObject);
    
    expect(testValue).to.deep.equal(eventObject);

  })


  



  
})