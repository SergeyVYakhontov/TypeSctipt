import { ApiCalls } from '@/api/apiCalls';
import { ILoginRequest } from '@/types/Api/ILoginRequest';
import { IRegisterRequest } from '@/types/Api/IRegisterRequest';
import { UserInfo } from '@/types/Api/UserInfo';
import { StringOrUndefined } from '@/types/commonTypes';
import { isUndefined } from '@/utils/data/typeGuards';

export class AuthService {
  public static get Instance() {
    if (!isUndefined(AuthService.instance)) {
      return AuthService.instance;
    }

    AuthService.instance = new AuthService();

    return AuthService.instance;
  }

  public async login(): Promise<void> {
    const userInfo: IRegisterRequest = this.UserInfo;

    const loginInfo: ILoginRequest = {
      username: userInfo.username,
      password: userInfo.password,
    };

    try {
      const access_token = await ApiCalls.login(loginInfo);
      this.accessToken = access_token;
    } catch {
      await ApiCalls.register(userInfo);
      const access_token: string = await ApiCalls.login(loginInfo);
      this.accessToken = access_token;
    }
  }

  public get UserInfo(): UserInfo {
    return {
      username: "user1",
      password: "user1",
      firstName: "Yakhontov",
      lastName: "Sergey",
    };
  }

  public get AccessToken(): StringOrUndefined {
    return this.accessToken;
  }

  private static instance?: AuthService;

  private accessToken: StringOrUndefined = undefined;
}
