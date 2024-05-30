import { ApiCalls } from "@/api/apiCalls";
import { DataContext } from "@/context/DataContext";
import { UIContext } from "@/context/UIContext";
import { convertTrackToPlayer } from "@/data/convert/convertTrackToPlayer";
import { ErrorMessages } from "@/enums/ErrorMessages";
import { PlayerState } from "@/enums/PlayerState";
import { PlaylistListManager } from "@/model/PlaylistListManager";
import { Player } from "@/types/Data/Player";
import { Track } from "@/types/Data/Track";
import { arrayItem } from "@/utils/array/arrayItem";
import { isUndefined } from "@/utils/data/typeGuards";
import { createTime } from "@/utils/time/createTime";

import { TrackActionsService } from "./TrackActionsService";

export class PlayerActionsService {
  public static get Instance() {
    if (!isUndefined(PlayerActionsService.instance)) {
      return PlayerActionsService.instance;
    }

    PlayerActionsService.instance = new PlayerActionsService();

    return PlayerActionsService.instance;
  }

  public get CurrentTrack(): Track {
    if (isUndefined(this.track)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.track;
  }

  public setCurrentTrack(track: Track): void {
    this.track = track;
  }

  public async mountCurrentTrack(): Promise<void> {
    if (isUndefined(this.track)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    await this.resetProgress();

    let playerData = convertTrackToPlayer(this.track);
    const tracksModel = DataContext.Instance.TracksModel;

    playerData = {
      ...playerData,
      volumeValue: arrayItem(this.volumeValue, 1),
      shaffle: this.doShaffle,
      skipBackEnabled: !tracksModel.isFirstItem(this.track),
      skipNextEnabled: !tracksModel.isLastItem(this.track),
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    UIContext.Instance.PlayerCompHolder.mount();
  }

  public async mountTrack(serverId: number): Promise<void> {
    await this.resetProgress();

    this.track = PlaylistListManager.Instance.trackByServerId(serverId);
    let playerData = convertTrackToPlayer(this.track);

    const tracksModel = DataContext.Instance.TracksModel;

    if (this.playerState === PlayerState.Stop) {
      this.playerState = PlayerState.Idle;
    }

    playerData = {
      ...playerData,
      playerState: this.playerState,
      shaffle: this.doShaffle,
      volumeValue: arrayItem(this.volumeValue, 1),
      skipBackEnabled: !tracksModel.isFirstItem(this.track),
      skipNextEnabled: !tracksModel.isLastItem(this.track),
    };

    if (this.playerState === PlayerState.Play) {
      this.playTrack();
    } else {
      UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
      await UIContext.Instance.PlayerCompHolder.mount();
    }
  }

  public async mountEmptyContent(): Promise<void> {
    await this.resetProgress();
    UIContext.Instance.PlayerCompHolder.mountEmptyContent();
  }

  public async mountTrackInfo(): Promise<void> {
    if (isUndefined(this.track)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    const playerData = convertTrackToPlayer(this.track);
    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);

    await UIContext.Instance.PlayerCompHolder.mountTrackInfo();
  }

  public async shaffleTracks(): Promise<void> {
    if (this.doShaffle) {
      await TrackActionsService.Instance.shaffleTracksFrom();
    }
  }

  public playTrack() {
    if (isUndefined(this.track)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (this.playerState === PlayerState.Stop) {
      this.resumePlaying();
    } else {
      ApiCalls.songContent(this.track.path, (audioContent: ArrayBuffer) =>
        this.processAudioContent(audioContent)
      );
    }
  }

  public setSoundVolume(volume: number): void {
    this.volumeValue = [arrayItem(this.volumeValue, 1), volume];

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      volumeValue: volume,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    UIContext.Instance.PlayerCompHolder.mount();

    if (isUndefined(this.audioContext)) {
      return;
    }

    if (isUndefined(this.gainNode)) {
      return;
    }

    const piece = this.audioContext.currentTime;
    this.gainNode.gain.setValueAtTime(volume / 100.0, piece);
  }

  public toggleVolume(): void {
    let volume = 0;

    const prevVolume = arrayItem(this.volumeValue, 0);
    const currVolume = arrayItem(this.volumeValue, 1);

    if (currVolume !== 0) {
      volume = 0;
    } else {
      volume = prevVolume;
    }

    this.setSoundVolume(volume);
  }

  public async stopPlaying(): Promise<void> {
    this.playerState = PlayerState.Stop;

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      playerState: this.playerState,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    await UIContext.Instance.PlayerCompHolder.mountControls();

    await this.audioContext?.suspend();
  }

  private resumePlaying(): void {
    this.playerState = PlayerState.Play;

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      playerState: this.playerState,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    UIContext.Instance.PlayerCompHolder.mountControls();

    this.audioContext?.resume();
  }

  public toggleRepeat(): void {
    this.doRepeat = !this.doRepeat;

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      repeat: this.doRepeat,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    UIContext.Instance.PlayerCompHolder.mountControls();
  }

  public toggleShaffle(): void {
    this.doShaffle = !this.doShaffle;

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      shaffle: this.doShaffle,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    UIContext.Instance.PlayerCompHolder.mountControls();
  }

  public skipBack(): void {
    if (this.playerState !== PlayerState.Play) {
      return;
    }

    if (isUndefined(this.track)) {
      return;
    }

    const tracksModel = DataContext.Instance.TracksModel;
    const track = tracksModel.moveBack(this.track);

    if (isUndefined(track.serverDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.mountTrack(track.serverDataId);
  }

  public async skipNext(): Promise<void> {
    if (this.playerState !== PlayerState.Play) {
      return;
    }

    if (isUndefined(this.track)) {
      return;
    }

    const tracksModel = DataContext.Instance.TracksModel;
    const track = tracksModel.moveNext(this.track);

    if (isUndefined(track)) {
      let playerData: Player =
        UIContext.Instance.PlayerCompHolder.UiComponent.Data;

      playerData = {
        ...playerData,
        timeStart: createTime({ seconds: 0 }),
        playRangeValue: 0,
        playerState: this.playerState,
      };

      await this.stopPlaying();
      await this.mountCurrentTrack();

      return;
    }

    if (isUndefined(track.serverDataId)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    this.mountTrack(track.serverDataId);
  }

  private async onEnded(): Promise<void> {
    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    if (isUndefined(this.audioContext)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    if (this.audioContext.currentTime < playerData.timeEnd.seconds) {
      return;
    }

    if (this.doRepeat) {
      this.playerState = PlayerState.Idle;
      await this.resetProgress();

      playerData = {
        ...playerData,
        timeStart: createTime({ seconds: 0 }),
        playRangeValue: 0,
        playerState: this.playerState,
      };

      UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
      await UIContext.Instance.PlayerCompHolder.mountControls();
      await UIContext.Instance.PlayerCompHolder.mountProgress();

      this.playTrack();
    } else {
      this.skipNext();
    }
  }

  private async processAudioContent(audioContent: ArrayBuffer): Promise<void> {
    await this.resetProgress();

    this.audioContext = new AudioContext();
    let buffer: AudioBuffer | null = null;

    await this.audioContext.decodeAudioData(
      audioContent,
      (data) => (buffer = data)
    );

    this.gainNode = this.audioContext.createGain();

    this.trackContent = this.audioContext.createBufferSource();
    this.trackContent.buffer = buffer;

    this.trackContent
      .connect(this.gainNode)
      .connect(this.audioContext.destination);

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    this.gainNode.gain.setValueAtTime(
      playerData.volumeValue / 100.0,
      this.audioContext.currentTime
    );

    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    this.trackContent.onended = () => this.onEnded();

    this.trackContent.start();
    this.playerState = PlayerState.Play;

    playerData = {
      ...playerData,
      timeStart: createTime({ seconds: 0 }),
      playRangeValue: 0,
      playerState: this.playerState,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    await UIContext.Instance.PlayerCompHolder.mountControls();

    this.intervalID = setInterval(() => {
      if (isUndefined(this.audioContext)) {
        return;
      }

      this.showPlayProgress(this.audioContext);
    }, this.progressInterval);
  }

  private async resetProgress(): Promise<void> {
    if (!isUndefined(this.intervalID)) {
      clearInterval(this.intervalID);
    }

    this.trackContent?.stop();
    await this.audioContext?.close();

    this.trackContent = undefined;
    this.audioContext = undefined;
  }

  private async showPlayProgress(audioContext: AudioContext): Promise<void> {
    const piece = audioContext.currentTime;

    let playerData: Player =
      UIContext.Instance.PlayerCompHolder.UiComponent.Data;

    playerData = {
      ...playerData,
      timeStart: createTime({ seconds: Math.floor(piece) }),
      playRangeValue: piece,
    };

    UIContext.Instance.PlayerCompHolder.reCreateComps(playerData);
    await UIContext.Instance.PlayerCompHolder.mountProgress();
  }

  private static instance?: PlayerActionsService;

  private readonly progressInterval = 300;

  private playerState: PlayerState = PlayerState.Idle;

  private track?: Track;

  private audioContext?: AudioContext | undefined;

  private trackContent?: AudioBufferSourceNode | undefined;

  private gainNode?: GainNode;

  private volumeValue: number[] = [0, 30];

  private intervalID?: NodeJS.Timeout;

  private doRepeat: boolean = false;

  private doShaffle: boolean = false;
}
