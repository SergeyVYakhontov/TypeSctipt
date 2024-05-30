import { AsideItem } from '@/types/Data/AsideItem';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class AsideActionsModalComp extends UISimpleComponent<AsideItem> {
  public constructor(data: AsideItem) {
    super(
      {
        ...data,
        dataId: data.actionsModalId,
      },
      "aside/actions_modal/view.html"
    );
  }
}
