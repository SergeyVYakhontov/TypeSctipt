export function addItem<ItemType>(items: ItemType[], toAdd: ItemType) {
  return [...items, toAdd];
}
