import { ListItem } from '@/types/ListItem';

export type Playlist = ListItem & {
  serverDataId: number;
  img: string;
  name: string;
  trackCount: number;
  trackCountRepr?: string;
  trackIds: number[];
};

export type PlaylistList = Playlist[];
