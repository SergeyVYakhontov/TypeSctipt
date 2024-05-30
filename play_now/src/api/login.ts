import { ApiPoints } from '@/enums/ApiPoints';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { ILoginRequest } from '@/types/Api/ILoginRequest';
import { ILoginResponse } from '@/types/Api/ILoginResponse';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isServerResponse as isServerStatusResponse, isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function login(request: ILoginRequest): Promise<string> {
    const responseData = await runAxiosPost<ILoginRequest, ILoginResponse>(
      request,
      ApiPoints.Login
    );

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.LoginFailed);
    }

    if (isServerStatusResponse(responseData)) {
      throw new Error(responseData.message);
    } else {
      const access_token: string = responseData.access_token;
      console.log(access_token);
      return access_token;
    }
  }
}
