import { millesecsInSec } from '@/constants/time';
import { Time } from '@/types/Data/Time';

export function timeFromMilliseconds(milliseconds: number): Time {
  return { seconds: Math.floor(milliseconds / millesecsInSec) };
}
