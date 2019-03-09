import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userModel: User;

  @Input() set user(user: User) {
    if (user) {
      this.form.patchValue(user);
    }
  };

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: '',
    age: '',
    dateOfBirth: '',
    registered: '',
    gender: '',
    desc: '',
    address: '',
    phone: ''
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.form.getRawValue())
  }
}
