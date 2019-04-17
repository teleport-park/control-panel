import { Component, OnInit } from '@angular/core';
import { TariffsService } from './services/tariffs.service';

@Component({
  selector: 'tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent implements OnInit {

  constructor(public service: TariffsService) {
  }

  ngOnInit() {
  }

}
