import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange, MatSidenav } from "@angular/material";
import { TranslateService } from "../services/translate.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
export class AdminContainerComponent implements OnInit, OnDestroy {

  /**
   * trigger for translation pipe
   */
  t: number;

  destroyed$: Subject<boolean> = new Subject();

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
  activeView: string = '';

  /**
   * locale
   */
  locale: string;

  /**
   * language items
   */
  languageItems: { label: string; value: string }[];

  /**
   * constructor
   * @param translateService
   * @param cd
   */
  constructor(public translateService: TranslateService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.languageItems = this.getLanguageItems();
    this.translateService.locale.pipe(takeUntil(this.destroyed$)).subscribe((locale: string) => {
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
    if (event.value !== this.translateService.locale) {
      this.translateService.getTranslations(event.value);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
