import { Component } from '@angular/core';
import { TranslateService } from "./admin-module/admin-container/services/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'control-panel-app';
  constructor(public translateService: TranslateService) {
    this.translateService.getTranslations('ru');
  }
}
