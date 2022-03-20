import "chai";
import { expect } from "chai"
import { VerticalCalculator } from "../VerticalCalculator"

describe("VerticalCalculator", function (): void{
  let calculator: VerticalCalculator;

  beforeEach( function () :void{
    let div: HTMLElement = document.createElement("div");
    let body: HTMLElement = document.querySelector("body");
    body.appendChild(div);
    div.className = "slider";

    let view = {
      getLineSize: () => 500,
      getLineLocation: () => 50
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
    const event: {pageX: number, pageY: number} = {pageX: 60, pageY: 250};
    expect(calculator.getCursorLocation(event)).to.equal(300);
  })

  it("should return location of element", function():void{

    let body: HTMLElement = document.querySelector("body");
    body.style.margin = "0";
    body.style.padding = "0";

    const div: HTMLElement = document.querySelector(".slider");
    div.style.marginTop = "100px";

    expect(Math.round(calculator.getElementsLocation(div) * 100) / 100).to.equal(100);

  })

  it("should set top property of element", function():void{

    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";
    body.style.position = 'relative'

    let div: HTMLElement = document.querySelector('.slider')
    div.style.position = 'absolute'

    calculator.setElementsMargin(div, 40);

    expect(div.offsetTop).to.equal(300);

  })

  it("should set height of element", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 20);

    expect(div.offsetHeight).to.equal(100);
  })

  it("should return adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(calculator.getAdjustedMarginToSize(div, 50)).to.equal(55);
  })

  it("should return not adjust margin to size", function():void{
    const body: HTMLElement = document.querySelector("body");
    body.style.height = "500px";

    let div: HTMLElement = document.querySelector(".slider");
    calculator.setElementsSize(div, 10);

    expect(Math.round(calculator.getNotAdjustedMarginToSize(div, 55))).to.equal(50);
  })

})