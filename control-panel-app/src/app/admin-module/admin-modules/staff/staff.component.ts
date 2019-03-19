import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Group, StaffMember } from '../../../models';
import { StaffService } from './services/staff.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../common/translations-module';
import { BreakpointService } from '../../../services/breakpoint.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../common/shared-module';
import { MatDialog } from '@angular/material';
import { AddOrEditEntityDialogComponent } from '../../../common/user-form';

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
  displayedColumns: string[] = ['firstName', 'lastName', 'groupDescription', 'submenu'];

  /**
   * column with simple data
   */
  simpleDataColumn: string[] = ['firstName', 'lastName', 'groupDescription'];

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
    this.service.getGroups();
    this.service.getStaffMember();
    this.service.staffMembers$.pipe(takeUntil(this.destroyed$), filter(data => !!data)).subscribe(
      (staff: StaffMember[]) => {
        this._staff = staff.map((item: StaffMember) => {
          return Object.assign(new StaffMember(), item, {groupDescription: this.getGroupDesc(item.groupId)});
        });
        this.cd.markForCheck();
      }
    );
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
        messageParams: [staffMember.firstName, staffMember.lastName]
      } as ConfirmDialogData
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        console.log('delete');
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
      console.log(staffMember);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * get group description
   * @param groupId
   */
  private getGroupDesc(groupId: number) {
    const desc = this.service.groups$.getValue().find((group: Group) => group.identity === groupId);
    return desc ? desc.description : '';
  }
}
