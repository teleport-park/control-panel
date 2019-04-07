import {Component} from '@angular/core';
import {TranslateService} from './common/translations-module';
import {LoaderService} from './services/loader.service';
import {StorageService} from './services/storage.service';
import {environment} from '../environments/environment';
import {AppStorageKey} from './models/app-storage-key';
import {AppStorageService} from './services/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translateService: TranslateService,
              public loaderService: LoaderService,
              private storage: StorageService,
              private  appStorage: AppStorageService
              ) {

    const storageVersion = appStorage.getValue(AppStorageKey.Version) as string;

    if (!storageVersion || storageVersion !== environment.VERSION) {
      appStorage.clearStorage();
      appStorage.setValue(AppStorageKey.Version, environment.VERSION);
    }

    // todo: refactor 'locale' variable & change injection to IAppStorageInterface
    this.translateService.getTranslations(storage.getValue('locale') || 'en');
  }
}
