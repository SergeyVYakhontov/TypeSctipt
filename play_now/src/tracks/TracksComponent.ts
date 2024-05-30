import { UIContext } from '@/context/UIContext';
import { DOMContainerId } from '@/enums/DOMContainerId';
import { Track, TrackList } from '@/types/Data/Track';
import { UIListComponent } from '@/types/UIComponents/UIListComponent';
import { UIData } from '@/types/UIData';
import { runAsyncFuncsList } from '@/utils/runAsyncFuncsList';

import { CaptionComponent } from './caption/CaptionComponent';
import { EmptyContentComp } from './empty_content/EmptyContentComp';
import { TracksItemComponent } from './item/TracksItemComponent';

export class TracksComponent extends UIListComponent<
  UIData,
  Track,
  TracksItemComponent
> {
  public constructor(tracks: TrackList) {
    super(
      { dataId: DOMContainerId.Tracks },
      "tracks/view.html",
      tracks,
      DOMContainerId.TracksList
    );

    this.captionComponent = new CaptionComponent();

    tracks.forEach((item: Track) => {
      this.subComponents.push(new TracksItemComponent(item));
    });
  }

  public get CaptionComponent(): CaptionComponent {
    return this.captionComponent;
  }

  public override async injectElement(): Promise<void> {
    const playlistName = UIContext.Instance.PlaylistName;
    this.captionComponent.setCaptionName(playlistName);

    await this.injecRootElement();
    await this.captionComponent.injectElement();

    await runAsyncFuncsList(this.subComponents, (item) =>
      item.addElementToContainer()
    );
  }

  public async injectEmptyContent(): Promise<void> {
    const emptyContentComp = new EmptyContentComp();
    await emptyContentComp.injectElement();
  }

  private readonly captionComponent: CaptionComponent;
}
