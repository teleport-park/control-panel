import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from "../../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { Moment } from 'moment';
import { TranslateService } from "../../translations-module";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  /**
   * email regexp
   */
  static readonly EMAIL_REGEXP: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

  /**
   * user model
   */
  userModel: User;

  /**
   * user phone input
   */
  @ViewChild('phoneInput') phoneInput: ElementRef;

  /**
   * mode
   */
  mode: 'edit' | 'add';

  /**
   * set user
   * @param user
   */
  @Input() set user(user: User) {
    if (user) {
      user.dateOfBirth = moment(user.dateOfBirth, 'YYYY-MM-DD');
      user.registered = moment(user.registered, 'YYYY-MM-DD');
      this.userModel = Object.assign(new User(), user);
      this.form.patchValue(this.userModel);
      this.mode = 'edit';
    } else {
      this.userModel = new User();
      this.form.patchValue(this.userModel);
      this.mode = 'add'
    }
  };

  /**
   * emit save event
   */
  @Output() onSave: EventEmitter<User> = new EventEmitter();

  /**
   * emit cancel event
   */
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  /**
   * form
   */
  form: FormGroup;

  /**
   * constructor
   * @param fb
   * @param translateService
   */
  constructor(private fb: FormBuilder, public translateService: TranslateService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(100)]],
      dateOfBirth: ['', Validators.required],
      registered: ['', Validators.required],
      gender: 'male',
      email: ['', [Validators.required, Validators.pattern(UserFormComponent.EMAIL_REGEXP)]],
      desc: '',
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  /**
   * day of birth change handler
   * @param date
   */
  dayOfBirthChange(date: Moment): void {
    this.form.get('age').setValue(this.userModel.getAge(date))
  }

  /**
   * age change handler
   * @param age
   */
  ageChange(age: number): void {
    if (age > 0 && age < 100) {
      this.form.get('dateOfBirth').setValue(this.userModel.setDOB(age));
    }
  }

  /**
   * submit handler
   */
  onSubmitHandler(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsDirty();
    });
    if (this.form.valid) {
      Object.assign(this.userModel, this.form.getRawValue());
      // need to add masked value to user phone
      this.userModel.phone = this.phoneInput.nativeElement.value;
      this.onSave.emit(this.userModel);
    }
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.onCancel.emit();
  }
}
