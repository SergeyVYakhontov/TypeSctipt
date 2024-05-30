import { DOMContainerId } from '@/enums/DOMContainerId';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';
import { UIData } from '@/types/UIData';

export class EmptyContentComp extends UISimpleComponent<UIData> {
  public constructor() {
    super(
      {
        dataId: DOMContainerId.Player,
      },
      "player/empty_content/view.html"
    );
  }
}
