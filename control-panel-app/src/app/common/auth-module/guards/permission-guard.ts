import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MenuPermissionMap } from './permission-map';
import { ToasterService } from '../../../services/toaster.service';

@Injectable({
   providedIn: 'root'
})

export class PermissionGuard implements CanActivate {
   constructor(private loginService: AuthService,
               private toaster: ToasterService,
               private router: Router) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user: { token: string, permission: string } = this.loginService.currentUserValue;
      if (user && user.permission) {
         let path = route.routeConfig.path;
         if (path === ':id') {
            const pathArr = state.url.split('/');
            path = `${pathArr[pathArr.length - 2]}/${path}`;
         }
         const permission = MenuPermissionMap[path] as string[];
         // if no permission list - block
         if (!permission) {
            return false;
         }
         if (!permission.length || permission.indexOf(user.permission) > -1) {
            return true;
         }
         this.toaster.error('NOT_AUTH_MESSAGE');
         this.router.navigate(['/admin/dashboard']);
         return false;
      }
   }
}
