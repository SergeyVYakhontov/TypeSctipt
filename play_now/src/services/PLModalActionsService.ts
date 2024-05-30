import { UIContext } from '@/context/UIContext';
import { isUndefined } from '@/utils/data/typeGuards';

import { TrackActionsService } from './TrackActionsService';

export class PLModalActionsService {
  public static get Instance() {
    if (!isUndefined(PLModalActionsService.instance)) {
      return PLModalActionsService.instance;
    }

    PLModalActionsService.instance = new PLModalActionsService();

    return PLModalActionsService.instance;
  }

  public async showModal(): Promise<void> {
    UIContext.Instance.PLModalCompHolder.setVisible(true);
    UIContext.Instance.PLModalCompHolder.mount();
 }

  public async hideModal(): Promise<void> {
    UIContext.Instance.PLModalCompHolder.setVisible(false);
    UIContext.Instance.PLModalCompHolder.mount();
  }

  public async addTrackToPlaylist(playlistId: string): Promise<void> {
    await TrackActionsService.Instance.addTrack(playlistId);
  }

  private static instance?: PLModalActionsService;
}
