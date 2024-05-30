import { DOMContainerId } from '@/enums/DOMContainerId';
import { PlaylistsModalItem } from '@/types/Data/PlaylistsModalItem';
import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';

export class PlaylistsModalItemComponent extends UIListItemComponent<PlaylistsModalItem> {
  public constructor(data: PlaylistsModalItem) {
    super(
      data,
      "playlists_modal/item/view.html",
      DOMContainerId.PlaylistsModalContent,
    );
  }

  public override computeProperties(): void {
    this.data.rowIndex = this.index;
    this.data.dataId = `playlistModalItem_${this.index}`;
  }
}
