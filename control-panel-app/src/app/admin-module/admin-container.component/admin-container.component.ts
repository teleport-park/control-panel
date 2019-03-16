import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";
import { TranslateService } from "../../common/translations-module";
import { Subject } from "rxjs";
import { LoaderService } from "../../services/loader.service";
import { BreakpointService } from "../../services/breakpoint.service";

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
   * constructor
   * @param translateService
   * @param cd
   * @param loaderService
   * @param point {BreakpointService}
   */
  constructor(
    public translateService: TranslateService,
    private cd: ChangeDetectorRef,
    public loaderService: LoaderService,
    public point: BreakpointService) {
  }

  ngOnInit() {}

  /**
   * set active child view
   * @param event
   */
  setActiveChildView(event) {
    this.activeView = event && event.TITLE ? event.TITLE : ''
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
