import { ApiPoints } from '@/enums/ApiPoints';
import { ErrorMessages } from '@/enums/ErrorMessages';
import { IRegisterRequest } from '@/types/Api/IRegisterRequest';
import { IRegisterResponse } from '@/types/Api/IRegisterResponse';
import { isErrorResponse } from '@/types/Api/IServerResponse';
import { runAxiosPost } from '@/utils/api/runAxiosPost';
import { isUndefined } from '@/utils/data/typeGuards';

export namespace ApiCalls {
  export async function register(request: IRegisterRequest): Promise<void> {
    const responseData = await runAxiosPost<
      IRegisterRequest,
      IRegisterResponse
    >(request, ApiPoints.Register);

    if (isUndefined(responseData)) {
      throw new Error(ErrorMessages.RegisterFailed);
    }

    if (isErrorResponse(responseData)) {
      throw new Error(responseData.message);
    }
  }
}
