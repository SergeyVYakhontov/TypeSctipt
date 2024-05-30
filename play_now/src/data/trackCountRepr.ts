import { ErrorMessages } from '@/enums/ErrorMessages';
import { isUndefined } from '@/utils/data/typeGuards';

import { NumberOrUndefined } from '../types/commonTypes';

export class trackCountRepr {
  public static repr(trackCount: NumberOrUndefined): string {
    if (isUndefined(trackCount)) {
      return "";
    }

    const trackCountRest = trackCount % 10;

    if (11 <= trackCountRest && trackCountRest <= 19) {
      return `${trackCount} треков`;
    }

    if (trackCountRest === 0) {
      return `${trackCount} треков`;
    }

    if (trackCountRest === 1) {
      return `${trackCount} трек`;
    }

    if (trackCountRest === 2 || trackCountRest === 3 || trackCountRest === 4) {
      return `${trackCount} трека`;
    }

    if (5 <= trackCountRest && trackCountRest <= 9) {
      return `${trackCount} треков`;
    }

    throw new Error(ErrorMessages.InvalidOperation);
  }
}
