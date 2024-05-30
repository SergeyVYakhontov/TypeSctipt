import { isObject, isTime } from '@/utils/data/typeGuards';
import { formatSeconds } from '@/utils/time/formatSeconds';

export function fieldRepr<FieldType>(fieldValue: FieldType): string {
  if (isObject(fieldValue)) {
    if (isTime(fieldValue)) {
      return formatSeconds(fieldValue.seconds);
    }
  }

  return String(fieldValue);
}
