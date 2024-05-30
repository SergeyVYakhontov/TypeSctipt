import { AsideItemKind } from '@/enums/AsideItemKind';
import { ListItem } from '@/types/ListItem';

export type AsideItem = ListItem & {
  asideItemKind: AsideItemKind;
  serverDataId: number | undefined;
  name: string;
  actionsVisible?: boolean;
  actionsModalId?: string;
  deleteBtnId?: string;
};

export type AsideItemPartial = Partial<AsideItem>;

export type AsideItemList = AsideItem[];
