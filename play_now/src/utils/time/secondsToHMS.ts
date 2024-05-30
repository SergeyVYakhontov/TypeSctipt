import { secondsInDay, secondsInHour, secondsInMinute } from '@/constants/time';

export function secondsToDHMS(seconds: number) {
  return [
    Math.floor(seconds / secondsInDay),
    Math.floor(seconds / secondsInHour),
    Math.floor((seconds % secondsInHour) / secondsInMinute),
    seconds % secondsInMinute,
  ];
}
