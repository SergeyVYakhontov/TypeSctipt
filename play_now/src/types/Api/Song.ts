import { Album } from './Album';
import { Artist } from './Artist';
import { LikeList } from './Like';

export type Song = {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  artist: Artist;
  album: Album;
  duration: number;
  createdAt: string;
  likes: LikeList;
}

export type SongList = Song[];
