import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Group, StaffMember, StaffMemberRequest } from '../../../../models';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { BreakpointService } from '../../../../services/breakpoint.service';
import {
    AddStaffDialogComponent,
    ConfirmDialogComponent,
    ConfirmDialogData,
    ControlPanelUiQuickFilterComponent
} from '../../../../common/shared-module';
import { MatDialog, MatDialogRef, Sort } from '@angular/material';

import { default as config } from '../../../../../config/app-config.json';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { StaffExtendedFiltersConfig } from './staff-extended-filters.config';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';
import { ENTITY_SERVICE, EntityService, PaginationSetting } from '../../../../models/intefaces';
import { BoundCardDialogComponent } from '../../../../common/shared-module/dialogs/bound-card-dialog/bound-card-dialog.component';
import { CardsService } from '../cards/services/cards.service';

@Component({
    selector: 'control-panel-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {

    /**
     * extended filters config
     */
    extendedFiltersConfig: ExtendedFilterFieldGroup[] = StaffExtendedFiltersConfig;

    /**
     * reset pagination
     */
    resetPagination: { reset: boolean };

    _dialog: MatDialogRef<AddStaffDialogComponent>;

    @ViewChild('quickFilter', {static: false}) quickFilter: ControlPanelUiQuickFilterComponent;

    /**
     * displayed columns
     */
    displayedColumns: string[] = [
        'name',
        'passport',
        'hired_at',
        'fired_at',
        'created_at',
        'updated_at',
        'high_education',
        'roles',
        'submenu'
    ];

    /**
     * column with simple data
     */
    simpleDataColumn: string[] = [
        'name',
        // 'display_name',
        'passport',
        'hired_at',
        'fired_at',
        'created_at',
        'updated_at',
        'high_education'
    ];

    /**
     * list sorted column
     */
    sortedColumn: string[] = [];

    /**
     * available groups
     */
    groups: Group[];

    private destroyed$: Subject<boolean> = new Subject();

    constructor(
        public cd: ChangeDetectorRef,
        public translations: TranslateService,
        public point: BreakpointService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router,
        private cardService: CardsService,
        @Inject(ENTITY_SERVICE) private service: EntityService<StaffMember>,
        @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
        @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
    }

    ngOnInit() {
        this.service.entities$.pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
            this._dialog && this._dialog.close();
        });
        this.sortedColumn = config.staff.sortedColumns || [];
        this.service.getEntities();
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
    openDialog(mode: 'edit' | 'add' | 'delete', event?: StaffMember): void {
        if (mode === 'delete') {
            this.showConfirmDialog(event);
            return;
        }
        this.showModalAddOrEditStaffMemberUser(mode, event);
    }

    /**
     * show confirm dialog
     */
    private showConfirmDialog(staffMember: StaffMember) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_CONFIRM_DELETE_STAFF_MESSAGE',
                messageParams: [staffMember.name]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .pipe(filter(data => data), takeUntil(this.destroyed$))
        .subscribe(() => {
            this.service.deleteEntity(staffMember.id);
        });
    }

    /**
     * show add or remove dialog
     * @param mode
     * @param staffMember
     */
    private showModalAddOrEditStaffMemberUser(mode: 'edit' | 'add', staffMember?: StaffMember) {
        if (mode === 'edit') {
            this.service.getEntity(staffMember.id)
            .pipe(filter(data => !!data))
            .subscribe((member: StaffMember) => {
                this.showDialog(mode, member);
            });
            return;
        }
        this.showDialog('add', new StaffMember());
    }

    /**
     * show dialog
     * @param mode
     * @param staffMember
     */
    private showDialog(mode: 'edit' | 'add', staffMember: StaffMember) {

        const request = new StaffMemberRequest(staffMember);

        this._dialog = this.dialog.open(AddStaffDialogComponent, {
            data: {mode, item: request},
            disableClose: true
        });
        this._dialog.componentInstance.save.pipe(takeUntil(this.destroyed$)).subscribe((staff: StaffMember) => {
            if (mode === 'edit') {
                this.service.editEntity(staff);
            } else {
                this.service.addEntity(staff);
            }
        });
    }

    /**
     * change page handler
     * @param event
     */
    pageChangeHandler(event: PaginationSetting): void {
        this.service.requestHelper.setPagination(event);
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    sortChangeHandler(event: Sort) {
        const sort = {};
        if (event.direction) {
            sort[event.active.replace('_at', '')] = event.direction;
        }
        this.service.requestHelper.setSorting(sort);
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    /**
     * apply extended filters
     * @param filterData
     */
    applyFilter(filterData): void {
        this.service.requestHelper.setExtendedFilterRequest(this.extendedFilterUrlBuilder.getExtendedFilterParams(filterData));
        this.service.requestHelper.filterData = filterData;
        this.service.getEntities(this.quickFilter.quickFilterValue);
    }

    boundCard(user: StaffMember) {
        this.dialog.open(BoundCardDialogComponent, {
            data: {
                user
            }
        }).afterClosed().subscribe(cardId => {
            if (cardId) {
                this.cardService.boundCard(cardId, {id: user.id, type: 'staff'});
            }
        });
    }

    ngOnDestroy(): void {
        this.service.requestHelper._query = null;
        this.service.requestHelper.resetPagination();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
