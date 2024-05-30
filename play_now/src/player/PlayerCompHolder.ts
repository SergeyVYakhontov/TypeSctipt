import { UIContext } from '@/context/UIContext';
import { PlayerState } from '@/enums/PlayerState';
import { DOMContainer } from '@/types/commonTypes';
import { Player } from '@/types/Data/Player';
import { UISimpleCompHolder } from '@/types/UICompHolders/UISimpleCompHolder';
import { UIData } from '@/types/UIData';
import { isChangeEvent, isHTMLInputElement, isNull } from '@/utils/data/typeGuards';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { PlayerActionsService } from '../services/PlayerActionsService';
import { PlayerComponent } from './PlayerComponent';

export class PlayerCompHolder extends UISimpleCompHolder<
  UIData,
  PlayerComponent
> {
  public constructor(data: Player) {
    super(new PlayerComponent(data));
  }

  public reCreateComps(playerData: Player): void {
    this.uiComponent = new PlayerComponent(playerData);
  }

  public async mountTrackInfo(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectTrackInfo();
  }

  public async mountControls(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectControls();

    this.setupPlayHandler();
    this.setupPlayerRepeatHandler();
    this.setupPlayerShaffleHandler();
    this.setupSkipBackHandler();
    this.setupSkipNextHandler();
  }

  public async mountProgress(): Promise<void> {
    this.uiComponent.computeProperties();
    await this.uiComponent.injectProgress();

    this.setupPlayerProgressClick();
  }

  public async mountEmptyContent(): Promise<void> {
    this.uiComponent.injectEmptyContent();
  }

  protected override setupEventHandlers(): void {
    this.setupPlayHandler();
    this.setupPlayerVolumeHandler();
    this.setupVolumeIconHandler();
    this.setupPlayerProgressClick();
    this.setupPlayerRepeatHandler();
    this.setupPlayerShaffleHandler();
    this.setupSkipBackHandler();
    this.setupSkipNextHandler();
  }

  private setupPlayHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playStopBtn
    );

    domElement.addEventListener("click", async () => {
      console.log(`play clicked`);

      switch (this.UiComponent.Data.playerState) {
        case PlayerState.Idle: {
          PlayerActionsService.Instance.playTrack();
          break;
        }
        case PlayerState.Play: {
          PlayerActionsService.Instance.stopPlaying();
          break;
        }
        case PlayerState.Stop: {
          PlayerActionsService.Instance.playTrack();
          break;
        }
      }
    });
  }

  private setupPlayerVolumeHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerVolume
    );

    domElement.addEventListener("change", async (event: Event) => {
      console.log(`play clicked`);

      if (isChangeEvent(event)) {
        const target: EventTarget | null = event.target;

        if (isNull(target)) {
          return;
        }

        if (isHTMLInputElement(target)) {
          PlayerActionsService.Instance.setSoundVolume(Number(target.value));
        }
      }
    });
  }

  private setupPlayerProgressClick(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerProgress
    );

    domElement.addEventListener("change", async (event: Event) => {
      console.log(`player progress clicked`);

      if (isChangeEvent(event)) {
        const target: EventTarget | null = event.target;

        if (isNull(target)) {
          return;
        }

        if (isHTMLInputElement(target)) {
          PlayerActionsService.Instance.mountCurrentTrack();
        }
      }
    });
  }

  private setupVolumeIconHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerVolumeIcon
    );

    domElement.addEventListener("click", async () => {
      console.log(`volume icon clicked`);

      PlayerActionsService.Instance.toggleVolume();
    });
  }

  private setupPlayerRepeatHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerRepeatButton
    );

    domElement.addEventListener("click", async () => {
      console.log(`repeat button clicked`);

      PlayerActionsService.Instance.toggleRepeat();
    });
  }

  private setupPlayerShaffleHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playershaffleButton
    );

    domElement.addEventListener("click", async () => {
      console.log(`shaffle button clicked`);

      PlayerActionsService.Instance.toggleShaffle();
      PlayerActionsService.Instance.shaffleTracks();
    });
  }

  private setupSkipBackHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerSkipBackButton
    );

    domElement.addEventListener("click", async () => {
      console.log(`skip back button clicked`);

      const playerData: Player =
        UIContext.Instance.PlayerCompHolder.UiComponent.Data;

      if (playerData.skipBackEnabled) {
        PlayerActionsService.Instance.skipBack();
      }
    });
  }

  private setupSkipNextHandler(): void {
    const domElement: DOMContainer = getDOMElementById(
      PlayerCompHolder.playerSkipNextButton
    );

    domElement.addEventListener("click", async () => {
      console.log(`skip next button clicked`);

      const playerData: Player =
        UIContext.Instance.PlayerCompHolder.UiComponent.Data;

      if (playerData.skipNextEnabled) {
        PlayerActionsService.Instance.skipNext();
      }
    });
  }

  private static readonly playStopBtn = "player-playstopbtn";

  private static readonly playerProgress = "player-progress";

  private static readonly playerVolume = "player-volume";

  private static readonly playerVolumeIcon = "player-volume-icon";

  private static readonly playerRepeatButton = "player-repeatbtn";

  private static readonly playershaffleButton = "player-shafflebtn";

  private static readonly playerSkipBackButton = "player-skipbackbtn";

  private static readonly playerSkipNextButton = "player-skipnextbtn";
}
