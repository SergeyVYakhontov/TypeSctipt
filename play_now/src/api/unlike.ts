import { ApiURLs } from '@/api/apiURLs';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { ServerStatusCode } from '@/enums/ServerStatusCode';
import { AuthService } from '@/services/AuthService';
import { ISongsRequest } from '@/types/Api/ISongsRequest';
import { ISongsResponse } from '@/types/Api/ISongsResponse';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function unlike(songId: number): Promise<boolean> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosPost<ISongsRequest, ISongsResponse>(
      {},
      ApiURLs.unlike(songId),
      accessToken
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.UnLikeCallFailed);
    }

    if (isServerResponse(responseData)) {
      if (
        responseData.serverStatusCode === ServerStatusCode.SomethingWentWrong
      ) {
        throw new Error(responseData.message);
      }

      return false;
    } else {
      console.log(responseData);
      return true;
    }
  }
}
