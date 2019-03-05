import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { TranslateService } from "../../services/translate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  credential: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toaster: MatSnackBar, public translateService: TranslateService) {
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
    this.toaster.open(this.translateService.instant('AUTH_FILED_TOAST_MESSAGE'), null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    })
  }
}
