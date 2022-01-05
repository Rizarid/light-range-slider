import { expect } from "chai";
import { Observer } from  "../observer";

describe("Observer", function (): void{

  let observer: Observer;
  let testValue: string;
  let testCallback = function() { testValue  = 'notify'}

  beforeEach(function() {
    
    observer = new Observer;
  })

  it("should added to list", function() {
    observer.subscribe({ eventName: 'test', function: testCallback });
    expect(observer.subscribers.length).to.equal(1);
    expect(observer.subscribers[0].function).to.equal(testCallback);
  })

  it("should send throw observer already", function() {
    observer.subscribe({ eventName: 'test', function: testCallback });
    expect( () => observer.subscribe({ eventName: 'test', function: testCallback })).to.throw();
  })

  it("should remove from list", function() {
    
    observer.subscribe({ eventName: 'test', function: testCallback });
    expect(observer.subscribers.length).to.equal(1);
    
    observer.unsubscribe({ eventName: 'test', function: testCallback });
    expect(observer.subscribers.length).to.equal(0);
  })

  it("should notify subscribers", function() {
    observer.subscribe({ eventName: 'test', function: testCallback });
    observer.notify({ eventName: 'test', eventBody: {} })
    expect(testValue).to.equal('notify');
  })
})
