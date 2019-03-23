import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Group, Permission } from '../../../../models';

@Component({
  selector: 'control-panel-add-group-dalog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent {

  name: FormControl;

  permissions: Permission[];

  constructor(
    public dialogRef: MatDialogRef<AddGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {group: Group, mode: 'add' | 'edit'}) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.group.name);
  }

  /**
   * On cancel handler
   */
  dialogClose(): void {
    this.data.group.name = this.name.value;
    this.dialogRef.close(this.data);
  }

  addPermissions(permissions) {
    this.data.group.permissions = permissions;
  }

}
