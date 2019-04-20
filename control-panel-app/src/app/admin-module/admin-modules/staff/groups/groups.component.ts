import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../../../models';
import { Subject } from 'rxjs';
import { MatDialog, PageEvent, Sort } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { AddGroupDialogComponent, ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { TranslateService } from '../../../../common/translations-module';

import { default as config } from '../../../../../app-config.json';
import { Config } from '../../../../interfaces';
import { GroupsService } from './services/groups.service';

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

  /**
   * list sorted column
   */
  sortedColumn: string[] = [];

  constructor(public service: GroupsService, public dialog: MatDialog, public translateService: TranslateService) {
  }

  ngOnInit() {
    const data = config as Config;
    this.sortedColumn = data.groups.sortedColumns || [];
  }

  openDialogGroup(mode: 'edit' | 'add', group = new Group()) {
    const dialogInstance = this.dialog.open(AddGroupDialogComponent, {
      data: {group, mode}
    });
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
      } as ConfirmDialogData,
      autoFocus: false
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
  pageChangeHandler(event: PageEvent | Sort): void {
    this.service.changeGroupSortOrPagination(event);
  }

  ngOnDestroy(): void {
    this.destoyed$.next(true);
    this.destoyed$.complete();
  }
}
