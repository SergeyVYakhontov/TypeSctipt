import { DOMContainerId } from '@/enums/DOMContainerId';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';
import { UIData } from '@/types/UIData';

export class BodyComponent extends UISimpleComponent<UIData> {
  public constructor() {
    super({ dataId: DOMContainerId.AppBody }, "body/view.html");
  }
}
