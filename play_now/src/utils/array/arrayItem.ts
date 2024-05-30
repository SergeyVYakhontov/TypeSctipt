import { ErrorMessages } from '@/enums/ErrorMessages';
import { isUndefined } from '@/utils/data/typeGuards';

export function arrayItem<ItemType>(
  items: ItemType[],
  index: number
): ItemType {
  const item: ItemType | undefined = items[index];

  if (isUndefined(item)) {
    throw new Error(ErrorMessages.ArrayItemNotFound);
  }

  return item;
}
