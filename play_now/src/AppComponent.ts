import { PlaylistCompHolder } from '@/playlist/PlaylistCompHolder';
import { PlaylistsModalCompHolder } from '@/playlists_modal/PlaylistsModalCompHolder';
import { TracksCompHolder } from '@/tracks/TracksCompHolder';
import { UIDataCompHolder } from '@/types/UICompHolders/UICompHolder';

import { AddPLModalCompHolder } from './addplaylist_modal/AddPLModalCompHolder';
import { AsideCompHolder } from './aside/AsideCompHolder';
import { BodyCompHolder } from './body/BodyCompHolder';
import { DataContext } from './context/DataContext';
import { UIContext } from './context/UIContext';
import { convertPlaylistList } from './data/convert/convertPlaylists';
import { convertSongs } from './data/convert/convertSongs';
import { convertTrackToPlayer } from './data/convert/convertTrackToPlayer';
import { convertUserInfo } from './data/convert/convertUserInfo';
import { generateAsideList } from './data/generate/generateAsideList';
import { HeaderCompHolder } from './header/HeaderCompHolder';
import { AsideItemsModel } from './model/AsideItemsModel';
import { PlaylistListManager } from './model/PlaylistListManager';
import { PlaylistsModel } from './model/PlaylistsModel';
import { TracksModel } from './model/TracksModel';
import { PlayerCompHolder } from './player/PlayerCompHolder';
import { AuthService } from './services/AuthService';
import { PlayerActionsService } from './services/PlayerActionsService';
import { WebServerService } from './services/WebServerService';
import { AsideItemList } from './types/Data/AsideItem';
import { PlaylistList } from './types/Data/Playlist';
import { PlaylistsModalItemList } from './types/Data/PlaylistsModalItem';
import { TrackList } from './types/Data/Track';
import { User } from './types/Data/User';
import { arrayItem } from './utils/array/arrayItem';
import { runAsyncFuncsList } from './utils/runAsyncFuncsList';

type ComponentListItem = [UIDataCompHolder: UIDataCompHolder, mount: boolean];

export class AppComponent {
  public async createComponents() {
    const trackList: TrackList = convertSongs(
      WebServerService.Instance.SongList
    );

    const playlistList: PlaylistList = convertPlaylistList(
      WebServerService.Instance.PlaylistList
    );

    PlaylistListManager.Instance.setPlaylistList(playlistList);
    await PlaylistListManager.Instance.createFavoritiesPlaylist();
    PlaylistListManager.Instance.initPlaylistTracks(trackList);

    const asideItemList: AsideItemList = generateAsideList(
      PlaylistListManager.Instance.PlaylistList
    );

    const asideItemsModel: AsideItemsModel = new AsideItemsModel(asideItemList);
    const tracksModel: TracksModel = new TracksModel(trackList);
    const playlistsModel: PlaylistsModel = new PlaylistsModel(playlistList);

    tracksModel.sort();

    this.bodyCompHolder = new BodyCompHolder();
    const userData: User = convertUserInfo(AuthService.Instance.UserInfo);

    const headerCompHolder: HeaderCompHolder = new HeaderCompHolder(userData);
    const asideCompHolder: AsideCompHolder = new AsideCompHolder(
      asideItemsModel
    );

    const tracksCompHolder: TracksCompHolder = new TracksCompHolder(
      tracksModel
    );

    const playlistCompHolder: PlaylistCompHolder = new PlaylistCompHolder(
      playlistsModel
    );

    const playlistsModalList: PlaylistsModalItemList =
      PlaylistListManager.Instance.PlaylistsModalList;

    const playlistsModalCompHolder: PlaylistsModalCompHolder =
      new PlaylistsModalCompHolder(playlistsModalList);

    const addPLModalCompHolder: AddPLModalCompHolder =
      new AddPLModalCompHolder();

    const track0 = arrayItem(trackList, 0);
    const playerData = convertTrackToPlayer(track0);

    const playerCompHolder: PlayerCompHolder = new PlayerCompHolder(playerData);
    PlayerActionsService.Instance.setCurrentTrack(track0);

    this.components.push([headerCompHolder, true]);
    this.components.push([asideCompHolder, true]);
    this.components.push([tracksCompHolder, true]);
    this.components.push([playlistCompHolder, false]);
    this.components.push([playlistsModalCompHolder, true]);
    this.components.push([playerCompHolder, false]);

    DataContext.Instance.setAsideItemsModel(asideItemsModel);
    DataContext.Instance.setTracksModel(tracksModel);
    DataContext.Instance.setPlaylistsModel(playlistsModel);

    UIContext.Instance.setHeaderCompHolder(headerCompHolder);
    UIContext.Instance.setAsideCompHolder(asideCompHolder);
    UIContext.Instance.setTracksCompHolder(tracksCompHolder);
    UIContext.Instance.setPlaylistCompHolder(playlistCompHolder);
    UIContext.Instance.setPLModalCompHolder(playlistsModalCompHolder);
    UIContext.Instance.setAddPLModalCompHolder(addPLModalCompHolder);
    UIContext.Instance.setPlayerCompHolder(playerCompHolder);
  }

  public async render(): Promise<void> {
    await this.bodyCompHolder?.mount();

    await runAsyncFuncsList(
      this.components.filter((item) => item[1]),
      (item) => {
        return item[0].mount();
      }
    );

    PlayerActionsService.Instance.mountCurrentTrack();
  }

  private bodyCompHolder: BodyCompHolder | undefined = undefined;

  private readonly components: ComponentListItem[] = [];
}
