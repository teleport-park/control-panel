import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../common/translations-module';

@Injectable({
   providedIn: 'root'
})
export class ToasterService {

   constructor(private toaster: MatSnackBar, private translations: TranslateService) {
   }

   public error(message) {
      this.toaster.open(this.translations.instant(message), null, {
         duration: 5000,
         panelClass: 'toaster-error'
      });
   }

   public success(message) {
      this.toaster.open(this.translations.instant(message), null, {
         duration: 5000,
         panelClass: 'toaster-success'
      });
   }
}