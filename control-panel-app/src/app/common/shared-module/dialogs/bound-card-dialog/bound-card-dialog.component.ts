import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StaffMember, Visitor } from '../../../../models';
import { FormControl, Validators } from '@angular/forms';

export interface BoundCardDialogData {
   user: Visitor | StaffMember;
}

@Component({
   selector: 'bound-card-dialog',
   templateUrl: './bound-card-dialog.component.html',
   styleUrls: ['./bound-card-dialog.component.scss']
})
export class BoundCardDialogComponent {

   cardNumber: FormControl = new FormControl('', [Validators.required]);

   constructor(
      public dialogRef: MatDialogRef<BoundCardDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: BoundCardDialogData) {
      dialogRef._containerInstance._config.width = '500px';
   }

   /**
    * On cancel handler
    */
   dialogSubmit(): void {
      if (this.cardNumber.invalid) {
         return;
      }
      this.dialogRef.close(this.cardNumber.value);
   }
}
