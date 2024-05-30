import { DOMContainerId } from '@/enums/DOMContainerId';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { DOMContainer } from '@/types/commonTypes';
import { UIComponent } from '@/types/UIComponents/UIComponent';
import { UIData } from '@/types/UIData';
import { isNull, isUndefined } from '@/utils/data/typeGuards';
import { applyTemplate } from '@/utils/DOM/applyTemplate';
import { createDOMElement } from '@/utils/DOM/createDOMElement';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';
import { insertDOMElementTo } from '@/utils/DOM/insertDOMElementTo';

export abstract class UIListItemComponent<
  DataType extends UIData = UIData
> extends UIComponent<DataType> {
  public constructor(
    data: DataType,
    htmlFileName: string,
    protected readonly itemsContainerId: DOMContainerId,
    protected index: number = 0
  ) {
    super(data, htmlFileName);
  }

  public override async injectElement(): Promise<void> {
    const htmlTemplate = applyTemplate(await this.getTemplate(), this.data);
    const replaceWith = createDOMElement(htmlTemplate).item(0);

    if (isNull(replaceWith)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (isUndefined(this.ComponentId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const domElement: DOMContainer = getDOMElementById(this.ComponentId);
    domElement.replaceWith(replaceWith);
  }

  public override computeProperties(): void {}

  public async addElementToContainer(): Promise<void> {
    this.computeProperties();

    const htmlTemplate = applyTemplate(await this.getTemplate(), this.data);
    const domElement = createDOMElement(htmlTemplate);

    const itemsContainer: DOMContainer = getDOMElementById(
      this.itemsContainerId
    );

    insertDOMElementTo(domElement, itemsContainer);
  }

  public setIndex(index: number): void {
    this.index = index;
  }
}
