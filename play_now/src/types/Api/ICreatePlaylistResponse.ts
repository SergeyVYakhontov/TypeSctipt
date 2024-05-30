import { Playlist } from './IPlaylist';
import { IServerStatusResponse } from './IServerResponse';

export type ICreatePlaylistResponse = IServerStatusResponse | Playlist;
