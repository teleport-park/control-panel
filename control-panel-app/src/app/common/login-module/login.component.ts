import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { TranslateService } from "../translations-module/translate.service";
import { LanguageItem } from "../translations-module";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  credential: FormGroup;

  /**
   * language item
   */
  languageItems: LanguageItem[] = [
    {value: 'en', label: this.translateService.instant('en')},
    {value: 'ru', label: this.translateService.instant('ru')}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toaster: MatSnackBar,
    public translateService: TranslateService,
    public loaderService: LoaderService) {
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
