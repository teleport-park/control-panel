import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Permission } from '../../../../models';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '../../../translations-module';

@Component({
  selector: 'control-panel-add-simple-dialog',
  templateUrl: './add-simple-entity-dialog.component.html',
  styleUrls: ['./add-simple-entity-dialog.component.scss']
})
export class AddSimpleEntityDialogComponent {

  name: FormControl;

  constructor(public translateService: TranslateService,
              public dialogRef: MatDialogRef<AddSimpleEntityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { permission: Permission, mode: 'add' | 'edit' }) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.permission.name, [Validators.required]);
  }

  /**
   * On cancel handler
   */
  dialogSubmit(): void {
    this.data.permission.name = this.name.value;
    this.dialogRef.close(this.data);
  }
}
