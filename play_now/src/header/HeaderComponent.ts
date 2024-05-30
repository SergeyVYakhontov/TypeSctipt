import { DOMContainerId } from '@/enums/DOMContainerId';
import { User } from '@/types/Data/User';
import { UISimpleComponent } from '@/types/UIComponents/UISimpleComponent';
import { UIData } from '@/types/UIData';

import { LogoComponent } from './logo/LogoComponent';
import { SearchComponent } from './search/SearchComponent';
import { UserComponent } from './user/UserComponent';

export class HeaderComponent extends UISimpleComponent<UIData> {
  public constructor(private readonly user: User) {
    super({ dataId: DOMContainerId.Header }, "header/view.html");

    this.logoComponent = new LogoComponent();
    this.searchComponent = new SearchComponent();
    this.userComponent = new UserComponent(this.user);
  }

  public get LogoComponent(): LogoComponent {
    return this.logoComponent;
  }

  public get SearchComponent(): SearchComponent {
    return this.searchComponent;
  }

  public get UserComponent(): UserComponent {
    return this.userComponent;
  }

  public override async injectElement(): Promise<void> {
    await super.injectElement();

    await this.logoComponent.injectElement();
    await this.searchComponent.injectElement();
    await this.userComponent.injectElement();
  }

  private readonly logoComponent: LogoComponent;

  private readonly searchComponent: SearchComponent;

  private readonly userComponent: UserComponent;
}
