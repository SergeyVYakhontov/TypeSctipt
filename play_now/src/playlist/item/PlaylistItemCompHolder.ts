import { UIListItemCompHolder } from '@/types/UICompHolders/UIListItemCompHolder';
import { UIData } from '@/types/UIData';

import { PlaylistItemComponent } from './PlaylistItemComponent';

export class PlaylistItemCompHolder extends UIListItemCompHolder<
  UIData,
  PlaylistItemComponent
> {
  public constructor(itemComponent: PlaylistItemComponent) {
    super(itemComponent);
  }

  public override setupEventHandlers(): void {}
}
