import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "../../../models/user.model";

@Component({
  selector: 'add-user-dialog',
  templateUrl: './add-or-edit-user-dialog.component.html',
  styleUrls: ['./add-or-edit-user-dialog.component.scss']
})
export class AddOrEditUserDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<AddOrEditUserDialogComponent>,
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
