import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { MatDialog, PageEvent } from '@angular/material';
import {
  AddSimpleEntityDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../../../common/shared-module';
import { Permission } from '../../../../models';
import { filter } from 'rxjs/operators';
import { PermissionsService } from './services/permissions.service';

@Component({
  selector: 'control-panel-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsComponent implements OnInit {

  /**
   * columns for table
   */
  columns: string[] = ['name', 'submenu'];

  constructor(public service: PermissionsService,
              public translateService: TranslateService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.service.permissions$.getValue()) {
      this.service.getPermissions();
    }
  }

  /**
   * open dialog
   * @param mode
   * @param permission
   */
  openDialog(mode: 'add' | 'edit', permission = new Permission()): void {
    this.dialog.open(AddSimpleEntityDialogComponent, {
      data: {permission, mode}
    }).afterClosed().pipe(filter(data => !!data)).subscribe((result: any) => {
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
  showConfirmDialog(permission: Permission) {
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

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    this.service.getPermissions(event.pageSize, event.pageIndex + 1);
  }

}
