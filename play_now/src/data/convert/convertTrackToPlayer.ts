import { PlayerState } from '@/enums/PlayerState';
import { createTime } from '@/utils/time/createTime';

import { Player } from '../../types/Data/Player';
import { Track } from '../../types/Data/Track';

export function convertTrackToPlayer(track: Track): Player {
  const playerData: Player = {
    ...track,
    timeStart: createTime({ seconds: 0 }),
    timeEnd: track.time,
    playRangeValue: 0,
    playRangeMax: track.time.seconds,
    volumeMax: 100,
    volumeValue: 0,
    playerState: PlayerState.Idle,
    shaffleButtonEnabled: true,
    shaffleButtonClass: "",
    skipBackEnabled: true,
    skipBackButtonClass: "",
    skipNextEnabled: true,
    skipNextButtonClass: "",
    shaffle: false,
    repeat: false,
    repeatButtonClass: "",
    playerTrackLikeClass: "",
  };

  return playerData;
}
