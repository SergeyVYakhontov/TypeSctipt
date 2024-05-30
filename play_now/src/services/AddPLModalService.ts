import { DataContext } from '@/context/DataContext';
import { UIContext } from '@/context/UIContext';
import { convertPlaylist } from '@/data/convert/convertPlaylists';
import { AsideItemProperties } from '@/data/properties/AsideItemProperties';
import { PlaylistListManager } from '@/model/PlaylistListManager';
import { Playlist } from '@/types/Data/Playlist';
import { isUndefined } from '@/utils/data/typeGuards';

import { WebServerService } from './WebServerService';

export class AddPLModalService {
  public static get Instance() {
    if (!isUndefined(AddPLModalService.instance)) {
      return AddPLModalService.instance;
    }

    AddPLModalService.instance = new AddPLModalService();

    return AddPLModalService.instance;
  }

  public async showModal(): Promise<void> {
    UIContext.Instance.AddPLModalCompHolder.setVisible(true);
    UIContext.Instance.AddPLModalCompHolder.mount();
  }

  public async hideModal(): Promise<void> {
    UIContext.Instance.AddPLModalCompHolder.setVisible(false);
    UIContext.Instance.AddPLModalCompHolder.mount();
  }

  public get InputValue(): string | null {
    return this.inputValue;
  }

  public setInputValue(inputValue: string | null): void {
    this.inputValue = inputValue;
  }

  public async addPlaylist(name: string): Promise<void> {
    const serverPlaylist = await WebServerService.Instance.createPlaylist(name);

    let toAdd: Playlist = convertPlaylist(serverPlaylist);

    toAdd = {
      ...toAdd,
      dataId: AsideItemProperties.playlistId(toAdd.serverDataId),
    };

    DataContext.Instance.PlaylistsModel.addItem(toAdd);
    PlaylistListManager.Instance.addPlaylist(toAdd);

    UIContext.Instance.AsideCompHolder.reCreateComps();
    UIContext.Instance.PLModalCompHolder.reCreateComps();
    await UIContext.Instance.AsideCompHolder.mount();
  }

  private static instance?: AddPLModalService;

  private inputValue: string | null = "";
}
