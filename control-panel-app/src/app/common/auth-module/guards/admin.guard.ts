import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private loginService: AuthService, private toaster: MatSnackBar, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: { token: string, permission: string } = this.loginService.currentUserValue;
    if (user && user.permission && user.permission === 'admin') {
      return true;
    }
    this.toaster.open('Do not have permission', null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    });
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
