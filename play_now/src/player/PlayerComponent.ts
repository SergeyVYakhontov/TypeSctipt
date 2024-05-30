import { DOMContainerId } from '@/enums/DOMContainerId';
import { PlayerState } from '@/enums/PlayerState';
import { Player } from '@/types/Data/Player';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

import { PlayerControlsComp } from './controls/PlayerControlsComp';
import { EmptyContentComp } from './empty_content/EmptyContentComp';
import { PlayButtonComp } from './play_button/PlayButtonComp';
import { ProgressComponent } from './progress/ProgressComponent';
import { StopButtonComp } from './stop_button/StopButtonComp';
import { PlayerTrackInfoComp } from './track_info/PlayerTrackInfoComp';

export class PlayerComponent extends UISimpleComponent<Player> {
  public constructor(data: Player) {
    super(
      {
        ...data,
        dataId: DOMContainerId.Player,
      },
      "player/view.html"
    );
  }

  public override async injectElement(): Promise<void> {
    await super.injectElement();
    await this.injectTrackInfo();
    await this.injectControls();
    await this.injectProgress();
  }

  public async injectTrackInfo(): Promise<void> {
    const playerTrackInfoComp = new PlayerTrackInfoComp(this.data);
    await playerTrackInfoComp.injectElement();
  }

  public async injectControls(): Promise<void> {
    const playerControlsComp = new PlayerControlsComp(this.data);
    await playerControlsComp.injectElement();

    switch (this.data.playerState) {
      case PlayerState.Idle:
      case PlayerState.Stop: {
        const playButtonComp = new PlayButtonComp(this.data);
        await playButtonComp.injectElement();
        break;
      }
      case PlayerState.Play: {
        const stopButtonComp = new StopButtonComp(this.data);
        await stopButtonComp.injectElement();
        break;
      }
    }
  }

  public async injectProgress(): Promise<void> {
    const progressComponent = new ProgressComponent(this.data);
    await progressComponent.injectElement();
  }

  public async injectEmptyContent(): Promise<void> {
    const emptyContentComp = new EmptyContentComp();
    await emptyContentComp.injectElement();
  }

  public override computeProperties(): void {
    if (this.data.likeDislike) {
      this.data.playerTrackLikeClass = "player__track__like-active";
    } else {
      this.data.playerTrackLikeClass = "player__track__like";
    }

    if (this.data.shaffle) {
      this.data.shaffleButtonClass = "player__shaffle-btn-enabled";
    } else {
      this.data.shaffleButtonClass = "player__shaffle-btn";
    }

    if (this.data.skipBackEnabled) {
      this.data.skipBackButtonClass = "player__skipback-btn-enabled";
    } else {
      this.data.skipBackButtonClass = "player__skipback-btn";
    }

    if (this.data.skipNextEnabled) {
      this.data.skipNextButtonClass = "player__skipnext-btn-enabled";
    } else {
      this.data.skipNextButtonClass = "player__skipnext-btn";
    }

    if (this.data.repeat) {
      this.data.repeatButtonClass = "player__repeat-btn-enabled";
    } else {
      this.data.repeatButtonClass = "player__repeat-btn";
    }
  }
}
