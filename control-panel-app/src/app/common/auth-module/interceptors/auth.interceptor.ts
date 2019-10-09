import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { TranslateService } from '../../translations-module';
import { LoaderService } from '../../../services/loader.service';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: AuthService,
                private translateService: TranslateService,
                private loader: LoaderService,
                private toaster: MatSnackBar) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user: { token: string } = this.loginService.currentUserValue;
        if (user && user.token) {
            this.loader.dispatchShowLoader(true);
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
                    this.loader.dispatchShowLoader(false);
                }
            }),
            catchError((err) => {
                this.loader.dispatchShowLoader(false);
                this.showError(err);
                return throwError(err);
            })
        );
    }

    private showError(message) {
        this.toaster.open(message, null, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'toaster-error'
        });
    }
}
