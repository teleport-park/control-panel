import { Component, OnInit } from '@angular/core';
import { TariffsService } from './services/tariffs.service';

@Component({
  selector: 'pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(public service: TariffsService) { }

  ngOnInit() {
  }

}
