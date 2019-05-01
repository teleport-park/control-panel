import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../translations-module';
import { MenuPermissionMap } from './permission-map';

@Injectable({
  providedIn: 'root'
})

export class PermissionGuard implements CanActivate {
  constructor(private loginService: AuthService,
              private toaster: MatSnackBar,
              private router: Router,
              private translateService: TranslateService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: { token: string, permission: string } = this.loginService.currentUserValue;
    if (user && user.permission) {
      const path = state.url.split('/');
      let routeIdentifier = path[path.length - 1];
      if (path[path.length - 2] === 'users') {
        routeIdentifier = path[path.length - 2];
      }
      const permission = MenuPermissionMap[routeIdentifier] as string[];
      if (!permission.length || permission.indexOf(user.permission) > -1) {
        return true;
      }
      this.toaster.open(this.translateService.instant('NOT_AUTH_MESSAGE'), null, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toaster-error'
      });
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
  }
}
