import { DataContext } from '@/context/DataContext';
import { UIContext } from '@/context/UIContext';
import { AsideItemKind } from '@/enums/AsideItemKind';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { PlaylistListManager } from '@/model/PlaylistListManager';
import { PlaylistsModel } from '@/model/PlaylistsModel';
import { TracksModel } from '@/model/TracksModel';
import { PlaylistCompHolder } from '@/playlist/PlaylistCompHolder';
import { TracksCompHolder } from '@/tracks/TracksCompHolder';
import { StringOrUndefined } from '@/types/commonTypes';
import { AsideItem } from '@/types/Data/AsideItem';
import { Player } from '@/types/Data/Player';
import { Track } from '@/types/Data/Track';
import { arrayItem } from '@/utils/array/arrayItem';
import { isUndefined } from '@/utils/data/typeGuards';

import { AsideCompHolder } from '../aside/AsideCompHolder';
import { HeaderActionsService } from './HeaderActionsService';
import { PlayerActionsService } from './PlayerActionsService';
import { TrackActionsService } from './TrackActionsService';
import { WebServerService } from './WebServerService';

export class AsideActionsService {
  constructor() {}

  public static get Instance() {
    if (!isUndefined(AsideActionsService.instance)) {
      return AsideActionsService.instance;
    }

    AsideActionsService.instance = new AsideActionsService();

    return AsideActionsService.instance;
  }

  public async showTracks() {
    const tracksList = UIContext.Instance.TracksAsideItem;

    this.showMainScreen(tracksList);
  }

  public async showMainScreen(asideItem: AsideItem) {
    const asideItemId = asideItem.dataId;

    if (isUndefined(asideItemId)) {
      return;
    }

    const uiContext: UIContext = UIContext.Instance;

    const playlistList = PlaylistListManager.Instance.PlaylistList;
    const playlistsModel: PlaylistsModel = new PlaylistsModel(playlistList);

    const tracksCompHolder: TracksCompHolder = uiContext.TracksCompHolder;
    const playlistCompHolder: PlaylistCompHolder = uiContext.PlaylistCompHolder;

    const playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    await TrackActionsService.Instance.hideActionsModal();
    await HeaderActionsService.Instance.clearFilterStr();

    await this.hideMainScreen();
    UIContext.Instance.setAsideItem(asideItem);
    const mainScreenCompHolder = UIContext.Instance.MainScreenCompHolder;

    if (asideItem.asideItemKind === AsideItemKind.PlaylistsList) {
      playlistCompHolder.reCreateComps(playlistsModel.Items);
      await mainScreenCompHolder.mount();

      return;
    }

    let tracks: Track[] =
      PlaylistListManager.Instance.tracksById(asideItemId) ?? [];

    const tracksModel: TracksModel = new TracksModel(tracks);

    if (playerData.shaffle) {
      tracksModel.shaffleAll();
    }

    tracks = tracksModel.Items;

    UIContext.Instance.setPlaylistName(asideItem.name);
    tracksCompHolder.reCreateComps(tracks);

    if (tracks.length > 0) {
      const item = arrayItem(tracks, 0);

      if (isUndefined(item.serverDataId)) {
        throw new Error(ErrorMessages.InvalidOperation);
      }

      await mainScreenCompHolder.mount();
      await PlayerActionsService.Instance.mountTrack(item.serverDataId);
    } else {
      await PlayerActionsService.Instance.mountEmptyContent();
      await mainScreenCompHolder.mountEmptyContent();
    }
  }

  public async showActionsModal(asideItem: AsideItem) {
    const currentDataId: StringOrUndefined = asideItem.dataId;

    if (currentDataId === this.activeDataId) {
      return;
    }

    const asideCompHolder: AsideCompHolder = UIContext.Instance.AsideCompHolder;

    if (!isUndefined(this.activeDataId)) {
      asideCompHolder.setTrackActionsVisible(this.activeDataId, false);
      await asideCompHolder.mountItem(this.activeDataId);
    }

    UIContext.Instance.setAsideItem(asideItem);

    asideCompHolder.setTrackActionsVisible(currentDataId, true);
    await asideCompHolder.mountItem(currentDataId);

    this.activeDataId = currentDataId;
  }

  public async hideActionsModal() {
    const asideCompHolder: AsideCompHolder = UIContext.Instance.AsideCompHolder;

    if (!isUndefined(this.activeDataId)) {
      asideCompHolder.setTrackActionsVisible(this.activeDataId, false);
      await asideCompHolder.mountItem(this.activeDataId);
    }

    this.activeDataId = undefined;
  }

  public async removePlaylist(asideItem: AsideItem): Promise<void> {
    const uiDataId = asideItem.dataId;
    const serverDataId = asideItem.serverDataId;

    if (isUndefined(uiDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (isUndefined(serverDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    await WebServerService.Instance.removePlaylist(serverDataId);
    DataContext.Instance.PlaylistsModel.removeItem(uiDataId);
    PlaylistListManager.Instance.removePlaylist(uiDataId);

    UIContext.Instance.AsideCompHolder.reCreateComps();
    UIContext.Instance.PLModalCompHolder.reCreateComps();
    await UIContext.Instance.AsideCompHolder.mount();
  }

  private async hideMainScreen() {
    await UIContext.Instance.MainScreenCompHolder.removeItems();
  }

  private static instance?: AsideActionsService;

  private activeDataId: StringOrUndefined = undefined;
}
