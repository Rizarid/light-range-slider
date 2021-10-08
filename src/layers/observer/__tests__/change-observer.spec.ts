import { expect } from "chai";
import { ChangeObserver } from  "../change-observer";

describe("ChangeObserver", function (): void{

  let observer: ChangeObserver;
  let testCallback = function() { return 5}

  beforeEach(function() {
    
    observer = new ChangeObserver;
  })

  it("should added to list", function() {
    observer.subscribe({ function: testCallback });
    expect(observer.subscribers.length).to.equal(1);
    expect(observer.subscribers[0].function).to.equal(testCallback);
  })

  it("should send throw not function", function() {
    expect( () => observer.subscribe({ function: 'testCallback' })).to.throw();
  })

  it("should send throw observer already", function() {
    observer.subscribe({ function: testCallback });
    expect( () => observer.subscribe({ function: testCallback })).to.throw();
  })

  it("should remove from list", function() {
    
    observer.subscribe({ function: testCallback });
    expect(observer.subscribers.length).to.equal(1);
    
    observer.unsubscribe({ function: testCallback });
    expect(observer.subscribers.length).to.equal(0);
  })

  it("should notify subscribers", function() {
    observer.subscribe({ function: testCallback });
    expect(observer.subscribers[0].function({})).to.equal(5);
  })
})