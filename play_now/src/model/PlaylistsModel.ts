import { StringOrUndefined } from '@/types/commonTypes';
import { Playlist, PlaylistList } from '@/types/Data/Playlist';
import { ListModel } from '@/types/Models/ListModel';
import { isUndefined } from '@/utils/data/typeGuards';

export class PlaylistsModel extends ListModel<Playlist> {
  constructor(items: PlaylistList) {
    super(items);
  }

  public filterBy(filterStr: StringOrUndefined): PlaylistList {
    if(isUndefined(filterStr)){
      return [...this.Items];
    }

    const testExpr: RegExp = new RegExp(`${filterStr}`);

    return this.Items.filter((item: Playlist) => testExpr.test(item.name));
  }
}
