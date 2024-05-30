import { UIContext } from '@/context/UIContext';
import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { DOMContainer, StringOrUndefined } from '@/types/commonTypes';
import { AsideItem } from '@/types/Data/AsideItem';
import { UIListItemCompHolder } from '@/types/UICompHolders/UIListItemCompHolder';
import { UIData } from '@/types/UIData';
import { isUndefined } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { AsideActionsService } from '../../services/AsideActionsService';
import { AsideItemComponent } from './AsideItemComponent';

export class AsideItemCompHolder extends UIListItemCompHolder<
  UIData,
  AsideItemComponent
> {
  public constructor(itemComponent: AsideItemComponent) {
    super(itemComponent);
  }

  public override async reMount(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectElement();
    this.setupEventHandlers();
  }

  public override setupEventHandlers(): void {
    this.setupActionsBtnHandler();
    this.setupClickHandlers();
  }

  private setupClickHandlers(): void {
    const data: AsideItem = this.uiComponent.Data;
    const elementId: StringOrUndefined = data.dataId;
    const domElement: DOMContainer = getDOMElementById(elementId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${elementId}`);

      if (isUndefined(elementId)) {
        return;
      }

      AsideActionsService.Instance.showMainScreen(data);
    });
  }

  private setupActionsBtnHandler(): void {
    const data: AsideItem = this.uiComponent.Data;

    const domElement: DOMContainer = getDOMElementById(data.dataId);

    domElement.addEventListener("contextmenu", async () => {
      console.log(`contextmenu: ${data.dataId}`);

      if (data.dataId === AsideItemProperties.favoritesListId()) {
        return;
      }

      if (UIContext.Processing) {
        return;
      }

      await AsideActionsService.Instance.showMainScreen(data);

      await AsideActionsService.Instance.showActionsModal(
        this.uiComponent.Data
      );

      this.setupDeleteBtnHandler();
    });
  }

  private setupDeleteBtnHandler(): void {
    const data: AsideItem = this.uiComponent.Data;

    const domElement: DOMContainer = getDOMElementById(data.deleteBtnId);

    domElement.addEventListener("click", async () => {
      console.log(`click: ${data.deleteBtnId}`);

      if (UIContext.Processing) {
        return;
      }

      await AsideActionsService.Instance.removePlaylist(data);
      await AsideActionsService.Instance.hideActionsModal();
      await AsideActionsService.Instance.showTracks();
    });
  }
}
