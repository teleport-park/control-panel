import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Visitor } from '../../../../models';

import { TranslateService } from '../../../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../../services/loader.service';
import { ConfirmDialogComponent, ConfirmDialogData, ControlPanelUiQuickFilterComponent } from '../../../../common/shared-module';
import { FormBuilder } from '@angular/forms';
import { BreakpointService } from '../../../../services/breakpoint.service';

import { default as config } from '../../../../../config/app-config.json';
import { Config } from '../../../../interfaces';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { Router } from '@angular/router';
import { ExtendedConfigBuilder } from './users-extended-filters.config';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';
import { ENTITY_SERVICE, EntityService, PaginationSetting } from '../../../../models/intefaces';
import { BoundCardDialogComponent } from '../../../../common/shared-module/dialogs/bound-card-dialog/bound-card-dialog.component';
import { CardsService } from '../cards/services/cards.service';
import moment, { Moment } from 'moment';
import { InitService } from '../../../../services/init.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';

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
    extendedFiltersConfig: ExtendedConfigBuilder;

    /**
     * reset pagination
     */
    resetPagination: { reset: boolean };

    /**
     * view scroll container for set and store scroll position
     * @param element
     */
    // @ViewChild('scrollContainer') set scrollContainer(element: MatSidenavContent) {
    //     if (!element) {
    //         return;
    //     }
    //     element.elementScrolled().pipe(debounceTime(1000)).subscribe((event: any) => {
    //     });
    // }

    @ViewChild('quickFilter') quickFilter: ControlPanelUiQuickFilterComponent;

    @ViewChild('form', {static: true}) form: TemplateRef<any>;

    /**
     * subject for destroy component
     */
    destroyed$: Subject<boolean> = new Subject();

    /**
     * list of displayed column
     */
    displayedColumns: string[] = [
        'name',
        'display_name',
        'gender',
        'phone',
        'age',
        'email',
        'balance',
        'submenu'
    ];

    /**
     * column with data
     */
    columnWithData: string[] = ['name', 'nickname', 'display_name', 'phone', 'age', 'email', 'gender', 'birthyear', 'comment', ];

    /**
     * available to sort column
     */
    sortedColumn: string[] = [];

    _dialog: MatDialogRef<any>;

    _mode: 'add' | 'edit';

    constructor(
        public cd: ChangeDetectorRef,
        public translations: TranslateService,
        private loaderService: LoaderService,
        public dialog: MatDialog,
        public point: BreakpointService,
        private router: Router,
        private fb: FormBuilder,
        private cardService: CardsService,
        private initService: InitService,
        @Inject(ENTITY_SERVICE) private service: EntityService<Visitor>,
        @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
        @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
    }

    /**
     * on init hook
     */
    ngOnInit() {
        this.service.entities$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
            this._dialog && this._dialog.close();
            this._mode = null;
        });
        this.service.getEntities();
        const data = config as Config;
        this.sortedColumn = data.users.sortedColumns || [];
        this.extendedFiltersConfig = new ExtendedConfigBuilder(this.initService);
    }

    applyQuickFilter(value: string) {
        this.service.requestHelper.resetPagination();
        this.resetPagination = {reset: true};
        this.service.getEntities(value);
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

    submit(visitor: Visitor) {
        if (this._mode === 'edit') {
            this.service.editEntity(visitor);
        } else {
            this.service.addEntity(visitor);
        }
    }

    /**
     * show add or remove dialog
     * @param mode
     * @param visitor
     */
    private showModalAddOrEditUser(mode: 'edit' | 'add', visitor: Visitor) {
        this._mode = mode;
        if (mode === 'edit') {
            this.service.getEntity(visitor.id)
            .pipe(filter((data: Visitor) => !!data))
            .subscribe((user: Visitor) => {
                this.openModalDialog(user);
            });
            return;
        }
        this.openModalDialog(new Visitor());
    }

    /**
     * open modal dialog
     * @param user
     */
    private openModalDialog(user: Visitor) {
        this._dialog = this.dialog.open(this.form, {
            data: user,
            disableClose: true
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
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
            this.service.deleteEntity(visitor.id);
        });
    }

    /**
     * change page handler
     * @param event
     */
    paginationChangeHandler(event: PaginationSetting): void {
        this.service.requestHelper.setPagination(event);
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    sortChangeHandler(event: Sort) {
        const sort = {};
        if (event.direction) {
            sort[event.active] = event.direction;
        }
        this.service.requestHelper.setSorting(sort);
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    /**
     * apply extended filters
     * @param filterData
     */
    applyFilter(filterData: { reg_from: Moment, reg_to: Moment }): void {
        if (!filterData.reg_from) {
            delete filterData.reg_to;
        }
        if (filterData.reg_from && !filterData.reg_to) {
            filterData.reg_to = moment();
        }
        this.service.requestHelper.setExtendedFilterRequest(this.extendedFilterUrlBuilder.getExtendedFilterParams(filterData));
        this.service.requestHelper.filterData = filterData;
        this.resetPagination = {reset: true};
        this.service.requestHelper.resetPagination();
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    boundCard(user: Visitor) {
        this.dialog.open(BoundCardDialogComponent, {
            data: {
                user
            }
        }).afterClosed().subscribe(cardId => {
            if (cardId) {
                this.cardService.boundCard(cardId, {id: user.id, type: 'visitor'});
            }
        });
    }

    ngOnDestroy(): void {
        this.service.requestHelper._query = null;
        this.service.requestHelper.resetPagination();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    /**
     * select user
     * @param user
     */
    selectUser(user: Visitor) {
        this.router.navigate(['admin', 'park', 'visitors', user.id]);
    }
}
