import { Component, OnInit } from '@angular/core';
import { AmusementsItem } from '../amusements.component';
import { GamesService } from './services/games.service';
import { TranslateService } from '../../../../common/translations-module';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  readonly URL_PREFIX = './assets/data/images/';

  amusements: AmusementsItem[] = [];

  displayedColumns: string[] = ['logo', 'name', 'desc', 'action'];

  constructor(public service: GamesService, public translateService: TranslateService) { }

  ngOnInit() {
  }

  /**
   * add to tariffs handler
   */
  addToTariffs(amusement: AmusementsItem) {
    console.info('[amusement to tariff] -> ', amusement);
  }

}
