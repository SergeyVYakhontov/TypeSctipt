import { DOMContainerId } from '@/enums/DOMContainerId';
import { Playlist } from '@/types/Data/Playlist';
import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';

export class PlaylistItemComponent extends UIListItemComponent<Playlist> {
  public constructor(data: Playlist) {
    super(data, "playlist/item/view.html", DOMContainerId.PlaylistList);
  }

  public override computeProperties(): void {
    this.data.rowIndex = this.index;
  }
}
