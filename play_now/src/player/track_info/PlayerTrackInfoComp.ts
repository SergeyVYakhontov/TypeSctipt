import { DOMContainerId } from '@/enums/DOMContainerId';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class PlayerTrackInfoComp extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.PlayerTrackInfo,
      },
      "player/track_info/view.html"
    );
  }
}
