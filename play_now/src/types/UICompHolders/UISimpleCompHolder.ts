import { UIComponent } from '@/types/UIComponents/UIComponent';
import { UIData } from '@/types/UIData';

import { UICompHolder } from './UICompHolder';

export abstract class UISimpleCompHolder<
  DataType extends UIData,
  UICompType extends UIComponent<DataType>
> extends UICompHolder<DataType, UICompType> {
  public constructor(uiComponent: UICompType) {
    super(uiComponent);
  }

  public override async mount(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectElement();
    this.setupEventHandlers();
  }

  protected override setupEventHandlers(): void {}
}
