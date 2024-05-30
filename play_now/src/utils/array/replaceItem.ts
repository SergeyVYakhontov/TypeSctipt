export function replaceItem<ItemType>(
  items: ItemType[],
  index: number,
  replaceWith: ItemType
) {
  return [...items.slice(0, index), replaceWith, ...items.slice(index + 1)];
}
