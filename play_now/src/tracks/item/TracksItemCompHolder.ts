import { UIContext } from '@/context/UIContext';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { PlayerActionsService } from '@/services/PlayerActionsService';
import { PLModalActionsService } from '@/services/PLModalActionsService';
import { DOMContainer } from '@/types/commonTypes';
import { Track } from '@/types/Data/Track';
import { UIListItemCompHolder } from '@/types/UICompHolders/UIListItemCompHolder';
import { UIData } from '@/types/UIData';
import { isUndefined } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { TrackActionsService } from '../../services/TrackActionsService';
import { TracksCompHolder } from '../TracksCompHolder';
import { TracksItemComponent } from './TracksItemComponent';

export class TracksItemCompHolder extends UIListItemCompHolder<
  UIData,
  TracksItemComponent
> {
  public constructor(itemComponent: TracksItemComponent) {
    super(itemComponent);
  }

  public override async reMount(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectElement();
    this.setupEventHandlers();
  }

  public override setupEventHandlers(): void {
    const data: Track = this.uiComponent.Data;

    this.setupLikeBtnHandler();
    this.setupActionsBtnHandler();

    if (data.actionsVisible) {
      this.setupAddBtnHandler();
      this.setupDeleteBtnHandler();
    }

    this.setupClickHandler();
  }

  private setupBtnHandler(clickHandler: (event: Event) => void, elementId?: string): void {
    if (isUndefined(elementId)) {
      return;
    }

    const domElement: DOMContainer = getDOMElementById(elementId);

    domElement.addEventListener("click", async (event: Event) => {
      console.log(`button clicked: ${elementId}`);

      clickHandler(event);

      const tracksCompHolder: TracksCompHolder =
        UIContext.Instance.TracksCompHolder;

      await tracksCompHolder.mountItem(this.uiComponent.ComponentId);
    });
  }

  private async convertLike(): Promise<void> {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.serverDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    await tracksCompHolder.convertLikeDislike(this.uiComponent.ComponentId);
    await PlayerActionsService.Instance.mountTrackInfo();
  }

  private async processAddTrack(): Promise<void> {
    await PLModalActionsService.Instance.showModal();
  }

  private async processDeleteTrack(): Promise<void> {
    await TrackActionsService.Instance.hideActionsModal();

    await TrackActionsService.Instance.deleteTrack();
  }

  private setupLikeBtnHandler(): void {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.likeBtnId)) {
      return;
    }

    this.setupBtnHandler(async (event: Event) => {
      event.stopPropagation();

      await this.convertLike();
    }, data.likeBtnId);
  }

  private setupActionsBtnHandler(): void {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.actionsBtnId)) {
      return;
    }

    const domElement: DOMContainer = getDOMElementById(data.actionsBtnId);

    domElement.addEventListener("click", async (event: Event) => {
      console.log(`button clicked: ${data.actionsBtnId}`);

      event.stopPropagation();

      await TrackActionsService.Instance.showActionsModal(
        this.uiComponent.Data
      );
    });
  }

  private setupAddBtnHandler(): void {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.addBtnId)) {
      return;
    }

    this.setupBtnHandler(() => {
      this.processAddTrack();
    }, data.addBtnId);
  }

  private setupDeleteBtnHandler(): void {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.deleteBtnId)) {
      return;
    }

    this.setupBtnHandler(async () => {
      await this.processDeleteTrack();
    }, data.deleteBtnId);
  }

  private setupClickHandler(): void {
    const data: Track = this.uiComponent.Data;

    if (isUndefined(data.dataId)) {
      return;
    }

    const domElement: DOMContainer = getDOMElementById(data.dataId);

    domElement.addEventListener("click", async () => {
      console.log(`track clicked: ${data.dataId}`);

      if (isUndefined(data.serverDataId)) {
        throw new Error(ErrorMessages.InvalidOperation);
      }

      PlayerActionsService.Instance.mountTrack(data.serverDataId);
    });
  }
}
