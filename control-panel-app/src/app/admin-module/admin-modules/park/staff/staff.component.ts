import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StaffMember, StaffMemberRequest } from '../../../../models';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { BreakpointService } from '../../../../services/breakpoint.service';
import {
  AddStaffDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData,
  ControlPanelUiQuickFilterComponent
} from '../../../../common/shared-module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
// @ts-ignore
import config from '../../../../../config/app-config.json';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { StaffExtendedFiltersConfig } from './staff-extended-filters.config';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';
import { ENTITY_SERVICE, EntityService, PaginationSetting } from '../../../../models/intefaces';
import { BoundCardDialogComponent } from '../../../../common/shared-module/dialogs/bound-card-dialog/bound-card-dialog.component';
import { CardsService } from '../cards/services/cards.service';
import { Bind } from '../common/bind.class';

@Component({
  selector: 'control-panel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent extends Bind implements OnInit, OnDestroy {

  /**
   * extended filters config
   */
  extendedFiltersConfig: ExtendedFilterFieldGroup[] = StaffExtendedFiltersConfig;

  /**
   * reset pagination
   */
  resetPagination: { reset: boolean };

  _dialog: MatDialogRef<AddStaffDialogComponent>;

  @ViewChild('quickFilter') quickFilter: ControlPanelUiQuickFilterComponent;

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

  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    public cd: ChangeDetectorRef,
    public translations: TranslateService,
    public point: BreakpointService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    public cardService: CardsService,
    @Inject(ENTITY_SERVICE) public service: EntityService<StaffMember>,
    @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
    @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
    super(dialog, cardService)
  }

  ngOnInit() {
    this.service.entities$.pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
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
        delete staff.id;
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

  // bindCard(user: StaffMember) {
  //   this.dialog.open(BoundCardDialogComponent, {
  //     data: {
  //       user
  //     }
  //   }).afterClosed()
  //     .pipe(
  //       mergeMap((cardId: string) => {
  //         return this.dialog.open(ConfirmDialogComponent, {
  //           data: {
  //             title: 'DIALOG_CONFIRM_TITLE',
  //             message: 'DIALOG_BIND_CARD_CONFIRM_MESSAGE',
  //             messageParams: [cardId, user.display_name]
  //           },
  //           disableClose: true
  //         }).afterClosed().pipe(
  //           filter(data => !!data),
  //           map(_ => cardId)
  //         )
  //       })
  //     )
  //     .subscribe((cardId: string) => {
  //       if (cardId) {
  //         this.cardService.bindCard(cardId, {id: user.id, type: 'staff'});
  //       }
  //     });
  // }

  ngOnDestroy(): void {
    this.service.requestHelper._query = null;
    this.service.requestHelper.resetPagination();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
