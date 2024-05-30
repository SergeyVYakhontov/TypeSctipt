import { secondsInMinute } from '@/constants/time';

export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / secondsInMinute);
}
