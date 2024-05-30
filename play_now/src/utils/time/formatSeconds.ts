import { secondsInDay, secondsInHour, secondsInMinute } from '@/constants/time';
import { arrayItem } from '@/utils/array/arrayItem';

import { daysRepr } from './daysRepr';
import { hoursRepr } from './hoursRepr';
import { secondsToDHMS } from './secondsToHMS';
import { secondsToMinutes } from './secondsToMinutes';

function padSeconds(seconds: number): string {
  return String(seconds).padStart(2, "0");
}

export function formatSeconds(secondsAmount: number): string {
  if (secondsAmount < secondsInMinute) {
    return `0:${String(secondsAmount).padStart(2, "0")}`;
  } else if (secondsAmount < secondsInHour) {
    const minutes = secondsToMinutes(secondsAmount);
    const seconds = secondsAmount % secondsInMinute;

    return `${minutes}:${padSeconds(seconds)}`;
  } else if (secondsAmount < secondsInDay) {
    const hms = secondsToDHMS(secondsAmount);

    const hours = arrayItem(hms, 1);
    const minutes = arrayItem(hms, 2);
    const seconds = arrayItem(hms, 3);

    if (seconds === 0) {
      if (minutes === 0) {
        return `${hours} ${hoursRepr(hours)}`;
      } else {
        return `${hours} ${hoursRepr(hours)} ${minutes} мин`;
      }
    } else {
      return `${hours} ${hoursRepr(hours)} ${minutes} мин`;
    }
  } else {
    const hms = secondsToDHMS(secondsAmount);
    const days = arrayItem(hms, 0);

    return `${days} ${daysRepr(days)}`;
  }
}
