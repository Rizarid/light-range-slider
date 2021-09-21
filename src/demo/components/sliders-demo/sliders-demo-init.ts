import { SlidersDemo } from './sliders-demo';

const options = [
  {},
  {
    extremeValues: [-5, 5],
    step: 0.1,
    scaleStep: 1,
    isInterval: true,
    currentValues: [-2, 2],
    isVertical: true,
  },
  {
    collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    isCollection: true,
    currentValues: [6],
  },
];
const demosTargets = Array.from(document.querySelectorAll('.js-sliders-demo'));
if (demosTargets) {
  const demos = demosTargets.map((item, index) => new SlidersDemo(
    (item as HTMLElement),
    options[index] ? options[index] : {},
  ));
}
