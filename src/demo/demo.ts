import '../lite-range-slider/lite-range-slider';
import SlidersDemo from './components/sliders-demo/sliders-demo';
import './demo.sass';

class Demo {
  private body: HTMLElement;

  private firstDemo: SlidersDemo;

  private secondDemo: SlidersDemo;

  private thirdDemo: SlidersDemo;

  constructor() {
    const body = this.getBogy();
    if (body) this.body = body;
    this.createDemos();
  }

  private getBogy = (): HTMLElement | null => document.querySelector('.js-demo');

  private getTarget = (targetSelector: string): HTMLElement | null => (
    this.body.querySelector(targetSelector)
  );

  private createDemos = () => {
    const firstDemoTarget = this.getTarget('.js-demo__first-container');
    if (firstDemoTarget) this.firstDemo = new SlidersDemo(firstDemoTarget, {});

    const secondDemoTarget = this.getTarget('.js-demo__second-container');
    if (secondDemoTarget) {
      this.secondDemo = new SlidersDemo(
        secondDemoTarget,
        {
          extremeValues: [-5, 5],
          step: 0.1,
          scaleStep: 1,
          isInterval: true,
          currentValues: [-2, 2],
          isVertical: true,
        },
      );
    }

    const thirdDemoTarget = this.getTarget('.js-demo__third-container');
    if (thirdDemoTarget) {
      this.thirdDemo = new SlidersDemo(
        thirdDemoTarget,
        {
          collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          isCollection: true,
          currentValues: [6],
        },
      );
    }
  };
}

export default Demo;
