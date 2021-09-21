/* eslint-disable @typescript-eslint/no-unused-vars */

import { Toggle } from './toggle';

{
  const toggleTargets = (Array.prototype.slice.call(document.querySelectorAll('.js-toggle')) as HTMLElement[]);
  if (toggleTargets) {
    const toggleCollections = toggleTargets.map((item) => new Toggle(item));
  }
}
