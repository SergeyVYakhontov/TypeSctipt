import { DOMContainerId } from '@/enums/DOMContainerId';
import { AsideItem, AsideItemList } from '@/types/Data/AsideItem';
import { UIListComponent } from '@/types/UIComponents/UIListComponent';
import { UIData } from '@/types/UIData';

import { AsideItemComponent } from './item/AsideItemComponent';

export class AsideComponent extends UIListComponent<
  UIData,
  AsideItem,
  AsideItemComponent
> {
  public constructor(items: AsideItemList) {
    super(
      { dataId: DOMContainerId.Aside },
      "aside/view.html",
      items,
      DOMContainerId.AsideList
    );

    items.forEach((t: AsideItem) => {
      this.subComponents.push(new AsideItemComponent(t));
    });
  }
}
