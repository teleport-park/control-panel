import { Component, OnInit } from '@angular/core';
import { BillingService } from './services/billing.service';

@Component({
  selector: 'biling',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(public service: BillingService) { }

  ngOnInit() {
  }

   applyFilter(value: string) {
     this.service.getTransactions(value)
   }

   sync() {
     this.service.lastSyncTime$.next(new Date());
   }

}
