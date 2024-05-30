import { UIContext } from '@/context/UIContext';
import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { DOMContainerId } from '@/enums/DOMContainerId';
import { TrackElemKind } from '@/enums/TrackElemKind';
import { Track } from '@/types/Data/Track';
import { UIListItemComponent } from '@/types/UIComponents/UIListItemComponent';
import { arrayItem } from '@/utils/array/arrayItem';

import { TrackItemProperties } from '../../data/properties/TrackItemProperties';
import { TrackActionsModalComp } from '../actions_modal/TrackActionsModalComp';

export class TracksItemComponent extends UIListItemComponent<Track> {
  public constructor(data: Track) {
    super(data, "tracks/item/view.html", DOMContainerId.TracksList);
  }

  public override async addElementToContainer(): Promise<void> {
    await super.addElementToContainer();

    const trackActionsModalComp: TrackActionsModalComp =
      new TrackActionsModalComp(this.data);

    if (this.data.actionsVisible) {
      await trackActionsModalComp.injectElement();
    }
  }

  public override async injectElement(): Promise<void> {
    await super.injectElement();

    if (this.data.actionsVisible) {
      const trackActionsModalComp: TrackActionsModalComp =
        new TrackActionsModalComp(this.data);

      await trackActionsModalComp.injectElement();
    }
  }

  public override computeProperties() {
    this.data.rowIndex = this.index;
    this.data.rowNumber = this.index + 1;

    this.data.dataId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.Track
    );

    this.data.likeBtnId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.LikeBtn
    );

    this.data.likeBtnClass = this.data.likeDislike
      ? arrayItem(this.likeBtnClass, 1)
      : arrayItem(this.likeBtnClass, 0);

    this.data.actionsBtnId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.ActionsBtn
    );

    this.data.actionsModalId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.ActionsModal
    );

    this.data.addBtnId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.AddBtn
    );

    this.data.deleteBtnId = TrackItemProperties.elementId(
      this.data.rowIndex,
      TrackElemKind.DeleteBtn
    );

    this.data.deleteBtnDisabled =
      UIContext.Instance.AsideItem.dataId ===
      AsideItemProperties.tracksListId()
        ? "disabled"
        : "";
  }

  private readonly likeBtnClass: string[] = ["", "like-btn--active"];
}
