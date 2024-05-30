import { UIData } from '@/types/UIData';
import { readHTMLFile } from '@/utils/readHtmlFile';

import { StringOrUndefined } from '../commonTypes';

export abstract class UIComponent<DataType extends UIData> {
  public constructor(
    protected readonly data: DataType,
    protected readonly htmlFileName: string
  ) {}

  public get Data(): DataType {
    return this.data;
  }

  public get ComponentId(): StringOrUndefined {
    return this.data.dataId;
  }

  public abstract injectElement(): Promise<void>;

  public abstract computeProperties(): void;

  protected getTemplate(): Promise<string> {
    return readHTMLFile(this.htmlFileName);
  }
}
