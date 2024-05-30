import { ErrorMessages } from '@/enums/ErrorMessages';
import { AsideItemsModel } from '@/model/AsideItemsModel';
import { PlaylistsModel } from '@/model/PlaylistsModel';
import { TracksModel } from '@/model/TracksModel';
import { PlaylistCompHolder } from '@/playlist/PlaylistCompHolder';
import { TracksCompHolder } from '@/tracks/TracksCompHolder';
import { isUndefined } from '@/utils/data/typeGuards';

export type MainScreenCompHolder = TracksCompHolder | PlaylistCompHolder;

export class DataContext {
  public static get Instance() {
    if (!isUndefined(DataContext.instance)) {
      return DataContext.instance;
    }

    DataContext.instance = new DataContext();

    return DataContext.instance;
  }

  public get AsideItemsModel(): AsideItemsModel {
    if (isUndefined(this.asideItemsModel)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.asideItemsModel;
  }

  public setAsideItemsModel(asideItemsModel: AsideItemsModel): void {
    this.asideItemsModel = asideItemsModel;
  }

  public get TracksModel(): TracksModel {
    if (isUndefined(this.tracksModel)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.tracksModel;
  }

  public setTracksModel(tracksModel: TracksModel): void {
    this.tracksModel = tracksModel;
  }

  public get PlaylistsModel(): PlaylistsModel {
    if (isUndefined(this.playlistsModel)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playlistsModel;
  }

  public setPlaylistsModel(playlistsModel: PlaylistsModel): void {
    this.playlistsModel = playlistsModel;
  }

  private static instance?: DataContext;

  private asideItemsModel?: AsideItemsModel;

  private tracksModel?: TracksModel;

  private playlistsModel?: PlaylistsModel;
}
