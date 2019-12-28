import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';

@Component({
   selector: 'accounts',
   templateUrl: './accounts.component.html',
   styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

   filterState: { positive: boolean, negative: boolean } = {
      positive: false,
      negative: false
   };

   constructor(public service: BillingService) {
   }

   ngOnInit() {

   }

   getFilteredResult() {
      this.service.getAccounts(this.filterState);
   }

}
