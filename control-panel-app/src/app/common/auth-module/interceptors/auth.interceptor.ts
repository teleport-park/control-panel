import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { TranslateService } from '../../translations-module';
import { LoaderService } from '../../../services/loader.service';
import { catchError, tap } from 'rxjs/operators';
import { ToasterService } from '../../../services/toaster.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
   constructor(private loginService: AuthService,
               private translateService: TranslateService,
               private loader: LoaderService,
               private toaster: ToasterService) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const user: { token: string } = this.loginService.currentUserValue;
      if (user && user.token) {
         req = req.clone({
            setHeaders: {
               Authorization: `Bearer ${user.token}`,
               'Accept-Language': this.translateService.locale.getValue()
            }
         });
      }
      return next.handle(req).pipe(
         tap((res) => {
            if (res instanceof HttpResponse) {
               // this.loader.dispatchShowLoader(false);
            }
         }),
         catchError((err) => {
            this.loader.dispatchShowLoader(false);
            this.toaster.error(err);
            return throwError(err);
         })
      );
   }
}
