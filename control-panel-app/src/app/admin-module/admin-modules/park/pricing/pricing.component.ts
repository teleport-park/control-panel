import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';

@Component({
  selector: 'pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(public service: PricingService) { }

  ngOnInit() {
  }

}
