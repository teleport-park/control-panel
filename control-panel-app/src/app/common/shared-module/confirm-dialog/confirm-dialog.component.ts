import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDialogData } from './confirm-dialog-data';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  /**
   * Constructor
   * @param dialogRef
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    dialogRef._containerInstance._config.width = '500px';
  }

  /**
   * on cancel handler
   */
  resultHandler(result?: boolean): void {
    this.dialogRef.close(result);
  }
}
