import { DOMContainerId } from '@/enums/DOMContainerId';
import { User } from '@/types/Data/User';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';

export class UserComponent extends UISimpleComponent<User> {
  public constructor(data: User) {
    super(
      {
        ...data,
        dataId: DOMContainerId.User,
      },
      "header/user/view.html"
    );
  }
}
