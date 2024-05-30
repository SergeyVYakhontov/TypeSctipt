import { DOMContainerId } from '@/enums/DOMContainerId';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class PlayButtonComp extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.PlayerPlayStopButton,
      },
      "player/play_button/view.html"
    );
  }
}
