import { UserInfo } from '@/types/Api/UserInfo';
import { User } from '@/types/Data/User';

export function convertUserInfo(userInfo: UserInfo): User {
  return {
    img: "img/sergeyvy.jpg",
    name: `${userInfo.lastName} ${userInfo.firstName}`,
  };
}
