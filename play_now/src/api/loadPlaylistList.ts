import { ApiPoints } from '@/enums/ApiPoints';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AuthService } from '@/services/AuthService';
import { ILoadPlaylistListRequest } from '@/types/Api/ILoadPlaylistListRequest';
import { ILoadPlaylistListResponse } from '@/types/Api/ILoadPlaylistListResponse';
import { PlaylistList } from '@/types/Api/IPlaylist';
import { isErrorResponse } from '@/types/Api/IServerResponse';
import { runAxiosGet } from '@/utils/api/runAxiosGet';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function loadPlaylistList(): Promise<PlaylistList> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosGet<
      ILoadPlaylistListRequest,
      ILoadPlaylistListResponse
    >(ApiPoints.LoadPlaylistList, accessToken);

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.LoadingPlaylistListFailed);
    }

    if (isServerResponse(responseData)) {
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.message);
      }

      return [];
    } else {
      console.log(responseData);
      return responseData;
    }
  }
}
