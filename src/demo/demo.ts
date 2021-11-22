import '../lite-range-slider/lite-range-slider';
import SlidersDemo from './components/sliders-demo/sliders-demo';
import './demo.sass';

class Demo {
  private body: HTMLElement;

  private firstDemo: SlidersDemo;

  private secondDemo: SlidersDemo;

  private thirdDemo: SlidersDemo;

  constructor() {
    this.body = this.getBogy();
    this.createDemos();
  }

  private getBogy = (): HTMLElement => document.querySelector('.js-demo');

  private getTarget = (targetSelector: string): HTMLElement => (
    this.body.querySelector(targetSelector)
  );

  private createDemos = () => {
    this.firstDemo = new SlidersDemo(this.getTarget('.js-demo__first-container'), {});
    this.secondDemo = new SlidersDemo(
      this.getTarget('.js-demo__second-container'),
      {
        extremeValues: [-5, 5],
        step: 0.1,
        scaleStep: 1,
        isInterval: true,
        currentValues: [-2, 2],
        isVertical: true,
      },
    );
    this.thirdDemo = new SlidersDemo(
      this.getTarget('.js-demo__third-container'),
      {
        collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        isCollection: true,
        currentValues: [6],
      },
    );
  };
}

export default Demo;
