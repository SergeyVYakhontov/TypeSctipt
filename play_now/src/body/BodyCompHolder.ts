import { AsideActionsService } from '@/services/AsideActionsService';
import { TrackActionsService } from '@/services/TrackActionsService';
import { DOMContainer } from '@/types/commonTypes';
import { UISimpleCompHolder } from '@/types/UICompHolders/UISimpleCompHolder';
import { UIData } from '@/types/UIData';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { BodyComponent } from './BodyComponent';

export class BodyCompHolder extends UISimpleCompHolder<UIData, BodyComponent> {
  public constructor() {
    super(new BodyComponent());
  }

  protected override setupEventHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(
      this.uiComponent.ComponentId
    );

    domElement.addEventListener("click", async () => {
      console.log("BodyCompHolder clicked");

      TrackActionsService.Instance.hideActionsModal();
      AsideActionsService.Instance.hideActionsModal();
    });
  }
}
