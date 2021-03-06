import "chai";
import { expect } from "chai"
import { HorizontalCalculator } from "../HorizontalCalculator"

describe("HorizontalCalculator", function (): void{
  let calculator: HorizontalCalculator;

  beforeEach( function () :void{

    let div: HTMLElement = document.createElement("div");
    let body: HTMLElement = document.querySelector("body");
    body.appendChild(div);

    div.className = "slider";

    let view = {
      getLineSize: () => 500,
      getLineLocation: () => 50
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
    const event = {pageX: 300, pageY: 100};
    expect(calculator.getCursorLocation(event)).to.equal(250);
  })

  it("should return location of element", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0";
    body.style.padding = "0";

    const div: HTMLElement = document.querySelector(".slider");
    div.style.marginLeft = "100px";

    expect(Math.round(calculator.getElementsLocation(div) * 100) / 100).to.equal(100);

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

    expect(calculator.getAdjustedMarginToSize(div, 50)).to.equal(45);
  })

  it("should return not adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.width = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(Math.round(calculator.getNotAdjustedMarginToSize(div, 45))).to.equal(50);
  })


})

