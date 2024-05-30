import { NumberOrUndefined, StringOrUndefined } from '@/types/commonTypes';
import { ListItem } from '@/types/ListItem';

export type PlaylistsModalItem = ListItem & {
  img: StringOrUndefined;
  name: StringOrUndefined;
  paylistId: StringOrUndefined;
  trackCount: NumberOrUndefined;
  trackCountRepr: StringOrUndefined;
};

export type PlaylistsModalItemList = PlaylistsModalItem[];
