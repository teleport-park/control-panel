import { Component, Inject } from '@angular/core';
import { TranslateService } from './common/translations-module';
import { LoaderService } from './services/loader.service';
import { environment } from '../environments/environment';
import { AppStorageKey } from './models/app-storage-key';
import { IAppStorageInterface } from './interfaces/app-storage-interface';
import { IApiUrlsInterface } from './interfaces/api-urls-interface';
import { Locales } from './common/translations-module/locales.enum';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public translateService: TranslateService,
                public loaderService: LoaderService,
                @Inject('IAppStorageInterface') private appStorage: IAppStorageInterface,
                @Inject('IApiUrlsInterface') private apiUrls: IApiUrlsInterface
    ) {

        const storageVersion = appStorage.getValue(AppStorageKey.Version) as string;

        if (!storageVersion || storageVersion !== environment.VERSION) {
            appStorage.clearStorage();
            appStorage.setValue(AppStorageKey.Version, environment.VERSION);
        }

        const locale = appStorage.getValue(AppStorageKey.Locale, Locales[0]);
        // todo: refactor 'locale' variable to be invariant to uppercase
        this.translateService.getTranslations(locale);
        // const testUrl = apiUrls.getPermissionsUrl('PUT', 1);
        // appStorage.setValue(AppStorageKey.Test, testUrl);
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
