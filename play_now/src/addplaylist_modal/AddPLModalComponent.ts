import { DOMContainerId } from '@/enums/DOMContainerId';
import { AddPlaylistModal } from '@/types/Data/AddPlaylistModal';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class AddPLModalComponent extends UISimpleComponent<AddPlaylistModal> {
  public constructor() {
    super(
      { dataId: DOMContainerId.AddPlaylistModal, visible: false },
      "addplaylist_modal/view.html"
    );
  }

  public override computeProperties() {
    super.computeProperties();

    this.data.containerClassName = this.data.visible
      ? "addplaylist-modal-container show"
      : "addplaylist-modal-container";

    this.data.internalClassName = this.data.visible
      ? "addplaylist-modal show"
      : "addplaylist-modal";
  }

  public setVisible(visible: boolean): void {
    this.data.visible = visible;
  }
}
