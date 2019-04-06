import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, PageEvent } from '@angular/material';
import { Group, Permission } from '../../../../models';
import { TranslateService } from '../../../translations-module';
import { StaffService } from '../../../../admin-module/admin-modules/staff/services/staff.service';

@Component({
  selector: 'control-panel-add-group-dalog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  /**
   * name field
   */
  name: FormControl;

  /**
   * service
   */
  service: StaffService;

  /**
   * selected permissions
   */
  _permissions: any[];

  /**
   * constructor
   * @param translateService
   * @param dialogRef
   * @param data
   */
  constructor(
    public translateService: TranslateService,
    public dialogRef: MatDialogRef<AddGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: Group, mode: 'add' | 'edit' }) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.group.name, [Validators.required]);
  }

  ngOnInit(): void {
    //this.service.getPermissionsCount();
    this.service.getPermissions();
  }

  /**
   * On cancel handler
   */
  dialogSubmit(): void {
    this.data.group.name = this.name.value;
    if (!this._permissions) {
      const permission = this.data.group.permissions as Permission[];
      this._permissions = permission.map((item: Permission) => item.id);
    }
    this.data.group.permissions = this._permissions;
    this.dialogRef.close(this.data);
  }

  pageChangeHandler(event: PageEvent): void {
    this.service.getPermissions(event.pageSize, event.pageIndex + 1);
  }

  /**
   * add permission handler
   * @param permissions
   */
  addPermissions(permissions) {
    this._permissions = permissions;
  }
}
