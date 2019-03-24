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

  name: FormControl;

  permissions: Permission[];

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
    this.dialogRef.close(this.data);
  }

  /**
   * add permission handler
   * @param permissions
   */
  addPermissions(permissions) {
    this.data.group.permissions = permissions;
  }
}
