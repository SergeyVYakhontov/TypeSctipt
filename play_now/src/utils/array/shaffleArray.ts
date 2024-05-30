import { arrayItem } from './arrayItem';

export function shaffleArray<ItemType>(items: ItemType[]): ItemType[] {
  let itemIndexes: number[] = Array.from(Array(items.length).keys());
  const newItems: ItemType[] = [];

  while (itemIndexes.length > 0) {
    const randomIndex = Math.floor(Math.random() * itemIndexes.length);
    const randomItem = arrayItem(items, arrayItem(itemIndexes, randomIndex));

    itemIndexes.splice(randomIndex, 1);
    newItems.push(randomItem);
  }

  return newItems;
}
