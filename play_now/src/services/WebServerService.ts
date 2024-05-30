import { ApiCalls } from '@/api/apiCalls';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { Playlist, PlaylistList } from '@/types/Api/IPlaylist';
import { SongList } from '@/types/Api/Song';
import { isUndefined } from '@/utils/data/typeGuards';

export class WebServerService {
  public static get Instance() {
    if (!isUndefined(WebServerService.instance)) {
      return WebServerService.instance;
    }

    WebServerService.instance = new WebServerService();

    return WebServerService.instance;
  }

  public async loadSongs(): Promise<void> {
    const songs = await ApiCalls.songs();
    this.songList = songs;
  }

  public async likeSong(serviceDataId: number): Promise<boolean> {
    return await ApiCalls.like(serviceDataId);
  }

  public async unlikeSong(serviceDataId: number): Promise<boolean> {
    return await ApiCalls.unlike(serviceDataId);
  }

  public async addSong(
    playlistId: number,
    serviceDataId: number
  ): Promise<boolean> {
    return await ApiCalls.playlistsAddSong(playlistId, serviceDataId);
  }

  public async removeSong(
    playlistId: number,
    songId: number
  ): Promise<boolean> {
    return await ApiCalls.playlistsRemoveSong(playlistId, songId);
  }

  public async loadPlaylists(): Promise<void> {
    const playlistList = await ApiCalls.loadPlaylistList();
    this.playlistList = playlistList;
  }

  public async removePlaylist(
    playlistId: number,
  ): Promise<void> {
    await ApiCalls.removePlaylist(playlistId);
  }

  public async createPlaylist(name: string): Promise<Playlist> {
    return await ApiCalls.createPlaylist({ name: name });
  }

  public get SongList(): SongList {
    if (isUndefined(this.songList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.songList;
  }

  public get PlaylistList(): PlaylistList {
    if (isUndefined(this.playlistList)) {
      throw new Error(ErrorMessages.InvalidOperation);
    }

    return this.playlistList;
  }

  private static instance?: WebServerService;

  private songList?: SongList;

  private playlistList?: PlaylistList;
}
