import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../translations-module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * current user
   */
  private currentUser: BehaviorSubject<any>;

  constructor(
    private toaster: MatSnackBar,
    public translateService: TranslateService) {
    this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('USER')));
  }

  public get currentUserValue(): { token: string, permission: string } {
    return this.currentUser.value;
  }

  login({login, password}): boolean {
    if (login === 'admin' && password === 'password') {
      const user = {
        token: 'fake-control-teleport-token',
        permission: 'admin'
      };
      localStorage.setItem('USER', JSON.stringify(user));
      this.currentUser.next(user);
      return true;
    }
    this.toaster.open(this.translateService.instant('AUTH_FILED_TOAST_MESSAGE'), null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    });
    return false;
  }

  logout() {
    localStorage.removeItem('USER');
    this.currentUser.next(null);
  }
}
