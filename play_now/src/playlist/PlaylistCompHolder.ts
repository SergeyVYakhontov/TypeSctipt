import { PlaylistsModel } from '@/model/PlaylistsModel';
import { Playlist, PlaylistList } from '@/types/Data/Playlist';
import { UIListCompHolder } from '@/types/UICompHolders/UIListCompHolder';
import { UIData } from '@/types/UIData';

import { PlaylistItemCompHolder } from './item/PlaylistItemCompHolder';
import { PlaylistItemComponent } from './item/PlaylistItemComponent';
import { PlaylistComponent } from './PlaylistComponent';

export class PlaylistCompHolder extends UIListCompHolder<
  UIData,
  Playlist,
  PlaylistItemComponent,
  PlaylistComponent
> {
  public constructor(private readonly playlistsModel: PlaylistsModel) {
    super(new PlaylistComponent(playlistsModel.Items), []);

    this.uiComponent.SubComponents.forEach((item: PlaylistItemComponent) => {
      this.subComponents.push(new PlaylistItemCompHolder(item));
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

  public reCreateComps(items: PlaylistList): void {
    this.playlistsModel.reAssignItems(items);

    this.uiComponent = new PlaylistComponent(items);
    this.subComponents = [];

    this.uiComponent.SubComponents.forEach((item: PlaylistItemComponent) => {
      this.subComponents.push(new PlaylistItemCompHolder(item));
    });
  }
}
