import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TranslateService } from '../../translations-module';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: AuthService, private translateService: TranslateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: { token: string } = this.loginService.currentUserValue;
    if (user && user.token) {
      req = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${user.token}`,
          'Accept-Language': this.translateService.locale.getValue()
        }
      });
    }
    return next.handle(req);
  }
}
