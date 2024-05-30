import { DOMContainerId } from '@/enums/DOMContainerId';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class SearchComponent extends UISimpleComponent {
  public constructor() {
    super({ dataId: DOMContainerId.Search }, "header/search/view.html");
  }
}
