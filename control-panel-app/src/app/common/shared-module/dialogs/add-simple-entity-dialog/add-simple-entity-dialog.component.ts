import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Permission } from '../../../../models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'control-panel-add-simple-dialog',
  templateUrl: './add-simple-entity-dialog.component.html',
  styleUrls: ['./add-simple-entity-dialog.component.scss']
})
export class AddSimpleEntityDialogComponent {

  name: FormControl;

  constructor(public dialogRef: MatDialogRef<AddSimpleEntityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { permission: Permission, mode: 'add' | 'edit' }) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.permission.name);
  }

  /**
   * On cancel handler
   */
  dialogClose(): void {
    this.data.permission.name = this.name.value;
    this.dialogRef.close(this.data);
  }
}
