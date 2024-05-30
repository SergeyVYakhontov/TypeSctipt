import { DOMContainerId } from '@/enums/DOMContainerId';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';
import { UIData } from '@/types/UIData';

export class EmptyContentComp extends UISimpleComponent<UIData> {
  public constructor() {
    super(
      {
        dataId: DOMContainerId.Tracks,
      },
      "tracks/empty_content/view.html"
    );
  }
}
