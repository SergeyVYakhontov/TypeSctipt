import { DOMElementOrNull, HTMLElementOrNull } from '@/types/commonTypes';
import { isHTMLCollection, isNull, isUndefined } from '@/utils/data/typeGuards';

export function insertDOMElementTo(
  domElement: DOMElementOrNull,
  insertTo: HTMLElementOrNull
) {
  if (isNull(insertTo)) {
    return;
  }

  if (isNull(domElement)) {
    return;
  }

  if (isHTMLCollection(domElement)) {
    while (domElement.length > 0) {
      const currItem = domElement[0];

      if (isNull(currItem)) {
        continue;
      }

      if (isUndefined(currItem)) {
        continue;
      }

      insertTo.appendChild(currItem);
    }

    return;
  }

  insertTo.appendChild(domElement);
}
