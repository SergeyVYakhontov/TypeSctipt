import { DOMContainerId } from '@/enums/DOMContainerId';
import { StringOrUndefined } from '@/types/commonTypes';
import { TracksCaption } from '@/types/Data/TracksCaption';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class CaptionComponent extends UISimpleComponent<TracksCaption> {
  public constructor() {
    super(
      {
        dataId: DOMContainerId.TracksCaption,
        caption: "",
      },
      "tracks/caption/view.html"
    );
  }

  public setCaptionName(captionName: StringOrUndefined): void {
    this.data.caption = captionName;
  }
}
