import { ApiCalls } from '@/api/apiCalls';
import { generatePlaylistImg } from '@/data/generate/generatePlaylistImg';
import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { trackCountRepr } from '@/data/trackCountRepr';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { ICreatePlaylistRequest } from '@/types/Api/ICreatePlaylistRequest';
import * as apiPlaylist from '@/types/Api/IPlaylist';
import { StringOrUndefined } from '@/types/commonTypes';
import * as dataPlaylist from '@/types/Data/Playlist';
import { PlaylistsModalItemList } from '@/types/Data/PlaylistsModalItem';
import { Track, TrackList } from '@/types/Data/Track';
import { addItemIfNotFound } from '@/utils/array/addItemIfNotFound';
import { removeItemByCond } from '@/utils/array/removeItemByCond';
import { isUndefined } from '@/utils/data/typeGuards';

export class PlaylistListManager {
  public static get Instance() {
    if (!isUndefined(PlaylistListManager.instance)) {
      return PlaylistListManager.instance;
    }

    PlaylistListManager.instance = new PlaylistListManager();

    return PlaylistListManager.instance;
  }

  public get PlaylistList(): dataPlaylist.PlaylistList {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playlistList;
  }

  public setPlaylistList(playlistList: dataPlaylist.PlaylistList): void {
    this.playlistList = [...playlistList];

    this.playlistList.forEach((item) => {
      item.dataId = AsideItemProperties.playlistId(item.serverDataId);
    });
  }

  public get FavoritiesList(): dataPlaylist.Playlist {
    if (isUndefined(this.favoritesList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.favoritesList;
  }

  public get PlaylistsModalList(): PlaylistsModalItemList {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.computePlaylistsProperties();

    return this.playlistList.map((item) => {
      return {
        img: item.img,
        name: item.name,
        paylistId: item.dataId,
        trackCount: item.trackCount,
        trackCountRepr: item.trackCountRepr,
      };
    });
  }

  public async createFavoritiesPlaylist() {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.favoritesList = this.playlistList.find(
      (item) => item.name === this.favoritesListName
    );

    if (isUndefined(this.favoritesList)) {
      const favoritiesData: ICreatePlaylistRequest = {
        name: this.favoritesListName,
      };

      const createdPlaylist: apiPlaylist.Playlist = await ApiCalls.createPlaylist(
        favoritiesData
      );

      this.favoritesList = {
        dataId: AsideItemProperties.favoritesListId(),
        serverDataId: createdPlaylist.id,
        img: generatePlaylistImg(),
        name: this.favoritesListName,
        trackCount: 0,
        trackIds: [],
      };

      this.playlistList = [this.favoritesList, ...this.playlistList];
    } else {
      this.favoritesList.dataId = AsideItemProperties.favoritesListId();
    }
  }

  public addPlaylist(toAdd: dataPlaylist.Playlist) {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const playlist = this.playlistList.find((item) => item.name === toAdd.name);

    if (!isUndefined(playlist)) {
      return;
    }

    if (isUndefined(toAdd.dataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.tracksMap.set(toAdd.dataId, []);

    this.playlistList.push(toAdd);
  }

  public removePlaylist(playlistId: string) {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.playlistList = removeItemByCond(
      this.playlistList,
      (item) => item.dataId === playlistId
    );
  }

  public initPlaylistTracks(allTracks: TrackList): void {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.tracksMap.set(AsideItemProperties.tracksListId(), [...allTracks]);

    if (isUndefined(this.favoritesList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.tracksMap.set(
      AsideItemProperties.favoritesListId(),
      this.selectTracksById(allTracks, this.favoritesList.trackIds)
    );

    this.playlistList.forEach((t, _) => {
      if (isUndefined(t.dataId)) {
        throw new Error(ErrorMessages.InvalidOperation);
      }

      this.tracksMap.set(
        t.dataId,
        this.selectTracksById(allTracks, t.trackIds)
      );
    });
  }

  public computePlaylistsProperties() {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.playlistList.map((item) => {
      const trackCount: number | undefined =
        PlaylistListManager.Instance.tracksById(item.dataId)?.length;

      item.trackCount = trackCount ?? 0;
      item.trackCountRepr = trackCountRepr.repr(trackCount);
    });
  }

  public tracksById(asideItemId: StringOrUndefined): Track[] | undefined {
    if (isUndefined(asideItemId)) {
      return [];
    }

    return this.tracksMap.get(asideItemId);
  }

  public trackByServerId(serverId: number): Track {
    const allTrack = this.tracksMap.get(AsideItemProperties.tracksListId());

    if (isUndefined(allTrack)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const trackItem = allTrack.find(t => t.serverDataId === serverId);

    if (isUndefined(trackItem)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return trackItem;
  }

  public addTrack(tracksListId: string, track: Track): void {
    const tracksList = this.tracksMap.get(tracksListId);

    if (isUndefined(tracksList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const newTrackList: Track[] = addItemIfNotFound(
      tracksList,
      track,
      (item) => item.trackId === track.trackId
    );

    this.tracksMap.set(tracksListId, newTrackList);
  }

  public removeTrack(tracksListId: string, track: Track): void {
    const tracksList: Track[] | undefined = this.tracksMap.get(tracksListId);

    if (isUndefined(tracksList)) {
      return;
    }

    if (tracksListId === AsideItemProperties.tracksListId()) {
      const newTracksMap = new Map<string, Track[]>();

      this.tracksMap.forEach((value, key) => {
        newTracksMap.set(
          key,
          removeItemByCond(
            value,
            (item: Track) => item.trackId === track?.trackId
          )
        );
      });

      this.tracksMap = newTracksMap;
    } else {
      const tracksListToReplace: Track[] | undefined =
        this.tracksMap.get(tracksListId);

      if (isUndefined(tracksListToReplace)) {
        return;
      }

      this.tracksMap.set(
        tracksListId,
        removeItemByCond(
          tracksListToReplace,
          (item: Track) => item.trackId === track?.trackId
        )
      );
    }
  }

  private selectTracksById(tracks: TrackList, trackIds: number[]): TrackList {
    return tracks.filter((item) => {
      if (isUndefined(item.serverDataId)) {
        throw new Error(ErrorMessages.InvalidOperation);
      }

      return trackIds.includes(item.serverDataId);
    });
  }

  private static instance: PlaylistListManager | undefined = undefined;

  private readonly favoritesListName: string = "Любимые песни";

  private favoritesList: dataPlaylist.Playlist | undefined = undefined;

  private playlistList: dataPlaylist.PlaylistList | undefined = undefined;

  private tracksMap: Map<string, Track[]> = new Map<string, Track[]>();
}
