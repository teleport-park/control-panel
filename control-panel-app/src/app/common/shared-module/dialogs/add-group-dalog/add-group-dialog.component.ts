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
    @Inject(MAT_DIALOG_DATA) public data: Group) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.name);
  }

  /**
   * On cancel handler
   */
  dialogClose(): void {
    this.dialogRef.close({name: this.name.value});
  }

  addPermissions(permissions) {
    console.log(permissions);
  }

}
