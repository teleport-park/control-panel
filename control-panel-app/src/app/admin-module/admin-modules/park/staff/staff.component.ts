import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Group, StaffMember, StaffMemberResponse } from '../../../../models';
import { StaffService } from './services/staff.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { BreakpointService } from '../../../../services/breakpoint.service';
import { AddStaffDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { MatDialog, PageEvent } from '@angular/material';

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
  displayedColumns: string[] = ['firstName', 'lastName', 'staffGroupName', 'submenu'];

  /**
   * column with simple data
   */
  simpleDataColumn: string[] = ['firstName', 'lastName', 'staffGroupName'];

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
              @Inject(USER_SERVICE) private service: UserService<any>,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
  }

  ngOnInit() {
    // this.service.getStaffMembers();
    this.sortedColumn = config.staff.sortedColumns || [];
    const groups = this.extendedFiltersConfig.find((field) => field.property === 'group');
    this.groupsService.groups$.pipe(filter(data => !!data && !!groups), takeUntil(this.destroyed$))
      .subscribe((data: AppData<Group>) => {
        this.groups = data.items;
        groups.options = this.groups.map(item => ({id: item.id, label: item.name}));
      });
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
        // this.service.removeStaffMember(staffMember);
      });
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param staffMember
   */
  private showModalAddOrEditStaffMemberUser(mode: 'edit' | 'add', staffMember?: StaffMemberResponse) {
    if (mode === 'edit') {
      // this.service.getStaffMember(staffMember.id)
      //   .pipe(filter(data => !!data))
      //   .subscribe((member: StaffMemberResponse) => {
      //     this.showDialog(mode, member);
      //   });
      // return;
    }
    this.showDialog('add', new StaffMemberResponse());
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
        // this.service.editStaffMember(staff);
      } else {
        // this.service.addStaffMember(staff);
      }
    });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    // this.service.changeStaffSortOrPagination(event);
  }

  /**
   * select staff member
   * @param staffMember
   */
  selectStaffMember(staffMember: StaffMemberResponse): void {
    this.router.navigate(['admin', 'staff', staffMember.id]);
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
