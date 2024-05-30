export function createDOMElement(htmlContent: string): HTMLCollection {
  const newElement = document
    .createRange()
    .createContextualFragment(htmlContent);

  return newElement.children;
}
