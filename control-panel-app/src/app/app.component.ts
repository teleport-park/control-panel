import { Component } from '@angular/core';
import { TranslateService } from './common/translations-module';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translateService: TranslateService,
              public loaderService: LoaderService,
              private storage: StorageService) {
    this.translateService.getTranslations(storage.getValue('locale'));
  }
}
