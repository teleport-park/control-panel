import { Component } from '@angular/core';
import { TranslateService } from "./services/translate.service";
import { LoaderService } from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translateService: TranslateService, public loaderService: LoaderService) {
    this.translateService.getTranslations('en');
  }
}
