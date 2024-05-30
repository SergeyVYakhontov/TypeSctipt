import { DataContext } from '@/context/DataContext';
import { UIContext } from '@/context/UIContext';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { PlaylistListManager } from '@/model/PlaylistListManager';
import { TracksModel } from '@/model/TracksModel';
import { StringOrUndefined } from '@/types/commonTypes';
import { Track, TrackList } from '@/types/Data/Track';
import { isUndefined } from '@/utils/data/typeGuards';

import { TracksCompHolder } from '../tracks/TracksCompHolder';
import { AsideActionsService } from './AsideActionsService';
import { PlayerActionsService } from './PlayerActionsService';
import { WebServerService } from './WebServerService';

export class TrackActionsService {
  public static get Instance() {
    if (!isUndefined(TrackActionsService.instance)) {
      return TrackActionsService.instance;
    }

    TrackActionsService.instance = new TrackActionsService();

    return TrackActionsService.instance;
  }

  public async showActionsModal(track: Track) {
    const currentDataId: StringOrUndefined = track.dataId;

    if (currentDataId === this.activeDataId) {
      return;
    }

    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    if (!isUndefined(this.activeDataId)) {
      tracksCompHolder.setTrackActionsVisible(this.activeDataId, false);
      await tracksCompHolder.mountItem(this.activeDataId);
    }

    UIContext.Instance.setTrack(track);

    tracksCompHolder.setTrackActionsVisible(currentDataId, true);
    await tracksCompHolder.mountItem(currentDataId);

    this.activeDataId = currentDataId;
  }

  public async hideActionsModal() {
    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    if (!isUndefined(this.activeDataId)) {
      tracksCompHolder.setTrackActionsVisible(this.activeDataId, false);
      await tracksCompHolder.mountItem(this.activeDataId);
    }

    this.activeDataId = undefined;
  }

  public async addTrack(playlistId: string): Promise<void> {
    const playlist = PlaylistListManager.Instance.PlaylistList.find(
      (item) => item.dataId === playlistId
    );

    const playlistServerId = playlist?.serverDataId;

    const track: Track = UIContext.Instance.Track;
    const trackServerId = UIContext.Instance.Track.serverDataId;

    if (isUndefined(playlistServerId) || isUndefined(trackServerId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const itemAdded = await WebServerService.Instance.addSong(
      playlistServerId,
      trackServerId
    );

    if (itemAdded) {
      PlaylistListManager.Instance.addTrack(playlistId, track);
    }
  }

  public async deleteTrack(): Promise<void> {
    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    const asideItem = UIContext.Instance.AsideItem;

    const playlistUiId = asideItem.dataId;
    const playlistServerId = asideItem.serverDataId;

    const track: Track = UIContext.Instance.Track;
    const trackId = track.serverDataId;

    if (
      isUndefined(playlistUiId) ||
      isUndefined(playlistServerId) ||
      isUndefined(trackId)
    ) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const itemRemoved = await WebServerService.Instance.removeSong(
      playlistServerId,
      trackId
    );

    if (itemRemoved) {
      PlaylistListManager.Instance.removeTrack(playlistUiId, track);
      tracksCompHolder.deleteTrackComponent(track.dataId);

      AsideActionsService.Instance.showMainScreen(asideItem);

      this.activeDataId = undefined;
    }
  }

  public async filterItems(filterStr: StringOrUndefined): Promise<void> {
    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    const asideItem = UIContext.Instance.AsideItem;
    const asideItemId = asideItem.dataId;

    const tracks: Track[] =
      PlaylistListManager.Instance.tracksById(asideItemId) ?? [];

    const tracksModel: TracksModel = new TracksModel(tracks);
    const filteredItems: TrackList = tracksModel.filterBy(filterStr);

    tracksCompHolder.reCreateComps(filteredItems);
    await tracksCompHolder.mount();

    this.activeDataId = undefined;
  }

  public async shaffleTracksFrom(): Promise<void> {
    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    const tracksModel: TracksModel = DataContext.Instance.TracksModel;
    const track: Track = PlayerActionsService.Instance.CurrentTrack;
    tracksModel.shaffleFrom(track);

    tracksCompHolder.reCreateComps(tracksModel.Items);
    await tracksCompHolder.mount();
  }

  public async shaffleAllTracks(): Promise<void> {
    const tracksCompHolder: TracksCompHolder =
      UIContext.Instance.TracksCompHolder;

    const tracksModel: TracksModel = DataContext.Instance.TracksModel;
    tracksModel.shaffleAll();

    tracksCompHolder.reCreateComps(tracksModel.Items);
    await tracksCompHolder.mount();
  }

  private static instance?: TrackActionsService;

  private activeDataId: StringOrUndefined = undefined;
}
