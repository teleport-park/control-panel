import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../../../models';

@Component({
  selector: 'add-user-dialog',
  templateUrl: './add-or-edit-entity-dialog.component.html',
  styleUrls: ['./add-or-edit-entity-dialog.component.scss']
})
export class AddOrEditEntityDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<AddOrEditEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    dialogRef._containerInstance._config.width = '500px';
  }

  /**
   * On cancel handler
   */
  dialogClose(result: User = null): void {
    this.dialogRef.close(result);
  }
}
