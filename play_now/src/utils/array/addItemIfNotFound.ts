import { noIndex } from '@/constants/array';

export function addItemIfNotFound<ItemType>(
  items: ItemType[],
  toAdd: ItemType,
  condition: (item: ItemType) => boolean
) {
  const index: number = items.findIndex(condition);

  if (index !== noIndex) {
    return [...items];
  }

  return [...items, toAdd];
}
