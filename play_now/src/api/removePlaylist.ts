import { ApiURLs } from '@/api/apiURLs';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AuthService } from '@/services/AuthService';
import { isErrorResponse } from '@/types/Api/IServerResponse';
import { ISongsRequest } from '@/types/Api/ISongsRequest';
import { ISongsResponse } from '@/types/Api/ISongsResponse';
import { runAxiosDelete } from '@/utils/api/runAxiosDelete';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function removePlaylist(
    playlistId: number,
  ): Promise<boolean> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosDelete<ISongsRequest, ISongsResponse>(
      ApiURLs.removePlaylist(playlistId),
      accessToken
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.RemovePlaylistsCallFailed);
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
