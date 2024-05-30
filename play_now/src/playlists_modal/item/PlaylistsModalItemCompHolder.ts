//import { TrackActionsService } from '@/tracks/TrackActionsService';
import { DOMContainer, StringOrUndefined } from '@/types/commonTypes';
import { UIListItemCompHolder } from '@/types/UICompHolders/UIListItemCompHolder';
import { UIData } from '@/types/UIData';
import { isUndefined } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { PLModalActionsService } from '../../services/PLModalActionsService';
import { PlaylistsModalItemComponent } from './PlaylistsModalItemComponent';

export class PlaylistsModalItemCompHolder extends UIListItemCompHolder<
  UIData,
  PlaylistsModalItemComponent
> {
  public constructor(itemComponent: PlaylistsModalItemComponent) {
    super(itemComponent);
  }

  public override setupEventHandlers(): void {
    const elementId: StringOrUndefined = this.UiComponent.ComponentId;
    const domElement: DOMContainer = getDOMElementById(elementId);

    domElement.addEventListener("click", async () => {
      console.log(`button clicked: ${elementId}`);

      const playlistId = this.uiComponent.Data.paylistId;

      if (isUndefined(playlistId)) {
        return;
      }

      PLModalActionsService.Instance.addTrackToPlaylist(playlistId);
      PLModalActionsService.Instance.hideModal();
    });
  }
}
