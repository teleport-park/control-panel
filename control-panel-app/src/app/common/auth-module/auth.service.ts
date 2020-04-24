import { Injectable } from '@angular/core';
import { TranslateService } from '../translations-module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /**
     * current user
     */
    private currentUser: BehaviorSubject<any>;

    constructor(
        private toaster: ToasterService,
        public translateService: TranslateService) {
        this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('USER')));
    }

    public get currentUserValue(): { token: string, permission: string } {
        return this.currentUser.value;
    }

    login(cardNumber: string): Observable<boolean> {
        return this.whoIs(cardNumber).pipe(mergeMap(({login, password, permission}) => {
            if (login === 'admin' && password === 'password') {
                const user = {
                    token: 'ed82c701-11c3-4288-aeb8-80019ded4a38',
                    permission
                };
                localStorage.setItem('USER', JSON.stringify(user));
                this.currentUser.next(user);
                return of(true);
            }
            this.toaster.error('AUTH_FILED_TOAST_MESSAGE');
            return of(false);
        }));
    }

    logout() {
        localStorage.removeItem('USER');
        this.currentUser.next(null);
    }

    whoIs(cardNumber: string): Observable<any> {
        return of({login: 'admin', password: 'password', permission: 'admin'});
    }
}
