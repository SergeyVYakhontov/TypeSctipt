import { DOMContainerId } from '@/enums/DOMContainerId';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class PlayerControlsComp extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.PlayerControls,
      },
      "player/controls/view.html"
    );
  }
}
