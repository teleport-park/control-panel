import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Visitor } from '../../../../models';
import { MatDialog, MatSidenavContent, PageEvent } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../../services/loader.service';
import { AddOrEditEntityDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { FormBuilder, FormControl } from '@angular/forms';
import { BreakpointService } from '../../../../services/breakpoint.service';

import { default as config } from '../../../../../config/app-config.json';
import { Config } from '../../../../interfaces';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { Router } from '@angular/router';
import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { UserExtendedFilterConfig } from './users-extended-filters.config';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';
import { PaginationSetting, USER_SERVICE, UserService } from '../../../../models/intefaces';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersComponent implements OnInit, OnDestroy {

    /**
     * extended filters config
     */
    extendedFiltersConfig: ExtendedFilterFieldGroup[] = UserExtendedFilterConfig;

    /**
     * quick filter value
     */
    quickFilter: FormControl = new FormControl('');

    /**
     * reset pagination
     */
    resetPagination: { reset: boolean };

    /**
     * view scroll container for set and store scroll position
     * @param element
     */
    @ViewChild('scrollContainer', {static: false}) set scrollContainer(element: MatSidenavContent) {
        if (element) {
            element.elementScrolled().pipe(debounceTime(1000)).subscribe((event: any) => {
            });
        }
    }

    /**
     * subject for destroy component
     */
    destroyed$: Subject<boolean> = new Subject();

    /**
     * list of displayed column
     */
    displayedColumns: string[] = [
        'name',
        'nickname',
        'displayName',
        'createdAt',
        'updatedAt',
        'gender',
        'birthyear',
        'phone',
        'comment',
        'age',
        'email',
        'submenu'
    ];

    /**
     * column with data
     */
    columnWithData: string[] = ['name', 'nickname', 'displayName', 'phone', 'age', 'email', 'gender', 'birthyear', 'comment'];

    /**
     * available to sort column
     */
    sortedColumn: string[] = [];

    /**
     * Constructor
     * @param service
     * @param cd
     * @param translateService
     * @param loaderService
     * @param dialog
     * @param point
     * @param router
     * @param storage
     * @param fb
     * @param extendedFilterUrlBuilder
     */
    constructor(
        public cd: ChangeDetectorRef,
        public translateService: TranslateService,
        private loaderService: LoaderService,
        public dialog: MatDialog,
        public point: BreakpointService,
        private router: Router,
        private fb: FormBuilder,
        @Inject(USER_SERVICE) private service: UserService<Visitor>,
        @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
        @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
    }

    /**
     * on init hook
     */
    ngOnInit() {
        this.service.getUsers();
        this.quickFilter.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.destroyed$)).subscribe((value: string) => {
            this.service.pagination.resetPagination();
            this.service.getUsers(value);
            this.resetPagination = {reset: true};
            this.cd.markForCheck();
            this.cd.detectChanges();
        });
        const data = config as Config;
        this.sortedColumn = data.users.sortedColumns || [];
    }

    /**
     * open dialog
     * @param mode
     * @param event
     */
    operationWithUser(mode: 'edit' | 'add' | 'delete', event?: Visitor): void {
        if (mode === 'delete') {
            this.showConfirmDialog(event);
            return;
        }
        this.showModalAddOrEditUser(mode, event);
    }

    /**
     * show add or remove dialog
     * @param mode
     * @param visitor
     */
    private showModalAddOrEditUser(mode: 'edit' | 'add', visitor: Visitor) {
        if (mode === 'edit') {
            this.service.getUser(visitor.id)
            .pipe(filter((data: Visitor) => !!data))
            .subscribe((user: Visitor) => {
                this.openModalDialog(mode, user);
            });
            return;
        }
        this.openModalDialog(mode, new Visitor());
    }

    /**
     * open modal dialog
     * @param mode
     * @param user
     */
    private openModalDialog(mode: 'edit' | 'add', user: Visitor) {
        this.dialog.open(AddOrEditEntityDialogComponent, {
            data: user,
            disableClose: true
        }).afterClosed()
        .pipe(filter(data => data), takeUntil(this.destroyed$))
        .subscribe((result: Visitor) => {
            if (mode === 'edit') {
                this.service.editUser(result);
            } else {
                this.service.addUser(result);
            }
        });
    }

    /**
     * show confirm dialog
     */
    private showConfirmDialog(visitor: Visitor) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_CONFIRM_MESSAGE',
                messageParams: [`${visitor.name}`]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .pipe(filter(data => data), takeUntil(this.destroyed$))
        .subscribe(() => {
            this.service.deleteUser(visitor.id);
        });
    }

    /**
     * change page handler
     * @param event
     */
    paginationChangeHandler(event: PaginationSetting): void {
        this.service.pagination.setPagination(event);
        this.service.getUsers(this.quickFilter.value);
    }

    /**
     * apply extended filters
     * @param filterData
     */
    applyFilter(filterData): void {
        console.log('[extended filter url] -> ', this.extendedFilterUrlBuilder.getExtendedFilterParams(filterData));
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    /**
     * select user
     * @param user
     */
    // selectUser(user: Visitor) {
    //     this.router.navigate(['admin', 'user-management', 'users', user.id]);
    // }
}
