import * as apiPlaylist from '@/types/Api/IPlaylist';
import * as dataPlaylist from '@/types/Data/Playlist';

import { generatePlaylistImg } from '../generate/generatePlaylistImg';

export function convertPlaylist(
  fromItem: apiPlaylist.Playlist
): dataPlaylist.Playlist {
  const toItem: dataPlaylist.Playlist = {
    dataId: undefined,
    serverDataId: fromItem.id,
    name: fromItem.name,
    img: generatePlaylistImg(),
    trackCount: 0,
    trackIds: fromItem.songs?.map((t) => t.id),
  };

  return toItem;
}

export function convertPlaylistList(
  itemsFromServer: apiPlaylist.PlaylistList
): dataPlaylist.PlaylistList {
  return itemsFromServer.map((fromItem) => convertPlaylist(fromItem));
}
