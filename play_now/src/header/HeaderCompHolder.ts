import { UIContext } from '@/context/UIContext';
import { AsideItemKind } from '@/enums/AsideItemKind';
import { DOMContainer } from '@/types/commonTypes';
import { User } from '@/types/Data/User';
import { UISimpleCompHolder } from '@/types/UICompHolders/UISimpleCompHolder';
import { UIData } from '@/types/UIData';
import { getDOMElementById } from '@/utils/DOM/getDOMElementById';

import { HeaderActionsService } from '../services/HeaderActionsService';
import { HeaderComponent } from './HeaderComponent';

export class HeaderCompHolder extends UISimpleCompHolder<
  UIData,
  HeaderComponent
> {
  public constructor(data: User) {
    super(new HeaderComponent(data));
  }

  protected override setupEventHandlers(): void {
    const domElement: DOMContainer = getDOMElementById(
      this.uiComponent.SearchComponent.ComponentId
    );

    domElement.addEventListener("input", async (e: Event) => {
      console.log("Search input");

      if (UIContext.Processing) {
        return;
      }

      const filterStr: string = (e.target as HTMLInputElement).value;
      const asideItem = UIContext.Instance.AsideItem;

      UIContext.Instance.setFilterStr(filterStr);

      switch (asideItem.asideItemKind) {
        case AsideItemKind.PlaylistsList: {
          await HeaderActionsService.Instance.filterPlaylists();
          break;
        }
        default: {
          await HeaderActionsService.Instance.filterTracks();
          break;
        }
      }
    });
  }
}
