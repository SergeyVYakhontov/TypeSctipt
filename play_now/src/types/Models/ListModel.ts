import { noIndex } from '@/constants/array';
import { NumberOrUndefined, StringOrUndefined } from '@/types/commonTypes';
import { ListItem } from '@/types/ListItem';
import { arrayItem } from '@/utils/array/arrayItem';
import { removeItem } from '@/utils/array/removeItem';
import { isUndefined } from '@/utils/data/typeGuards';
import { updateFromPartial } from '@/utils/data/updateFromPartial';

export class ListModel<ItemType extends ListItem> {
  public constructor(items: ItemType[]) {
    this.items = items;
  }

  public get Items(): ItemType[] {
    return this.items;
  }

  public itemById(dataId: string): ItemType | undefined {
    const itemIndex: NumberOrUndefined = this.indexByItemId(dataId);

    if (isUndefined(itemIndex)) {
      return undefined;
    }

    return arrayItem(this.items, itemIndex);
  }

  public addItem(item: ItemType) {
    this.items.push(item);
  }

  public removeItem(dataId: string): void {
    const itemIndex: NumberOrUndefined = this.indexByItemId(dataId);

    if (isUndefined(itemIndex)) {
      return;
    }

    this.items = removeItem(this.items, itemIndex);
  }

  public updateItem(updateBy: Partial<ItemType>): void {
    const dataId: StringOrUndefined = updateBy.dataId;

    if (isUndefined(dataId)) {
      return;
    }

    const itemIndex: NumberOrUndefined = this.indexByItemId(dataId);

    if (isUndefined(itemIndex)) {
      return;
    }

    const item: ItemType = arrayItem(this.items, itemIndex);
    updateFromPartial(item, updateBy);
  }

  public reAssignItems(items: ItemType[]): void {
    this.items = items;
  }

  private indexByItemId(dataId: string): NumberOrUndefined {
    const itemIndex: number = this.items.findIndex(
      (item) => item.dataId === dataId
    );

    if (itemIndex === noIndex) {
      return undefined;
    }

    return itemIndex;
  }

  protected items: ItemType[];
}
