import "chai";
import { expect } from "chai"
import { HorizontalCalculator } from "../horizontal-calculator"

describe("HorizontalCalculator", function (): void{
  let calculator: HorizontalCalculator;

  beforeEach( function () :void{

    let div: HTMLElement = document.createElement("div");
    let body: HTMLElement = document.querySelector("body");
    body.appendChild(div);

    div.className = "slider";

    let view = {
      getLineSize: () => body.offsetWidth,
      getLineLocation: () => body.getBoundingClientRect().left
    }
    
    calculator = new HorizontalCalculator({ 
      getLineSize: view.getLineSize, 
      getLineLocation: view.getLineLocation 
    })
    
  })

  afterEach( function () :void{
    let body: HTMLElement = document.querySelector("body");
    body.innerHTML = "";
  })

  it("should return width of element", function():void{
    let div: HTMLElement = document.querySelector(".slider");
    div.style.width = "10px";
    expect(calculator.getElementsSize(div)).to.equal(10);
  })

  it("should return location of cursor", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0 0 0 10px";
    body.style.padding = "0";
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");

    const event: {pageX: number, pageY: number} = {pageX: 60, pageY: 100};
    expect(calculator.getCursorLocation(event)).to.equal(50);

  })

  it("should return location of element", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0";
    body.style.padding = "0";

    const div: HTMLElement = document.querySelector(".slider");
    div.style.marginLeft = "100px";

    expect(calculator.getElementsLocation(div)).to.equal(100);

  })

  it("should set left property of element", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.width = "500px";
    body.style.position = 'relative'

    const div: HTMLElement = document.querySelector(".slider");
    div.style.position = 'absolute'

    calculator.setElementsMargin(div, 40);

    expect(div.offsetLeft).to.equal(200);

  })

  it("should set width of element", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.width = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 20);

    expect(div.offsetWidth).to.equal(100);
  })

  it("should return adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.width = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(calculator.getAdjustMarginToSize(div, 50)).to.equal(45);
  })

  it("should return not adjust margin to size", function():void{

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(calculator.getNotAdjustMarginToSize(div, 45)).to.equal(50);
  })

  it("should return scale step in percentages", function():void{
    let body: HTMLElement = document.querySelector("body");
    let div: HTMLElement = document.querySelector(".slider");
    body.style.width = '500px'

    expect(calculator.getScaleMarginRatio(11)).to.equal(10);
  })

})

