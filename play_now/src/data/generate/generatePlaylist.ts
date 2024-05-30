import { TrackList } from '@/types/Data/Track';
import { arrayItem } from '@/utils/array/arrayItem';

export function generateTracks(allTracks: TrackList): TrackList {
  const maxCount: number = allTracks.length;
  let itemsCount: number = Math.floor(Math.random() * maxCount);
  
  let itemIndexes: number[] = Array.from(Array(allTracks.length).keys());
  const items: TrackList = [];

  while(itemIndexes.length > 0 && itemsCount > 0) {
    const randomIndex = Math.floor(Math.random() * itemIndexes.length);
    const trackIndex = arrayItem(itemIndexes, randomIndex);
    const randomItem = arrayItem(allTracks, trackIndex);

    items.push(randomItem);

    itemIndexes.splice(randomIndex, 1);
    itemsCount--;
  }

  return items;
}
