import { Component, OnInit } from '@angular/core';
import { AmusementsService } from './services/amusements.service';
import { TranslateService } from '../../../common/translations-module';

export interface AmusementsItem {
  name: string;
  logo: string;
  desc: string[];
}

@Component({
  selector: 'control-panel-amusement',
  templateUrl: './amusements.component.html',
  styleUrls: ['./amusements.component.scss']
})
export class AmusementsComponent implements OnInit {

  readonly URL_PREFIX = './assets/data/images/';

  amusements: AmusementsItem[] = [];

  displayedColumns: string[] = ['logo', 'name', 'desc'];

  constructor(public service: AmusementsService, public translateService: TranslateService) {
  }

  ngOnInit() {
  }

}
