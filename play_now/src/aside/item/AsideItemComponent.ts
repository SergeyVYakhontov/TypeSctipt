import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { AsideElemKind } from '@/enums/AsideElemKind';
import { DOMContainerId } from '@/enums/DOMContainerId';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AsideItem } from '@/types/Data/AsideItem';
import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';
import { isUndefined } from '@/utils/data/typeGuards';

import { AsideActionsModalComp } from '../actions_modal/AsideActionsModalComp';

export class AsideItemComponent extends UIListItemComponent<AsideItem> {
  public constructor(data: AsideItem) {
    super(data, "aside/item/view.html", DOMContainerId.AsideList);
  }

  public override async addElementToContainer(): Promise<void> {
    await super.addElementToContainer();

    const asideActionsModalComp: AsideActionsModalComp =
      new AsideActionsModalComp(this.data);

    if (this.data.actionsVisible) {
      await asideActionsModalComp.injectElement();
    }
  }

  public override async injectElement(): Promise<void> {
    await super.injectElement();

    if (this.data.actionsVisible) {
      const trackActionsModalComp: AsideActionsModalComp =
        new AsideActionsModalComp(this.data);

      await trackActionsModalComp.injectElement();
    }
  }

  public override computeProperties() {
    if (isUndefined(this.data.serverDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.data.rowIndex = this.index;
    this.data.rowNumber = this.index + 1;

    this.data.actionsModalId = AsideItemProperties.elementId(
      this.data.serverDataId,
      AsideElemKind.ActionsModal
    );

    this.data.deleteBtnId = AsideItemProperties.elementId(
      this.data.serverDataId,
      AsideElemKind.DeleteBtn
    );
  }
}
