import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { StaffMemberResponse } from '../../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef, PageEvent } from '@angular/material';
import { DataService } from '../../../../services/data.service';
import moment from 'moment';
import { SelectionTableModelItem } from '../../control-panel-ui-selection-table/control-panel-ui-selection-table.model';

@Component({
  selector: 'control-panel-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.scss']
})
export class AddStaffDialogComponent implements OnInit {
  /**
   * max date today
   */
  maxDate = moment();

  /**
   * mode
   */
  mode = 'add';

  groupEditState = false;

  /**
   * model
   */
  entityModel: StaffMemberResponse;

  /**
   * form
   */
  form: FormGroup;

  /**
   * listen enter key press to submit
   * @param event
   */
  @HostListener('document:keydown.enter', ['$event']) enterKeyEvent(event: KeyboardEvent) {
    this.onSubmitHandler();
  }

  /**
   * constructor
   * @param translateService
   * @param fb
   * @param service
   * @param dialogRef
   * @param data
   * @param cd
   */
  constructor(public translateService: TranslateService,
              private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              public service: DataService,
              public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { mode: string, item: StaffMemberResponse }) {
    dialogRef._containerInstance._config.width = '400px';
  }

  ngOnInit(): void {
    this.service.getGroups();
    this.entityModel = this.data.item;
    this.form = this.getStaffMemberForm();
    this.form.patchValue(this.entityModel);
    this.mode = this.data.mode;
    moment.locale(this.translateService.locale.getValue());
  }

  /**
   * get staff member form
   */
  private getStaffMemberForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      passport: ['', Validators.required],
      employmentDate: ['', Validators.required],
      firingDate: '',
      higherEducation: '',
      fired: '',
      isEnabled: ''
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
    this.service.getGroups(event.pageSize, event.pageIndex + 1);
  }

  /**
   * change group event
   * @param event
   */
  changeGroup(event: SelectionTableModelItem) {
    this.entityModel.staffGroupId = event[0].id;
    this.entityModel.staffGroupName = event[0].name;
    this.entityModel.group = event[0];
    this.data.item.group = event[0];
    this.cd.markForCheck();
  }

  /**
   * fire
   * @param event
   */
  fire(event: MatCheckboxChange) {
    this.entityModel.dismiss(event.checked);
  }

  editGroup(edit: boolean): void {
    this.groupEditState = edit;
    this.dialogRef.updateSize(edit ? '750px' : '500px');
  }
}
