import { Track } from '@/types/Data/Track';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class TrackActionsModalComp extends UISimpleComponent<Track> {
  public constructor(data: Track) {
    super(
      {
        ...data,
        dataId: data.actionsModalId,
      },
      "tracks/actions_modal/view.html"
    );
  }
}
