/* eslint-disable @typescript-eslint/no-unused-vars */

import { TextField } from './text-field';

{
  const textFieldTargets = (Array.prototype.slice.call(document.querySelectorAll('.js-text-field')) as HTMLElement[]);
  if (textFieldTargets) {
    const textFieldCollections = textFieldTargets.map((item) => new TextField(item));
  }
}
