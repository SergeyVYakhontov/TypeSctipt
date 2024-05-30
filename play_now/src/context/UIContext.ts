import { AddPLModalCompHolder } from '@/addplaylist_modal/AddPLModalCompHolder';
import { AsideCompHolder } from '@/aside/AsideCompHolder';
import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { AsideItemKind } from '@/enums/AsideItemKind';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { HeaderCompHolder } from '@/header/HeaderCompHolder';
import { PlaylistListManager } from '@/model/PlaylistListManager';
import { PlayerCompHolder } from '@/player/PlayerCompHolder';
import { PlaylistCompHolder } from '@/playlist/PlaylistCompHolder';
import { PlaylistsModalCompHolder } from '@/playlists_modal/PlaylistsModalCompHolder';
import { TracksCompHolder } from '@/tracks/TracksCompHolder';
import { StringOrUndefined } from '@/types/commonTypes';
import { AsideItem } from '@/types/Data/AsideItem';
import { Track } from '@/types/Data/Track';
import { isUndefined } from '@/utils/data/typeGuards';

export type MainScreenCompHolder = TracksCompHolder | PlaylistCompHolder;

export class UIContext {
  public static get Instance() {
    if (!isUndefined(UIContext.instance)) {
      return UIContext.instance;
    }

    UIContext.instance = new UIContext();

    return UIContext.instance;
  }

  public get Track(): Track {
    if (isUndefined(this.track)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.track;
  }

  public setTrack(track: Track): void {
    this.track = track;
  }

  public get HeaderCompHolder(): HeaderCompHolder {
    if (isUndefined(this.headerCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.headerCompHolder;
  }

  public setHeaderCompHolder(headerCompHolder: HeaderCompHolder): void {
    this.headerCompHolder = headerCompHolder;
  }

  public get AsideCompHolder(): AsideCompHolder {
    if (isUndefined(this.asideCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.asideCompHolder;
  }

  public setAsideCompHolder(asideCompHolder: AsideCompHolder): void {
    this.asideCompHolder = asideCompHolder;
  }

  public get TracksCompHolder(): TracksCompHolder {
    if (isUndefined(this.tracksCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.tracksCompHolder;
  }

  public setTracksCompHolder(tracksCompHolder: TracksCompHolder): void {
    this.tracksCompHolder = tracksCompHolder;
  }

  public get PlaylistCompHolder(): PlaylistCompHolder {
    if (isUndefined(this.playlistCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playlistCompHolder;
  }

  public setPlaylistCompHolder(playlistCompHolder: PlaylistCompHolder): void {
    this.playlistCompHolder = playlistCompHolder;
  }

  public setPLModalCompHolder(
    playlistsModalCompHolder: PlaylistsModalCompHolder
  ): void {
    this.playlistsModalCompHolder = playlistsModalCompHolder;
  }

  public get AddPLModalCompHolder(): AddPLModalCompHolder {
    if (isUndefined(this.addPLModalCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.addPLModalCompHolder;
  }

  public get PLModalCompHolder(): PlaylistsModalCompHolder {
    if (isUndefined(this.playlistsModalCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playlistsModalCompHolder;
  }

  public setAddPLModalCompHolder(
    addPLModalCompHolder: AddPLModalCompHolder
  ): void {
    this.addPLModalCompHolder = addPLModalCompHolder;
  }

  public get PlayerCompHolder(): PlayerCompHolder {
    if (isUndefined(this.playerCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playerCompHolder;
  }

  public setPlayerCompHolder(playerCompHolder: PlayerCompHolder): void {
    this.playerCompHolder = playerCompHolder;
  }

  public get AsideItem(): AsideItem {
    if (isUndefined(this.asideItem)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.asideItem;
  }

  public setAsideItem(asideItem: AsideItem) {
    this.asideItem = asideItem;
  }

  public get MainScreenCompHolder(): MainScreenCompHolder {
    if (isUndefined(this.playlistCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (isUndefined(this.tracksCompHolder)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    switch (this.asideItem.asideItemKind) {
      case AsideItemKind.PlaylistsList: {
        return this.playlistCompHolder;
      }
      default: {
        return this.tracksCompHolder;
      }
    }
  }

  public get TracksAsideItem(): AsideItem {
    return {
      dataId: AsideItemProperties.tracksListId(),
      asideItemKind: AsideItemKind.Tracks,
      serverDataId: undefined,
      name: "",
    };
  }

  public get PlaylistListsAsideItem(): AsideItem {
    return {
      dataId: AsideItemProperties.playlistsListId(),
      asideItemKind: AsideItemKind.PlaylistsList,
      serverDataId: undefined,
      name: "",
    };
  }

  public get FavoritiesAsideItem(): AsideItem {
    const favoritiesList = PlaylistListManager.Instance.FavoritiesList;

    return {
      dataId: favoritiesList.dataId,
      asideItemKind: AsideItemKind.Favorites,
      serverDataId: favoritiesList.serverDataId,
      name: favoritiesList.name,
    };
  }

  public get FilterStr(): StringOrUndefined {
    return this.filterStr;
  }

  public setFilterStr(filterStr: StringOrUndefined) {
    this.filterStr = filterStr;
  }

  public get PlaylistName(): StringOrUndefined {
    return this.playlistName;
  }

  public setPlaylistName(playlistName: StringOrUndefined) {
    this.playlistName = playlistName;
  }

  public static get Processing() {
    return UIContext.processing;
  }

  public static setProcessing(value: boolean) {
    UIContext.processing = value;
  }

  private static instance?: UIContext;

  private track?: Track;

  private headerCompHolder?: HeaderCompHolder;

  private asideCompHolder?: AsideCompHolder;

  private tracksCompHolder?: TracksCompHolder;

  private playlistCompHolder?: PlaylistCompHolder;

  private playlistsModalCompHolder?: PlaylistsModalCompHolder;

  private addPLModalCompHolder?: AddPLModalCompHolder;

  private playerCompHolder?: PlayerCompHolder;

  private asideItem: AsideItem = {
    asideItemKind: AsideItemKind.Tracks,
    dataId: AsideItemProperties.tracksListId(),
    name: "",
    serverDataId: undefined,
  };

  private filterStr: StringOrUndefined = undefined;

  private playlistName: StringOrUndefined = "Треки";

  private static processing: boolean = false;
}
