import { DOMContainerId } from '@/enums/DOMContainerId';
import { Playlist, PlaylistList } from '@/types/Data/Playlist';
import { UIListComponent } from '@/types/UIComponents/UIListComponent';
import { UIData } from '@/types/UIData';

import { PlaylistListManager } from '../model/PlaylistListManager';
import { EmptyContentComp } from './empty_content/EmptyContentComp';
import { PlaylistItemComponent } from './item/PlaylistItemComponent';

export class PlaylistComponent extends UIListComponent<
  UIData,
  Playlist,
  PlaylistItemComponent
> {
  public constructor(items: PlaylistList) {
    super(
      { dataId: DOMContainerId.Playlist },
      "playlist/view.html",
      items,
      DOMContainerId.PlaylistList
    );

    items.forEach((item: Playlist) => {
      this.subComponents.push(new PlaylistItemComponent(item));
    });
  }

  public override computeProperties(): void {
    PlaylistListManager.Instance.computePlaylistsProperties();
  }

  public async injectEmptyContent(): Promise<void> {
    const emptyContentComp = new EmptyContentComp();
    await emptyContentComp.injectElement();
  }
}
