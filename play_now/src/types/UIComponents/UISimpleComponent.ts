import { ErrorMessages } from '@/enums/ErrorMessages';
import { DOMContainer } from '@/types/commonTypes';
import { UIComponent } from '@/types/UIComponents/UIComponent';
import { isNull } from '@/utils/data/typeGuards';
import { applyTemplate } from '@/utils/DOM/applyTemplate';
import { createDOMElement } from '@/utils/DOM/createDOMElement';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { UIData } from '../UIData';

export abstract class UISimpleComponent<
  DataType extends UIData = UIData
> extends UIComponent<DataType> {
  public constructor(
    data: DataType,
    htmlFileName: string
  ) {
    super(data, htmlFileName);
  }

  public override async injectElement(): Promise<void> {
    const htmlTemplate = applyTemplate(await this.getTemplate(), this.data);
    const rootContainer: DOMContainer = getDOMElementById(this.ComponentId);
    const replaceWith = createDOMElement(htmlTemplate).item(0);

    if (isNull(replaceWith)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    rootContainer.replaceWith(replaceWith);
  }

  public override computeProperties(): void {}
}
