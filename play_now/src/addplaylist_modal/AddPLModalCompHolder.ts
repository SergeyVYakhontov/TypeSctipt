import { DOMContainer } from '@/types/commonTypes';
import { UISimpleCompHolder } from '@/types/UICompHolders/UISimpleCompHolder';
import { UIData } from '@/types/UIData';
import { isEmptyString } from '@/utils/data/isEmptyString';
import { isHTMLButtonElement, isInputEvent, isNull } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { AddPLModalService } from '../services/AddPLModalService';
import { AddPLModalComponent } from './AddPLModalComponent';

export class AddPLModalCompHolder extends UISimpleCompHolder<
  UIData,
  AddPLModalComponent
> {
  public constructor() {
    super(new AddPLModalComponent());
  }

  public setVisible(visible: boolean): void {
    this.uiComponent.setVisible(visible);
  }

  protected override setupEventHandlers(): void {
    this.setupInputHandlers();
    this.setupAddBtnHandlers();
    this.setupCloseBtnHandlers();

    this.setFocusOnInput();
  }

  private setupInputHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(this.inputId);

    domElement.addEventListener("input", async (event: Event) => {
      console.log("input");

      if (isInputEvent(event)) {
        const target = event.target;

        if (isNull(target)) {
          return;
        }

        if (isHTMLButtonElement(target)) {
          AddPLModalService.Instance.setInputValue(target.value);
        }
      }
    });
  }

  private setupAddBtnHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(this.addBtnId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${this.addBtnId}`);

      const inputValue = AddPLModalService.Instance.InputValue;

      if (isNull(inputValue)) {
        return;
      }

      if (isEmptyString(inputValue)) {
        return;
      }

      await AddPLModalService.Instance.hideModal();
      await AddPLModalService.Instance.addPlaylist(inputValue);
    });
  }

  private setupCloseBtnHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(this.closeBtnId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${this.closeBtnId}`);

      AddPLModalService.Instance.hideModal();
    });
  }

  private setFocusOnInput() {
    const domElement: DOMContainer = getDOMElementById(this.inputId);
    domElement.focus();
  }

  private inputId: string = "addplaylist-modal-input";

  private addBtnId: string = "addplaylist-modal-add-dtn";

  private closeBtnId: string = "addplaylist-modal-close-dtn";
}
