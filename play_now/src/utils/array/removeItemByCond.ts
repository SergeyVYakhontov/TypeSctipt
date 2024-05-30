import { noIndex } from '../../constants/array';
import { removeItem } from './removeItem';

export function removeItemByCond<ItemType>(
  items: ItemType[],
  cond: (item: ItemType) => boolean
) {
  const index: number = items.findIndex(cond);

  if (index === noIndex) {
    return [...items];
  }

  return removeItem(items, index);
}
