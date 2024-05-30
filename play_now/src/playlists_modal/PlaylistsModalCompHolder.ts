import { PlaylistListManager } from '@/model/PlaylistListManager';
import { DOMContainer } from '@/types/commonTypes';
import { PlaylistsModalItem, PlaylistsModalItemList } from '@/types/Data/PlaylistsModalItem';
import { UIListCompHolder } from '@/types/UICompHolders/UIListCompHolder';
import { UIData } from '@/types/UIData';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { PLModalActionsService } from '../services/PLModalActionsService';
import { PlaylistsModalItemCompHolder } from './item/PlaylistsModalItemCompHolder';
import { PlaylistsModalItemComponent } from './item/PlaylistsModalItemComponent';
import { PlaylistsModalComponent } from './PlaylistsModalComponent';

export class PlaylistsModalCompHolder extends UIListCompHolder<
  UIData,
  PlaylistsModalItem,
  PlaylistsModalItemComponent,
  PlaylistsModalComponent
> {
  public constructor(items: PlaylistsModalItemList) {
    super(new PlaylistsModalComponent(items), []);

    this.uiComponent.SubComponents.forEach(
      (item: PlaylistsModalItemComponent) => {
        this.subComponents.push(new PlaylistsModalItemCompHolder(item));
      }
    );
  }

  public override setupEventHandlers(): void {
    this.setupCloseBtnHandlers();

    this.subComponents.forEach((item) => {
      item.setupEventHandlers();
    });
  }

  public override async removeItems(): Promise<void> {
    await this.uiComponent.removeItems();
  }

  public reCreateComps(): void {
    const playlistsModalList: PlaylistsModalItemList =
      PlaylistListManager.Instance.PlaylistsModalList;

    this.uiComponent = new PlaylistsModalComponent(playlistsModalList);
    this.subComponents = [];

    this.uiComponent.SubComponents.forEach(
      (item: PlaylistsModalItemComponent) => {
        this.subComponents.push(new PlaylistsModalItemCompHolder(item));
      }
    );
  }

  public setVisible(visible: boolean): void {
    this.uiComponent.setVisible(visible);
  }

  private setupCloseBtnHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(this.closeBtnId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${this.closeBtnId}`);

      PLModalActionsService.Instance.hideModal();
    });
  }

  private closeBtnId: string = "playlists-modal-close-dtn";
}
