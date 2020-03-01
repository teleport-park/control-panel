import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../../../../../common/translations-module';
import { Currencies } from '../../../../utils/utils';
import { Router } from '@angular/router';
import { PackagesService } from '../packages.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../../common/shared-module';

@Component({
   selector: 'add-package',
   templateUrl: './add-package.component.html',
   styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

   _currencies = Currencies;

   form: FormGroup;

   payments: FormArray;

   charges: FormArray;

   constructor(public fb: FormBuilder,
               public translationService: TranslateService,
               private router: Router,
               private service: PackagesService,
               private cd: ChangeDetectorRef,
               private dialog: MatDialog) {
   }

   ngOnInit() {
      this.initForm();
   }

   initForm() {
      this.payments = this.fb.array([]);
      this.charges = this.fb.array([]);
      this.form = this.fb.group({
         name: ['', Validators.required],
         players: [1, [Validators.required, Validators.pattern('[0-9]+')]],
         note: '',
         payments: this.payments,
         charges: this.charges
      });
   }

   getPayment() {
      return this.fb.group({
         amount: this.fb.group({
            currency: Currencies[0],
            amount: ['', Validators.required]
         }),
         inPercentage: false
      });
   }

   getCharge() {
      return this.fb.group({
         amount: this.fb.group({
            currency: Currencies[0],
            amount: ['', Validators.required]
         }),
         inPercentage: false,
         players: []
      });
   }

   addPayment() {
      this.payments.push(this.getPayment());
   }

   addCharge() {
      this.charges.push(this.getCharge());
   }

   removePayment(index) {
      this.payments.removeAt(index);

   }

   removeCharge(index) {
      this.charges.removeAt(index);
   }

   submit() {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
         return;
      }
      console.log(this.form.getRawValue());
      this.service.addPackage(this.form.getRawValue());
   }

   getPlayersArray() {
      const array = [];
      for (let i = 0; i < +this.form.get('players').value && i < 20; i++) {
         array.push(i);
      }
      return array;
   }

   back() {
      this.router.navigate(['admin', 'park', 'packages']);
   }

   /**
    * show confirm dialog
    */
   private showConfirmDialog(index: number, payments?: boolean) {
      this.dialog.open(ConfirmDialogComponent, {
         data: {
            title: 'DIALOG_CONFIRM_TITLE',
            message: payments ? 'REMOVE_PAYMENT_CONFIRM_MASSAGE' : 'REMOVE_CHARGE_CONFIRM_MESSAGE',
            messageParams: [(index + 1).toString()]
         } as ConfirmDialogData,
         autoFocus: false
      }).afterClosed()
      .subscribe((res) => {
         if (!res) {
            return;
         }
         if (payments) {
            this.removePayment(index);
         } else {
            this.removeCharge(index);
         }
         this.cd.markForCheck();
      });
   }
}
