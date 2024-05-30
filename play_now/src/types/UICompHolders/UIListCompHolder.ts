import { noIndex } from '@/constants/array';
import { UIContext } from '@/context/UIContext';
import { ListItem } from '@/types/ListItem';
import { UIListComponent } from '@/types/UIComponents/UIListComponent';
import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';
import { UIData } from '@/types/UIData';
import { arrayItem } from '@/utils/array/arrayItem';

import { NumberOrUndefined } from '../commonTypes';
import { UICompHolder } from './UICompHolder';
import { UIListItemCompHolder } from './UIListItemCompHolder';

export abstract class UIListCompHolder<
  DataType extends UIData,
  ItemType extends ListItem,
  UIListItemCompType extends UIListItemComponent<ItemType>,
  UICompType extends UIListComponent<DataType, ItemType, UIListItemCompType>
> extends UICompHolder<DataType, UICompType> {
  public constructor(
    uiComponent: UICompType,
    protected subComponents: UIListItemCompHolder<
      ItemType,
      UIListItemCompType
    >[] = []
  ) {
    super(uiComponent);
  }

  public override async mount(): Promise<void> {
    UIContext.setProcessing(true);

    this.uiComponent.computeProperties();
    await this.uiComponent.injectElement();
    this.setupEventHandlers();

    UIContext.setProcessing(false);
  }

  protected override setupEventHandlers(): void {}

  public abstract removeItems(): Promise<void>;

  protected findItemIndex(uiDataId: string): NumberOrUndefined {
    const itemIndex: number = this.subComponents.findIndex(
      (item) => item.UiComponent.ComponentId === uiDataId
    );

    return itemIndex;
  }

  protected findItemComp(
    uiDataId: string
  ): UIListItemCompHolder<ItemType, UIListItemCompType> | undefined {
    const itemIndex: number = this.subComponents.findIndex(
      (item) => item.UiComponent.ComponentId === uiDataId
    );

    if (itemIndex === noIndex) {
      return undefined;
    }

    return arrayItem(this.subComponents, itemIndex);
  }
}
