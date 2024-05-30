import { DataContext } from '@/context/DataContext';
import { UIContext } from '@/context/UIContext';
import { generateAsideList } from '@/data/generate/generateAsideList';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AsideItemsModel } from '@/model/AsideItemsModel';
import { PlaylistListManager } from '@/model/PlaylistListManager';
import { AddPLModalService } from '@/services/AddPLModalService';
import { DOMContainer, StringOrUndefined } from '@/types/commonTypes';
import { AsideItem, AsideItemList, AsideItemPartial } from '@/types/Data/AsideItem';
import { UIListCompHolder } from '@/types/UICompHolders/UIListCompHolder';
import { UIData } from '@/types/UIData';
import { isUndefined } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { AsideActionsService } from '../services/AsideActionsService';
import { AsideComponent } from './AsideComponent';
import { AsideItemCompHolder } from './item/AsideItemCompHolder';
import { AsideItemComponent } from './item/AsideItemComponent';

export class AsideCompHolder extends UIListCompHolder<
  UIData,
  AsideItem,
  AsideItemComponent,
  AsideComponent
> {
  public constructor(asideItemsModel: AsideItemsModel) {
    super(new AsideComponent(asideItemsModel.Items), []);

    this.uiComponent.SubComponents.forEach((item: AsideItemComponent) => {
      this.subComponents.push(new AsideItemCompHolder(item));
    });
  }

  public override async removeItems(): Promise<void> {}

  public async mountItem(uiDataId: StringOrUndefined): Promise<void> {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemComp = this.findItemComp(uiDataId);

    if (isUndefined(itemComp)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    await itemComp.reMount();
  }

  public setTrackActionsVisible(
    uiDataId: StringOrUndefined,
    actionsVisible: boolean
  ) {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemComp = this.findItemComp(uiDataId);

    if (isUndefined(itemComp)) {
      return;
    }

    const itemData: AsideItemPartial = itemComp.UiComponent.Data;
    itemData.actionsVisible = actionsVisible;

    DataContext.Instance.AsideItemsModel.updateItem(itemData);
  }

  public reCreateComps(): void {
    const asideItemList: AsideItemList = generateAsideList(
      PlaylistListManager.Instance.PlaylistList
    );

    DataContext.Instance.AsideItemsModel.reAssignItems(asideItemList);

    this.uiComponent = new AsideComponent(asideItemList);
    this.subComponents = [];

    this.uiComponent.SubComponents.forEach((item: AsideItemComponent) => {
      this.subComponents.push(new AsideItemCompHolder(item));
    });
  }

  protected override setupEventHandlers(): void {
    this.setupBtnHandler(UIContext.Instance.TracksAsideItem);
    this.setupBtnHandler(UIContext.Instance.PlaylistListsAsideItem);

    this.subComponents.forEach((item) => {
      item.setupEventHandlers();
    });

    this.setupAddPLBtnHandler();
  }

  private setupBtnHandler(asideItem: AsideItem): void {
    const domElement: DOMContainer = getDOMElementById(asideItem.dataId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${asideItem.dataId}`);

      AsideActionsService.Instance.showMainScreen(asideItem);
    });
  }

  private setupAddPLBtnHandler(): void {
    const domElement: DOMContainer = getDOMElementById(this.addplaylistBtn);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${this.addplaylistBtn}`);

      AddPLModalService.Instance.showModal();
    });
  }

  private readonly addplaylistBtn = "addplaylist_btn";
}
