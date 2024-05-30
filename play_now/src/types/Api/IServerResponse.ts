import { ServerStatusCode } from '@/enums/ServerStatusCode';

export interface IServerStatusResponse {
  statusCode?: ServerStatusCode;
  serverStatusCode?: ServerStatusCode;
  message?: string;
}

export function isErrorResponse(
  serverResponse: IServerStatusResponse
): boolean {
  return (
    serverResponse.statusCode === ServerStatusCode.NotFound ||
    serverResponse.serverStatusCode === ServerStatusCode.SomethingWentWrong
  );
}
