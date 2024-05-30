import { DOMContainerId } from '@/enums/DOMContainerId';
import { DOMContainer, StringOrUndefined } from '@/types/commonTypes';
import { isNull, isUndefined } from '@/utils/data/typeGuards';

export function getDOMElementById(
  toFind: DOMContainerId | StringOrUndefined
): DOMContainer {
  if (isUndefined(toFind)) {
    throw new Error(`DOM element ${toFind} couldn't be found`);
  }

  const domElement: HTMLElement | null = document.getElementById(toFind);

  if (isNull(domElement)) {
    throw new Error(`DOM element ${toFind} couldn't be found`);
  }

  return domElement;
}
