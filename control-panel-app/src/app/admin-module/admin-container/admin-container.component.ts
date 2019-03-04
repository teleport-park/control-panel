import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange, MatSidenav } from "@angular/material";
import { TranslateService } from "./services/translate.service";

export interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin-contaner',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContainerComponent implements OnInit {
  /**
   * language items
   */
  languageItems: {value: string, label: string}[] = this.getLanguageItems();

  /**
   * trigger for translation pipe
   */
  t: number;

  /**
   * menu items
   */
  MENU_ITEMS: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'ADMIN_MENU_DASHBOARD',
      path: '/admin/dashboard'
    }, {
      icon: 'computer',
      label: 'ADMIN_MENU_DEVICES',
      path: '/admin/devices'
    }, {
      icon: 'people',
      label: 'ADMIN_MENU_USERS',
      path: '/admin/users'
    }
  ];
  /**
   * side nav
   */
  @ViewChild('sidenav') sidenav: MatSidenav;
  /**
   * active view
   */
  activeView: string;
  /**
   * locale
   */
  locale: string;

  constructor(public translateService: TranslateService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.translateService.locale.subscribe((locale: string) => {
      this.languageItems = this.getLanguageItems();
      this.locale = locale;
      this.t = Math.random();
      this.cd.detectChanges();
      this.cd.markForCheck();
    });
  }

  /**
   * get language items
   */
  private getLanguageItems() {
    return [
      {value: 'en', label: this.translateService.instant('en')},
      {value: 'ru', label: this.translateService.instant('ru')}
    ];
  }

  /**
   * set active child view
   * @param event
   */
  setActiveChildView(event) {
    this.activeView = event && event.TITLE ? event.TITLE : ''
  }

  /**
   * change locale
   * @param event
   */
  changeLocale(event: MatSelectChange) {
    this.translateService.getTranslations(event.value);
  }
}
