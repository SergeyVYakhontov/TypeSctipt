import { noIndex } from '@/constants/array';
import { DOMContainerId } from '@/enums/DOMContainerId';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { DOMContainer, NumberOrUndefined, StringOrUndefined } from '@/types/commonTypes';
import { ListItem } from '@/types/ListItem';
import { UIComponent } from '@/types/UIComponents/UIComponent';
import { UIData } from '@/types/UIData';
import { removeItem } from '@/utils/array/removeItem';
import { isNull, isUndefined } from '@/utils/data/typeGuards';
import { applyTemplate } from '@/utils/DOM/applyTemplate';
import { createDOMElement } from '@/utils/DOM/createDOMElement';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';
import { runAsyncFuncsList } from '@/utils/runAsyncFuncsList';

import { UIListItemComponent } from './UIListItemComponent';

export abstract class UIListComponent<
  DataType extends UIData,
  ItemType extends ListItem,
  ListItemCompType extends UIListItemComponent<ItemType>
> extends UIComponent<DataType> {
  public constructor(
    data: DataType,
    htmlFileName: string,
    protected readonly items: ItemType[],
    protected readonly itemsContainerId: DOMContainerId,
    protected subComponents: ListItemCompType[] = []
  ) {
    super(data, htmlFileName);
  }

  public get SubComponents(): ListItemCompType[] {
    return this.subComponents;
  }

  public override async injectElement(): Promise<void> {
    await this.injecRootElement();

    await runAsyncFuncsList(this.subComponents, (item) =>
      item.addElementToContainer()
    );
  }

  public override computeProperties(): void {
    this.subComponents.forEach((item, index) => {
      item.setIndex(index);
    });
  }

  public async removeItems(): Promise<void> {
    await this.injecRootElement();
  }

  public removeSubComponent(uiDataId: StringOrUndefined): void {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemIndex = this.findItemIndex(uiDataId);

    if (isUndefined(itemIndex)) {
      return;
    }

    if (itemIndex === noIndex) {
      return;
    }

    this.subComponents = removeItem(this.subComponents, itemIndex);
  }

  protected async injecRootElement(): Promise<void> {
    const htmlTemplate: string = applyTemplate(
      await this.getTemplate(),
      this.data
    );

    const replaceWith = createDOMElement(htmlTemplate).item(0);
    const rootContainer: DOMContainer = getDOMElementById(this.ComponentId);

    if (isNull(replaceWith)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    rootContainer.replaceWith(replaceWith);
  }

  protected findItemIndex(uiDataId: string): NumberOrUndefined {
    const itemIndex: number = this.subComponents.findIndex(
      (item) => item.ComponentId === uiDataId
    );

    if (itemIndex === noIndex) {
      return undefined;
    }

    return itemIndex;
  }
}
