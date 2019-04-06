import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { StaffMemberResponse } from '../../../../models';
import { StaffService } from '../../../../admin-module/admin-modules/staff/services/staff.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'control-panel-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.scss']
})
export class AddStaffDialogComponent implements OnInit {

  /**
   * mode
   */
  mode = 'add';

  /**
   * service
   */
  service: StaffService;

  /**
   * model
   */
  entityModel: StaffMemberResponse;

  /**
   * form
   */
  form: FormGroup;

  /**
   * property map
   */
  propertyMap: { viewValue: string; value: number }[];

  constructor(public translateService: TranslateService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { mode: string, item: StaffMemberResponse }) {
    dialogRef._containerInstance._config.width = '500px';
  }

  ngOnInit(): void {
    this.entityModel = this.data.item;
    this.propertyMap = this.service.getGroupMap();
    this.form = this.getStaffMemberForm();
    this.form.patchValue(this.entityModel);
    this.mode = this.data.mode;
  }

  /**
   * get staff member form
   */
  private getStaffMemberForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      staffGroupId: [
        (this.entityModel.group) ? this.entityModel.group.id : 1, Validators.required]
    });
  }

  /**
   * submit handler
   */
  onSubmitHandler(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsDirty();
    });
    if (this.form.valid) {
      Object.assign(this.entityModel, this.form.getRawValue());
      this.dialogRef.close(this.entityModel);
    }
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.dialogRef.close();
  }

}
