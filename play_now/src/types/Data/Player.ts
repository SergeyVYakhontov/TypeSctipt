import { PlayerState } from '@/enums/PlayerState';
import { Time } from '@/types/Data/Time';
import { Track } from '@/types/Data/Track';

export type Player = Track & {
  timeStart: Time;
  timeEnd: Time;
  playRangeValue: number;
  playRangeMax: number;
  volumeMax: number;
  volumeValue: number;
  playerState: PlayerState;
  shaffleButtonEnabled: boolean;
  shaffleButtonClass: string;
  skipBackEnabled: boolean;
  skipBackButtonClass: string;
  skipNextEnabled: boolean;
  skipNextButtonClass: string;
  shaffle: boolean;
  repeat: boolean;
  repeatButtonClass: string;
  likeDislike?: boolean;
  playerTrackLikeClass?: string;
};
