import { SongList } from './Song';

export type Playlist = {
  id: number;
  name: string;
  songs: SongList;
}

export type PlaylistList = Playlist[];
