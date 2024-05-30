import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { AsideItemKind } from '@/enums/AsideItemKind';
import { AsideItemList } from '@/types/Data/AsideItem';
import { PlaylistList } from '@/types/Data/Playlist';

export function generateAsideList(playlistList: PlaylistList): AsideItemList {
  return playlistList.map((t, _) => ({
    dataId: t.dataId,
    asideItemKind:
      t.dataId === AsideItemProperties.favoritesListId()
        ? AsideItemKind.Favorites
        : AsideItemKind.Tracks,
    serverDataId: t.serverDataId,
    name: t.name,
  }));
}
