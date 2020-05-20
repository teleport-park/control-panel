import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSidenav } from '@angular/material';
import { TranslateService } from '../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { BuildMenuHelper, MenuItem } from '../utils/build-menu.helper';
import { AuthService } from '../../common/auth-module/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { InitService } from '../../services/init.service';

@Component({
    selector: 'app-admin-contaner',
    templateUrl: './admin-container.component.html',
    styleUrls: ['./admin-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContainerComponent implements OnInit, OnDestroy {

    /**
     * destroyed subject
     */
    destroyed$: Subject<boolean> = new Subject();

    /**
     * menu items
     */
    MENU_ITEMS: MenuItem[];

    /**
     * menu builder
     */
    menuBuilder: BuildMenuHelper = new BuildMenuHelper(this.authService);
    /**
     * side nav
     */
    @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

    @ViewChild('apiUrlForm') apiUrlForm: TemplateRef<any>;

    apiUrlControl: FormControl = new FormControl(this.initService.config.api_url, Validators.required);

    _dialog: MatDialogRef<any>;

    /**
     * active view
     */
    activeView = '';

    /**
     * constructor
     * @param translations
     * @param authService
     * @param loaderService
     * @param point
     * @param cd
     * @param router
     * @param activatedRoute
     * @param initService
     * @param dialog
     */
    constructor(
        public translations: TranslateService,
        public authService: AuthService,
        public loaderService: LoaderService,
        public point: BreakpointService,
        public initService: InitService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {
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
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            mergeMap((route) => route.data),
            takeUntil(this.destroyed$)
        ).subscribe(data => {
            this.activeView = data.title;
        });
    }

    openUrlForm() {
        this.apiUrlControl.setValue(this.initService.config.api_url);
        this._dialog = this.dialog.open(this.apiUrlForm, {
            width: '400px'
        });
    }

    changeApiUrl() {
        if (this.apiUrlControl.invalid) {
            this.apiUrlControl.markAsTouched();
            return;
        }
        this._dialog.close();
        this.initService.setAPiUrl(this.apiUrlControl.value);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
