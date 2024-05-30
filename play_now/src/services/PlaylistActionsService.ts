import { UIContext } from '@/context/UIContext';
import { PlaylistsModel } from '@/model/PlaylistsModel';
import { StringOrUndefined } from '@/types/commonTypes';
import { PlaylistList } from '@/types/Data/Playlist';
import { isUndefined } from '@/utils/data/typeGuards';

import { PlaylistListManager } from '../model/PlaylistListManager';
import { PlaylistCompHolder } from '../playlist/PlaylistCompHolder';

export class PlaylistActionsService {
  public static get Instance() {
    if (!isUndefined(PlaylistActionsService.instance)) {
      return PlaylistActionsService.instance;
    }

    PlaylistActionsService.instance = new PlaylistActionsService();

    return PlaylistActionsService.instance;
  }

  public async filterItems(filterStr: StringOrUndefined): Promise<void> {
    const playlistList = PlaylistListManager.Instance.PlaylistList;
    const playlistsModel: PlaylistsModel = new PlaylistsModel(playlistList);

    const playlistCompHolder: PlaylistCompHolder =
      UIContext.Instance.PlaylistCompHolder;

    const filteredItems: PlaylistList = playlistsModel.filterBy(filterStr);

    playlistCompHolder.reCreateComps(filteredItems);
    await playlistCompHolder.mount();
  }

  private static instance?: PlaylistActionsService;
}
