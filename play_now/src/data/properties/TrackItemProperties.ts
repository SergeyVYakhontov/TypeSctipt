import { TrackElemKind } from '@/enums/TrackElemKind';

export class TrackItemProperties {
  public static elementId(rowIndex: number, elemKind: TrackElemKind): string {
    switch (elemKind) {
      case TrackElemKind.Track: {
        return `track_${rowIndex}`;
      }
      case TrackElemKind.LikeBtn: {
        return `tr_likebtn_${rowIndex}`;
      }
      case TrackElemKind.ActionsBtn: {
        return `tr_actionsbtn_${rowIndex}`;
      }
      case TrackElemKind.ActionsModal: {
        return `tr_actionsmodal_${rowIndex}`;
      }
      case TrackElemKind.AddBtn: {
        return `tr_addbtn_${rowIndex}`;
      }
      case TrackElemKind.DeleteBtn: {
        return `tr_deletebtn_${rowIndex}`;
      }
    }
  }
}
