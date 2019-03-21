import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Group } from '../../../../models';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { AddGroupDialogComponent } from '../../../../common/shared-module/dialogs/add-group-dalog/add-group-dialog.component';

@Component({
  selector: 'control-panel-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  /**
   * columns
   */
  columns: string[] = ['name', 'permissions'];

  data: Group[];

  private destoyed$: Subject<boolean> = new Subject();

  constructor(public service: StaffService, public dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.service.permissions$.getValue().length) {
      this.service.getPermissions();
    }
  }

  addGroup() {
    const dialogInstance = this.dialog.open(AddGroupDialogComponent, {
      data: new Group()
    });
    dialogInstance.componentInstance.permissions = this.service.permissions$.getValue();
    dialogInstance.afterClosed()
      .pipe(filter(data => !!data), takeUntil(this.destoyed$))
      .subscribe((result: Group) => {
        this.service.addGroup(result);
      });
  }

  ngOnDestroy(): void {
    this.destoyed$.next(true);
    this.destoyed$.complete();
  }
}
