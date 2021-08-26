import { ControlPanel } from './layers/control-panel/control-panel';
import './demo.sass';

const demos = document.querySelectorAll('.demo');

const firstDemo = new ControlPanel((demos[0] as HTMLElement));
const secondDemo = new ControlPanel((demos[1] as HTMLElement), {
  extremeValues: [-5, 5],
  step: 0.1,
  scaleStep: 1,
  isInterval: true,
  currentValues: [-2, 2],
  isVertical: true,
});
const thirdDemo = new ControlPanel((demos[2] as HTMLElement), {
  collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  isCollection: true,
  currentValues: [6],
});
