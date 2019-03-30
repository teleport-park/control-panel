import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';

@Component({
  selector: 'control-panel-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  columns: string[] = [];

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

}
