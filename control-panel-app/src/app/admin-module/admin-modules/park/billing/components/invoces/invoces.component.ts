import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'invoces',
  templateUrl: './invoces.component.html',
  styleUrls: ['./invoces.component.scss']
})
export class InvocesComponent implements OnInit {

  constructor(public service: BillingService) { }

  ngOnInit() {
  }

}
