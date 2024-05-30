import { AsideElemKind } from '@/enums/AsideElemKind';
import { AsideItemKind } from '@/enums/AsideItemKind';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { isUndefined } from '@/utils/data/typeGuards';

export class AsideItemProperties {
  public static tracksListId(): string {
    return "tracks_item";
  }

  public static playlistsListId(): string {
    return "playlists_list_item";
  }

  public static favoritesListId(): string {
    return "favorites_item";
  }

  public static playlistId(rowIndex?: number): string {
    if (isUndefined(rowIndex)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return `playlist_${rowIndex}`;
  }

  public static asideItemId(
    elementKind: AsideItemKind,
    rowIndex?: number
  ): string {
    switch (elementKind) {
      case AsideItemKind.Tracks: {
        return AsideItemProperties.tracksListId();
      }
      case AsideItemKind.PlaylistsList: {
        return AsideItemProperties.playlistsListId();
      }
      case AsideItemKind.Favorites: {
        return AsideItemProperties.favoritesListId();
      }
      case AsideItemKind.Playlist: {
        return AsideItemProperties.playlistId(rowIndex);
      }
      default: {
        throw new Error(ErrorMessages.InvalidOperation);
      }
    }
  }

  public static asideItemCaption(asideElemKind: AsideItemKind): string {
    switch (asideElemKind) {
      case AsideItemKind.Tracks: {
        return "Треки";
      }
      case AsideItemKind.PlaylistsList: {
        return "Плейлисты";
      }
      case AsideItemKind.Favorites: {
        return "Любимые песни";
      }
      default: {
        throw new Error(ErrorMessages.InvalidOperation);
      }
    }
  }

  public static elementId(rowIndex: number, elemKind: AsideElemKind): string {
    switch (elemKind) {
      case AsideElemKind.ActionsModal: {
        return `aside_actionsmodal_${rowIndex}`;
      }
      case AsideElemKind.DeleteBtn: {
        return `aside_deletebtn_${rowIndex}`;
      }
    }
  }
}
