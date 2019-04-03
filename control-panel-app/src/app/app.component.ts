import { Component } from '@angular/core';
import { TranslateService } from './common/translations-module';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translateService: TranslateService,
              public loaderService: LoaderService,
              private storage: StorageService) {

    console.log(environment.VERSION);
    if (!storage.getValue('VERSION') || storage.getValue('VERSION') !== environment.VERSION) {
      storage.clear();
      storage.setValue('VERSION', environment.VERSION);
    }
    this.translateService.getTranslations(storage.getValue('locale') || 'en');
  }
}
