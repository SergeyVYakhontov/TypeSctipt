import { UIComponent } from '@/types/UIComponents/UIComponent';
import { UIData } from '@/types/UIData';

export abstract class UICompHolder<
  DataType extends UIData,
  UICompType extends UIComponent<DataType>
> {
  public constructor(protected uiComponent: UICompType) {}

  public get UiComponent() {
    return this.uiComponent;
  }

  public abstract mount(): Promise<void>;

  protected abstract setupEventHandlers(): void;
}

export type UIDataCompHolder = UICompHolder<UIData, UIComponent<UIData>>;
