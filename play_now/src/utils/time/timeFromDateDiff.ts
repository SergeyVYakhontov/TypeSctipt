import { Time } from '@/types/Data/Time';

export function timeFromDateDiff(to: Date, from: Date): Time {
  const secondsDiff = to.getTime() - from.getTime();

  return { seconds: Math.floor(secondsDiff / 1000) };
}
