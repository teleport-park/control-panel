import { Component, OnInit } from '@angular/core';
import { TariffsService } from './services/tariffs.service';

@Component({
  selector: 'tariffs',
  templateUrl: './games-tariffs.component.html',
  styleUrls: ['./games-tariffs.component.scss']
})
export class GamesTariffsComponent implements OnInit {

  constructor(public service: TariffsService) {
  }

  ngOnInit() {
  }

}
