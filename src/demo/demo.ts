import { SlidersDemo } from './components/sliders-demo/sliders-demo';
import './demo.sass';
import '../lite-range-slider/lite-range-slider';

const demos = document.querySelectorAll('.js-sliders-demo');
const firstDemo = new SlidersDemo((demos[0] as HTMLElement));
const secondDemo = new SlidersDemo((demos[1] as HTMLElement), {
  extremeValues: [-5, 5],
  step: 0.1,
  scaleStep: 1,
  isInterval: true,
  currentValues: [-2, 2],
  isVertical: true,
});
const thirdDemo = new SlidersDemo((demos[2] as HTMLElement), {
  collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  isCollection: true,
  currentValues: [6],
});
