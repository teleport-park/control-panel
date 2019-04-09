import {Component, Inject} from '@angular/core';
import {TranslateService} from './common/translations-module';
import {LoaderService} from './services/loader.service';
import {environment} from '../environments/environment';
import {AppStorageKey} from './models/app-storage-key';
import {IAppStorageInterface} from './interfaces/app-storage-interface';
import {ApiUrlBuilder} from './models/api-url-builder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translateService: TranslateService,
              public loaderService: LoaderService,
              @Inject('IAppStorageInterface') private appStorage: IAppStorageInterface
              ) {

    const storageVersion = appStorage.getValue(AppStorageKey.Version) as string;

    if (!storageVersion || storageVersion !== environment.VERSION) {
      appStorage.clearStorage();
      appStorage.setValue(AppStorageKey.Version, environment.VERSION);
    }

    const locale = appStorage.getValue(AppStorageKey.Locale, 'en');
    // todo: refactor 'locale' variable to be invariant to uppercase
    this.translateService.getTranslations(locale);
    // test example of URL builder
    /*
    const url = new ApiUrlBuilder('api/Users')
            .appendQueryParameter('a', '1')
            .appendQueryParameter('b', '2')
            .build();
    appStorage.setValue(AppStorageKey.Test, url);
    */
  }
}
