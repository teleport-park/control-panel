import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { TranslateService } from '../../../../common/translations-module';
import { MatDialog } from '@angular/material';
import {
  AddSimpleEntityDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../../../common/shared-module';
import { Group, Permission } from '../../../../models';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'control-panel-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  columns: string[] = ['name', 'submenu'];

  constructor(public service: StaffService,
              public translateService: TranslateService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(mode: 'add' | 'edit', permission = new Permission()): void {
    this.dialog.open(AddSimpleEntityDialogComponent, {
      data: {permission, mode}
    }).afterClosed().subscribe((result: any) => {
      if (mode === 'edit') {
        this.service.editPermission(result.permission);
      } else {
        this.service.addPermission(result.permission);
      }
    });
  }

  /**
   * show confirm dialog
   */
  private showConfirmDialog(permission: Permission) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [permission.name]
      } as ConfirmDialogData
    }).afterClosed()
      .pipe(filter(data => data))
      .subscribe(() => {
        this.service.deletePermission(permission);
      });
  }

}
