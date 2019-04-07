import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { TranslateService } from '../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';

export interface MenuItem {
  icon: string;
  label: string;
  path: string;
  active: boolean;
  children?: MenuItem[];
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
      path: '/admin/dashboard',
      active: false
    }, {
      icon: 'settings',
      label: 'ADMIN_MENU_ADMINISTRATION',
      path: '/admin/administration',
      active: false,
      children: [
        {
          icon: 'code',
          label: 'GROUP_PERMISSIONS',
          path: '/admin/administration/permissions',
          active: false
        }
      ]
    },
    {
      icon: 'computer',
      label: 'ADMIN_MENU_HARDWARE',
      path: '/admin/hardware',
      active: false
    }, {
      icon: 'people',
      label: 'ADMIN_MENU_USERS',
      path: '/admin/users',
      active: false
    }, {
      icon: 'people_outline',
      label: 'ADMIN_MENU_STAFF',
      path: '/admin/staff',
      active: false,
      children: [
        {
          icon: 'group_add',
          label: 'ADMIN_MENU_GROUPS',
          path: '/admin/staff/groups',
          active: false
        }
      ]
    }, {
      icon: 'vpn_key',
      label: 'ADMIN_MENU_KEYCHAIN',
      path: '/admin/keychain',
      active: false,
      children: [{
        icon: 'credit_card',
        label: 'ADMIN_MENU_CARDS',
        path: '/admin/keychain/cards',
        active: false
      }]
    }
  ];

  /**
   * side nav
   */
  @ViewChild('sidenav') sidenav: MatSidenav;

  /**
   * active view
   */
  activeView = '';

  /**
   * constructor
   * @param translateService
   * @param cd
   * @param loaderService
   * @param point {BreakpointService}
   * @param router
   * @param activatedRoute
   */
  constructor(
    public translateService: TranslateService,
    private cd: ChangeDetectorRef,
    public loaderService: LoaderService,
    public point: BreakpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeView = this.activatedRoute.snapshot.firstChild.data.title;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
            while (route.firstChild) { route = route.firstChild; }
            return route;
          }),
      mergeMap((route) => route.data),
      takeUntil(this.destroyed$)
      ).subscribe(data => {
      this.activeView = data.title;
    });

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
