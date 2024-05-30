import { DOMContainerId } from '@/enums/DOMContainerId';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class StopButtonComp extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.PlayerPlayStopButton,
      },
      "player/stop_button/view.html"
    );
  }
}
