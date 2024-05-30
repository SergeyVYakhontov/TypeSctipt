import { IServerStatusResponse } from './IServerResponse';

export type ILoginResponse =
  | IServerStatusResponse
  | {
      access_token: string;
    };
