import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credential: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toaster: MatSnackBar) {
  }

  ngOnInit() {
    this.credential = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    const {login, password} = this.credential.getRawValue();
    if (login === 'admin' && password === 'password') {
      this.router.navigate(['/admin']);
      return;
    }
    this.toaster.open('Login or password incorrect', null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    })
  }

}
