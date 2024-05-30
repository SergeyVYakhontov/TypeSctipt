import { DOMContainerId } from '@/enums/DOMContainerId';
import { PlaylistsModal } from '@/types/Data/PlaylistsModal';
import { PlaylistsModalItem, PlaylistsModalItemList } from '@/types/Data/PlaylistsModalItem';
import { UIListComponent } from '@/types/UIComponents/UIListComponent';

import { PlaylistsModalItemComponent } from './item/PlaylistsModalItemComponent';

export class PlaylistsModalComponent extends UIListComponent<
  PlaylistsModal,
  PlaylistsModalItem,
  PlaylistsModalItemComponent
> {
  public constructor(items: PlaylistsModalItemList) {
    super(
      { dataId: DOMContainerId.PlaylistsModal, visible: false },
      "playlists_modal/view.html",
      items,
      DOMContainerId.PlaylistsModalContent
    );

    items.forEach((t: PlaylistsModalItem) => {
      this.subComponents.push(new PlaylistsModalItemComponent(t));
    });
  }

  public override computeProperties() {
    super.computeProperties();

    this.data.containerClassName = this.data.visible
      ? "playlists-modal-container show"
      : "playlists-modal-container";

    this.data.internalClassName = this.data.visible
      ? "playlists-modal show"
      : "playlists-modal";
  }

  public setVisible(visible: boolean): void {
    this.data.visible = visible;
  }
}
