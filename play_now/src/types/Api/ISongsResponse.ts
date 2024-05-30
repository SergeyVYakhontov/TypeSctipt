import { IServerStatusResponse } from './IServerResponse';
import { SongList } from './Song';

export type ISongsResponse = IServerStatusResponse | SongList;
