import { noIndex } from '@/constants/array';
import { AuthService } from '@/services/AuthService';
import { SongList } from '@/types/Api/Song';
import { Track, TrackList } from '@/types/Data/Track';
import { timeFromDateDiff } from '@/utils/time/timeFromDateDiff';
import { timeFromMilliseconds } from '@/utils/time/timeFromMilliseconds';

export function convertSongs(itemsFromServer: SongList): TrackList {
  return itemsFromServer.map((fromItem) => {
    const userName = AuthService.Instance.UserInfo.username;

    const artist = fromItem.artist;
    const album = fromItem.album;

    const createdAt = new Date(fromItem.createdAt);

    const toItem: Track = {
      trackId: `track_${fromItem.id}`,
      serverDataId: fromItem.id,
      img: fromItem.image,
      name: fromItem.name,
      path: fromItem.path,
      author: artist.name,
      albom: album.name,
      time: timeFromMilliseconds(fromItem.duration),
      timeAgo: timeFromDateDiff(new Date, createdAt),
      likeDislike: fromItem.likes.findIndex(t => t.username === userName) != noIndex
    };

    return toItem;
  });
}
