import axios, { AxiosResponse, isAxiosError } from 'axios';

import { ErrorMessages } from '@/enums/ErrorMessages';

import { isUndefined } from '../data/typeGuards';
import { apiURL } from './apiURL';

export async function runAxiosPost<RequestType, ResponseType>(
  data: RequestType,
  apiPoint: string,
  accessToken?: string
): Promise<ResponseType | undefined> {
  try {
    const url = apiURL(apiPoint);
    let config = undefined;

    if (!isUndefined(accessToken)) {
      config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    const response = await axios.post<
      ResponseType,
      AxiosResponse<ResponseType>,
      RequestType
    >(url, data, config);

    return response.data;
  } catch (error: unknown) {
    console.log(error);

    if (isAxiosError(error)) {
      return error.response?.data;
    }

    throw new Error(ErrorMessages.InvalidOperation);
  }
}
