import { ApiPoints } from '@/enums/ApiPoints';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { AuthService } from '@/services/AuthService';
import { ICreatePlaylistRequest } from '@/types/Api/ICreatePlaylistRequest';
import { ICreatePlaylistResponse } from '@/types/Api/ICreatePlaylistResponse';
import { Playlist } from '@/types/Api/IPlaylist';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function createPlaylist(
    data: ICreatePlaylistRequest
  ): Promise<Playlist> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosPost<
      ICreatePlaylistRequest,
      ICreatePlaylistResponse
    >(data, ApiPoints.CreatePlaylist, accessToken);

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.CreatingPlaylistFailed);
    }

    if (isServerResponse(responseData)) {
      throw new Error(responseData.message);
    } else {
      console.log(responseData);
      return responseData;
    }
  }
}
