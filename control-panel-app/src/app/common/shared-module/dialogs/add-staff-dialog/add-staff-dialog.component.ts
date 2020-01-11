import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { StaffMember } from '../../../../models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MatFormField, PageEvent } from '@angular/material';
import moment from 'moment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
   selector: 'control-panel-add-staff-dialog',
   templateUrl: './add-staff-dialog.component.html',
   styleUrls: ['./add-staff-dialog.component.scss']
})
export class AddStaffDialogComponent implements OnInit {

   @ViewChild('rolesRef', {static: false}) rolesRef: MatFormField;

   readonly separatorKeysCodes: number[] = [ENTER, COMMA];

   roles: string[] = ['operator', 'admin', 'super', 'cashier'];

   rolesEmpty: boolean = false;

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
      this.entityModel.roles.forEach(role => {
         this.roles = this.roles.filter(r => r !== role);
      });
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
         if (!this.entityModel.roles.length) {
            this.rolesEmpty = true;
            return;
         }
         Object.assign(this.entityModel, entity);
         this.entityModel.hired_at = moment(entity.hired_at).format('YYYY-MM-DD');
         this.entityModel.fired_at = entity.fired_at ? moment(entity.fired_at).format('YYYY-MM-DD') : undefined;
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

   add(role: string): void {
      if ((role || '').trim()) {
         this.entityModel.roles.push(role.trim());
         this.rolesEmpty = false;
      }
      this.roles = this.roles.filter((r: string) => r !== role);
   }

   remove(role: string): void {
      const index = this.entityModel.roles.indexOf(role);

      if (index >= 0) {
         this.entityModel.roles.splice(index, 1);
         this.roles.push(role);
      }
   }
}
