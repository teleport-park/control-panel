import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  /**
   * credential
   */
  credential: FormGroup;
  private returnUrl: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public loaderService: LoaderService,
              private service: AuthService,
              public translateService: TranslateService) {
  }

  ngOnInit() {
    this.credential = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.service.logout();
    const literal = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams[literal] || '/admin';
  }

  onSubmit() {
    if (this.service.login(this.credential.getRawValue())) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
