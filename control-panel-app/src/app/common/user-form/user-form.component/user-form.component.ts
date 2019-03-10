import { Component, EventEmitter, Input, Output } from '@angular/core';
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
   * user model
   */
  userModel: User;

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
    } else {
      this.userModel = new User();
      this.form.patchValue(this.userModel);
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
      lastName: '',
      age: '',
      dateOfBirth: '',
      registered: '',
      gender: 'male',
      email: '',
      desc: '',
      address: '',
      phone: ''
    });
  }

  /**
   * day of birth change handler
   * @param date
   */
  dayOfBirthChange(date: Moment) {
    this.form.get('age').setValue(this.userModel.getAge(date))
  }

  /**
   * submit handler
   */
  onSubmitHandler(): void {
    this.onSave.emit(Object.assign(this.userModel, this.form.getRawValue()));
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.onCancel.emit();
  }
}
