import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";

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

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * set active child view
   * @param event
   */
  setActiveChildView(event) {
    this.activeView = event && event.TITLE ? event.TITLE : ''
  }
}
