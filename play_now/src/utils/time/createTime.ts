import { secondsInDay, secondsInHour, secondsInMinute } from '@/constants/time';
import { Time } from '@/types/Data/Time';

type createTimeParams = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export function createTime({
  days,
  hours,
  minutes,
  seconds,
}: createTimeParams): Time {
  return {
    seconds:
      (days ?? 0) * secondsInDay +
      (hours ?? 0) * secondsInHour +
      (minutes ?? 0) * secondsInMinute +
      (seconds ?? 0),
  };
}
