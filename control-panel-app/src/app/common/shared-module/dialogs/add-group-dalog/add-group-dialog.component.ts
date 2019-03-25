import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Group, Permission } from '../../../../models';
import { TranslateService } from '../../../translations-module';

@Component({
  selector: 'control-panel-add-group-dalog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent {

  /**
   * name field
   */
  name: FormControl;

  /**
   * available permissions
   */
  permissions: Permission[];

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
    @Inject(MAT_DIALOG_DATA) public data: {group: Group, mode: 'add' | 'edit'}) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.group.name, [Validators.required]);
  }

  /**
   * On cancel handler
   */
  dialogSubmit(): void {
    this.data.group.name = this.name.value;
    if (!this._permissions) {
      const permission =  this.data.group.permissions as Permission[];
      this._permissions = permission.map((item: Permission) => item.id);
    }
    this.data.group.permissions = this._permissions;
    this.dialogRef.close(this.data);
  }

  /**
   * add permission handler
   * @param permissions
   */
  addPermissions(permissions) {
    this._permissions = permissions;
  }
}
