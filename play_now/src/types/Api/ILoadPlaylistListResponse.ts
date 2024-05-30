import { PlaylistList } from './IPlaylist';
import { IServerStatusResponse } from './IServerResponse';

export type ILoadPlaylistListResponse = IServerStatusResponse | PlaylistList;
