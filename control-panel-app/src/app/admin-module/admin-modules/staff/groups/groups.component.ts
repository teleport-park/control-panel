import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Group } from '../../../../models';
import { Subject } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { AddGroupDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { TranslateService } from '../../../../common/translations-module';

@Component({
  selector: 'control-panel-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  /**
   * columns
   */
  columns: string[] = ['name', 'permissions', 'submenu'];

  data: Group[];

  private destoyed$: Subject<boolean> = new Subject();

  constructor(public service: StaffService, public dialog: MatDialog, public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  openDialogGroup(mode: 'edit' | 'add', group = new Group()) {
    const dialogInstance = this.dialog.open(AddGroupDialogComponent, {
      data: {group, mode}
    });
    dialogInstance.componentInstance.permissions = this.service.permissions$.getValue();
    dialogInstance.afterClosed()
      .pipe(filter(data => !!data), takeUntil(this.destoyed$))
      .subscribe((data) => {
        if (mode === 'add') {
          this.service.addGroup(data.group);
        } else {
          this.service.editGroup(data.group);
        }
      });
  }

  /**
   * show confirm dialog
   */
  showConfirmDialog(group: Group) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [group.name]
      } as ConfirmDialogData
    }).afterClosed()
      .pipe(filter(data => data))
      .subscribe(() => {
        this.service.deleteGroup(group);
      });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    this.service.changeGroupPagination(event);
  }

  ngOnDestroy(): void {
    this.destoyed$.next(true);
    this.destoyed$.complete();
  }
}
