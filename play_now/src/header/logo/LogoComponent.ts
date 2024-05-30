import { DOMContainerId } from '@/enums/DOMContainerId';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class LogoComponent extends UISimpleComponent {
  public constructor() {
    super({ dataId: DOMContainerId.Logo }, "header/logo/view.html");
  }
}
