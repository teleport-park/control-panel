import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { TranslateService } from '../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { BuildMenuHelper, MenuItem } from '../utils/build-menu.helper';
import { AuthService } from '../../common/auth-module/auth.service';

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
  MENU_ITEMS: MenuItem[];

  menuBuilder: BuildMenuHelper = new BuildMenuHelper(this.authService);
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
   * @param authService
   */
  constructor(
    public translateService: TranslateService,
    private cd: ChangeDetectorRef,
    public loaderService: LoaderService,
    public point: BreakpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.activeView = this.activatedRoute.snapshot.firstChild.data.title;
    const currentPath = this.activatedRoute.snapshot.firstChild.url[0].path;
    this.MENU_ITEMS = this.menuBuilder.getMenu();
    this.MENU_ITEMS.forEach((item: MenuItem) => {
      item.active = item.path.indexOf(currentPath) > -1;
    });
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
    this.router.events.pipe(
      withLatestFrom(this.point.handset),
      filter(([a, b]) => b && a instanceof NavigationEnd),
      takeUntil(this.destroyed$))
      .subscribe(() => this.sidenav.close());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
