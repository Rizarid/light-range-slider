import { ControlPanel } from './layers/control-panel/control-panel';

const demos = document.querySelectorAll('.demo');

const firstDemo = new ControlPanel((demos[0] as HTMLElement));
