import { Injectable } from '@angular/core';
import { TranslateService } from '../translations-module';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';

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

   login({login, password, permission}): boolean {
      if (login === 'admin' && password === 'password') {
         const user = {
            token: 'ed82c701-11c3-4288-aeb8-80019ded4a38',
            permission
         };
         localStorage.setItem('USER', JSON.stringify(user));
         this.currentUser.next(user);
         return true;
      }
      this.toaster.error('AUTH_FILED_TOAST_MESSAGE');
      return false;
   }

   logout() {
      localStorage.removeItem('USER');
      this.currentUser.next(null);
   }
}
