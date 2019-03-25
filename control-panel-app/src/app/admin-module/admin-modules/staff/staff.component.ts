import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StaffMember } from '../../../models';
import { StaffService } from './services/staff.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../common/translations-module';
import { BreakpointService } from '../../../services/breakpoint.service';
import { ConfirmDialogComponent, ConfirmDialogData, AddOrEditEntityDialogComponent } from '../../../common/shared-module';
import { MatDialog, PageEvent } from '@angular/material';

@Component({
  selector: 'control-panel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {

  /**
   * staff members
   */
  _staff: StaffMember[];

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
  listSortedColumn: string[] = ['firstName', 'lastName'];

  private destroyed$: Subject<boolean> = new Subject();

  /**
   * Constructor
   * @param service
   * @param cd
   * @param translateService
   * @param point
   * @param dialog
   */
  constructor(public service: StaffService,
              private cd: ChangeDetectorRef,
              public translateService: TranslateService,
              public point: BreakpointService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
      this.service.getStaffMembersAmount();
      this.service.getPermissions();
  }

  /**
   * open dialog
   * @param mode
   * @param event
   */
  openDialog(mode: 'edit' | 'add' | 'delete', event: StaffMember): void {
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
      } as ConfirmDialogData
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.service.removeStaffMember(staffMember);
      });
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param event
   */
  private showModalAddOrEditStaffMemberUser(mode: 'edit' | 'add' | 'delete', event) {
    this.dialog.open(AddOrEditEntityDialogComponent, {
      data: mode === 'edit' ? event : 'staffMember'
    }).afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((staffMember: StaffMember) => {
      if (mode === 'edit') {
        this.service.editStaffMember(staffMember);
      } else {
        this.service.addStaffMember(staffMember);
      }
    });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    this.service.getStaffMember(event.pageSize, event.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
