import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Group, StaffMember } from '../../../../models';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { BreakpointService } from '../../../../services/breakpoint.service';
import { AddStaffDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { MatDialog, PageEvent, Sort } from '@angular/material';

import { default as config } from '../../../../../config/app-config.json';
import { AppData } from '../../../../interfaces';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { FormBuilder } from '@angular/forms';
import { GroupsService } from './groups/services/groups.service';
import { Router } from '@angular/router';
import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { StaffExtendedFiltersConfig } from './staff-extended-filters.config';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';
import { USER_SERVICE, UserService } from '../../../../models/intefaces';

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
   * displayed columns
   */
  displayedColumns: string[] = [
      'name',
      'displayName',
      'passport',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'hiredAt',
      'firedAt',
      'active',
      'highEducation',
      'roles',
      'submenu'
  ];

  /**
   * column with simple data
   */
  simpleDataColumn: string[] = ['name', 'displayName', 'passport', 'active', 'highEducation'];

  /**
   * list sorted column
   */
  sortedColumn: string[] = [];

  /**
   * available groups
   */
  groups: Group[];

  private destroyed$: Subject<boolean> = new Subject();

  /**
   * Constructor
   * @param service
   * @param cd
   * @param translateService
   * @param point
   * @param dialog
   * @param storage
   * @param fb
   * @param groupsService,
   * @param router
   * @param extendedFilterUrlBuilder
   */
  constructor(
              public cd: ChangeDetectorRef,
              public translateService: TranslateService,
              public point: BreakpointService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public groupsService: GroupsService,
              private router: Router,
              @Inject(USER_SERVICE) private service: UserService<StaffMember>,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
  }

  ngOnInit() {
    this.sortedColumn = config.staff.sortedColumns || [];
    this.service.getUsers();
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
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [`${staffMember.name}`]
      } as ConfirmDialogData,
      autoFocus: false
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.service.deleteUser(staffMember.id);
      });
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param staffMember
   */
  private showModalAddOrEditStaffMemberUser(mode: 'edit' | 'add', staffMember?: StaffMember) {
    if (mode === 'edit') {
      this.service.getUser(staffMember.id)
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
    const dialog = this.dialog.open(AddStaffDialogComponent, {
      data: {mode, item: staffMember},
      disableClose: true
    });
    dialog.afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((staff: StaffMember) => {
      if (mode === 'edit') {
        this.service.editUser(staff);
      } else {
        this.service.addUser(staff);
      }
    });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
      this.service.pagination.setPagination({limit: event.pageSize, offset: event.pageSize * event.pageIndex});
      this.service.getUsers();
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
}
