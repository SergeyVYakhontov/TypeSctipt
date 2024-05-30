import { ApiPoints } from '@/enums/ApiPoints';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { ServerStatusCode } from '@/enums/ServerStatusCode';
import { AuthService } from '@/services/AuthService';
import { ISongsRequest } from '@/types/Api/ISongsRequest';
import { ISongsResponse } from '@/types/Api/ISongsResponse';
import { SongList } from '@/types/Api/Song';
import { runAxiosGet } from '@/utils/api/runAxiosGet';
import { isServerResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function songs(): Promise<SongList> {
    const accessToken = AuthService.Instance.AccessToken;

    const responseData = await runAxiosGet<ISongsRequest, ISongsResponse>(
      ApiPoints.Songs,
      accessToken
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.ReadSongsFailed);
    }

    if (isServerResponse(responseData)) {
      if (
        responseData.serverStatusCode === ServerStatusCode.SomethingWentWrong
      ) {
        throw new Error(responseData.message);
      }
      return [];
    } else {
      console.log(responseData);
      return responseData;
    }
  }
}
