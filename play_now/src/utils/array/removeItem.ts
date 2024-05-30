export function removeItem<ItemType>(items: ItemType[], index: number) {
  return [...items.slice(0, index), ...items.slice(index + 1)];
}
