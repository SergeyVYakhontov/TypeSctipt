import { UIContext } from '@/context/UIContext';
import { StringOrUndefined } from '@/types/commonTypes';
import { isUndefined } from '@/utils/data/typeGuards';

import { PlaylistActionsService } from './PlaylistActionsService';
import { TrackActionsService } from './TrackActionsService';

export class HeaderActionsService {
  public static get Instance() {
    if (!isUndefined(HeaderActionsService.instance)) {
      return HeaderActionsService.instance;
    }

    HeaderActionsService.instance = new HeaderActionsService();

    return HeaderActionsService.instance;
  }

  public async clearFilterStr(): Promise<void> {
    const headerCompHolder = UIContext.Instance.HeaderCompHolder;

    UIContext.Instance.setFilterStr(undefined);
    await headerCompHolder.mount();
  }

  public async filterTracks(): Promise<void> {
    const filterStr: StringOrUndefined = UIContext.Instance.FilterStr;

    await TrackActionsService.Instance.filterItems(filterStr);
  }

  public async filterPlaylists(): Promise<void> {
    const filterStr: StringOrUndefined = UIContext.Instance.FilterStr;

    await PlaylistActionsService.Instance.filterItems(filterStr);
  }

  private static instance?: HeaderActionsService;
}
