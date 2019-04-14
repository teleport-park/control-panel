import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { StaffMemberResponse } from '../../../../models';
import { StaffService } from '../../../../admin-module/admin-modules/staff/services/staff.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, PageEvent } from '@angular/material';

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

  /**
   * listen enter key press to submit
   * @param event
   */
  @HostListener('document:keydown.enter', ['$event']) enterKeyEvent(event: KeyboardEvent) {
    this.onSubmitHandler();
  }

  constructor(public translateService: TranslateService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { mode: string, item: StaffMemberResponse }) {
    dialogRef._containerInstance._config.width = '500px';
  }

  ngOnInit(): void {
    this.service.getGroupMap();
    this.entityModel = this.data.item;
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
      lastName: ['', Validators.required]
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

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent) {
    this.service.getGroupMap(event.pageSize, event.pageIndex + 1);
  }

  /**
   * change group event
   * @param event
   */
  changeGroup(event) {
    this.entityModel.staffGroupId = event[0];
  }
}
