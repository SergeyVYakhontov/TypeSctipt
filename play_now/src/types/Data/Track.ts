import { Time } from '@/types/Data/Time';
import { ListItem } from '@/types/ListItem';

export type Track = ListItem & {
  trackId: string;
  serverDataId?: number;
  img: string;
  name: string;
  author: string;
  albom: string;
  path: string;
  time: Time;
  timeAgo: Time;
  likeDislike?: boolean;
  actionsVisible?: boolean;
  likeBtnId?: string;
  likeBtnClass?: string;
  actionsBtnId?: string;
  actionsModalId?: string;
  addBtnId?: string;
  deleteBtnId?: string;
  deleteBtnDisabled?: string;
};

export type TrackPartial = Partial<Track>;

export type TrackOrUndefined = Track | undefined;

export type TrackList = Track[];
