import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { StaffMember } from '../../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, PageEvent } from '@angular/material';
import moment from 'moment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
   selector: 'control-panel-add-staff-dialog',
   templateUrl: './add-staff-dialog.component.html',
   styleUrls: ['./add-staff-dialog.component.scss']
})
export class AddStaffDialogComponent implements OnInit {

   readonly separatorKeysCodes: number[] = [ENTER, COMMA];

   /**
    * mode
    */
   mode = 'add';

   /**
    * model
    */
   entityModel: StaffMember;

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
    * @param dialogRef
    * @param data
    * @param cd
    */
   constructor(public translateService: TranslateService,
               private cd: ChangeDetectorRef,
               private fb: FormBuilder,
               public dialogRef: MatDialogRef<AddStaffDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: { mode: string, item: StaffMember }) {
      dialogRef._containerInstance._config.width = '400px';
   }

   ngOnInit(): void {
      // this.service.getGroups();
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
         name: ['', Validators.required],
         passport: '',
         high_education: false,
         hired_at: ['', Validators.required],
         fired_at: ''
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
         const entity = this.form.getRawValue();
         Object.assign(this.entityModel, entity);
         this.entityModel.hired_at = moment(entity.hired_at).format('YYYY-MM-DD');
         if (entity.fired_at) {
            this.entityModel.fired_at = moment(entity.fired_at).format('YYYY-MM-DD');
         }
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
      // this.service.getGroups(event.pageSize, event.pageIndex + 1);
   }

   add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
         this.entityModel.roles.push(value.trim());
      }
      if (input) {
         input.value = '';
      }
   }

   remove(role: string): void {
      const index = this.entityModel.roles.indexOf(role);

      if (index >= 0) {
         this.entityModel.roles.splice(index, 1);
      }
   }
}
