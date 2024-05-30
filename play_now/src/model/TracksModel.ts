import { noIndex } from '@/constants/array';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { StringOrUndefined } from '@/types/commonTypes';
import { Track, TrackList } from '@/types/Data/Track';
import { ListModel } from '@/types/Models/ListModel';
import { arrayItem } from '@/utils/array/arrayItem';
import { shaffleArray } from '@/utils/array/shaffleArray';
import { isUndefined } from '@/utils/data/typeGuards';

export class TracksModel extends ListModel<Track> {
  constructor(items: TrackList) {
    super(items);
  }

  public filterBy(filterStr: StringOrUndefined): TrackList {
    if (isUndefined(filterStr)) {
      return [...this.Items];
    }

    const testExpr: RegExp = new RegExp(`${filterStr}`);

    return this.Items.filter(
      (item: Track) =>
        testExpr.test(item.name) ||
        testExpr.test(item.author) ||
        testExpr.test(item.albom)
    );
  }

  public sort() {
    this.items = this.Items.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  public isFirstItem(from: Track): boolean {
    const fromIdex = this.items.findIndex(
      (item) => item.serverDataId === from.serverDataId
    );

    if (fromIdex === noIndex) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return fromIdex === 0;
  }

  public isLastItem(from: Track): boolean {
    const fromIdex = this.items.findIndex(
      (item) => item.serverDataId === from.serverDataId
    );

    if (fromIdex === noIndex) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return fromIdex === this.items.length - 1;
  }

  public moveBack(from: Track): Track {
    const fromIdex = this.items.findIndex(
      (item) => item.serverDataId === from.serverDataId
    );

    if (fromIdex === noIndex) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (fromIdex === 0) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return arrayItem(this.items, fromIdex - 1);
  }

  public moveNext(from: Track): Track | undefined{
    const fromIndex = this.items.findIndex(
      (item) => item.serverDataId === from.serverDataId
    );

    if (fromIndex === noIndex) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (fromIndex === this.items.length - 1) {
      return undefined;
    }

    return arrayItem(this.items, fromIndex + 1);
  }

  public shaffleFrom(from: Track): void {
    const fromIndex = this.items.findIndex(
      (item) => item.serverDataId === from.serverDataId
    );

    if (fromIndex === noIndex) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (fromIndex === this.items.length - 1) {
      return;
    }

    let itemsHead = [...this.items];
    let itemsTail = [...this.items];

    itemsHead.splice(fromIndex + 1);
    itemsTail.splice(0, fromIndex + 1);

    itemsTail = shaffleArray(itemsTail);
    this.items = [...itemsHead, ...itemsTail];
  }

  public shaffleAll(): void {
    let allItems = [...this.items];

    allItems = shaffleArray(allItems);
    this.items = [...allItems];
  }
}
