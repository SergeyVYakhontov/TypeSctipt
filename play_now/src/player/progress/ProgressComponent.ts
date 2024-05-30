import { DOMContainerId } from '@/enums/DOMContainerId';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class ProgressComponent extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.PlayerProgress,
      },
      "player/progress/view.html"
    );
  }
}
