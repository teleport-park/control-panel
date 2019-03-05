import { Component } from '@angular/core';
import { TranslateService } from "./admin-module/services/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translateService: TranslateService) {
    this.translateService.getTranslations('en');
  }
}
