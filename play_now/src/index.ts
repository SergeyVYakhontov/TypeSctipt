import { AppComponent } from '@/AppComponent';

import { AuthService } from './services/AuthService';
import { WebServerService } from './services/WebServerService';

async function runApp(): Promise<void> {
  await AuthService.Instance.login();
  await WebServerService.Instance.loadSongs();
  await WebServerService.Instance.loadPlaylists();

  const appComponent = new AppComponent();

  await appComponent.createComponents();
  appComponent.render();
}

runApp();
