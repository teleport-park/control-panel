import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-user-dialog',
  templateUrl: './add-or-edit-entity-dialog.component.html',
  styleUrls: ['./add-or-edit-entity-dialog.component.scss']
})
export class AddOrEditEntityDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<AddOrEditEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef._containerInstance._config.width = '850px';
  }

  /**
   * On cancel handler
   */
  dialogClose(result: any = null): void {
    this.dialogRef.close(result);
  }
}
