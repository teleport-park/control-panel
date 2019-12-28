import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { TimeFilterState } from '../../../../../../common/shared-module';

@Component({
  selector: 'invoces',
  templateUrl: './invoces.component.html',
  styleUrls: ['./invoces.component.scss']
})
export class InvocesComponent implements OnInit {

  constructor(public service: BillingService) { }

  ngOnInit() {
  }

   applyFilterHandler(filterState: TimeFilterState) {
     this.service.getInvoices(filterState);
   }

}
