import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userModel: User;

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

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: '',
      age: '',
      dateOfBirth: '',
      registered: '',
      gender: 'male',
      email: '',
      desc: '',
      address: ''
    });
  }

  ngOnInit() {
  }
}
