import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';
import { UIData } from '@/types/UIData';

import { UICompHolder } from './UICompHolder';

export abstract class UIListItemCompHolder<
  DataType extends UIData,
  UIListItemCompType extends UIListItemComponent<DataType>
> extends UICompHolder<DataType, UIListItemCompType> {
  public constructor(uiComponent: UIListItemCompType) {
    super(uiComponent);
  }

  public override async mount(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectElement();
    this.setupEventHandlers();
  }

  public async reMount(): Promise<void> {}

  public override setupEventHandlers(): void {}
}
