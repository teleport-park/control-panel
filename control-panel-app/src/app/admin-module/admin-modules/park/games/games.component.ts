import { Component, OnInit } from '@angular/core';
import { GamesService } from './services/games.service';
import { TranslateService } from '../../../../common/translations-module';
import { Amusement } from '../../../../models';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  readonly URL_PREFIX = './assets/data/images/';

  amusements: Amusement[] = [];

  displayedColumns: string[] = ['logo', 'name', 'desc', 'action'];

  constructor(public service: GamesService, public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  /**
   * add to tariffs handler
   */
  addToTariffs(amusement: Amusement) {
    console.info('[amusement to tariff] -> ', amusement);
  }

}
