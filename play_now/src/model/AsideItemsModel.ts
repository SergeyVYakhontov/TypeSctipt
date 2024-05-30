import { AsideItem, AsideItemList } from '@/types/Data/AsideItem';
import { ListModel } from '@/types/Models/ListModel';

export class AsideItemsModel extends ListModel<AsideItem> {
  constructor(items: AsideItemList) {
    super(items);
  }
}
