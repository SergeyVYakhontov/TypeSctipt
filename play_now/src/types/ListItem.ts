import { NumberOrUndefined } from '@/types/commonTypes';

import { UIData } from './UIData';

export type ListItem = UIData & {
  rowIndex?: NumberOrUndefined;
  rowNumber?: NumberOrUndefined;
};
