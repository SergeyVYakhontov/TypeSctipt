import { ApiURLs } from '@/api/apiURLs';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { ServerStatusCode } from '@/enums/ServerStatusCode';
import { AuthService } from '@/services/AuthService';
import { isErrorResponse } from '@/types/Api/IServerResponse';
import { ISongsRequest } from '@/types/Api/ISongsRequest';
import { ISongsResponse } from '@/types/Api/ISongsResponse';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function playlistsAddSong(
    playlistId: number,
    songId: number
  ): Promise<boolean> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosPost<ISongsRequest, ISongsResponse>(
      {},
      ApiURLs.playlistsAddSong(playlistId, songId),
      accessToken
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.AddSongCallFailed);
    }

    if (isServerResponse(responseData)) {
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.message);
      }

      if (responseData.serverStatusCode === ServerStatusCode.SongAlreadyAdded) {
        return false;
      }

      return false;
    } else {
      console.log(responseData);
      return true;
    }
  }
}
