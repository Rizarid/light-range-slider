import "chai";
import { expect } from "chai"
import { VerticalCalculator } from "../vertical-calculator"

describe("VerticalCalculator", function (): void{
  let calculator: VerticalCalculator;

  beforeEach( function () :void{
    let div: HTMLElement = document.createElement("div");
    let body: HTMLElement = document.querySelector("body");
    body.appendChild(div);
    div.className = "slider";

    let view = {
      getLineSize: () => body.offsetHeight,
      getLineLocation: () => body.getBoundingClientRect().top
    }
    
    calculator = new VerticalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })
    
  })

  afterEach( function () :void{
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it("should return height of element", function():void{
    let div: HTMLElement = document.querySelector(".slider");
    div.style.height = "10px";
    expect(calculator.getElementsSize(div)).to.equal(10);

  })

  it("should return location of cursor", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0";
    body.style.padding = "0";

    let div: HTMLElement = document.querySelector(".slider");
    div.style.marginTop = "10px";
    div.style.height = "500px";

    let view = {
      getLineSize: () => div.offsetHeight,
      getLineLocation: () => div.getBoundingClientRect().top
    }
    
    calculator = new VerticalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })

    const event: {pageX: number, pageY: number} = {pageX: 60, pageY: 100};
    expect(calculator.getCursorLocation(event)).to.equal(410);
  })

  it("should return location of element", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0";
    body.style.padding = "0";

    const div: HTMLElement = document.querySelector(".slider");
    div.style.marginTop = "100px";

    expect(calculator.getElementsLocation(div)).to.equal(100);

  })

  it("should set top property of element", function():void{

    const div: HTMLElement = document.querySelector(".slider");
    expect(div.style.top).to.equal("");

    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    calculator.setElementsMargin(div, 200);

    expect(div.style.top).to.equal("300px");

  })

  it("should set height of element", function():void{

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 100);

    expect(div.style.height).to.equal("100px");
  })

  it("should return adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(calculator.getAdjustMarginToSize(div, 50)).to.equal(55);
  })

  it("should return not adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(calculator.getNotAdjustMarginToSize(div, 55)).to.equal(50);
  })

  it("should return scale step in pixels", function():void{
    let body: HTMLElement = document.querySelector("body");
    let div: HTMLElement = document.querySelector(".slider");
    body.style.height = '500px'

    expect(calculator.getScaleMarginRatio(11)).to.equal(50);
  })

})