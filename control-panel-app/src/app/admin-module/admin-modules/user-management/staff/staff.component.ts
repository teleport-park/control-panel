import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { StaffMember, StaffMemberResponse } from '../../../../models';
import { StaffService } from './services/staff.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { BreakpointService } from '../../../../services/breakpoint.service';
import { AddStaffDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { MatDialog, PageEvent } from '@angular/material';

import { default as config } from '../../../../../app-config.json';
import { Config } from '../../../../interfaces';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { GroupsService } from './groups/services/groups.service';
import { Router } from '@angular/router';
import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { StaffExtendedFiltersConfig } from './staff-extended-filters.config';

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
   * max date
   */
  maxDate = moment();

  /**
   * displayed columns
   */
  displayedColumns: string[] = ['firstName', 'lastName', 'staffGroupName', 'submenu'];

  /**
   * column with simple data
   */
  simpleDataColumn: string[] = ['firstName', 'lastName', 'staffGroupName'];

  /**
   * list sorted column
   */
  sortedColumn: string[] = [];

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
   */
  constructor(public service: StaffService,
              public cd: ChangeDetectorRef,
              public translateService: TranslateService,
              public point: BreakpointService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public groupsService: GroupsService,
              private router: Router,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface) {
  }

  ngOnInit() {
    this.service.getStaffMembers();
    const data = config as Config;
    this.sortedColumn = data.staff.sortedColumns || [];
    // const groups = this.extendedFiltersConfig.find((field) => field.property === 'group');
    // if (groups) {
    //   groups.options = this.groupsService.groups$.getValue().items.map(item => ({id: item.id, label: item.name}));
    // }
  }

  /**
   * open dialog
   * @param mode
   * @param event
   */
  openDialog(mode: 'edit' | 'add' | 'delete', event: StaffMemberResponse): void {
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
        messageParams: [`${staffMember.firstName} ${staffMember.lastName}`]
      } as ConfirmDialogData,
      autoFocus: false
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.service.removeStaffMember(staffMember);
      });
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param staffMember
   */
  private showModalAddOrEditStaffMemberUser(mode: 'edit' | 'add', staffMember?: StaffMemberResponse) {
    if (mode === 'edit') {
      this.service.getStaffMember(staffMember.id)
        .pipe(filter(data => !!data))
        .subscribe((member: StaffMemberResponse) => {
          this.showDialog(mode, member);
        });
    } else {
      this.showDialog('add', new StaffMemberResponse());
    }
  }

  /**
   * show dialog
   * @param mode
   * @param staffMember
   */
  private showDialog(mode: 'edit' | 'add', staffMember: StaffMemberResponse) {
    const dialog = this.dialog.open(AddStaffDialogComponent, {
      data: {mode, item: staffMember},
      disableClose: true
    });
    dialog.afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((staff: StaffMember) => {
      if (mode === 'edit') {
        this.service.editStaffMember(staff);
      } else {
        this.service.addStaffMember(staff);
      }
    });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    this.service.changeStaffSortOrPagination(event);
  }

  selectStaffMember(staffMember: StaffMemberResponse): void {
    this.router.navigate(['admin', 'user-management', 'staff', staffMember.id]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
