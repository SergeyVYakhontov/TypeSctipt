import { ApiURLs } from '@/api/apiURLs';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AuthService } from '@/services/AuthService';
import { isErrorResponse } from '@/types/Api/IServerResponse';
import { ISongsRequest } from '@/types/Api/ISongsRequest';
import { ISongsResponse } from '@/types/Api/ISongsResponse';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function playlistsRemoveSong(
    playlistId: number,
    songId: number
  ): Promise<boolean> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosPost<ISongsRequest, ISongsResponse>(
      {},
      ApiURLs.playlistsRemoveSong(playlistId, songId),
      accessToken
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.RemoveSongCallFailed);
    }

    if (isServerResponse(responseData)) {
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.message);
      }

      return false;
    } else {
      console.log(responseData);
      return true;
    }
  }
}
