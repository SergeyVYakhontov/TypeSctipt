import { noIndex } from '@/constants/array';
import { DataContext } from '@/context/DataContext';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { TracksModel } from '@/model/TracksModel';
import { WebServerService } from '@/services/WebServerService';
import { StringOrUndefined } from '@/types/commonTypes';
import { Track, TrackList, TrackPartial } from '@/types/Data/Track';
import { UIListCompHolder } from '@/types/UICompHolders/UIListCompHolder';
import { UIData } from '@/types/UIData';
import { removeItem } from '@/utils/array/removeItem';
import { isUndefined } from '@/utils/data/typeGuards';

import { TracksItemCompHolder } from './item/TracksItemCompHolder';
import { TracksItemComponent } from './item/TracksItemComponent';
import { TracksComponent } from './TracksComponent';

export class TracksCompHolder extends UIListCompHolder<
  UIData,
  Track,
  TracksItemComponent,
  TracksComponent
> {
  public constructor(tracksModel: TracksModel) {
    super(new TracksComponent(tracksModel.Items), []);

    this.uiComponent.SubComponents.forEach((item: TracksItemComponent) => {
      this.subComponents.push(new TracksItemCompHolder(item));
    });
  }

  public override setupEventHandlers(): void {
    this.subComponents.forEach((item) => {
      item.setupEventHandlers();
    });
  }

  public override async removeItems(): Promise<void> {
    await this.uiComponent.removeItems();
  }

  public async mountEmptyContent(): Promise<void> {
    this.uiComponent.injectEmptyContent();
  }

  public async mountItem(uiDataId: StringOrUndefined): Promise<void> {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemComp = this.findItemComp(uiDataId);

    if (isUndefined(itemComp)) {
      return;
    }

    await itemComp.reMount();
  }

  public async convertLikeDislike(uiDataId: StringOrUndefined) {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemComp = this.findItemComp(uiDataId);

    if (isUndefined(itemComp)) {
      return;
    }

    const itemData: TrackPartial = itemComp.UiComponent.Data;
    const serviceDataId = itemComp.UiComponent.Data.serverDataId;

    if (isUndefined(serviceDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    let likeDislikeResult;

    if (itemData.likeDislike) {
      likeDislikeResult = await WebServerService.Instance.unlikeSong(serviceDataId);
    } else {
      likeDislikeResult = await WebServerService.Instance.likeSong(serviceDataId);
    }

    if (likeDislikeResult) {
      itemData.likeDislike = !itemData.likeDislike;

      DataContext.Instance.TracksModel.updateItem(itemData);
      await itemComp.reMount();
    }
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

    const itemData: TrackPartial = itemComp.UiComponent.Data;
    itemData.actionsVisible = actionsVisible;

    DataContext.Instance.TracksModel.updateItem(itemData);
  }

  public deleteTrackComponent(uiDataId: StringOrUndefined): void {
    if (isUndefined(uiDataId)) {
      return;
    }

    const itemIndex = this.findItemIndex(uiDataId);

    if (isUndefined(itemIndex)) {
      return;
    }

    if (itemIndex === noIndex) {
      return;
    }

    this.uiComponent.removeSubComponent(uiDataId);
    this.subComponents = removeItem(this.subComponents, itemIndex);

    DataContext.Instance.TracksModel.removeItem(uiDataId);
  }

  public reCreateComps(items: TrackList): void {
    DataContext.Instance.TracksModel.reAssignItems(items);

    this.uiComponent = new TracksComponent(items);
    this.subComponents = [];

    this.uiComponent.SubComponents.forEach((item: TracksItemComponent) => {
      this.subComponents.push(new TracksItemCompHolder(item));
    });
  }
}
