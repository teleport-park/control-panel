import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '../common/translations-module';

@Injectable({
   providedIn: 'root'
})
export class ToasterService {

   constructor(private toaster: MatSnackBar, private translations: TranslateService) {
   }

   public error(message) {
      this.toaster.open(this.translations.instant(message), null, {
         duration: 3000,
         panelClass: 'toaster-error'
      });
   }

   public success(message, translate?: boolean) {
      this.toaster.open(translate ? this.translations.instant(message) : message, null, {
         duration: 3000,
         panelClass: 'toaster-success'
      });
   }
   public info(message, translate?: boolean) {
      this.toaster.open(translate ? this.translations.instant(message) : message, null, {
         duration: 3000,
         panelClass: 'toaster-info'
      });
   }
}
